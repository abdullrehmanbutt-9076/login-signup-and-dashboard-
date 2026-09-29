import React, { useState } from 'react';
import { 
  Folder, 
  FileCode, 
  Copy, 
  Check, 
  Download, 
  Search, 
  ExternalLink, 
  Terminal, 
  FileText,
  Layers,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { ANDROID_PROJECT_FILES, AndroidFile } from '../data/androidProjectFiles';
import JSZip from 'jszip';

interface Props {
  onSelectFile?: (file: AndroidFile) => void;
}

export const CodeExplorer: React.FC<Props> = () => {
  const [selectedFilePath, setSelectedFilePath] = useState<string>(
    'app/src/main/java/com/example/myapp/navigation/AppNavigation.kt'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'navigation': true,
    'screens': true,
    'components': true,
    'viewmodel': true,
    'data': true,
    'theme': false,
    'gradle': true
  });

  const selectedFile = ANDROID_PROJECT_FILES.find((f) => f.path === selectedFilePath) || ANDROID_PROJECT_FILES[0];

  const filteredFiles = ANDROID_PROJECT_FILES.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFolder = (folderKey: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderKey]: !prev[folderKey]
    }));
  };

  const handleCopyCode = () => {
    if (!selectedFile) return;
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      const zip = new JSZip();

      // Add each file to the zip
      ANDROID_PROJECT_FILES.forEach((file) => {
        zip.file(file.path, file.content);
      });

      // Add root README.md with clear instructions for Android Studio
      const readmeContent = `# NovaSecure - Jetpack Compose Auth & Navigation Suite
Complete Android Mobile Application built with Jetpack Compose, Material 3, Navigation Compose, and MVVM architecture.

## How to Open in Android Studio
1. Launch Android Studio (version Ladybug, Koala, Jellyfish, or newer recommended).
2. Choose **File > Open...** and select the unzipped directory root.
3. Allow Gradle to sync dependencies automatically.
4. Run on an Android Emulator (API 34 or 35) or a physical Android device.

## Architecture & Tech Stack
- **Jetpack Compose BOM**: 2024.12.01
- **Navigation Compose**: 2.8.5
- **Material 3**: Material Design 3 components
- **MVVM**: StateFlow & ViewModel architecture
- **DataStore Preferences**: Session management and persistent auth state
`;
      zip.file('README.md', readmeContent);

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'NovaSecure-Android-Compose-Project.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to generate ZIP:', err);
    } finally {
      setIsZipping(false);
    }
  };

  const categories: { key: AndroidFile['category']; label: string }[] = [
    { key: 'navigation', label: 'Navigation Graph' },
    { key: 'screens', label: 'Compose Screens' },
    { key: 'components', label: 'Material 3 Components' },
    { key: 'viewmodel', label: 'MVVM ViewModel' },
    { key: 'data', label: 'DataStore Session' },
    { key: 'activity', label: 'Activity & Entry' },
    { key: 'manifest', label: 'Manifest & Config' },
    { key: 'gradle', label: 'Gradle Build Scripts' },
    { key: 'theme', label: 'Material 3 Theme' }
  ];

  return (
    <div className="flex flex-col lg:flex-row h-[780px] rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
      {/* File Tree Sidebar */}
      <div className="w-full lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-900/60 flex flex-col">
        {/* Header & Download Button */}
        <div className="p-3.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Folder className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white tracking-wide">Project Structure</h3>
              <p className="text-[10px] text-slate-400">Android Studio Explorer</p>
            </div>
          </div>

          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold text-xs transition-all shadow-sm disabled:opacity-50"
            title="Download full compilable Android Studio project as ZIP"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isZipping ? 'Generating...' : 'Export .ZIP'}</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="p-2.5 border-b border-slate-800">
          <div className="relative flex items-center bg-slate-950 rounded-lg border border-slate-800 px-2.5 py-1.5 focus-within:border-indigo-500">
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Kotlin files, routes, screens..."
              className="w-full bg-transparent px-2 text-xs text-white outline-none placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Category-grouped File Tree */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {categories.map((cat) => {
            const files = filteredFiles.filter((f) => f.category === cat.key);
            if (files.length === 0) return null;
            const isExpanded = expandedFolders[cat.key] ?? true;

            return (
              <div key={cat.key} className="mb-1">
                <button
                  onClick={() => toggleFolder(cat.key)}
                  className="w-full flex items-center justify-between px-2 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider hover:text-slate-200 rounded-md transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    )}
                    <span>{cat.label}</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                    {files.length}
                  </span>
                </button>

                {isExpanded && (
                  <div className="ml-3 pl-2 border-l border-slate-800 space-y-0.5 mt-0.5">
                    {files.map((file) => {
                      const isSelected = selectedFilePath === file.path;
                      return (
                        <button
                          key={file.path}
                          onClick={() => setSelectedFilePath(file.path)}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-left transition-all ${
                            isSelected
                              ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                          }`}
                        >
                          <FileCode className={`w-3.5 h-3.5 shrink-0 ${
                            isSelected ? 'text-indigo-400' : 'text-slate-500'
                          }`} />
                          <span className="truncate">{file.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Code Viewer Panel */}
      <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
        {/* Active File Header */}
        <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/40 flex items-center justify-between">
          <div className="min-w-0 pr-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white font-mono">{selectedFile.name}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-indigo-400 border border-slate-700">
                {selectedFile.language.toUpperCase()}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate mt-0.5 font-mono">
              {selectedFile.path}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 text-xs font-semibold transition-all border border-slate-700 shadow-sm"
              title="Copy entire file to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy File</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* File Description Banner */}
        <div className="px-4 py-2 bg-indigo-950/20 border-b border-slate-800/80 text-xs text-indigo-200/90 flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span>{selectedFile.description}</span>
        </div>

        {/* Code Content Area with Line Numbers */}
        <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed selection:bg-indigo-600/40">
          <pre className="text-slate-300">
            <code>
              {selectedFile.content.split('\n').map((line, idx) => (
                <div key={idx} className="flex hover:bg-slate-900/60 py-0.5 px-1 rounded">
                  <span className="w-10 select-none text-right pr-4 text-slate-600 font-mono text-[11px]">
                    {idx + 1}
                  </span>
                  <span className="flex-1 whitespace-pre">{line}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

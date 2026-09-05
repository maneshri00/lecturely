import React from 'react';
import { X, FileText, Download, BookOpen, Sparkles, CheckCircle2, ExternalLink, FileSpreadsheet, Layers, Coins, User } from 'lucide-react';
import { formatCurrency } from '../utils';

interface TopicSyllabusModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicName: string;
  topicFee?: number;
  expertName?: string;
  expertPhoto?: string;
  syllabusModules?: Array<{ module: string; title: string; points: string[] }>;
  downloadableMaterials?: Array<{ title: string; type: string; url: string; size: string }>;
}

export const TopicSyllabusModal: React.FC<TopicSyllabusModalProps> = ({
  isOpen,
  onClose,
  topicName,
  topicFee = 0,
  expertName = 'Speaker / Mentor',
  expertPhoto,
  syllabusModules,
  downloadableMaterials,
}) => {
  if (!isOpen) return null;

  const modulesToDisplay = syllabusModules || [];
  const materialsToDisplay = downloadableMaterials || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#090e18] border border-[#0a2540] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-white">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#0a2540] via-[#1a385c] to-[#b58153]/30 border-b border-[#0a2540] relative flex items-start justify-between">
          <div className="space-y-1 pr-8">
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-black/60 text-[#ffebbf] px-2.5 py-0.5 rounded-full border border-[#b58153]/40 font-bold uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#ffebbf]" /> Official Course Syllabus
              </span>
              <span className="text-[10px] bg-[#010101] text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 font-bold uppercase flex items-center gap-1">
                <Coins className="w-3 h-3 text-amber-400" /> {formatCurrency(topicFee)} / session
              </span>
            </div>
            <h2 className="text-2xl font-black font-display text-white mt-1 capitalize">
              {topicName}
            </h2>
            <p className="text-xs text-slate-300 flex items-center gap-2 font-medium">
              <span>Prepared by {expertName}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-black/40 text-slate-400 hover:text-white hover:bg-black/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Syllabus Modules Breakdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#0a2540] pb-2">
              <h3 className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#b58153]" /> Curriculum & Module Learning Objectives
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">{modulesToDisplay.length} Modules Included</span>
            </div>

            {modulesToDisplay.length === 0 ? (
              <div className="p-5 bg-[#010101] border border-[#0a2540] rounded-xl text-center space-y-1">
                <p className="text-xs font-semibold text-slate-300">
                  No syllabus modules uploaded yet for <span className="text-[#ffebbf]">{topicName}</span>.
                </p>
                <p className="text-[11px] text-slate-500">
                  The speaker will discuss custom topic requirements directly during session coordination.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {modulesToDisplay.map((mod, idx) => (
                  <div key={idx} className="p-4 bg-[#010101] border border-[#0a2540] rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#b58153] uppercase tracking-wider">{mod.module}</span>
                      <span className="text-xs font-bold text-white">{mod.title}</span>
                    </div>
                    <ul className="space-y-1.5 pt-1">
                      {mod.points.map((pt, pIdx) => (
                        <li key={pIdx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Downloadable Materials Section */}
          <div className="space-y-3 pt-2 border-t border-[#0a2540]">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" /> Downloadable Syllabus & Resources
              </h3>
              <span className="text-[10px] text-[#ffebbf] bg-[#0a2540] px-2 py-0.5 rounded font-bold uppercase">
                Uploaded by Expert
              </span>
            </div>

            {materialsToDisplay.length === 0 ? (
              <div className="p-4 bg-[#010101] border border-[#0a2540] rounded-xl text-center text-xs text-slate-400">
                No downloadable files or syllabus documents attached yet by {expertName} for this topic.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {materialsToDisplay.map((mat, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-3.5 bg-[#010101] border border-[#0a2540] rounded-xl flex items-center justify-between gap-3 hover:border-[#b58153]/50 transition group"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-9 h-9 rounded-lg bg-[#0a2540] text-[#ffebbf] flex items-center justify-center flex-shrink-0 font-bold text-sm">
                        <FileSpreadsheet className="w-4 h-4 text-[#ffebbf]" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold text-white truncate group-hover:text-[#ffebbf] transition">
                          {mat.title}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5 flex items-center gap-2">
                          <span>{mat.type}</span>
                          <span>•</span>
                          <span>{mat.size}</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={mat.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={mat.title}
                      className="p-2 rounded-lg bg-[#0a2540] text-[#ffebbf] hover:bg-[#b58153] hover:text-black transition flex-shrink-0 flex items-center gap-1 text-[11px] font-bold"
                      title={`Download ${mat.title}`}
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#010101] border-t border-[#0a2540] flex justify-between items-center">
          <div className="text-xs text-slate-400">
            Click download to save official syllabus files.
          </div>
          <button
            onClick={onClose}
            className="btn-primary text-xs px-5 py-2 font-black uppercase shadow-ns-gold"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};

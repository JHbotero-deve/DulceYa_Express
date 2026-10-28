import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, ShieldCheck, Clock, Film, X, Sparkles } from 'lucide-react';
import { CAMPAIGN_VIDEOS } from '../data/campaigns';
import { C2PAMetadata } from '../types';

interface VideoCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVideoFile?: string;
  onOpenC2PAModal: (fileName: string) => void;
}

export const VideoCampaignModal: React.FC<VideoCampaignModalProps> = ({
  isOpen,
  onClose,
  initialVideoFile = 'DulceYa_Express_Spot_Oficial.mp4',
  onOpenC2PAModal
}) => {
  const [selectedFileName, setSelectedFileName] = useState<string>(initialVideoFile);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (initialVideoFile) {
      setSelectedFileName(initialVideoFile);
      setActiveChapterIndex(0);
      setIsPlaying(true);
    }
  }, [initialVideoFile, isOpen]);

  if (!isOpen) return null;

  const currentVideo: C2PAMetadata =
    CAMPAIGN_VIDEOS.find((v) => v.fileName === selectedFileName) || CAMPAIGN_VIDEOS[0];

  const currentChapter = currentVideo.chapters[activeChapterIndex] || currentVideo.chapters[0];

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    } else {
      setIsMuted(!isMuted);
    }
  };

  const handleChapterClick = (idx: number, seconds: number) => {
    setActiveChapterIndex(idx);
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-4xl max-h-[95vh] overflow-hidden bg-stone-900 rounded-3xl shadow-2xl border border-stone-800 flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-stone-900 border-b border-stone-800 text-white">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
              <Film className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold truncate">{currentVideo.title}</span>
                <span className="hidden sm:inline px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-rose-600/30 text-rose-300 rounded border border-rose-500/30 shrink-0">
                  DulceYa Express
                </span>
              </div>
              <p className="text-xs text-stone-400 truncate">{currentVideo.fileName}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onOpenC2PAModal(currentVideo.fileName)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 rounded-xl hover:bg-emerald-900/50 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Credenciales C2PA</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Cerrar video"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Campaign Switcher Tabs */}
        <div className="flex border-b border-stone-800 bg-stone-950 px-4 py-2 gap-2 overflow-x-auto">
          {CAMPAIGN_VIDEOS.map((v) => (
            <button
              key={v.fileName}
              onClick={() => {
                setSelectedFileName(v.fileName);
                setActiveChapterIndex(0);
                setIsPlaying(true);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
                selectedFileName === v.fileName
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-stone-800/60 text-stone-300 hover:bg-stone-800'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span className="truncate max-w-[180px]">{v.title}</span>
              <span className="text-[10px] opacity-75">({v.duration})</span>
            </button>
          ))}
        </div>

        {/* Video Player Display */}
        <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center group">
          {currentVideo.previewVideoUrl ? (
            <video
              ref={videoRef}
              src={currentVideo.previewVideoUrl}
              poster={currentVideo.posterUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain bg-black"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          ) : (
            <div className="relative w-full h-full">
              <img
                src={currentVideo.posterUrl}
                alt={currentVideo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <h4 className="text-xl font-bold text-white">{currentVideo.title}</h4>
                  <p className="text-xs text-amber-300 mt-1">{currentVideo.tagline}</p>
                </div>
              </div>
            </div>
          )}

          {/* AI Provenance Watermark badge */}
          <div className="absolute top-4 left-4 z-10 pointer-events-auto">
            <button
              onClick={() => onOpenC2PAModal(currentVideo.fileName)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-white/10 hover:bg-black/90 transition-colors cursor-pointer shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>C2PA / Canva AI Verificado</span>
            </button>
          </div>
        </div>

        {/* Chapters navigation list */}
        <div className="p-4 sm:p-5 bg-stone-900 border-t border-stone-800">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Momentos Clave de la Campaña</span>
            </h5>
            <span className="text-xs text-stone-500">
              {currentVideo.chapters.length} escenas
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            {currentVideo.chapters.map((chap, idx) => {
              const isCurrent = idx === activeChapterIndex;
              return (
                <button
                  key={chap.title}
                  onClick={() => handleChapterClick(idx, chap.seconds)}
                  className={`p-3 rounded-2xl text-left transition-all border cursor-pointer ${
                    isCurrent
                      ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                      : 'bg-stone-800/40 border-stone-800 text-stone-300 hover:bg-stone-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 mb-1">
                    <span>{chap.time}</span>
                    {isCurrent && <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />}
                  </div>
                  <div className="text-xs font-bold line-clamp-1">{chap.title}</div>
                  <div className="text-[10px] text-stone-400 line-clamp-2 mt-0.5">{chap.description}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

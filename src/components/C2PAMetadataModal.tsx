import React, { useState } from 'react';
import { ShieldCheck, Copy, Check, FileVideo, Cpu, Award, ExternalLink, X, Fingerprint, Layers, Sparkles } from 'lucide-react';
import { CAMPAIGN_VIDEOS } from '../data/campaigns';
import { C2PAMetadata } from '../types';

interface C2PAMetadataModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFile?: string;
}

export const C2PAMetadataModal: React.FC<C2PAMetadataModalProps> = ({
  isOpen,
  onClose,
  selectedFile = 'DulceYa Express.mp4'
}) => {
  const [activeFileName, setActiveFileName] = useState<string>(selectedFile);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showRawJson, setShowRawJson] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentVideo: C2PAMetadata =
    CAMPAIGN_VIDEOS.find((v) => v.fileName === activeFileName) || CAMPAIGN_VIDEOS[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const rawJsonManifest = JSON.stringify(
    {
      c2pa_manifest_version: '2.1.0',
      claim_generator: currentVideo.creationTool,
      format: 'video/mp4',
      instance_id: currentVideo.c2paInstanceId,
      claim_id: currentVideo.c2paClaimId,
      xmp_attribute_id: currentVideo.xmpAttribId,
      assertions: [
        {
          label: 'c2pa.actions',
          data: {
            actions: [
              {
                action: 'c2pa.created',
                parameters: {
                  generator: 'Canva engine=jc',
                  digitalSourceType: currentVideo.digitalSourceType,
                  aiGenerated: true
                },
                softwareAgent: 'Canva AI (2026.10)',
                when: `${currentVideo.creationDate}T12:00:00Z`
              }
            ]
          }
        },
        {
          label: 'c2pa.encoding',
          data: {
            codec: currentVideo.videoCodec,
            profile: currentVideo.h264Profile,
            muxer: currentVideo.muxingLibrary
          }
        }
      ]
    },
    null,
    2
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-stone-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="c2pa-title"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-stone-900 text-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="c2pa-title" className="text-lg font-bold">Credenciales de Contenido C2PA</h3>
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded">
                  Verificado
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Estándar de Procedencia & Transparencia Digital (Coalition for Content Provenance and Authenticity)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selector for files */}
        <div className="px-6 pt-4 pb-2 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {CAMPAIGN_VIDEOS.map((v) => (
              <button
                key={v.fileName}
                onClick={() => setActiveFileName(v.fileName)}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                  activeFileName === v.fileName
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                <FileVideo className="w-4 h-4" />
                <span>{v.fileName}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowRawJson(!showRawJson)}
              className="text-xs font-medium text-stone-600 hover:text-stone-900 underline flex items-center gap-1"
            >
              <Cpu className="w-3.5 h-3.5" />
              {showRawJson ? 'Ver Ficha Técnica' : 'Ver Manifiesto JSON C2PA'}
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {showRawJson ? (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-stone-500">manifest.c2pa.json</span>
                <button
                  onClick={() => handleCopy(rawJsonManifest, 'manifest')}
                  className="flex items-center gap-1 text-xs text-amber-700 hover:text-amber-800 font-medium"
                >
                  {copiedKey === 'manifest' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === 'manifest' ? 'Copiado' : 'Copiar JSON'}
                </button>
              </div>
              <pre className="p-4 bg-stone-950 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto border border-stone-800 leading-relaxed max-h-96">
                {rawJsonManifest}
              </pre>
            </div>
          ) : (
            <>
              {/* Summary banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/70">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-100 text-amber-800 rounded-lg shrink-0 mt-0.5">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900">
                      Campaña Oficial DulceYa Express 2026: "{currentVideo.title}"
                    </h4>
                    <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                      Este contenido audiovisual fue producido el <strong>{currentVideo.creationDate}</strong> incorporando tecnología
                      de generación asistida por inteligencia artificial mediante <strong>{currentVideo.creationTool}</strong>. Cumple con
                      los lineamientos internacionales de procedencia multimedia digital.
                    </p>
                  </div>
                </div>
              </div>

              {/* Attributes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* File & Creation */}
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500">
                    <FileVideo className="w-4 h-4 text-stone-700" />
                    <span>Identidad del Archivo</span>
                  </div>

                  <div>
                    <div className="text-xs text-stone-500">Nombre del archivo</div>
                    <div className="text-sm font-semibold text-stone-900 font-mono">{currentVideo.fileName}</div>
                  </div>

                  <div>
                    <div className="text-xs text-stone-500">Fecha de creación</div>
                    <div className="text-sm font-medium text-stone-800">{currentVideo.creationDate}</div>
                  </div>

                  <div>
                    <div className="text-xs text-stone-500">Herramienta de creación</div>
                    <div className="text-sm font-semibold text-amber-700">{currentVideo.creationTool}</div>
                  </div>

                  <div>
                    <div className="text-xs text-stone-500">Contenido generado por IA</div>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 mt-0.5 text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 rounded">
                      <Sparkles className="w-3 h-3 text-blue-600" />
                      {currentVideo.containsAiGenerated}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-stone-500">Tipo de fuente digital</div>
                    <div className="text-xs font-medium text-stone-800 mt-0.5">
                      {currentVideo.digitalSourceType}
                    </div>
                  </div>
                </div>

                {/* Technical Encoding Details */}
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500">
                    <Cpu className="w-4 h-4 text-stone-700" />
                    <span>Parámetros de Codificación Video</span>
                  </div>

                  <div>
                    <div className="text-xs text-stone-500">Códec de video</div>
                    <div className="text-sm font-mono font-medium text-stone-900">{currentVideo.videoCodec}</div>
                  </div>

                  <div>
                    <div className="text-xs text-stone-500">Perfil / Opciones H.264</div>
                    <div className="text-xs font-mono text-stone-800 bg-white p-2 rounded border border-stone-200 mt-1">
                      {currentVideo.h264Profile}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-stone-500">Librería de multiplexación</div>
                    <div className="text-sm font-mono text-stone-800">{currentVideo.muxingLibrary}</div>
                  </div>

                  <div>
                    <div className="text-xs text-stone-500">Resolución & Formato</div>
                    <div className="text-xs font-medium text-stone-800">{currentVideo.aspectRatio}</div>
                  </div>
                </div>
              </div>

              {/* Cryptographic Identifiers */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500">
                  <Fingerprint className="w-4 h-4 text-stone-700" />
                  <span>Identificadores Criptográficos & XMP</span>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 bg-white rounded-lg border border-stone-200 gap-2">
                    <div>
                      <div className="text-xs text-stone-500 font-medium">ID Ext (XMP Attrib)</div>
                      <div className="text-xs font-mono text-stone-900 break-all select-all">{currentVideo.xmpAttribId}</div>
                    </div>
                    <button
                      onClick={() => handleCopy(currentVideo.xmpAttribId, 'xmp')}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded self-start sm:self-center transition-colors"
                    >
                      {copiedKey === 'xmp' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'xmp' ? 'Copiado' : 'Copiar'}</span>
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 bg-white rounded-lg border border-stone-200 gap-2">
                    <div>
                      <div className="text-xs text-stone-500 font-medium">ID de la reclamación C2PA (Claim ID)</div>
                      <div className="text-xs font-mono text-stone-900 break-all select-all">{currentVideo.c2paClaimId}</div>
                    </div>
                    <button
                      onClick={() => handleCopy(currentVideo.c2paClaimId, 'claim')}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded self-start sm:self-center transition-colors"
                    >
                      {copiedKey === 'claim' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'claim' ? 'Copiado' : 'Copiar'}</span>
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 bg-white rounded-lg border border-stone-200 gap-2">
                    <div>
                      <div className="text-xs text-stone-500 font-medium">ID de instancia C2PA (Instance ID)</div>
                      <div className="text-xs font-mono text-stone-900 break-all select-all">{currentVideo.c2paInstanceId}</div>
                    </div>
                    <button
                      onClick={() => handleCopy(currentVideo.c2paInstanceId, 'instance')}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded self-start sm:self-center transition-colors"
                    >
                      {copiedKey === 'instance' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'instance' ? 'Copiado' : 'Copiar'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Informative footer */}
              <div className="flex items-center justify-between pt-2 text-xs text-stone-500 border-t border-stone-200">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>DulceYa Express — Política de Transparencia de Contenido Audiovisual</span>
                </div>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors"
                >
                  Entendido
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

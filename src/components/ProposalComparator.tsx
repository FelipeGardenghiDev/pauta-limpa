'use client';

import React, { useState } from 'react';
import { DollarSign, HeartPulse, GraduationCap, Shield, ChevronDown, ExternalLink, Sparkles } from 'lucide-react';

interface PropostaInfo {
  titulo: string;
  resumo_ia: string[];
  texto_oficial: string;
  fonte_documento: string;
  pagina_documento: number;
  link_plano_tse: string;
}

interface Candidate {
  id: string;
  nome_urna: string;
  numero: string;
  cor_tema: string;
  propostas_por_tema: Record<string, PropostaInfo>;
}

interface ProposalComparatorProps {
  candidatos: Candidate[];
}

const TEMAS = [
  { id: 'economia', label: 'Economia e Impostos', icon: DollarSign },
  { id: 'saude', label: 'Saúde Pública (SUS)', icon: HeartPulse },
  { id: 'educacao', label: 'Educação e Juventude', icon: GraduationCap },
  { id: 'seguranca', label: 'Segurança e Justiça', icon: Shield },
];

export default function ProposalComparator({ candidatos }: ProposalComparatorProps) {
  const [temaAtivo, setTemaAtivo] = useState('economia');
  const [mostrarTextoIntegral, setMostrarTextoIntegral] = useState<Record<string, boolean>>({});

  const toggleIntegral = (candidatoId: string) => {
    setMostrarTextoIntegral(prev => ({
      ...prev,
      [candidatoId]: !prev[candidatoId],
    }));
  };

  const candA = candidatos[0];
  const candB = candidatos[1];

  const propA = candA?.propostas_por_tema[temaAtivo];
  const propB = candB?.propostas_por_tema[temaAtivo];

  return (
    <section className="my-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 p-6 md:p-8">
      {/* Cabeçalho do Comparador */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 text-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Síntese Factual das Propostas Oficiais
            </span>
          </div>
          <h3 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Comparativo de Planos de Governo
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Resumos padronizados a partir dos documentos oficiais registrados no TSE (DivulgaCandContas).
          </p>
        </div>

        {/* Seletor de Temas */}
        <div className="flex flex-wrap gap-2">
          {TEMAS.map(tema => {
            const Icon = tema.icon;
            const isSelected = temaAtivo === tema.id;
            return (
              <button
                key={tema.id}
                onClick={() => setTemaAtivo(tema.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                    : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tema.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Lado a Lado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Candidato A (Lula) */}
        <div className="rounded-2xl border border-red-100 dark:border-red-950/40 bg-white dark:bg-zinc-900 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-sm font-bold text-red-600 dark:text-red-400">
                {candA.nome_urna} ({candA.numero})
              </span>
              <span className="text-xs text-zinc-400">Pág. {propA?.pagina_documento} do TSE</span>
            </div>

            <h4 className="mt-4 text-base font-semibold text-zinc-900 dark:text-white">
              {propA?.titulo}
            </h4>

            {/* Bullets resumidos */}
            <ul className="mt-3 space-y-2.5 text-xs text-zinc-600 dark:text-zinc-300">
              {propA?.resumo_ia.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <button
              onClick={() => toggleIntegral(candA.id)}
              className="flex items-center justify-between w-full text-xs font-medium text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
            >
              <span>{mostrarTextoIntegral[candA.id] ? 'Recolher trecho' : 'Ver trecho oficial do plano'}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mostrarTextoIntegral[candA.id] ? 'rotate-180' : ''
                }`}
              />
            </button>

            {mostrarTextoIntegral[candA.id] && (
              <div className="mt-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 p-3 text-xs italic text-zinc-600 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-800">
                "{propA?.texto_oficial}"
              </div>
            )}

            <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-400">
              <span>{propA?.fonte_documento}</span>
              <a
                href={propA?.link_plano_tse}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-red-600 dark:text-red-400 hover:underline"
              >
                Abrir TSE <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Candidato B */}
        <div className="rounded-2xl border border-emerald-100 dark:border-emerald-900/40 bg-white dark:bg-zinc-900 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                {candB.nome_urna} ({candB.numero})
              </span>
              <span className="text-xs text-zinc-400">Pág. {propB?.pagina_documento} do TSE</span>
            </div>

            <h4 className="mt-4 text-base font-semibold text-zinc-900 dark:text-white">
              {propB?.titulo}
            </h4>

            {/* Bullets resumidos */}
            <ul className="mt-3 space-y-2.5 text-xs text-zinc-600 dark:text-zinc-300">
              {propB?.resumo_ia.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <button
              onClick={() => toggleIntegral(candB.id)}
              className="flex items-center justify-between w-full text-xs font-medium text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
            >
              <span>{mostrarTextoIntegral[candB.id] ? 'Recolher trecho' : 'Ver trecho oficial do plano'}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mostrarTextoIntegral[candB.id] ? 'rotate-180' : ''
                }`}
              />
            </button>

            {mostrarTextoIntegral[candB.id] && (
              <div className="mt-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 p-3 text-xs italic text-zinc-600 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-800">
                "{propB?.texto_oficial}"
              </div>
            )}

            <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-400">
              <span>{propB?.fonte_documento}</span>
              <a
                href={propB?.link_plano_tse}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Abrir TSE <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
  { id: 'economia', label: 'Dinheiro e Emprego', icon: DollarSign },
  { id: 'saude', label: 'Saúde e Hospitais', icon: HeartPulse },
  { id: 'educacao', label: 'Escolas e Jovens', icon: GraduationCap },
  { id: 'seguranca', label: 'Segurança e Polícia', icon: Shield },
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
    <section className="my-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40 p-5 sm:p-7 md:p-8">
      {/* Cabeçalho do Comparador */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
              Promessas de Campanha
            </span>
          </div>
          <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            O que cada um quer fazer no governo
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Resumo em palavras fáceis direto dos documentos entregues pelos candidatos ao TSE.
          </p>
        </div>

        {/* Seletor de Temas (Grid responsivo) */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2" role="tablist" aria-label="Temas das propostas">
          {TEMAS.map(tema => {
            const Icon = tema.icon;
            const isSelected = temaAtivo === tema.id;
            return (
              <button
                key={tema.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setTemaAtivo(tema.id)}
                className={`flex items-center justify-center sm:justify-start gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer text-center sm:text-left ${
                  isSelected
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs font-bold'
                    : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{tema.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Lado a Lado (Bordas e Marcadores 100% Neutros) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* Candidato A (Lula) */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-sm font-bold text-red-600 dark:text-red-400">
                {candA.nome_urna} ({candA.numero})
              </span>
              <span className="text-xs text-zinc-400">Pág. {propA?.pagina_documento} do plano oficial</span>
            </div>

            <h4 className="mt-3 text-base sm:text-lg font-bold text-zinc-900 dark:text-white leading-snug">
              {propA?.titulo}
            </h4>

            {/* Bullets com marcadores neutros */}
            <ul className="mt-3.5 space-y-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
              {propA?.resumo_ia.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-500 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <button
              onClick={() => toggleIntegral(candA.id)}
              aria-expanded={!!mostrarTextoIntegral[candA.id]}
              className="flex items-center justify-between w-full text-xs font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 cursor-pointer py-1.5"
            >
              <span>{mostrarTextoIntegral[candA.id] ? 'Fechar trecho oficial' : 'Ler trecho oficial registrado'}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mostrarTextoIntegral[candA.id] ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {mostrarTextoIntegral[candA.id] && (
              <div className="mt-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 p-3.5 text-xs italic text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 leading-relaxed">
                "{propA?.texto_oficial}"
              </div>
            )}

            <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-400">
              <span>{propA?.fonte_documento}</span>
              <a
                href={propA?.link_plano_tse}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 font-medium hover:text-zinc-900 dark:hover:text-white hover:underline"
              >
                Abrir no TSE <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Candidato B (Flávio Bolsonaro) */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-sm font-bold text-amber-700 dark:text-amber-400">
                {candB.nome_urna} ({candB.numero})
              </span>
              <span className="text-xs text-zinc-400">Pág. {propB?.pagina_documento} do plano oficial</span>
            </div>

            <h4 className="mt-3 text-base sm:text-lg font-bold text-zinc-900 dark:text-white leading-snug">
              {propB?.titulo}
            </h4>

            {/* Bullets com marcadores neutros */}
            <ul className="mt-3.5 space-y-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
              {propB?.resumo_ia.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-500 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <button
              onClick={() => toggleIntegral(candB.id)}
              aria-expanded={!!mostrarTextoIntegral[candB.id]}
              className="flex items-center justify-between w-full text-xs font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 cursor-pointer py-1.5"
            >
              <span>{mostrarTextoIntegral[candB.id] ? 'Fechar trecho oficial' : 'Ler trecho oficial registrado'}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mostrarTextoIntegral[candB.id] ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {mostrarTextoIntegral[candB.id] && (
              <div className="mt-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 p-3.5 text-xs italic text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 leading-relaxed">
                "{propB?.texto_oficial}"
              </div>
            )}

            <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-400">
              <span>{propB?.fonte_documento}</span>
              <a
                href={propB?.link_plano_tse}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 font-medium hover:text-zinc-900 dark:hover:text-white hover:underline"
              >
                Abrir no Senado <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

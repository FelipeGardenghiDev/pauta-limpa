'use client';

import React from 'react';
import { Award, Calendar, FileText, Briefcase } from 'lucide-react';

interface Candidate {
  id: string;
  nome_completo: string;
  nome_urna: string;
  numero: string;
  partido: string;
  coligacao: string;
  vice: string;
  foto: string;
  cor_tema: string;
  historico_resumo: string;
  kpis: {
    anos_vida_publica: number;
    projetos_apresentados: number;
    leis_aprovadas_autor_relator: number;
    cargo_atual: string;
  };
}

interface CandidateCardsProps {
  candidatos: Candidate[];
}

export default function CandidateCards({ candidatos }: CandidateCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 my-8">
      {candidatos.map((candidato, index) => {
        const isFirst = index === 0; // Lula (Azul Índigo) vs Flávio Bolsonaro (Âmbar)
        return (
          <div
            key={candidato.id}
            className={`relative rounded-3xl border bg-white dark:bg-zinc-900 p-5 sm:p-7 shadow-xs transition hover:shadow-md flex flex-col justify-between ${
              isFirst ? 'border-blue-200 dark:border-blue-900/50' : 'border-amber-200 dark:border-amber-900/50'
            }`}
          >
            <div>
              {/* Topo: Foto, Nome de Urna e Número */}
              <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 shrink-0 shadow-xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={candidato.foto}
                      alt={`Foto oficial de ${candidato.nome_urna}`}
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>

                  <div>
                    <span
                      className={`inline-block px-3 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase ${
                        isFirst
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {candidato.partido.split(' - ')[0]}
                    </span>
                    <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                      {candidato.nome_urna}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {candidato.nome_completo}
                    </p>
                  </div>
                </div>

                <div
                  className={`flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl text-2xl sm:text-3xl font-black text-white shadow-xs shrink-0 ${
                    isFirst ? 'bg-blue-600' : 'bg-amber-600'
                  }`}
                  aria-label={`Número na urna: ${candidato.numero}`}
                >
                  {candidato.numero}
                </div>
              </div>

              {/* Informações Básicas da Chapa */}
              <div className="mt-5 space-y-1.5 border-t border-zinc-100 dark:border-zinc-800 pt-4 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                <p>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">Vice na chapa:</span>{' '}
                  <strong className={isFirst ? 'text-blue-700 dark:text-blue-400 font-semibold' : 'text-amber-700 dark:text-amber-400 font-semibold'}>
                    {candidato.vice}
                  </strong>
                </p>
                <p>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">Coligação:</span>{' '}
                  {candidato.coligacao}
                </p>
                <p className="pt-1.5 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {candidato.historico_resumo}
                </p>
              </div>
            </div>

            {/* Indicadores de BI em Linguagem Simples */}
            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
                Histórico na Política (Fontes Oficiais)
              </h4>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/60 p-3 border border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                    <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Tempo na política</span>
                  </div>
                  <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-white">
                    {candidato.kpis.anos_vida_publica} <span className="text-xs font-normal text-zinc-500">anos</span>
                  </p>
                </div>

                <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/60 p-3 border border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                    <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Projetos e Atos</span>
                  </div>
                  <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-white">
                    {candidato.kpis.projetos_apresentados}
                  </p>
                </div>

                <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/60 p-3 border border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                    <Award className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Leis Aprovadas</span>
                  </div>
                  <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-white">
                    {candidato.kpis.leis_aprovadas_autor_relator}
                  </p>
                </div>

                <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/60 p-3 border border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                    <Briefcase className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>O que faz hoje</span>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm font-bold text-zinc-900 dark:text-white truncate" title={candidato.kpis.cargo_atual}>
                    {candidato.kpis.cargo_atual}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

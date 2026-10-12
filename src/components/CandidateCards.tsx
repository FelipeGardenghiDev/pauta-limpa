'use client';

import React from 'react';
import { Award, Calendar, FileText, CheckCircle2 } from 'lucide-react';

interface Candidate {
  id: string;
  nome_completo: string;
  nome_urna: string;
  numero: string;
  partido: string;
  coligacao: string;
  vice: string;
  cor_tema: string;
  historico_resumo: string;
  kpis: {
    anos_vida_publica: number;
    projetos_apresentados: number;
    leis_aprovadas_autor_relator: number;
    frequencia_plenario: string;
  };
}

interface CandidateCardsProps {
  candidatos: Candidate[];
}

export default function CandidateCards({ candidatos }: CandidateCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      {candidatos.map((candidato, index) => {
        const isFirst = index === 0;
        return (
          <div
            key={candidato.id}
            className={`relative rounded-2xl border bg-white dark:bg-zinc-900 p-6 shadow-sm transition hover:shadow-md ${
              isFirst ? 'border-blue-200 dark:border-blue-900/50' : 'border-emerald-200 dark:border-emerald-900/50'
            }`}
          >
            {/* Topo: Número de Urna e Partido */}
            <div className="flex items-start justify-between">
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                    isFirst
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}
                >
                  {candidato.partido.split(' - ')[0]}
                </span>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {candidato.nome_urna}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {candidato.nome_completo}
                </p>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-black text-white shadow-sm ${
                  isFirst ? 'bg-blue-600' : 'bg-emerald-600'
                }`}
              >
                {candidato.numero}
              </div>
            </div>

            {/* Informações Básicas da Chapa */}
            <div className="mt-4 space-y-1.5 border-t border-zinc-100 dark:border-zinc-800 pt-4 text-xs text-zinc-600 dark:text-zinc-300">
              <p>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">Candidato a Vice:</span>{' '}
                {candidato.vice}
              </p>
              <p>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">Coligação:</span>{' '}
                {candidato.coligacao}
              </p>
              <p className="pt-1 text-xs italic text-zinc-500 dark:text-zinc-400">
                "{candidato.historico_resumo}"
              </p>
            </div>

            {/* Indicadores de BI / Trajetória Pública */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
                Trajetória Pública Verificada (Fontes Oficiais)
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/60 p-3 border border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Vida Pública</span>
                  </div>
                  <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-white">
                    {candidato.kpis.anos_vida_publica} <span className="text-xs font-normal text-zinc-500">anos</span>
                  </p>
                </div>

                <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/60 p-3 border border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Projetos de Lei</span>
                  </div>
                  <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-white">
                    {candidato.kpis.projetos_apresentados}
                  </p>
                </div>

                <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/60 p-3 border border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                    <Award className="w-3.5 h-3.5" />
                    <span>Leis Aprovadas</span>
                  </div>
                  <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-white">
                    {candidato.kpis.leis_aprovadas_autor_relator}
                  </p>
                </div>

                <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/60 p-3 border border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Assiduidade</span>
                  </div>
                  <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-white">
                    {candidato.kpis.frequencia_plenario}
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

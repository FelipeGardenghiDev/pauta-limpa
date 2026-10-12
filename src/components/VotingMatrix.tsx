'use client';

import React from 'react';
import { ExternalLink, Scale, BookOpen } from 'lucide-react';

interface VotacaoItem {
  materia: string;
  tema: string;
  descricao: string;
  data: string;
  fonte_oficial: string;
  candidato_1: {
    posicionamento: string;
    tipo_badge: string;
    argumentacao: string;
  };
  candidato_2: {
    posicionamento: string;
    tipo_badge: string;
    argumentacao: string;
  };
}

interface VotingMatrixProps {
  votacoes: VotacaoItem[];
  nomeCand1: string;
  nomeCand2: string;
}

export default function VotingMatrix({ votacoes, nomeCand1, nomeCand2 }: VotingMatrixProps) {
  const getBadgeStyle = (tipo: string) => {
    switch (tipo) {
      case 'favoravel':
        return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700';
      case 'contrario':
        return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700';
      case 'veto':
        return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700';
      default:
        return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700';
    }
  };

  return (
    <section className="my-12">
      {/* Cabeçalho da Seção */}
      <div className="flex items-center gap-2 mb-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs">
          <Scale className="w-3.5 h-3.5" aria-hidden="true" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
          Atos e Votações em Reformas Estruturais
        </span>
      </div>

      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
        Posicionamentos em Matérias Nacionais Decisivas
      </h3>
      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-8 max-w-3xl leading-relaxed">
        Análise factual dos votos parlamentares e atos do Executivo em 5 das principais reformas e leis aprovadas recentemente no Congresso Nacional, acompanhados das justificativas técnicas e políticas apresentadas por cada lado.
      </p>

      {/* Lista de Matérias Comparativas */}
      <div className="space-y-6">
        {votacoes.map((item, index) => (
          <article
            key={index}
            className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-7 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition"
          >
            {/* Topo do Card da Matéria */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold tracking-wide uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 mb-1.5">
                  {item.tema}
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                  {item.materia}
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-4xl">
                  {item.descricao}
                </p>
              </div>

              <div className="shrink-0 pt-1">
                <a
                  href={item.fonte_oficial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition"
                  aria-label={`Ver tramitação oficial de ${item.materia}`}
                >
                  <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Ata Oficial do Congresso</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Grid Comparativo dos Dois Candidatos */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Coluna Lula */}
              <div className="rounded-2xl bg-zinc-50/70 dark:bg-zinc-800/40 p-4 sm:p-5 border border-zinc-100 dark:border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-zinc-200/60 dark:border-zinc-700/60">
                    <span className="text-sm font-bold text-red-600 dark:text-red-400">
                      {nomeCand1}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getBadgeStyle(
                        item.candidato_1.tipo_badge
                      )}`}
                    >
                      {item.candidato_1.posicionamento}
                    </span>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {item.candidato_1.argumentacao}
                  </p>
                </div>
              </div>

              {/* Coluna Flávio Bolsonaro */}
              <div className="rounded-2xl bg-zinc-50/70 dark:bg-zinc-800/40 p-4 sm:p-5 border border-zinc-100 dark:border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-zinc-200/60 dark:border-zinc-700/60">
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      {nomeCand2}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getBadgeStyle(
                        item.candidato_2.tipo_badge
                      )}`}
                    >
                      {item.candidato_2.posicionamento}
                    </span>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {item.candidato_2.argumentacao}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

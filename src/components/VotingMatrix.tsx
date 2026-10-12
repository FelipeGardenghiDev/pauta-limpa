'use client';

import React from 'react';
import { CheckCircle2, XCircle, MinusCircle, ExternalLink, Scale } from 'lucide-react';

interface VotacaoItem {
  materia: string;
  descricao: string;
  data: string;
  fonte_oficial_camara: string;
  candidato_1: {
    voto: string;
    detalhe: string;
  };
  candidato_2: {
    voto: string;
    detalhe: string;
  };
}

interface VotingMatrixProps {
  votacoes: VotacaoItem[];
  nomeCand1: string;
  nomeCand2: string;
}

export default function VotingMatrix({ votacoes, nomeCand1, nomeCand2 }: VotingMatrixProps) {
  const renderBadge = (voto: string) => {
    switch (voto.toUpperCase()) {
      case 'SIM':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" /> A favor (SIM)
          </span>
        );
      case 'NÃO':
      case 'NAO':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
            <XCircle className="w-3.5 h-3.5" /> Contra (NÃO)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            <MinusCircle className="w-3.5 h-3.5" /> {voto}
          </span>
        );
    }
  };

  return (
    <section className="my-10">
      <div className="flex items-center gap-2 mb-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 text-xs">
          <Scale className="w-3.5 h-3.5" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Histórico Legislativo Verificado
        </span>
      </div>
      <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
        Matriz de Votações em Reformas Decisivas
      </h3>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
        Posicionamento nominal registrado nas atas oficiais do Congresso Nacional (Câmara dos Deputados e Senado Federal).
      </p>

      <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300">
            <tr>
              <th className="py-4 px-4 font-semibold w-1/3">Matéria / Projeto de Lei</th>
              <th className="py-4 px-4 font-semibold w-1/3 text-blue-600 dark:text-blue-400">
                {nomeCand1}
              </th>
              <th className="py-4 px-4 font-semibold w-1/3 text-emerald-600 dark:text-emerald-400">
                {nomeCand2}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
            {votacoes.map((item, index) => (
              <tr key={index} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40 transition">
                {/* Coluna da Proposição */}
                <td className="py-4 px-4 align-top">
                  <div className="font-bold text-zinc-900 dark:text-white text-sm">
                    {item.materia}
                  </div>
                  <div className="text-zinc-500 dark:text-zinc-400 mt-1">
                    {item.descricao}
                  </div>
                  <div className="mt-2">
                    <a
                      href={item.fonte_oficial_camara}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                    >
                      Ver Ata Oficial na Câmara <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </td>

                {/* Coluna Candidato 1 */}
                <td className="py-4 px-4 align-top border-l border-zinc-100 dark:border-zinc-800">
                  <div>{renderBadge(item.candidato_1.voto)}</div>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {item.candidato_1.detalhe}
                  </p>
                </td>

                {/* Coluna Candidato 2 */}
                <td className="py-4 px-4 align-top border-l border-zinc-100 dark:border-zinc-800">
                  <div>{renderBadge(item.candidato_2.voto)}</div>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {item.candidato_2.detalhe}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

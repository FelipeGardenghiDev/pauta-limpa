'use client';

import React from 'react';
import { AlertTriangle, CheckCircle, HelpCircle, ShieldAlert } from 'lucide-react';

interface FatoItem {
  titulo: string;
  detalhe: string;
}

interface AlertaItem {
  titulo: string;
  detalhe: string;
}

interface ItemFatoRotulo {
  candidato_id: string;
  nome_urna: string;
  pergunta_mito: string;
  o_que_os_fatos_mostram: FatoItem[];
  alertas_e_riscos_democraticos: AlertaItem[];
}

interface FactsAndLabelsProps {
  itens: ItemFatoRotulo[];
}

export default function FactsAndLabels({ itens }: FactsAndLabelsProps) {
  return (
    <section className="my-12">
      {/* Cabeçalho da Seção */}
      <div className="flex items-center gap-2 mb-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs">
          <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
          Além da Propaganda Eleitoral
        </span>
      </div>

      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
        Fatos contra Mitos: Economia e Democracia
      </h3>
      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-8 max-w-3xl leading-relaxed">
        Comparamos as ideias populares e discursos de campanha com os dados históricos reais, mostrando o que cada candidato já fez na prática e os alertas institucionais que pesam sobre cada lado.
      </p>

      {/* Grid Comparativo dos Dois Lados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {itens.map((item, index) => {
          const isLula = item.candidato_id === 'lula';
          return (
            <article
              key={item.candidato_id}
              className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-7 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Cabeçalho com o Mito / Rótulo Comum */}
                <div className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-lg sm:text-xl font-bold ${
                        isLula ? 'text-red-600 dark:text-red-400' : 'text-amber-700 dark:text-amber-400'
                      }`}
                    >
                      {item.nome_urna}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      Rótulo vs Realidade
                    </span>
                  </div>

                  <h4 className="mt-3 text-base sm:text-lg font-bold text-zinc-900 dark:text-white leading-snug">
                    "{item.pergunta_mito}"
                  </h4>
                </div>

                {/* Bloco 1: O Que os Fatos Históricos Provam */}
                <div className="mt-5">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-4 h-4 text-zinc-600 dark:text-zinc-400 shrink-0" aria-hidden="true" />
                    <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                      O que os dados e as leis comprovam:
                    </h5>
                  </div>

                  <div className="space-y-3">
                    {item.o_que_os_fatos_mostram.map((fato, fIdx) => (
                      <div
                        key={fIdx}
                        className="rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 p-4 border border-zinc-100 dark:border-zinc-800/80"
                      >
                        <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                          {fato.titulo}
                        </p>
                        <p className="mt-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {fato.detalhe}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bloco 2: Alertas Institucionais e Riscos à Democracia */}
                <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldAlert className="w-4 h-4 text-zinc-600 dark:text-zinc-400 shrink-0" aria-hidden="true" />
                    <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                      Alertas e tensões democráticas apontados por críticos:
                    </h5>
                  </div>

                  <div className="space-y-3">
                    {item.alertas_e_riscos_democraticos.map((alerta, aIdx) => (
                      <div
                        key={aIdx}
                        className="rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 p-4 border border-zinc-100 dark:border-zinc-800/80"
                      >
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                          <AlertTriangle className="w-3.5 h-3.5 text-zinc-500 shrink-0" aria-hidden="true" />
                          <span>{alerta.titulo}</span>
                        </div>
                        <p className="mt-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {alerta.detalhe}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

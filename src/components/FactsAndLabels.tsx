'use client';

import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, HelpCircle, ShieldAlert } from 'lucide-react';

interface FatoItem {
  titulo: string;
  detalhe: string;
}

interface AlertaItem {
  titulo: string;
  detalhe: string;
}

interface DetalhesCandidato {
  pergunta_mito: string;
  fatos: FatoItem[];
  alertas: AlertaItem[];
}

interface TemaBoato {
  id: string;
  categoria_label: string;
  descricao_curta: string;
  lula: DetalhesCandidato;
  flavio: DetalhesCandidato;
}

interface FactsAndLabelsProps {
  itens: TemaBoato[];
}

export default function FactsAndLabels({ itens }: FactsAndLabelsProps) {
  const [temaSelecionadoId, setTemaSelecionadoId] = useState(itens[0]?.id || 'negocios-social');

  const temaAtual = itens.find(t => t.id === temaSelecionadoId) || itens[0];

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
        Fatos contra Boatos: Economia e Democracia
      </h3>
      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-6 max-w-3xl leading-relaxed">
        Comparamos as ideias populares e discursos de campanha com os dados históricos reais, mostrando o que cada candidato já fez na prática e os alertas institucionais que pesam sobre cada lado.
      </p>

      {/* Seletor dos 4 Temas de Boatos e Alertas (Sem barra de rolagem horizontal) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-8" role="tablist" aria-label="Temas de combate a boatos">
        {itens.map(tema => {
          const isAtivo = tema.id === temaSelecionadoId;
          return (
            <button
              key={tema.id}
              role="tab"
              aria-selected={isAtivo}
              onClick={() => setTemaSelecionadoId(tema.id)}
              className={`p-3.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                isAtivo
                  ? 'border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900 shadow-xs'
                  : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <span className="text-xs sm:text-sm font-bold block mb-1">
                {tema.categoria_label}
              </span>
              <span
                className={`text-[11px] leading-tight block ${
                  isAtivo ? 'text-zinc-300 dark:text-zinc-600' : 'text-zinc-500 dark:text-zinc-400'
                }`}
              >
                {tema.descricao_curta}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid Comparativo dos Dois Lados para o Tema Selecionado */}
      {temaAtual && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LADO LULA */}
          <article className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-7 shadow-xs flex flex-col justify-between">
            <div>
              <div className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-lg sm:text-xl font-bold text-red-600 dark:text-red-400">
                    Lula
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    Boato vs Fato
                  </span>
                </div>

                <h4 className="mt-3 text-base sm:text-lg font-bold text-zinc-900 dark:text-white leading-snug">
                  "{temaAtual.lula.pergunta_mito}"
                </h4>
              </div>

              {/* Fatos Comprovados */}
              <div className="mt-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-4 h-4 text-zinc-600 dark:text-zinc-400 shrink-0" aria-hidden="true" />
                  <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                    O que os dados e as leis comprovam:
                  </h5>
                </div>

                <div className="space-y-3">
                  {temaAtual.lula.fatos.map((fato, fIdx) => (
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

              {/* Alertas Institucionais */}
              <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldAlert className="w-4 h-4 text-zinc-700 dark:text-zinc-300 shrink-0" aria-hidden="true" />
                  <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                    Alertas institucionais e pontos de atenção (críticos e especialistas):
                  </h5>
                </div>

                <div className="space-y-3">
                  {temaAtual.lula.alertas.map((alerta, aIdx) => (
                    <div
                      key={aIdx}
                      className="rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 p-4 border border-zinc-200 dark:border-zinc-700/80"
                    >
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                        <AlertTriangle className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 shrink-0" aria-hidden="true" />
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

          {/* LADO FLÁVIO BOLSONARO */}
          <article className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-7 shadow-xs flex flex-col justify-between">
            <div>
              <div className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-lg sm:text-xl font-bold text-amber-700 dark:text-amber-400">
                    Flávio Bolsonaro
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    Boato vs Fato
                  </span>
                </div>

                <h4 className="mt-3 text-base sm:text-lg font-bold text-zinc-900 dark:text-white leading-snug">
                  "{temaAtual.flavio.pergunta_mito}"
                </h4>
              </div>

              {/* Fatos Comprovados */}
              <div className="mt-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-4 h-4 text-zinc-600 dark:text-zinc-400 shrink-0" aria-hidden="true" />
                  <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                    O que os dados e as leis comprovam:
                  </h5>
                </div>

                <div className="space-y-3">
                  {temaAtual.flavio.fatos.map((fato, fIdx) => (
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

              {/* Alertas Institucionais */}
              <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldAlert className="w-4 h-4 text-zinc-700 dark:text-zinc-300 shrink-0" aria-hidden="true" />
                  <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                    Alertas institucionais e pontos de atenção (críticos e especialistas):
                  </h5>
                </div>

                <div className="space-y-3">
                  {temaAtual.flavio.alertas.map((alerta, aIdx) => (
                    <div
                      key={aIdx}
                      className="rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 p-4 border border-zinc-200 dark:border-zinc-700/80"
                    >
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                        <AlertTriangle className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 shrink-0" aria-hidden="true" />
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
        </div>
      )}
    </section>
  );
}

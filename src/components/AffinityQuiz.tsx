'use client';

import React, { useState } from 'react';
import { Target, RotateCcw, Check, Sparkles } from 'lucide-react';

interface OpcaoQuiz {
  texto: string;
  peso_candidato_1: number;
  peso_candidato_2: number;
}

interface PerguntaQuiz {
  id: number;
  pergunta: string;
  opcoes: OpcaoQuiz[];
}

interface AffinityQuizProps {
  perguntas: PerguntaQuiz[];
  nomeCand1: string;
  nomeCand2: string;
}

export default function AffinityQuiz({ perguntas, nomeCand1, nomeCand2 }: AffinityQuizProps) {
  const [respostas, setRespostas] = useState<Record<number, number>>({});
  const [quizFinalizado, setQuizFinalizado] = useState(false);

  const totalPerguntas = perguntas.length;
  const respondidasCount = Object.keys(respostas).length;
  const progresso = Math.round((respondidasCount / totalPerguntas) * 100);

  const responder = (perguntaId: number, opcaoIndex: number) => {
    const novasRespostas = { ...respostas, [perguntaId]: opcaoIndex };
    setRespostas(novasRespostas);

    if (Object.keys(novasRespostas).length === totalPerguntas) {
      setQuizFinalizado(true);
    }
  };

  const reiniciarQuiz = () => {
    setRespostas({});
    setQuizFinalizado(false);
  };

  // Calcular pontuação de afinidade
  let pontosCand1 = 0;
  let pontosCand2 = 0;

  perguntas.forEach(p => {
    const idx = respostas[p.id];
    if (idx !== undefined) {
      pontosCand1 += p.opcoes[idx].peso_candidato_1;
      pontosCand2 += p.opcoes[idx].peso_candidato_2;
    }
  });

  const totalPontos = pontosCand1 + pontosCand2;
  const percCand1 = totalPontos > 0 ? Math.round((pontosCand1 / totalPontos) * 100) : 50;
  const percCand2 = totalPontos > 0 ? Math.round((pontosCand2 / totalPontos) * 100) : 50;

  return (
    <section className="my-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/40 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-xs">
              <Target className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Ferramenta Interativa de BI
            </span>
          </div>
          <h3 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Quiz de Afinidade Cívica
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Responda 5 questões objetivas e compare sua visão com as diretrizes oficiais de cada chapa.
          </p>
        </div>

        {/* Barra de Progresso */}
        <div className="flex items-center gap-3">
          <div className="w-32 bg-zinc-200 dark:bg-zinc-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progresso}%` }}
            />
          </div>
          <span className="text-xs font-medium text-zinc-500">
            {respondidasCount}/{totalPerguntas}
          </span>
        </div>
      </div>

      {/* Resultado se finalizado */}
      {quizFinalizado && (
        <div className="mb-8 rounded-2xl bg-white dark:bg-zinc-900 border border-emerald-200 dark:border-emerald-800/50 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Seu Resultado de Afinidade de Propostas:</span>
            </div>
            <button
              onClick={reiniciarQuiz}
              className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Refazer
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-red-600 dark:text-red-400">{nomeCand1}</span>
                <span className="text-red-600 dark:text-red-400">{percCand1}%</span>
              </div>
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-red-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${percCand1}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-emerald-600 dark:text-emerald-400">{nomeCand2}</span>
                <span className="text-emerald-600 dark:text-emerald-400">{percCand2}%</span>
              </div>
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-emerald-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${percCand2}%` }}
                />
              </div>
            </div>
          </div>

          <p className="mt-4 text-[11px] text-zinc-400 italic">
            * Cálculo matemático estritamente baseado no alinhamento das suas respostas com os pontos programáticos registrados no TSE.
          </p>
        </div>
      )}

      {/* Lista de Perguntas */}
      <div className="space-y-6">
        {perguntas.map((p, idx) => {
          const respostaAtual = respostas[p.id];
          return (
            <div
              key={p.id}
              className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 shadow-xs"
            >
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">
                <span className="text-zinc-400 mr-2">{idx + 1}.</span>
                {p.pergunta}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {p.opcoes.map((opcao, oIdx) => {
                  const selecionada = respostaAtual === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => responder(p.id, oIdx)}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border text-left text-xs transition cursor-pointer ${
                        selecionada
                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-zinc-900 dark:text-white font-medium shadow-xs'
                          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-300'
                      }`}
                    >
                      <div
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[10px] ${
                          selecionada
                            ? 'border-emerald-600 bg-emerald-600 text-white'
                            : 'border-zinc-300 dark:border-zinc-600'
                        }`}
                      >
                        {selecionada && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{opcao.texto}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

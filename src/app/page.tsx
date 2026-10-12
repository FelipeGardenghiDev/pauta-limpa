import React from 'react';
import Navbar from '@/components/Navbar';
import CandidateCards from '@/components/CandidateCards';
import ProposalComparator from '@/components/ProposalComparator';
import VotingMatrix from '@/components/VotingMatrix';
import RadarPriorityChart from '@/components/RadarPriorityChart';
import AffinityQuiz from '@/components/AffinityQuiz';
import Footer from '@/components/Footer';

import eleicoesData from '@/data/candidatos.json';

export default function HomePage() {
  const { eleicao, candidatos, votacoes_historicas, quiz_afinidade } = eleicoesData;
  const candA = candidatos[0];
  const candB = candidatos[1];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50 dark:bg-zinc-950">
      <Navbar
        ano={eleicao.ano}
        turno={eleicao.turno}
        dataAtualizacao={eleicao.data_atualizacao}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {/* Banner Hero Cívico */}
        <section className="text-center py-8 md:py-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-4">
            <span>Pauta Limpa 2026 • Dados Primários da Câmara e do TSE</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            Compare os Candidatos com Fatos, Não Opiniões.
          </h1>

          <p className="mt-4 text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            O <strong>Pauta Limpa</strong> cruza os <strong>planos de governo registrados no TSE</strong> com o histórico real de <strong>votações nominais no Congresso Nacional</strong>. Sem ruído, sem viés político e 100% aberto.
          </p>

          {/* Navegação Rápida entre Seções */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs">
            <a
              href="#propostas"
              className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 font-medium shadow-2xs"
            >
              📋 Planos de Governo
            </a>
            <a
              href="#votacoes"
              className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 font-medium shadow-2xs"
            >
              ⚖️ Votações Históricas
            </a>
            <a
              href="#radar"
              className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 font-medium shadow-2xs"
            >
              📊 Radar de Prioridades
            </a>
            <a
              href="#quiz"
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 font-medium shadow-2xs"
            >
              🎯 Quiz de Afinidade
            </a>
          </div>
        </section>

        {/* 1. Cards de Perfil e KPIs dos Candidatos */}
        <section id="candidatos">
          <CandidateCards candidatos={candidatos} />
        </section>

        {/* 2. Comparativo de Propostas por Tema */}
        <section id="propostas">
          <ProposalComparator candidatos={candidatos} />
        </section>

        {/* 3. Matriz de Votações Históricas (Semáforo de BI) */}
        <section id="votacoes">
          <VotingMatrix
            votacoes={votacoes_historicas}
            nomeCand1={candA.nome_urna}
            nomeCand2={candB.nome_urna}
          />
        </section>

        {/* 4. Gráfico Radar de BI (Recharts) */}
        <section id="radar">
          <RadarPriorityChart candidatos={candidatos} />
        </section>

        {/* 5. Quiz de Afinidade Cívica */}
        <section id="quiz">
          <AffinityQuiz
            perguntas={quiz_afinidade}
            nomeCand1={candA.nome_urna}
            nomeCand2={candB.nome_urna}
          />
        </section>
      </main>

      <Footer fontes={eleicao.fontes_oficiais} />
    </div>
  );
}

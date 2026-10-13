import React from 'react';
import Navbar from '@/components/Navbar';
import CandidateCards from '@/components/CandidateCards';
import ProposalComparator from '@/components/ProposalComparator';
import FactsAndLabels from '@/components/FactsAndLabels';
import VotingMatrix from '@/components/VotingMatrix';
import RadarPriorityChart from '@/components/RadarPriorityChart';
import Footer from '@/components/Footer';

import eleicoesData from '@/data/candidatos.json';

export default function HomePage() {
  const { eleicao, candidatos, votacoes_historicas, fatos_contra_rotulos } = eleicoesData;
  const candA = candidatos[0];
  const candB = candidatos[1];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50 dark:bg-zinc-950">
      <Navbar
        ano={eleicao.ano}
        turno={eleicao.turno}
        dataAtualizacao={eleicao.data_atualizacao}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Banner Hero Cívico */}
        <section className="text-center py-8 md:py-12 max-w-3xl mx-auto" aria-labelledby="hero-title">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-4">
            <span>Pauta Limpa 2026 • Dados Primários da Câmara, Senado e TSE</span>
          </div>

          <h1 id="hero-title" className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            Compare os Candidatos com Fatos, Não Opiniões.
          </h1>

          <p className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            O <strong>Pauta Limpa</strong> cruza as diretrizes registradas no <strong>TSE</strong> com os atos e votações no <strong>Congresso Nacional</strong>. Código 100% aberto e transparente.
          </p>

          {/* Navegação Rápida entre Seções */}
          <nav className="mt-6 flex flex-wrap justify-center gap-2.5 text-xs" aria-label="Navegação rápida">
            <a
              href="#candidatos"
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 font-medium shadow-2xs transition"
            >
              👥 Perfis e Trajetórias
            </a>
            <a
              href="#propostas"
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 font-medium shadow-2xs transition"
            >
              📋 Diretrizes e Propostas
            </a>
            <a
              href="#fatos-mitos"
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 font-medium shadow-2xs transition"
            >
              💡 Fatos vs Mitos
            </a>
            <a
              href="#votacoes"
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 font-medium shadow-2xs transition"
            >
              ⚖️ Atos e Votações
            </a>
            <a
              href="#radar"
              className="px-3.5 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 font-medium shadow-2xs transition"
            >
              📊 Radar de Foco
            </a>
          </nav>
        </section>

        {/* 1. Cards de Perfil e KPIs dos Candidatos */}
        <section id="candidatos" aria-label="Perfis dos Candidatos">
          <CandidateCards candidatos={candidatos} />
        </section>

        {/* 2. Comparativo de Propostas por Tema */}
        <section id="propostas" aria-label="Comparativo de Propostas">
          <ProposalComparator candidatos={candidatos} />
        </section>

        {/* 3. Fatos contra Mitos: Economia e Democracia */}
        <section id="fatos-mitos" aria-label="Fatos contra Mitos e Alertas Democráticos">
          <FactsAndLabels itens={fatos_contra_rotulos} />
        </section>

        {/* 4. Matriz de Votações Históricas */}
        <section id="votacoes" aria-label="Votações e Reformas Estruturais">
          <VotingMatrix
            votacoes={votacoes_historicas}
            nomeCand1={candA.nome_urna}
            nomeCand2={candB.nome_urna}
          />
        </section>

        {/* 5. Gráfico Radar de BI */}
        <section id="radar" aria-label="Radar de Prioridades de Governo">
          <RadarPriorityChart candidatos={candidatos} />
        </section>
      </main>

      <Footer fontes={eleicao.fontes_oficiais} />
    </div>
  );
}

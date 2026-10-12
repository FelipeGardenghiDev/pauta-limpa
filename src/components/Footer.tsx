'use client';

import React from 'react';
import { ExternalLink, Database, GitBranch } from 'lucide-react';

interface FonteOficial {
  nome: string;
  url: string;
}

interface FooterProps {
  fontes: FonteOficial[];
}

export default function Footer({ fontes }: FooterProps) {
  return (
    <footer className="mt-20 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-zinc-500 dark:text-zinc-400">
          {/* Coluna 1: Missão e Neutralidade */}
          <div>
            <h5 className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px] mb-3">
              Compromisso de Isenção
            </h5>
            <p className="leading-relaxed">
              Plataforma cívica e de código aberto criada para empoderar o cidadão brasileiro com dados primários, sem filtros opinativos, anúncios ou patrocínio partidário.
            </p>
            <p className="mt-2 text-[11px] text-zinc-400">
              Todos os resumos preservam a citação exata dos documentos originais do TSE e dos registros de votações do Congresso Nacional.
            </p>
          </div>

          {/* Coluna 2: Fontes Governamentais */}
          <div>
            <h5 className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px] mb-3 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-blue-500" /> Fontes Públicas Utilizadas
            </h5>
            <ul className="space-y-2">
              {fontes.map((fonte, idx) => (
                <li key={idx}>
                  <a
                    href={fonte.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-white transition"
                  >
                    <span>{fonte.nome}</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Código Aberto e Hospedagem */}
          <div>
            <h5 className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px] mb-3 flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-emerald-500" /> Infraestrutura 100% em Nuvem
            </h5>
            <p className="leading-relaxed">
              Hospedado na Vercel com pipeline de automação executado diariamente via GitHub Actions. Sem servidores terceirizados ou armazenamento de dados privados do usuário.
            </p>
            <div className="mt-3">
              <span className="inline-block px-2.5 py-1 rounded-md bg-zinc-200 dark:bg-zinc-800 text-[11px] font-mono text-zinc-700 dark:text-zinc-300">
                Licença MIT • Código Aberto
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-center text-[11px] text-zinc-400">
          Eleições Gerais Brasil 2026 • Ferramenta Cívica de Livre Acesso
        </div>
      </div>
    </footer>
  );
}

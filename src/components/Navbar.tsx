'use client';

import React from 'react';
import { Landmark, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  ano: number;
  turno: string;
  dataAtualizacao: string;
}

export default function Navbar({ ano, turno, dataAtualizacao }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-base text-zinc-900 dark:text-white">
                Pauta Limpa
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                {ano} • {turno}
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Propostas, histórico de votações e dados oficiais do Brasil
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Última auditoria oficial: <strong className="text-zinc-700 dark:text-zinc-300">{dataAtualizacao}</strong></span>
        </div>
      </div>
    </header>
  );
}

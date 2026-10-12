'use client';

import React, { useEffect, useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { PieChart } from 'lucide-react';

interface RadarFocoItem {
  eixo: string;
  valor: number;
}

interface Candidate {
  id: string;
  nome_urna: string;
  radar_foco: RadarFocoItem[];
}

interface RadarPriorityChartProps {
  candidatos: Candidate[];
}

export default function RadarPriorityChart({ candidatos }: RadarPriorityChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const candA = candidatos[0];
  const candB = candidatos[1];

  // Mesclar os dados para o formato do Recharts
  const chartData = candA?.radar_foco.map(item => {
    const itemB = candB?.radar_foco.find(b => b.eixo === item.eixo);
    return {
      eixo: item.eixo,
      [candA.nome_urna]: item.valor,
      [candB.nome_urna]: itemB ? itemB.valor : 0,
    };
  }) || [];

  if (!mounted) {
    return (
      <div className="h-80 w-full animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-800" />
    );
  }

  return (
    <section className="my-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 text-xs">
          <PieChart className="w-3.5 h-3.5" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
          Business Intelligence Visual
        </span>
      </div>
      <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
        Radar de Foco Temático das Propostas
      </h3>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
        Intensidade e densidade de proposições por eixo de governo, calculadas a partir da frequência de metas nos planos registrados no TSE.
      </p>

      <div className="h-[360px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid stroke="#e4e4e7" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="eixo"
              tick={{ fill: '#71717a', fontSize: 12, fontWeight: 500 }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#a1a1aa" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181b',
                borderColor: '#27272a',
                borderRadius: '0.75rem',
                color: '#fff',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
            <Radar
              name={candA.nome_urna}
              dataKey={candA.nome_urna}
              stroke="#dc2626"
              fill="#dc2626"
              fillOpacity={0.4}
            />
            <Radar
              name={candB.nome_urna}
              dataKey={candB.nome_urna}
              stroke="#16a34a"
              fill="#16a34a"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800 pt-4">
        <div>
          <span className="font-semibold text-red-600 dark:text-red-400">
            {candA.nome_urna}:
          </span>{' '}
          Maior concentração em Saúde Pública (SUS), Meio Ambiente e Educação Básica (Pé-de-Meia).
        </div>
        <div>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            {candB.nome_urna}:
          </span>{' '}
          Maior concentração em Segurança Pública, Desregulamentação Econômica e Privatizações.
        </div>
      </div>
    </section>
  );
}

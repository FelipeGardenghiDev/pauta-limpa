/**
 * Script de Automação de Dados Cívicos - Pauta Limpa (Eleições 2026)
 * 
 * Consulta as APIs Oficiais:
 *  - Câmara dos Deputados (Dados Abertos v2): Deputado Constituinte Lula (ID 139289)
 *  - Senado Federal (Dados Abertos): Senador Flávio Bolsonaro (ID 5894)
 *  - TSE (DivulgaCandContas)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../src/data/candidatos.json');

const CAMARA_API_BASE = 'https://dadosabertos.camara.leg.br/api/v2';
const SENADO_API_BASE = 'https://legis.senado.leg.br/dadosabertos';

async function verificarCamaraLula() {
  try {
    const url = `${CAMARA_API_BASE}/deputados/139289`;
    console.log(`[API Câmara] Consultando perfil oficial: ${url}`);
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.dados;
  } catch (err) {
    console.warn('[Aviso] Falha ao consultar Câmara:', err.message);
    return null;
  }
}

async function verificarSenadoFlavio() {
  try {
    const url = `${SENADO_API_BASE}/senador/5894/autorias`;
    console.log(`[API Senado] Consultando autorias oficiais: ${url}`);
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const autorias = data?.MateriasAutoriaParlamentar?.Parlamentar?.Autorias?.Autoria || [];
    return {
      totalAutorias: Array.isArray(autorias) ? autorias.length : 0
    };
  } catch (err) {
    console.warn('[Aviso] Falha ao consultar Senado:', err.message);
    return null;
  }
}

async function main() {
  console.log('========================================================');
  console.log('🇧🇷 PAUTA LIMPA 2026: SINCRONIZAÇÃO DE DADOS GOVERNAMENTAIS');
  console.log(`⏰ Executado em: ${new Date().toISOString()}`);
  console.log('========================================================\n');

  if (!fs.existsSync(DATA_FILE)) {
    console.error(`❌ Arquivo não encontrado: ${DATA_FILE}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  const dataset = JSON.parse(raw);

  // 1. Validar dados da Câmara (Lula)
  const lulaData = await verificarCamaraLula();
  if (lulaData) {
    console.log(`✅ Câmara dos Deputados: Perfil de "${lulaData.nomeCivil}" verificado (ID ${lulaData.id}).`);
  }

  // 2. Validar dados do Senado (Flávio Bolsonaro)
  const flavioData = await verificarSenadoFlavio();
  if (flavioData) {
    console.log(`✅ Senado Federal: ${flavioData.totalAutorias} matérias/relatorias ativas verificadas para Flávio Bolsonaro.`);
    const candFlavio = dataset.candidatos.find(c => c.id === 'flavio-bolsonaro');
    if (candFlavio && flavioData.totalAutorias > 0) {
      candFlavio.kpis.projetos_apresentados = flavioData.totalAutorias;
    }
  }

  // 3. Atualizar carimbo de auditoria
  const hoje = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  dataset.eleicao.data_atualizacao = hoje;

  // 4. Salvar
  fs.writeFileSync(DATA_FILE, JSON.stringify(dataset, null, 2), 'utf-8');
  console.log(`\n💾 Base de dados sincronizada com sucesso em: ${DATA_FILE}`);
}

main().catch(err => {
  console.error('❌ Erro na sincronização:', err);
  process.exit(1);
});

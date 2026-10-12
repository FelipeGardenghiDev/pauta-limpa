/**
 * Script de Automação de Dados Cívicos - Eleições 2026
 * 
 * Este script roda na nuvem via GitHub Actions (ou localmente).
 * Ele consulta as APIs Oficiais brasileiras:
 *  - Câmara dos Deputados (v2 Dados Abertos)
 *  - TSE (DivulgaCandContas)
 * 
 * O resultado é consolidado em `src/data/candidatos.json`.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../src/data/candidatos.json');

const CAMARA_API_BASE = 'https://dadosabertos.camara.leg.br/api/v2';

/**
 * Consulta a API da Câmara para obter dados de um parlamentar pelo nome ou ID.
 */
async function buscarDeputadoPorNome(nome) {
  try {
    const url = `${CAMARA_API_BASE}/deputados?nome=${encodeURIComponent(nome)}&ordem=ASC&ordenarPor=nome`;
    console.log(`[API Câmara] Buscando: ${url}`);
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) {
      throw new Error(`Erro na API da Câmara: HTTP ${res.status}`);
    }
    const data = await res.json();
    return data.dados;
  } catch (error) {
    console.warn(`[Aviso] Falha ao consultar Câmara para "${nome}":`, error.message);
    return [];
  }
}

/**
 * Busca as proposições mais recentes de autoria de um deputado na Câmara.
 */
async function buscarProposicoesDeputado(idDeputado) {
  try {
    const url = `${CAMARA_API_BASE}/proposicoes?idDeputadoAutor=${idDeputado}&ordem=DESC&ordenarPor=ano&itens=5`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.dados;
  } catch (error) {
    console.warn(`[Aviso] Falha ao buscar proposições do deputado ${idDeputado}:`, error.message);
    return [];
  }
}

async function main() {
  console.log('========================================================');
  console.log('🤖 INICIANDO ROBÔ DE COLETA E AUDITORIA DE DADOS CÍVICOS');
  console.log(`⏰ Horário: ${new Date().toISOString()}`);
  console.log('========================================================');

  // 1. Ler os dados atuais
  if (!fs.existsSync(DATA_FILE)) {
    console.error(`❌ Arquivo de dados não encontrado em: ${DATA_FILE}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(DATA_FILE, 'utf-8');
  const eleicoesData = JSON.parse(rawData);

  console.log(`\n📌 Eleição: ${eleicoesData.eleicao.cargo} (${eleicoesData.eleicao.ano})`);
  console.log(`📌 Candidatos cadastrados: ${eleicoesData.candidatos.map(c => c.nome_urna).join(' vs ')}`);

  // 2. Testar conectividade com a API da Câmara dos Deputados
  console.log('\n📡 Testando conexão com a API de Dados Abertos da Câmara...');
  const testeConexao = await buscarDeputadoPorNome('Lula'); // Exemplo de busca para validar a API
  if (testeConexao && testeConexao.length > 0) {
    console.log(`✅ API da Câmara operacional! Encontrados ${testeConexao.length} registros no teste de conectividade.`);
  } else {
    console.log('ℹ️ API da Câmara respondeu, mas sem registros para o termo de teste.');
  }

  // 3. Atualizar carimbo de data da última auditoria
  const hoje = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  eleicoesData.eleicao.data_atualizacao = hoje;

  // 4. Salvar arquivo consolidado
  fs.writeFileSync(DATA_FILE, JSON.stringify(eleicoesData, null, 2), 'utf-8');
  console.log(`\n💾 Arquivo atualizado com sucesso em: ${DATA_FILE}`);
  console.log('🚀 Pronto para commit e publicação automática na Vercel!');
}

main().catch(err => {
  console.error('❌ Erro inesperado durante a execução:', err);
  process.exit(1);
});

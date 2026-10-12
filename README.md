# 🇧🇷 Pauta Limpa (Eleições 2026)

O **Pauta Limpa** é uma plataforma cívica, independente e de código aberto para comparação objetiva entre os candidatos do **2º turno da Presidência da República do Brasil (2026)**.

---

## 🎯 Objetivos do Projeto

- **Foco em Fatos e Dados Primários:** Cruza as propostas oficiais protocoladas no **TSE** com os históricos de votações nominais registradas na **Câmara dos Deputados** e no **Senado Federal**.
- **100% Gratuito e em Nuvem:** Roda inteiramente na Vercel com automação diária gratuita via GitHub Actions.
- **Zero Bancos de Dados Complexos:** Utiliza arquivos estruturados em JSON no próprio repositório para máxima velocidade, transparência pública e custo zero de infraestrutura.
- **Visualização Intuitiva (BI Cívico):**
  - **Cards de Trajetória Pública:** Indicadores de vida pública, projetos apresentados e assiduidade.
  - **Comparador Lado a Lado:** Resumos padronizados por temas (Economia, Saúde, Educação e Segurança) com citação da página do plano de governo no TSE.
  - **Matriz de Votações Históricas (Semáforo de BI):** Posicionamento em reformas e matérias legislativas com links para as atas oficiais da Câmara.
  - **Radar de Prioridades:** Gráfico interativo com a intensidade de propostas por eixo temático.
  - **Quiz de Afinidade Cívica:** Cálculo matemático de alinhamento programático a partir de 5 perguntas objetivas.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** [Next.js](https://nextjs.org/) (App Router, React 19, TypeScript)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Visualização de Dados (BI):** [Recharts](https://recharts.org/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Automação:** Node.js + [GitHub Actions](https://github.com/features/actions)
- **Hospedagem:** [Vercel](https://vercel.com/)

---

## 🚀 Como Rodar Localmente

1. **Instalar as dependências:**
   ```bash
   npm install
   ```

2. **Testar o robô de coleta das APIs governamentais:**
   ```bash
   npm run coletar
   ```

3. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## ☁️ Como Publicar no GitHub e na Vercel

1. **Criar um repositório no GitHub** e enviar o código:
   ```bash
   git add .
   git commit -m "feat: projeto inicial do comparador eleitoral 2026"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   git push -u origin main
   ```

2. **Conectar na Vercel:**
   - Acesse [vercel.com](https://vercel.com) e clique em **"Add New Project"**.
   - Selecione o repositório do GitHub recém-criado.
   - Clique em **"Deploy"** (a Vercel detecta Next.js automaticamente).

3. **Automação Automática (GitHub Actions):**
   - O fluxo em `.github/workflows/atualizar-dados.yml` já está configurado para rodar diariamente às 06:00 UTC (ou manualmente pela aba **Actions** no GitHub).
   - Quando o robô encontra novos dados, ele comita no repositório e a Vercel atualiza o site automaticamente em segundos.

---

## 🏛️ Fontes Públicas Oficiais

- **TSE (Tribunal Superior Eleitoral):** Portal DivulgaCandContas (planos de governo e declarações de bens).
- **Câmara dos Deputados:** API de Dados Abertos v2 (`https://dadosabertos.camara.leg.br`).
- **Senado Federal:** API de Dados Abertos Legislativos (`https://legis.senado.leg.br/dadosabertos`).

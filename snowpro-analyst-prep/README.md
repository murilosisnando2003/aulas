# SnowPro Advanced: Data Analyst - Sistema de Preparação

Sistema completo de preparação para a certificação **SnowPro Advanced: Data Analyst** da Snowflake.

![SnowPro Analyst Prep](https://img.shields.io/badge/Snowflake-29B5E8?style=for-the-badge&logo=snowflake&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🎯 Sobre o Exame

A certificação SnowPro Advanced: Data Analyst valida habilidades avançadas em:

- **SQL & Query Fundamentals** (20%)
- **Data Analysis & Transformation** (25%)
- **Data Loading & Unloading** (15%)
- **Snowflake Objects & Architecture** (15%)
- **Data Visualization & Reporting** (15%)
- **Performance & Cost Optimization** (10%)

### Detalhes do Exame

- 📝 65 questões de múltipla escolha
- ⏱️ 115 minutos de duração
- 📊 Pontuação mínima: 750/1000 (~75%)
- 💻 Exame supervisionado online
- 📚 Pré-requisito: SnowPro Core Certification

## ✨ Funcionalidades

### 📚 Flashcards com Spaced Repetition
- Sistema SM-2 para memorização eficiente
- Cards organizados por domínio e tópico
- Avaliação de dificuldade (Fácil/Médio/Difícil)
- Revisão programada baseada na sua performance

### 📝 Quizzes
- Questões no formato do exame
- Explicações detalhadas para cada resposta
- Filtro por domínio
- Acompanhamento de taxa de acerto

### 📊 Tracking de Progresso
- Visão geral do domínio por área
- Estatísticas de estudo
- Sequência de dias consecutivos
- Análise de prontidão para o exame

### 📖 Conteúdo de Estudo
- Material organizado por tópicos do exame
- Exemplos de código SQL
- Links para documentação oficial
- Objetivos de aprendizagem claros

## 🚀 Como Usar

### Desenvolvimento Local

```bash
# Clone o repositório
git clone <repo-url>
cd snowpro-analyst-prep

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### Deploy na Vercel

1. Faça push do código para um repositório Git
2. Importe o projeto na [Vercel](https://vercel.com)
3. Deploy automático!

```bash
# Ou use o CLI da Vercel
npm i -g vercel
vercel
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Páginas (Next.js App Router)
│   ├── page.tsx           # Home
│   ├── domains/           # Domínios do exame
│   ├── flashcards/        # Sistema de flashcards
│   ├── quiz/              # Quiz de prática
│   └── progress/          # Tracking de progresso
├── components/            # Componentes React
│   ├── FlashcardViewer.tsx
│   ├── QuizQuestion.tsx
│   ├── DomainCard.tsx
│   └── ...
├── data/                  # Conteúdo do exame
│   ├── domains.ts         # Domínios e tópicos
│   ├── flashcards.ts      # Flashcards
│   ├── questions.ts       # Questões de quiz
│   └── study-content.ts   # Material de estudo
├── hooks/                 # React hooks
│   └── useProgress.ts     # Hook de progresso
├── lib/                   # Utilitários
│   └── storage.ts         # LocalStorage + SM-2
└── types/                 # TypeScript types
    └── index.ts
```

## 🎓 Conteúdo Coberto

### Domínio 1: SQL & Query Fundamentals (20%)
- Funções de janela (ROW_NUMBER, RANK, LAG, LEAD)
- CTEs e CTEs recursivas
- JOINs avançados (LATERAL JOIN)
- QUALIFY clause
- Query optimization

### Domínio 2: Data Analysis & Transformation (25%)
- Dados semi-estruturados (VARIANT, FLATTEN)
- PIVOT e UNPIVOT
- Análise de séries temporais
- GROUPING SETS, CUBE, ROLLUP

### Domínio 3: Data Loading & Unloading (15%)
- Stages (User, Table, Named, External)
- COPY INTO com transformações
- Snowpipe para ingestão contínua
- File formats

### Domínio 4: Snowflake Objects & Architecture (15%)
- Views, Secure Views, Materialized Views
- Stored Procedures e UDFs
- Streams e Tasks para CDC
- Time Travel e Fail-safe

### Domínio 5: Data Visualization & Reporting (15%)
- Snowsight Dashboards
- Worksheets e Query Results
- Integração com BI tools
- Result caching

### Domínio 6: Performance & Cost Optimization (10%)
- Virtual Warehouses sizing
- Clustering e micro-partitions
- Resource Monitors
- Query Profile analysis

## 📖 Recursos de Estudo Recomendados

1. **Documentação Oficial**
   - [SQL Reference](https://docs.snowflake.com/en/sql-reference)
   - [User Guide](https://docs.snowflake.com/en/user-guide)
   
2. **Snowflake Learning**
   - [learn.snowflake.com](https://learn.snowflake.com)
   - Hands-on Labs

3. **Certificação**
   - [Página oficial do exame](https://learn.snowflake.com/en/certifications/)
   - Study Guide PDF

## 🛠️ Tecnologias

- **Next.js 16** - Framework React
- **TypeScript** - Type safety
- **Tailwind CSS** - Estilização
- **React Markdown** - Renderização de conteúdo
- **LocalStorage** - Persistência de progresso

## 📝 Licença

MIT License - Sinta-se livre para usar e modificar!

---

**Boa sorte no exame! 🎉**

*Este projeto não é afiliado à Snowflake Inc. O conteúdo é baseado na documentação pública disponível.*

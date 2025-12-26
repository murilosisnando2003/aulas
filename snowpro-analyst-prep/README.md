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

## 📊 Conteúdo do Sistema - Cobertura 100%

| Recurso | Quantidade |
|---------|------------|
| **Flashcards** | 143 cards (com spaced repetition SM-2) |
| **Questões de Quiz** | 171 questões no formato do exame |
| **Domínios** | 6 domínios oficiais do exame |
| **Tópicos** | 21 tópicos detalhados |
| **Objetivos Mapeados** | 18 objetivos com 100+ sub-objetivos |
| **Matriz de Cobertura** | Cada objetivo rastreado para flashcards/questões específicos |

### 🎯 Garantia de Cobertura 100%

Este sistema foi meticulosamente desenvolvido para cobrir **TODOS** os objetivos do exame oficial:

- ✅ Todos os sub-objetivos do guia oficial mapeados
- ✅ Flashcards específicos para cada conceito
- ✅ Questões que testam cada objetivo
- ✅ Matriz de rastreabilidade em `src/data/coverage-matrix.ts`

## ✨ Funcionalidades

### 📚 Flashcards com Spaced Repetition
- Sistema SM-2 para memorização eficiente
- **143 cards** cobrindo 100% dos objetivos do exame
- Cards organizados por domínio e tópico
- Avaliação de dificuldade (Fácil/Médio/Difícil)
- Revisão programada baseada na sua performance
- Exemplos de código SQL em cada card

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

**Opção 1: Via Dashboard (Recomendado)**

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "Add New Project"
3. Importe o repositório Git
4. **Importante**: Configure o "Root Directory" como `snowpro-analyst-prep`
5. Clique em "Deploy"
6. Pronto! 🎉

**Opção 2: Via CLI**

```bash
cd snowpro-analyst-prep

# Instale a CLI da Vercel
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Para produção
vercel --prod
```

**Configurações do Projeto**:
- Framework Preset: Next.js
- Node.js Version: 18.x ou superior
- Root Directory: `snowpro-analyst-prep`

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

## 🎓 Cobertura Completa dos Objetivos

### Domínio 1: SQL & Query Fundamentals (20-25%)
- ✅ Window functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE, LAG, LEAD, FIRST_VALUE, LAST_VALUE)
- ✅ QUALIFY clause
- ✅ Frame specifications (ROWS BETWEEN, RANGE BETWEEN)
- ✅ String functions (LISTAGG, SPLIT_PART, REGEXP_*)
- ✅ Date/time functions (DATEADD, DATEDIFF, DATE_TRUNC)
- ✅ Conversion functions (CAST, TRY_CAST, TO_*)
- ✅ Hash functions (HASH, MD5, SHA2)
- ✅ Conditional expressions (CASE, IFF, COALESCE, NVL, NVL2, NULLIF)
- ✅ Approximate functions (APPROX_COUNT_DISTINCT, HLL)
- ✅ Percentile functions (MEDIAN, PERCENTILE_CONT, PERCENTILE_DISC)
- ✅ GENERATOR e SEQ functions
- ✅ CTEs e CTEs recursivas
- ✅ JOINs avançados (LATERAL, ASOF, NATURAL)
- ✅ CONNECT BY para queries hierárquicas
- ✅ Query Profile interpretation
- ✅ EXPLAIN e SAMPLE

### Domínio 2: Data Analysis & Transformation (25-30%)
- ✅ VARIANT, OBJECT, ARRAY data types
- ✅ FLATTEN e LATERAL FLATTEN (OUTER parameter)
- ✅ PARSE_JSON e TRY_PARSE_JSON
- ✅ OBJECT_CONSTRUCT e ARRAY_CONSTRUCT
- ✅ Array/Object functions
- ✅ PIVOT e UNPIVOT
- ✅ GROUPING SETS, CUBE, ROLLUP
- ✅ Moving averages e running totals
- ✅ Time series analysis
- ✅ Snowsight Charts e Dashboards
- ✅ Context functions (CURRENT_*)

### Domínio 3: Data Loading & Pipelines (15-20%)
- ✅ Stages (User, Table, Named, External)
- ✅ File formats (CSV, JSON, Parquet, Avro, ORC)
- ✅ Storage integrations
- ✅ Directory tables e External tables
- ✅ COPY INTO com transformações
- ✅ Error handling (ON_ERROR options)
- ✅ VALIDATION_MODE e MATCH_BY_COLUMN_NAME
- ✅ Schema evolution
- ✅ MERGE e Multi-table INSERT
- ✅ METADATA$ columns
- ✅ Snowpipe (auto-ingest)
- ✅ Streams (CDC) e Tasks
- ✅ Task dependencies (DAGs)
- ✅ Data pipeline patterns

### Domínio 4: Data Management & Security (15-20%)
- ✅ RBAC (roles e privileges)
- ✅ Dynamic data masking
- ✅ Row access policies
- ✅ Object tagging
- ✅ Network policies
- ✅ Column-level security
- ✅ Views (regular, secure, materialized)
- ✅ Stored procedures (SQL, JavaScript, Python)
- ✅ UDFs (scalar, table) e External functions
- ✅ Sequences e identity columns
- ✅ Transactions
- ✅ Caller rights vs owner rights
- ✅ Snowflake scripting
- ✅ Variables e bindings
- ✅ Time Travel e Fail-safe
- ✅ UNDROP command
- ✅ Cloning (zero-copy)
- ✅ Replication e failover

### Domínio 5: Snowflake Ecosystem (10-15%)
- ✅ INFORMATION_SCHEMA views
- ✅ ACCOUNT_USAGE schema
- ✅ SHOW e DESCRIBE commands
- ✅ RESULT_SCAN e LAST_QUERY_ID
- ✅ Access history e lineage
- ✅ Alerts
- ✅ SYSTEM$ functions
- ✅ Data shares (provider e consumer)
- ✅ Reader accounts
- ✅ Marketplace
- ✅ Data Clean Rooms
- ✅ Native Apps

### Domínio 6: Performance & Cost Optimization (10-15%)
- ✅ Warehouse sizing e scaling
- ✅ Multi-cluster warehouses
- ✅ Scaling policies (STANDARD vs ECONOMY)
- ✅ Auto-suspend e auto-resume
- ✅ Resource monitors
- ✅ Serverless compute
- ✅ Snowpark-optimized warehouses
- ✅ Credits e billing
- ✅ Micro-partitions
- ✅ Clustering keys e automatic clustering
- ✅ Search optimization service
- ✅ Query Acceleration Service
- ✅ Caching (metadata, result, data)
- ✅ Performance best practices

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

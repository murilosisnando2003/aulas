import { Flashcard } from '@/types';

// Continuação dos flashcards para cobertura 100%
export const flashcardsFullCoverage2: Flashcard[] = [
  // ============================================
  // RESOURCE MONITORS DETALHADO
  // ============================================
  {
    id: 'fc-full-31',
    topicId: 'topic-6-1',
    domainId: 'domain-6',
    front: 'Como configurar Resource Monitors para controle de custos?',
    back: `**Resource Monitors**: Controle de créditos consumidos.

**Criar Monitor**:
\`\`\`sql
CREATE RESOURCE MONITOR daily_limit
  WITH CREDIT_QUOTA = 100
  FREQUENCY = DAILY
  START_TIMESTAMP = IMMEDIATELY
  TRIGGERS 
    ON 75 PERCENT DO NOTIFY
    ON 90 PERCENT DO NOTIFY
    ON 100 PERCENT DO SUSPEND
    ON 110 PERCENT DO SUSPEND_IMMEDIATE;
\`\`\`

**Níveis de Ação**:
- **NOTIFY**: Envia notificação (email)
- **SUSPEND**: Suspende após query atual
- **SUSPEND_IMMEDIATE**: Suspende imediatamente (aborta queries)

**Aplicar a Warehouses**:
\`\`\`sql
-- A um warehouse
ALTER WAREHOUSE analytics_wh 
  SET RESOURCE_MONITOR = daily_limit;

-- A nível de conta
ALTER ACCOUNT SET RESOURCE_MONITOR = monthly_limit;
\`\`\`

**Monitorar**:
\`\`\`sql
SHOW RESOURCE MONITORS;

-- Ver uso
SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.RESOURCE_MONITORS
ORDER BY START_TIME DESC;
\`\`\`

**Exemplo Completo**:
\`\`\`sql
-- Monitor mensal com múltiplos alertas
CREATE RESOURCE MONITOR prod_monthly
  WITH CREDIT_QUOTA = 10000
  FREQUENCY = MONTHLY
  START_TIMESTAMP = '2024-01-01 00:00 UTC'
  END_TIMESTAMP = NULL
  TRIGGERS
    ON 50 PERCENT DO NOTIFY
    ON 75 PERCENT DO NOTIFY
    ON 90 PERCENT DO NOTIFY
    ON 95 PERCENT DO SUSPEND
    ON 100 PERCENT DO SUSPEND_IMMEDIATE;
\`\`\`

**Dica**: Sempre tenha monitor em produção para evitar surpresas.`,
    difficulty: 'medium',
    tags: ['resource-monitor', 'cost-control', 'credits'],
  },

  // ============================================
  // WAREHOUSE TYPES E CONFIGURAÇÕES
  // ============================================
  {
    id: 'fc-full-32',
    topicId: 'topic-6-1',
    domainId: 'domain-6',
    front: 'Quais são os tipos e configurações de Warehouses?',
    back: `**Tipos de Warehouse**:

**Standard**: Compute clássico (padrão)

**Snowpark-optimized**: Para ML/Python
\`\`\`sql
CREATE WAREHOUSE ml_wh
  WAREHOUSE_TYPE = 'SNOWPARK-OPTIMIZED'
  WAREHOUSE_SIZE = 'MEDIUM';
\`\`\`

**Configurações**:
\`\`\`sql
CREATE WAREHOUSE my_wh
  WAREHOUSE_SIZE = 'MEDIUM'
  
  -- Auto-scaling
  MIN_CLUSTER_COUNT = 1
  MAX_CLUSTER_COUNT = 10
  SCALING_POLICY = 'STANDARD'  -- ou 'ECONOMY'
  
  -- Auto-suspend/resume
  AUTO_SUSPEND = 60           -- segundos
  AUTO_RESUME = TRUE
  
  -- Timeout
  STATEMENT_TIMEOUT_IN_SECONDS = 3600
  STATEMENT_QUEUED_TIMEOUT_IN_SECONDS = 600
  
  -- Query Acceleration
  ENABLE_QUERY_ACCELERATION = TRUE
  QUERY_ACCELERATION_MAX_SCALE_FACTOR = 8
  
  -- Iniciar suspenso
  INITIALLY_SUSPENDED = TRUE;
\`\`\`

**Scaling Policies**:
- **STANDARD**: Escala rápido, favorece performance
- **ECONOMY**: Escala conservador, favorece custo

**Tamanhos e Créditos/hora**:

| Tamanho | Créditos/hora | Clusters default |
|---------|---------------|------------------|
| X-Small | 1 | 1 |
| Small | 2 | 1 |
| Medium | 4 | 1 |
| Large | 8 | 1 |
| X-Large | 16 | 1 |
| 2X-Large | 32 | 1 |
| 3X-Large | 64 | 1 |
| 4X-Large | 128 | 1 |

**Dica**: Multi-cluster para concorrência, não para queries maiores.`,
    difficulty: 'medium',
    tags: ['warehouse', 'configuration', 'sizing'],
  },

  // ============================================
  // DATA SHARING DETALHADO
  // ============================================
  {
    id: 'fc-full-33',
    topicId: 'topic-5-3',
    domainId: 'domain-5',
    front: 'Como funciona o ciclo completo de Data Sharing?',
    back: `**Data Sharing**: Compartilhar dados sem copiar.

**Provider (quem compartilha)**:
\`\`\`sql
-- 1. Criar share
CREATE SHARE sales_share;

-- 2. Adicionar objetos
GRANT USAGE ON DATABASE sales_db TO SHARE sales_share;
GRANT USAGE ON SCHEMA sales_db.public TO SHARE sales_share;
GRANT SELECT ON TABLE sales_db.public.transactions TO SHARE sales_share;
GRANT SELECT ON VIEW sales_db.public.summary_view TO SHARE sales_share;

-- 3. Adicionar consumidores
ALTER SHARE sales_share ADD ACCOUNTS = org.partner_account;

-- 4. Ver status
SHOW SHARES;
DESCRIBE SHARE sales_share;
\`\`\`

**Consumer (quem recebe)**:
\`\`\`sql
-- 1. Ver shares disponíveis
SHOW SHARES;

-- 2. Criar database a partir do share
CREATE DATABASE partner_data FROM SHARE provider_org.provider_account.sales_share;

-- 3. Usar dados
SELECT * FROM partner_data.public.transactions;

-- 4. Ver origem
DESCRIBE DATABASE partner_data;
\`\`\`

**Secure Objects (obrigatório para shares)**:
\`\`\`sql
-- Views devem ser SECURE
CREATE SECURE VIEW filtered_data AS
SELECT * FROM raw_data WHERE public = TRUE;

GRANT SELECT ON SECURE VIEW filtered_data TO SHARE my_share;
\`\`\`

**Limitações**:
- Dados são read-only para consumer
- Não pode compartilhar stages, UDFs, procedures
- Consumer não vê dados subjacentes de views
- Cross-region requer replicação

**Custos**:
- Provider: Paga storage
- Consumer: Paga compute (queries)

**Dica**: Use Reader Accounts para consumidores sem Snowflake.`,
    difficulty: 'hard',
    tags: ['data-sharing', 'share', 'provider', 'consumer'],
  },

  // ============================================
  // READER ACCOUNTS
  // ============================================
  {
    id: 'fc-full-34',
    topicId: 'topic-5-3',
    domainId: 'domain-5',
    front: 'O que são Reader Accounts e quando usá-los?',
    back: `**Reader Accounts**: Contas para consumidores sem Snowflake próprio.

**Conceito**:
- Provider cria conta para consumer
- Consumer acessa dados sem contrato Snowflake
- Provider paga compute do consumer

**Criar Reader Account**:
\`\`\`sql
-- Criar conta
CREATE MANAGED ACCOUNT partner_reader
  ADMIN_NAME = 'partner_admin'
  ADMIN_PASSWORD = 'SecurePass123!'
  TYPE = READER;

-- Ver detalhes
SHOW MANAGED ACCOUNTS;
\`\`\`

**Configurar Acesso**:
\`\`\`sql
-- Adicionar reader ao share
ALTER SHARE sales_share ADD ACCOUNTS = partner_reader;

-- No reader account, criar database
-- (feito pelo admin do reader)
CREATE DATABASE shared_data FROM SHARE provider.sales_share;
\`\`\`

**Criar Warehouse no Reader** (provider paga):
\`\`\`sql
-- Como admin do reader
CREATE WAREHOUSE reader_wh
  WAREHOUSE_SIZE = 'SMALL'
  AUTO_SUSPEND = 60
  AUTO_RESUME = TRUE;

-- Dar acesso aos usuários
GRANT USAGE ON WAREHOUSE reader_wh TO ROLE public;
\`\`\`

**Gerenciar Usuários**:
\`\`\`sql
-- No reader account
CREATE USER analyst PASSWORD = 'Pass123!';
GRANT ROLE PUBLIC TO USER analyst;
\`\`\`

**Limitações**:
- Não pode criar stages, pipes, ou tasks
- Não pode acessar Marketplace
- Funcionalidade limitada
- Provider controla custos

**Custo**: Provider paga tudo (storage + compute do reader)

**Uso típico**: Clientes externos, parceiros, demos.`,
    difficulty: 'hard',
    tags: ['reader-account', 'managed-account', 'data-sharing'],
  },

  // ============================================
  // MARKETPLACE
  // ============================================
  {
    id: 'fc-full-35',
    topicId: 'topic-5-3',
    domainId: 'domain-5',
    front: 'Como funciona o Snowflake Marketplace?',
    back: `**Marketplace**: Catálogo de dados e apps de terceiros.

**Para Consumidores**:
\`\`\`sql
-- 1. Acessar via UI (Snowsight)
-- Data > Marketplace

-- 2. Após "Get" no Marketplace:
-- Database aparece automaticamente
USE DATABASE WEATHER_DATA;
SELECT * FROM WEATHER_DATA.PUBLIC.DAILY_TEMPS;
\`\`\`

**Tipos de Listings**:
1. **Standard Listings**: Grátis (provider paga storage)
2. **Paid Listings**: Consumer paga taxa
3. **Private Listings**: Apenas contas autorizadas
4. **Personalized Listings**: Dados customizados

**Para Providers**:
\`\`\`sql
-- 1. Criar share
CREATE SHARE marketplace_share;
GRANT USAGE ON DATABASE my_db TO SHARE marketplace_share;
GRANT SELECT ON ALL TABLES IN SCHEMA my_db.public TO SHARE marketplace_share;

-- 2. Criar listing via UI
-- Provider Studio > Create Listing
\`\`\`

**Tipos de Dados no Marketplace**:
- Weather data
- Financial data
- Demographics
- Location data
- COVID-19 data
- Economic indicators

**Benefícios**:
- Sem ETL necessário
- Dados sempre atualizados
- Zero-copy (sem duplicação)
- Fácil descoberta

**Custos**:
- Consumer: Compute para queries
- Provider: Storage (e taxa do Marketplace para paid)

**Dica**: Ótimo para enriquecer dados internos com externos.`,
    difficulty: 'medium',
    tags: ['marketplace', 'data-exchange', 'third-party'],
  },

  // ============================================
  // SNOWSIGHT FEATURES
  // ============================================
  {
    id: 'fc-full-36',
    topicId: 'topic-2-2',
    domainId: 'domain-2',
    front: 'Quais são as funcionalidades principais do Snowsight?',
    back: `**Snowsight**: Interface web moderna do Snowflake.

**Worksheets**:
- SQL editor com autocomplete
- Múltiplas abas
- Histórico de queries
- Compartilhamento de worksheets

**Dashboards**:
\`\`\`sql
-- Criar tiles a partir de queries
-- Tipos de visualização:
-- - Line charts
-- - Bar charts
-- - Pie charts
-- - Scatter plots
-- - Heatmaps
-- - Tables
-- - Scorecards
\`\`\`

**Filtros Dinâmicos**:
- Filtros globais no dashboard
- Cascading filters
- Date range pickers

**Query Profile**:
- Visualização gráfica do plano
- Métricas de performance
- Identificação de problemas
- Spilling, pruning stats

**Data Preview**:
- Ver dados diretamente
- Filtrar e ordenar
- Sampling automático para tabelas grandes

**Activity**:
- Query History
- Copy History
- Task runs
- Alerts

**Admin**:
- Warehouses management
- Users & Roles
- Resource Monitors
- Security

**Keyboard Shortcuts**:
- Ctrl+Enter: Executar query
- Ctrl+/: Comentar
- Ctrl+Shift+K: Formatar SQL

**Dica**: Use Dashboards para KPIs, Query Profile para otimização.`,
    difficulty: 'easy',
    tags: ['snowsight', 'ui', 'dashboards'],
  },

  // ============================================
  // CHARTS E VISUALIZAÇÕES
  // ============================================
  {
    id: 'fc-full-37',
    topicId: 'topic-2-2',
    domainId: 'domain-2',
    front: 'Como criar Charts e Visualizações no Snowsight?',
    back: `**Charts no Snowsight**:

**Criando Chart a partir de Query**:
1. Execute a query
2. Clique na aba "Chart"
3. Selecione tipo de gráfico
4. Configure eixos e métricas

**Tipos de Gráficos**:

| Tipo | Uso |
|------|-----|
| Bar | Comparar categorias |
| Line | Tendências temporais |
| Area | Volume ao longo do tempo |
| Scatter | Correlação entre variáveis |
| Heatmap | Distribuição 2D |
| Scorecard | KPI único |

**Configurações**:
- **X-axis**: Dimensão (categoria, data)
- **Y-axis**: Métricas (valores numéricos)
- **Color**: Segmentação adicional
- **Size**: Terceira dimensão (scatter)

**Agregações automáticas**:
- Sum, Count, Average
- Min, Max
- Distinct Count

**Formatação**:
- Número de decimais
- Prefixo/sufixo (R$, %)
- Cores customizadas
- Legendas

**Adicionar ao Dashboard**:
1. Clique em "+" no Chart
2. "Add to Dashboard"
3. Selecione ou crie dashboard

**Dashboard Features**:
- Resize/reposition tiles
- Filtros globais (aplicam a todos os tiles)
- Auto-refresh (configurável)
- Compartilhamento

**Exemplo de Query para Dashboard**:
\`\`\`sql
SELECT 
  DATE_TRUNC('day', order_date) as date,
  SUM(amount) as daily_revenue,
  COUNT(*) as order_count
FROM orders
WHERE order_date >= DATEADD('month', -1, CURRENT_DATE)
GROUP BY 1
ORDER BY 1;
\`\`\``,
    difficulty: 'easy',
    tags: ['charts', 'visualization', 'snowsight'],
  },

  // ============================================
  // VARIABLES E BINDINGS
  // ============================================
  {
    id: 'fc-full-38',
    topicId: 'topic-4-2',
    domainId: 'domain-4',
    front: 'Como usar variáveis de sessão e bindings no Snowflake?',
    back: `**Session Variables**: Valores que persistem na sessão.

**SET/UNSET**:
\`\`\`sql
-- Definir variável
SET my_date = '2024-01-01';
SET threshold = 100;
SET table_name = 'SALES';

-- Usar variável
SELECT * FROM IDENTIFIER($table_name)
WHERE date >= $my_date
AND amount > $threshold;

-- Ver variáveis
SHOW VARIABLES;

-- Remover
UNSET my_date;
\`\`\`

**Tipos de Dados**:
\`\`\`sql
SET my_string = 'hello';
SET my_number = 123.45;
SET my_date = '2024-01-01'::DATE;
SET my_array = ARRAY_CONSTRUCT(1, 2, 3);
SET my_object = OBJECT_CONSTRUCT('key', 'value');
\`\`\`

**IDENTIFIER para nomes dinâmicos**:
\`\`\`sql
SET schema_name = 'ANALYTICS';
SET table_name = 'SALES';

-- Usar como identificador
SELECT * FROM IDENTIFIER($schema_name || '.' || $table_name);

-- Em DDL
CREATE TABLE IDENTIFIER('TEMP_' || $table_name) AS
SELECT * FROM IDENTIFIER($table_name);
\`\`\`

**Query Results como Variável**:
\`\`\`sql
-- Valor único
SET max_date = (SELECT MAX(date) FROM sales);
SELECT * FROM sales WHERE date = $max_date;

-- Último query ID
SET qid = LAST_QUERY_ID();
SELECT * FROM TABLE(RESULT_SCAN($qid));
\`\`\`

**Dica**: Use para scripts dinâmicos, mas cuidado com SQL injection em procedures.`,
    difficulty: 'medium',
    tags: ['variables', 'session', 'bindings'],
  },

  // ============================================
  // SNOWFLAKE SCRIPTING
  // ============================================
  {
    id: 'fc-full-39',
    topicId: 'topic-4-2',
    domainId: 'domain-4',
    front: 'Quais são os elementos do Snowflake Scripting?',
    back: `**Snowflake Scripting**: Programação procedural em SQL.

**Blocos**:
\`\`\`sql
DECLARE
  my_var VARCHAR DEFAULT 'hello';
  counter INT;
BEGIN
  counter := 0;
  -- statements
  RETURN counter;
END;
\`\`\`

**IF/ELSE**:
\`\`\`sql
IF (condition) THEN
  statements;
ELSEIF (condition2) THEN
  statements;
ELSE
  statements;
END IF;
\`\`\`

**Loops**:
\`\`\`sql
-- FOR loop
FOR i IN 1 TO 10 DO
  INSERT INTO log VALUES (i);
END FOR;

-- WHILE loop
WHILE (counter < 100) DO
  counter := counter + 1;
END WHILE;

-- REPEAT
REPEAT
  counter := counter - 1;
UNTIL (counter = 0)
END REPEAT;

-- LOOP com EXIT
LOOP
  counter := counter + 1;
  IF (counter > 100) THEN
    BREAK;
  END IF;
END LOOP;
\`\`\`

**Cursors**:
\`\`\`sql
DECLARE
  c1 CURSOR FOR SELECT id, name FROM users;
  rec RECORD;
BEGIN
  OPEN c1;
  LOOP
    FETCH c1 INTO rec;
    IF (c1%NOTFOUND) THEN
      LEAVE;
    END IF;
    -- Usar rec.id, rec.name
  END LOOP;
  CLOSE c1;
END;
\`\`\`

**RESULTSET**:
\`\`\`sql
DECLARE
  rs RESULTSET;
BEGIN
  rs := (SELECT * FROM users WHERE active = TRUE);
  RETURN TABLE(rs);
END;
\`\`\`

**Exception Handling**:
\`\`\`sql
BEGIN
  statements;
EXCEPTION
  WHEN statement_error THEN
    RETURN 'Error: ' || SQLERRM;
  WHEN OTHER THEN
    RAISE;
END;
\`\`\``,
    difficulty: 'hard',
    tags: ['scripting', 'procedural', 'loops'],
  },

  // ============================================
  // EXTERNAL FUNCTIONS
  // ============================================
  {
    id: 'fc-full-40',
    topicId: 'topic-4-2',
    domainId: 'domain-4',
    front: 'O que são External Functions e como configurá-las?',
    back: `**External Functions**: Chamar serviços externos (APIs) do Snowflake.

**Arquitetura**:
1. Snowflake → API Integration → API Gateway → Lambda/Function
2. Retorno segue caminho inverso

**Criar API Integration**:
\`\`\`sql
CREATE API INTEGRATION my_api_int
  API_PROVIDER = aws_api_gateway
  API_AWS_ROLE_ARN = 'arn:aws:iam::123456789:role/snowflake-role'
  API_ALLOWED_PREFIXES = ('https://abc123.execute-api.us-east-1.amazonaws.com/')
  ENABLED = TRUE;
\`\`\`

**Criar External Function**:
\`\`\`sql
CREATE EXTERNAL FUNCTION translate_text(text VARCHAR, target_lang VARCHAR)
  RETURNS VARCHAR
  API_INTEGRATION = my_api_int
  AS 'https://abc123.execute-api.us-east-1.amazonaws.com/prod/translate';
\`\`\`

**Usar**:
\`\`\`sql
SELECT 
  original_text,
  translate_text(original_text, 'pt') as portuguese
FROM documents;
\`\`\`

**Casos de Uso**:
- Machine Learning (SageMaker, etc.)
- Geocoding
- Sentiment analysis
- Custom validations
- Integração com sistemas legados

**Considerações**:
- Latência de rede
- Limites de taxa da API
- Custos do serviço externo
- Batching automático para performance

**Exemplo de payload (recebido pela API)**:
\`\`\`json
{
  "data": [
    [0, "Hello"],
    [1, "World"]
  ]
}
\`\`\`

**Resposta esperada**:
\`\`\`json
{
  "data": [
    [0, "Olá"],
    [1, "Mundo"]
  ]
}
\`\`\`

**Dica**: Use SECURE para ocultar URL da função.`,
    difficulty: 'hard',
    tags: ['external-functions', 'api', 'integration'],
  },

  // ============================================
  // GEOSPATIAL FUNCTIONS
  // ============================================
  {
    id: 'fc-full-41',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'Quais são as funções geoespaciais do Snowflake?',
    back: `**Tipos Geoespaciais**:
- **GEOGRAPHY**: Coordenadas esféricas (lat/long)
- **GEOMETRY**: Coordenadas cartesianas (plano)

**Criar objetos**:
\`\`\`sql
-- Ponto
SELECT ST_POINT(-73.985, 40.748);  -- NYC

-- Do GeoJSON
SELECT ST_GEOGRAPHYFROMGEOJSON('{
  "type": "Point",
  "coordinates": [-73.985, 40.748]
}');

-- Do WKT
SELECT ST_GEOGRAPHYFROMWKT('POINT(-73.985 40.748)');
\`\`\`

**Funções de Medição**:
\`\`\`sql
-- Distância (metros)
SELECT ST_DISTANCE(
  ST_POINT(-73.985, 40.748),  -- NYC
  ST_POINT(-118.243, 34.052)  -- LA
);
-- ~3940 km

-- Área
SELECT ST_AREA(polygon_column) / 1000000 as area_km2
FROM regions;

-- Perímetro
SELECT ST_PERIMETER(polygon_column)
FROM regions;
\`\`\`

**Funções Espaciais**:
\`\`\`sql
-- Contém
SELECT * FROM stores
WHERE ST_CONTAINS(
  (SELECT boundary FROM cities WHERE name = 'NYC'),
  store_location
);

-- Intersecta
SELECT ST_INTERSECTS(region1, region2);

-- Dentro de distância
SELECT * FROM restaurants
WHERE ST_DWITHIN(
  location,
  ST_POINT(-73.985, 40.748),
  1000  -- 1km
);
\`\`\`

**Agregações**:
\`\`\`sql
-- União de geometrias
SELECT ST_UNION_AGG(boundary) as total_area
FROM regions
WHERE country = 'Brazil';

-- Coleta de pontos
SELECT ST_COLLECT(location)
FROM stores;
\`\`\`

**Dica**: Use com Search Optimization para performance.`,
    difficulty: 'hard',
    tags: ['geospatial', 'geography', 'geometry'],
  },

  // ============================================
  // DATA PIPELINE PATTERNS
  // ============================================
  {
    id: 'fc-full-42',
    topicId: 'topic-3-3',
    domainId: 'domain-3',
    front: 'Quais são os padrões de pipeline de dados no Snowflake?',
    back: `**Padrões de Data Pipeline**:

**1. Batch ETL (Tradicional)**:
\`\`\`
Stage → COPY INTO → Transform → Final Table
\`\`\`
\`\`\`sql
-- Carregar raw
COPY INTO raw_sales FROM @stage;

-- Transform
INSERT INTO clean_sales
SELECT * FROM raw_sales
WHERE valid = TRUE;
\`\`\`

**2. Continuous Ingestion (Snowpipe)**:
\`\`\`
Cloud Storage → Snowpipe → Raw Table → Stream → Task → Final
\`\`\`
\`\`\`sql
CREATE PIPE continuous_pipe
  AUTO_INGEST = TRUE
AS COPY INTO raw_table FROM @stage;

CREATE STREAM raw_stream ON TABLE raw_table;

CREATE TASK transform_task
  SCHEDULE = '1 MINUTE'
  WHEN SYSTEM$STREAM_HAS_DATA('raw_stream')
AS
  INSERT INTO final_table
  SELECT * FROM raw_stream;
\`\`\`

**3. CDC (Change Data Capture)**:
\`\`\`
Source → Stream → Task → Target (Merge)
\`\`\`
\`\`\`sql
MERGE INTO target t
USING source_stream s ON t.id = s.id
WHEN MATCHED AND METADATA$ACTION = 'DELETE' THEN DELETE
WHEN MATCHED THEN UPDATE SET t.* = s.*
WHEN NOT MATCHED THEN INSERT VALUES (s.*);
\`\`\`

**4. Data Vault Pattern**:
\`\`\`
Raw → Hub (keys) → Links (relationships) → Satellites (attributes)
\`\`\`

**5. Medallion (Bronze/Silver/Gold)**:
\`\`\`
Bronze: Raw data
Silver: Cleaned, validated
Gold: Aggregated, business-ready
\`\`\`

**Best Practices**:
- Use Streams para CDC
- Tasks encadeados para dependências
- Transações para atomicidade
- Time Travel para recovery`,
    difficulty: 'hard',
    tags: ['pipeline', 'patterns', 'etl'],
  },

  // ============================================
  // ERROR HANDLING EM DATA LOADING
  // ============================================
  {
    id: 'fc-full-43',
    topicId: 'topic-3-2',
    domainId: 'domain-3',
    front: 'Como tratar erros durante carregamento de dados?',
    back: `**Error Handling em COPY INTO**:

**1. ON_ERROR options**:
\`\`\`sql
-- Parar em erro (padrão)
COPY INTO table FROM @stage ON_ERROR = ABORT_STATEMENT;

-- Continuar pulando linhas com erro
COPY INTO table FROM @stage ON_ERROR = CONTINUE;

-- Pular arquivo inteiro se tiver erro
COPY INTO table FROM @stage ON_ERROR = SKIP_FILE;

-- Pular arquivo se exceder X erros
COPY INTO table FROM @stage ON_ERROR = SKIP_FILE_10;
COPY INTO table FROM @stage ON_ERROR = 'SKIP_FILE_5%';
\`\`\`

**2. Validação antes de carregar**:
\`\`\`sql
COPY INTO table FROM @stage
VALIDATION_MODE = 'RETURN_ERRORS';
-- Retorna erros sem carregar

COPY INTO table FROM @stage
VALIDATION_MODE = 'RETURN_ALL_ERRORS';
-- Todos os erros de todos os arquivos
\`\`\`

**3. Ver erros após carga**:
\`\`\`sql
-- Últimos erros do COPY
SELECT * FROM TABLE(VALIDATE(table_name, JOB_ID => '_last'));

-- Por job específico
SELECT * FROM TABLE(VALIDATE(table_name, 
  JOB_ID => '01ab23cd-0000-0000-0000-0000000000'));
\`\`\`

**4. Tabela de erros**:
\`\`\`sql
-- Criar tabela para erros rejeitados
CREATE TABLE load_errors (
  file_name VARCHAR,
  row_number INT,
  error_message VARCHAR,
  raw_data VARIANT,
  load_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
);

-- Em stored procedure, capturar e gravar erros
\`\`\`

**5. Logging de cargas**:
\`\`\`sql
SELECT * FROM TABLE(INFORMATION_SCHEMA.COPY_HISTORY(
  TABLE_NAME => 'my_table',
  START_TIME => DATEADD('hour', -24, CURRENT_TIMESTAMP())
));
\`\`\``,
    difficulty: 'medium',
    tags: ['error-handling', 'copy-into', 'data-loading'],
  },

  // ============================================
  // SCHEMA EVOLUTION
  // ============================================
  {
    id: 'fc-full-44',
    topicId: 'topic-3-2',
    domainId: 'domain-3',
    front: 'O que é Schema Evolution e como funciona?',
    back: `**Schema Evolution**: Evolução automática de schema durante carga.

**Habilitar**:
\`\`\`sql
-- Tabela com evolução de schema
ALTER TABLE my_table SET ENABLE_SCHEMA_EVOLUTION = TRUE;
\`\`\`

**Como funciona**:
- Novas colunas no arquivo → adicionadas à tabela
- Tipos expandidos automaticamente
- Schema evolui sem intervenção manual

**Exemplo**:
\`\`\`sql
-- Tabela original
CREATE TABLE events (
  event_id INT,
  event_type VARCHAR
);
ALTER TABLE events SET ENABLE_SCHEMA_EVOLUTION = TRUE;

-- Carregar arquivo com nova coluna
COPY INTO events FROM @stage/events_v2.json
FILE_FORMAT = (TYPE = 'JSON')
MATCH_BY_COLUMN_NAME = CASE_INSENSITIVE;
-- Coluna 'event_timestamp' é adicionada automaticamente
\`\`\`

**Regras**:
- Colunas podem ser adicionadas
- Tipos podem ser expandidos (INT → BIGINT)
- Colunas NÃO são removidas automaticamente
- Tipos não podem ser reduzidos

**MATCH_BY_COLUMN_NAME**:
\`\`\`sql
-- Necessário para evolução
MATCH_BY_COLUMN_NAME = CASE_INSENSITIVE
MATCH_BY_COLUMN_NAME = CASE_SENSITIVE
MATCH_BY_COLUMN_NAME = NONE  -- Por posição (não evolui)
\`\`\`

**Verificar mudanças**:
\`\`\`sql
DESCRIBE TABLE events;
-- Mostra colunas atuais

SELECT GET_DDL('TABLE', 'events');
-- DDL completo
\`\`\`

**Dica**: Ideal para dados semi-estruturados que evoluem.`,
    difficulty: 'medium',
    tags: ['schema-evolution', 'copy-into', 'semi-structured'],
  },

  // ============================================
  // FILE FORMAT OPTIONS COMPLETAS
  // ============================================
  {
    id: 'fc-full-45',
    topicId: 'topic-3-2',
    domainId: 'domain-3',
    front: 'Quais são todas as opções de FILE FORMAT?',
    back: `**FILE FORMAT Options Completas**:

**CSV**:
\`\`\`sql
CREATE FILE FORMAT csv_format
  TYPE = 'CSV'
  COMPRESSION = AUTO | GZIP | BZ2 | BROTLI | ZSTD | DEFLATE | RAW_DEFLATE | NONE
  RECORD_DELIMITER = '\\n'
  FIELD_DELIMITER = ','
  FILE_EXTENSION = 'csv'
  SKIP_HEADER = 1
  SKIP_BLANK_LINES = TRUE
  DATE_FORMAT = 'YYYY-MM-DD'
  TIME_FORMAT = 'HH24:MI:SS'
  TIMESTAMP_FORMAT = 'YYYY-MM-DD HH24:MI:SS'
  BINARY_FORMAT = HEX | BASE64 | UTF8
  ESCAPE = '\\\\'
  ESCAPE_UNENCLOSED_FIELD = '\\\\'
  TRIM_SPACE = TRUE
  FIELD_OPTIONALLY_ENCLOSED_BY = '"'
  NULL_IF = ('NULL', 'null', '')
  ERROR_ON_COLUMN_COUNT_MISMATCH = TRUE
  EMPTY_FIELD_AS_NULL = TRUE
  ENCODING = 'UTF8';
\`\`\`

**JSON**:
\`\`\`sql
CREATE FILE FORMAT json_format
  TYPE = 'JSON'
  COMPRESSION = AUTO
  DATE_FORMAT = AUTO
  TIME_FORMAT = AUTO
  TIMESTAMP_FORMAT = AUTO
  BINARY_FORMAT = HEX
  TRIM_SPACE = FALSE
  NULL_IF = ()
  ENABLE_OCTAL = FALSE
  ALLOW_DUPLICATE = FALSE
  STRIP_OUTER_ARRAY = TRUE
  STRIP_NULL_VALUES = FALSE
  IGNORE_UTF8_ERRORS = FALSE;
\`\`\`

**PARQUET**:
\`\`\`sql
CREATE FILE FORMAT parquet_format
  TYPE = 'PARQUET'
  COMPRESSION = AUTO | SNAPPY | LZO | NONE
  BINARY_AS_TEXT = TRUE
  TRIM_SPACE = FALSE
  NULL_IF = ();
\`\`\`

**AVRO**:
\`\`\`sql
CREATE FILE FORMAT avro_format
  TYPE = 'AVRO'
  COMPRESSION = AUTO;
\`\`\`

**ORC**:
\`\`\`sql
CREATE FILE FORMAT orc_format
  TYPE = 'ORC'
  TRIM_SPACE = FALSE;
\`\`\``,
    difficulty: 'medium',
    tags: ['file-format', 'csv', 'json', 'parquet'],
  },

  // ============================================
  // LATERAL FLATTEN
  // ============================================
  {
    id: 'fc-full-46',
    topicId: 'topic-1-2',
    domainId: 'domain-1',
    front: 'Qual a diferença entre FLATTEN e LATERAL FLATTEN?',
    back: `**FLATTEN**: Expande arrays/objetos em linhas.

**Sem LATERAL** (na cláusula FROM diretamente):
\`\`\`sql
-- Array simples
SELECT f.value
FROM TABLE(FLATTEN(INPUT => ARRAY_CONSTRUCT(1, 2, 3))) f;

-- Não tem acesso a outras colunas da tabela
\`\`\`

**Com LATERAL** (correlacionado):
\`\`\`sql
-- Correlacionado com tabela
SELECT 
  o.order_id,
  f.value as item
FROM orders o,
LATERAL FLATTEN(INPUT => o.items) f;

-- Equivalente com JOIN
SELECT 
  o.order_id,
  f.value as item
FROM orders o
JOIN LATERAL FLATTEN(INPUT => o.items) f;
\`\`\`

**Quando usar LATERAL**:
- Quando precisa de colunas de outra tabela
- Para correlação com cada linha
- JOINs complexos com arrays

**Exemplo completo**:
\`\`\`sql
-- Dados: orders com items array
SELECT 
  o.order_id,
  o.customer_name,
  f.index as item_number,
  f.value:product_id::INT as product_id,
  f.value:quantity::INT as quantity,
  f.value:price::FLOAT as price
FROM orders o,
LATERAL FLATTEN(INPUT => o.items) f
WHERE f.value:quantity > 1;
\`\`\`

**OUTER => TRUE**:
\`\`\`sql
-- Manter linhas mesmo se array vazio
SELECT 
  o.order_id,
  f.value as item
FROM orders o,
LATERAL FLATTEN(INPUT => o.items, OUTER => TRUE) f;
-- Orders sem items ainda aparecem (item = NULL)
\`\`\`

**Dica**: LATERAL = correlacionado = acesso à linha atual.`,
    difficulty: 'hard',
    tags: ['lateral', 'flatten', 'semi-structured'],
  },

  // ============================================
  // OBJECT_CONSTRUCT E ARRAY_CONSTRUCT
  // ============================================
  {
    id: 'fc-full-47',
    topicId: 'topic-1-2',
    domainId: 'domain-1',
    front: 'Como construir e manipular objetos e arrays?',
    back: `**Construção**:

**OBJECT_CONSTRUCT**:
\`\`\`sql
-- Criar objeto
SELECT OBJECT_CONSTRUCT(
  'name', 'John',
  'age', 30,
  'active', TRUE
);
-- {"age": 30, "active": true, "name": "John"}

-- De colunas
SELECT OBJECT_CONSTRUCT(
  'id', id,
  'full_name', first_name || ' ' || last_name,
  'metadata', metadata_column
) as user_object
FROM users;

-- Sem NULLs
SELECT OBJECT_CONSTRUCT_KEEP_NULL(
  'name', name,
  'phone', phone  -- NULL é mantido
);
\`\`\`

**ARRAY_CONSTRUCT**:
\`\`\`sql
-- Array literal
SELECT ARRAY_CONSTRUCT(1, 2, 3, 4, 5);
-- [1, 2, 3, 4, 5]

-- Array compacto (sem NULLs)
SELECT ARRAY_CONSTRUCT_COMPACT(1, NULL, 3, NULL, 5);
-- [1, 3, 5]

-- De subquery
SELECT ARRAY_AGG(product_name) as products
FROM order_items
GROUP BY order_id;
\`\`\`

**Manipulação de Objetos**:
\`\`\`sql
-- Inserir chave
SELECT OBJECT_INSERT(obj, 'new_key', 'value');

-- Deletar chave
SELECT OBJECT_DELETE(obj, 'key_to_remove');

-- Pegar chaves
SELECT OBJECT_KEYS(obj);
-- ["key1", "key2", "key3"]

-- Pegar valor
SELECT obj:key_name;
SELECT GET(obj, 'key_name');
\`\`\`

**Manipulação de Arrays**:
\`\`\`sql
-- Append
SELECT ARRAY_APPEND(arr, 'new_value');

-- Prepend
SELECT ARRAY_PREPEND(arr, 'first');

-- Concatenar
SELECT ARRAY_CAT(arr1, arr2);

-- Slice
SELECT ARRAY_SLICE(arr, 0, 5);  -- primeiros 5

-- Tamanho
SELECT ARRAY_SIZE(arr);
\`\`\``,
    difficulty: 'medium',
    tags: ['object-construct', 'array-construct', 'semi-structured'],
  },

  // ============================================
  // COLUMN-LEVEL SECURITY
  // ============================================
  {
    id: 'fc-full-48',
    topicId: 'topic-4-1',
    domainId: 'domain-4',
    front: 'Como implementar segurança a nível de coluna?',
    back: `**Column-Level Security**: Controlar acesso por coluna.

**1. Masking Policies** (dados visíveis mas mascarados):
\`\`\`sql
CREATE MASKING POLICY hide_ssn AS (val STRING)
RETURNS STRING ->
  CASE
    WHEN CURRENT_ROLE() IN ('HR_ADMIN') THEN val
    ELSE '***-**-' || RIGHT(val, 4)
  END;

ALTER TABLE employees MODIFY COLUMN ssn 
  SET MASKING POLICY hide_ssn;
\`\`\`

**2. Projection Policies** (esconder coluna):
\`\`\`sql
-- Via Views
CREATE SECURE VIEW public_employees AS
SELECT id, name, department  -- SSN omitido
FROM employees;

-- Dar acesso apenas à view
GRANT SELECT ON VIEW public_employees TO ROLE analyst;
\`\`\`

**3. Usando RBAC + Views**:
\`\`\`sql
CREATE SECURE VIEW employee_view AS
SELECT 
  id,
  name,
  CASE 
    WHEN IS_ROLE_IN_SESSION('HR_ADMIN') THEN salary
    ELSE NULL
  END as salary,
  CASE
    WHEN IS_ROLE_IN_SESSION('HR_ADMIN') THEN ssn
    ELSE '***-**-' || RIGHT(ssn, 4)
  END as ssn
FROM employees;
\`\`\`

**4. Tag-Based Masking** (escalável):
\`\`\`sql
-- Criar tag
CREATE TAG pii_level ALLOWED_VALUES 'none', 'low', 'high';

-- Tagear colunas
ALTER TABLE employees MODIFY COLUMN ssn SET TAG pii_level = 'high';
ALTER TABLE employees MODIFY COLUMN email SET TAG pii_level = 'low';

-- Policy usa tag
CREATE MASKING POLICY pii_mask AS (val STRING)
RETURNS STRING ->
  CASE
    WHEN CURRENT_ROLE() = 'ADMIN' THEN val
    WHEN SYSTEM$GET_TAG_ON_CURRENT_COLUMN('pii_level') = 'high' THEN '***REDACTED***'
    WHEN SYSTEM$GET_TAG_ON_CURRENT_COLUMN('pii_level') = 'low' THEN REGEXP_REPLACE(val, '.', '*')
    ELSE val
  END;
\`\`\``,
    difficulty: 'hard',
    tags: ['column-security', 'masking', 'rbac'],
  },

  // ============================================
  // QUERY ACCELERATION SERVICE
  // ============================================
  {
    id: 'fc-full-49',
    topicId: 'topic-6-2',
    domainId: 'domain-6',
    front: 'O que é Query Acceleration Service e quando usá-lo?',
    back: `**Query Acceleration Service (QAS)**: Recursos adicionais sob demanda.

**Conceito**:
- Identifica queries que se beneficiariam de paralelismo extra
- Aloca recursos serverless adicionais
- Reduz tempo de queries grandes/complexas

**Habilitar**:
\`\`\`sql
ALTER WAREHOUSE my_wh SET 
  ENABLE_QUERY_ACCELERATION = TRUE
  QUERY_ACCELERATION_MAX_SCALE_FACTOR = 8;  -- até 8x recursos
\`\`\`

**Quando é usado automaticamente**:
- Queries com grandes scans
- Agregações em tabelas grandes
- Filtros seletivos em muitos dados

**Queries que se beneficiam**:
- Ad-hoc analytics
- Report generation
- Exploratory queries
- Large GROUP BYs

**Queries que NÃO se beneficiam**:
- Queries pequenas/rápidas
- Queries CPU-bound (UDFs complexas)
- Queries com JOINs muito complexos

**Monitorar uso**:
\`\`\`sql
SELECT 
  query_id,
  QUERY_ACCELERATION_BYTES_SCANNED,
  QUERY_ACCELERATION_PARTITIONS_SCANNED,
  QUERY_ACCELERATION_UPPER_LIMIT_SCALE_FACTOR
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE QUERY_ACCELERATION_BYTES_SCANNED > 0;

-- Verificar se query se beneficiaria
SELECT SYSTEM$ESTIMATE_QUERY_ACCELERATION('query_id');
\`\`\`

**Custo**:
- Serverless credits adicionais
- Pago apenas quando usado
- Pode reduzir custo total (menos tempo = menos compute)

**Dica**: Ideal para warehouses de analytics com queries variáveis.`,
    difficulty: 'medium',
    tags: ['qas', 'query-acceleration', 'performance'],
  },

  // ============================================
  // SECURE VIEWS VS REGULAR VIEWS
  // ============================================
  {
    id: 'fc-full-50',
    topicId: 'topic-4-3',
    domainId: 'domain-4',
    front: 'Qual a diferença entre Secure Views e Regular Views?',
    back: `**Regular View**:
\`\`\`sql
CREATE VIEW regular_view AS
SELECT * FROM sensitive_data WHERE public = TRUE;
\`\`\`
- Definição visível via GET_DDL
- Query Profile mostra detalhes
- Otimizador pode "bypass" a view
- Mais rápida (otimizações completas)

**Secure View**:
\`\`\`sql
CREATE SECURE VIEW secure_view AS
SELECT * FROM sensitive_data WHERE public = TRUE;
\`\`\`
- Definição oculta de usuários
- Query Profile não expõe detalhes internos
- Não pode ser "bypassed"
- Pode ser mais lenta (otimizações limitadas)

**Comparação**:

| Aspecto | Regular | Secure |
|---------|---------|--------|
| Ver definição | Sim | Não (só owner) |
| Query Profile | Detalhado | Mascarado |
| Otimização | Completa | Limitada |
| Performance | Melhor | Pode ser pior |
| Data Sharing | Não pode | Obrigatório |
| Segurança | Menor | Maior |

**Quando usar SECURE**:
- Data Sharing (obrigatório)
- Row-level security
- Ocultar lógica de negócio
- Compliance (PII, PHI)

**Converter**:
\`\`\`sql
-- Para secure
ALTER VIEW my_view SET SECURE;

-- Para regular
ALTER VIEW my_view UNSET SECURE;
\`\`\`

**Secure Materialized View**:
\`\`\`sql
CREATE SECURE MATERIALIZED VIEW secure_mv AS
SELECT * FROM base_table WHERE condition;
\`\`\`

**Secure UDF**:
\`\`\`sql
CREATE SECURE FUNCTION my_func(x INT)
RETURNS INT
AS 'x * secret_multiplier';
\`\`\``,
    difficulty: 'medium',
    tags: ['secure-view', 'views', 'security'],
  },
];

import { StudyContent } from '@/types';

export const studyContent: StudyContent[] = [
  // Domain 1 - SQL & Query Fundamentals
  {
    id: 'study-1-1',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    title: 'Funções de Janela (Window Functions)',
    content: `
## Window Functions no Snowflake

Window functions permitem realizar cálculos em um conjunto de linhas relacionadas à linha atual, sem agrupar os resultados.

### Sintaxe Básica

\`\`\`sql
function_name(expression) OVER (
  [PARTITION BY partition_expression]
  [ORDER BY order_expression]
  [frame_clause]
)
\`\`\`

### Funções de Ranking

| Função | Descrição |
|--------|-----------|
| ROW_NUMBER() | Número único sequencial |
| RANK() | Rank com gaps para empates |
| DENSE_RANK() | Rank sem gaps para empates |
| NTILE(n) | Divide em n grupos |

### Funções de Navegação

| Função | Descrição |
|--------|-----------|
| LAG(col, offset) | Valor de linha anterior |
| LEAD(col, offset) | Valor de linha posterior |
| FIRST_VALUE(col) | Primeiro valor da janela |
| LAST_VALUE(col) | Último valor da janela |

### Frame Specifications

- **ROWS BETWEEN**: Conta linhas físicas
- **RANGE BETWEEN**: Usa valores lógicos
- **UNBOUNDED PRECEDING/FOLLOWING**: Até o início/fim

### Exemplo Prático

\`\`\`sql
SELECT 
  date,
  product,
  revenue,
  -- Ranking
  ROW_NUMBER() OVER (ORDER BY revenue DESC) as rank,
  
  -- Navegação
  LAG(revenue, 1, 0) OVER (ORDER BY date) as prev_revenue,
  
  -- Agregação
  SUM(revenue) OVER (
    PARTITION BY product 
    ORDER BY date 
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) as running_total,
  
  -- Média móvel 7 dias
  AVG(revenue) OVER (
    ORDER BY date 
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) as moving_avg_7d
FROM sales;
\`\`\`
`,
    codeExamples: [
      {
        title: 'Top N por Grupo com QUALIFY',
        code: `-- Top 3 produtos por categoria
SELECT 
  category,
  product_name,
  revenue,
  ROW_NUMBER() OVER (
    PARTITION BY category 
    ORDER BY revenue DESC
  ) as rn
FROM products
QUALIFY rn <= 3;`,
        language: 'sql',
        explanation: 'QUALIFY é exclusivo do Snowflake e filtra resultados de window functions diretamente.',
      },
    ],
    docLinks: [
      'https://docs.snowflake.com/en/sql-reference/functions-analytic',
    ],
  },
  {
    id: 'study-2-1',
    topicId: 'topic-2-1',
    domainId: 'domain-2',
    title: 'Dados Semi-Estruturados',
    content: `
## Trabalhando com Dados Semi-Estruturados

O Snowflake suporta nativamente JSON, Avro, ORC, Parquet e XML através do tipo VARIANT.

### Tipos de Dados

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| VARIANT | Qualquer dado semi-estruturado | JSON, XML, etc |
| OBJECT | Pares chave-valor | {"key": "value"} |
| ARRAY | Lista ordenada | [1, 2, 3] |

### Notação de Acesso

\`\`\`sql
-- Notação de dois pontos (bracket notation)
SELECT data:name::STRING FROM table;

-- Notação de colchetes
SELECT data['name']::STRING FROM table;

-- Acesso aninhado
SELECT data:address:city::STRING FROM table;

-- Acesso a array
SELECT data:items[0]:product::STRING FROM table;
\`\`\`

### Funções Importantes

| Função | Descrição |
|--------|-----------|
| PARSE_JSON() | String → VARIANT |
| TRY_PARSE_JSON() | String → VARIANT (NULL se erro) |
| TO_JSON() | VARIANT → String JSON |
| OBJECT_CONSTRUCT() | Cria objeto |
| ARRAY_CONSTRUCT() | Cria array |
| FLATTEN() | Expande arrays/objetos |

### FLATTEN - A Função Mais Importante

\`\`\`sql
SELECT 
  order_id,
  f.value:product_name::STRING as product,
  f.value:quantity::NUMBER as qty,
  f.value:price::FLOAT as price,
  f.index as item_position
FROM orders,
  LATERAL FLATTEN(input => order_data:items) f;
\`\`\`

### Colunas Retornadas por FLATTEN

- **SEQ**: Número sequencial
- **KEY**: Chave (para objetos)
- **PATH**: Caminho até o elemento
- **INDEX**: Índice do array
- **VALUE**: Valor do elemento
- **THIS**: Elemento pai
`,
    codeExamples: [
      {
        title: 'Construindo JSON',
        code: `SELECT 
  OBJECT_CONSTRUCT(
    'customer_id', customer_id,
    'name', customer_name,
    'orders', ARRAY_AGG(
      OBJECT_CONSTRUCT(
        'order_id', order_id,
        'total', order_total
      )
    )
  ) as customer_json
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY customer_id, customer_name;`,
        language: 'sql',
        explanation: 'Construindo estruturas JSON complexas com agregações.',
      },
    ],
    docLinks: [
      'https://docs.snowflake.com/en/sql-reference/data-types-semistructured',
    ],
  },
  {
    id: 'study-3-1',
    topicId: 'topic-3-1',
    domainId: 'domain-3',
    title: 'Stages e Data Loading',
    content: `
## Stages no Snowflake

Stages são locais de armazenamento para arquivos de dados usados em operações COPY.

### Tipos de Stages

| Tipo | Símbolo | Descrição |
|------|---------|-----------|
| User Stage | @~ | Por usuário, automático |
| Table Stage | @%table | Por tabela, automático |
| Named Stage | @stagename | Criado pelo usuário |
| External Stage | @stagename | Aponta para cloud storage |

### Criando Stages

\`\`\`sql
-- Named Internal Stage
CREATE STAGE my_internal_stage
  FILE_FORMAT = (TYPE = 'CSV');

-- External Stage (S3)
CREATE STAGE my_s3_stage
  URL = 's3://mybucket/path/'
  STORAGE_INTEGRATION = my_integration
  FILE_FORMAT = (TYPE = 'PARQUET');

-- External Stage (Azure)
CREATE STAGE my_azure_stage
  URL = 'azure://account.blob.core.windows.net/container/'
  STORAGE_INTEGRATION = my_azure_integration;
\`\`\`

### Operações com Stages

\`\`\`sql
-- Listar arquivos
LIST @my_stage;
LIST @~/;  -- User stage
LIST @%my_table;  -- Table stage

-- Upload (apenas CLI)
PUT file:///path/to/file.csv @my_stage;

-- Download (apenas CLI)
GET @my_stage/file.csv file:///path/to/;

-- Remover arquivos
REMOVE @my_stage/file.csv;
\`\`\`

### File Formats

\`\`\`sql
CREATE FILE FORMAT my_csv_format
  TYPE = 'CSV'
  FIELD_DELIMITER = ','
  SKIP_HEADER = 1
  NULL_IF = ('NULL', 'null', '')
  EMPTY_FIELD_AS_NULL = TRUE
  FIELD_OPTIONALLY_ENCLOSED_BY = '"';

CREATE FILE FORMAT my_json_format
  TYPE = 'JSON'
  STRIP_OUTER_ARRAY = TRUE;
\`\`\`
`,
    codeExamples: [
      {
        title: 'COPY INTO com Transformações',
        code: `COPY INTO my_table (col1, col2, col3, load_date)
FROM (
  SELECT 
    $1,
    UPPER($2),
    TRY_TO_NUMBER($3),
    CURRENT_TIMESTAMP()
  FROM @my_stage/data.csv
)
FILE_FORMAT = (TYPE = 'CSV' SKIP_HEADER = 1)
ON_ERROR = 'CONTINUE';`,
        language: 'sql',
        explanation: 'Carregando dados com transformações inline.',
      },
    ],
    docLinks: [
      'https://docs.snowflake.com/en/user-guide/data-load-overview',
    ],
  },
  {
    id: 'study-4-1',
    topicId: 'topic-4-3',
    domainId: 'domain-4',
    title: 'Streams e Tasks para CDC',
    content: `
## Change Data Capture com Streams

Streams capturam mudanças (INSERT, UPDATE, DELETE) em tabelas.

### Criando Streams

\`\`\`sql
-- Stream padrão (INSERT, UPDATE, DELETE)
CREATE STREAM my_stream ON TABLE my_table;

-- Stream append-only (apenas INSERT)
CREATE STREAM my_append_stream ON TABLE my_table
  APPEND_ONLY = TRUE;

-- Stream em view
CREATE STREAM my_view_stream ON VIEW my_view;
\`\`\`

### Colunas de Metadados

| Coluna | Descrição |
|--------|-----------|
| METADATA$ACTION | 'INSERT' ou 'DELETE' |
| METADATA$ISUPDATE | TRUE se parte de UPDATE |
| METADATA$ROW_ID | ID único da mudança |

### Consumindo Streams

\`\`\`sql
-- Verificar se tem dados
SELECT SYSTEM$STREAM_HAS_DATA('my_stream');

-- Consultar mudanças
SELECT * FROM my_stream;

-- Stream é consumido automaticamente em DML
INSERT INTO target_table
SELECT * FROM my_stream;
\`\`\`

## Tasks para Automação

Tasks executam SQL em schedule ou quando acionadas.

\`\`\`sql
CREATE TASK my_task
  WAREHOUSE = my_warehouse
  SCHEDULE = 'USING CRON 0 * * * * UTC'  -- A cada hora
  -- OU: SCHEDULE = '60 MINUTE'
AS
  INSERT INTO summary_table
  SELECT date, SUM(amount) FROM transactions
  GROUP BY date;

-- Task com condição
CREATE TASK process_changes
  WAREHOUSE = my_warehouse
  SCHEDULE = '1 MINUTE'
  WHEN SYSTEM$STREAM_HAS_DATA('my_stream')
AS
  MERGE INTO target USING my_stream source ...;

-- Ativar task
ALTER TASK my_task RESUME;

-- Desativar task
ALTER TASK my_task SUSPEND;
\`\`\`

### Task Trees (DAGs)

\`\`\`sql
-- Task raiz
CREATE TASK parent_task
  WAREHOUSE = my_wh
  SCHEDULE = '1 HOUR'
AS SELECT 1;

-- Tasks filhas (executam após parent)
CREATE TASK child_task_1
  WAREHOUSE = my_wh
  AFTER parent_task
AS SELECT 2;

CREATE TASK child_task_2
  WAREHOUSE = my_wh
  AFTER parent_task
AS SELECT 3;

-- Ativar (de baixo para cima, então ativa o root)
ALTER TASK child_task_1 RESUME;
ALTER TASK child_task_2 RESUME;
ALTER TASK parent_task RESUME;
\`\`\`
`,
    codeExamples: [
      {
        title: 'Pipeline CDC Completo',
        code: `-- 1. Stream na tabela fonte
CREATE STREAM orders_stream ON TABLE orders;

-- 2. Task que processa mudanças
CREATE TASK sync_orders
  WAREHOUSE = etl_wh
  SCHEDULE = '5 MINUTE'
  WHEN SYSTEM$STREAM_HAS_DATA('orders_stream')
AS
MERGE INTO orders_warehouse t
USING (
  SELECT * FROM orders_stream
  WHERE METADATA$ACTION = 'INSERT'
     OR METADATA$ISUPDATE = TRUE
) s
ON t.order_id = s.order_id
WHEN MATCHED THEN UPDATE SET 
  t.status = s.status,
  t.updated_at = s.updated_at
WHEN NOT MATCHED THEN INSERT 
  (order_id, customer_id, status, created_at)
  VALUES (s.order_id, s.customer_id, s.status, s.created_at);

ALTER TASK sync_orders RESUME;`,
        language: 'sql',
        explanation: 'Pipeline completo de CDC com Stream e Task.',
      },
    ],
    docLinks: [
      'https://docs.snowflake.com/en/user-guide/streams',
      'https://docs.snowflake.com/en/user-guide/tasks-intro',
    ],
  },
  {
    id: 'study-6-1',
    topicId: 'topic-6-1',
    domainId: 'domain-6',
    title: 'Virtual Warehouses e Otimização',
    content: `
## Virtual Warehouses

Warehouses são clusters de compute para executar queries.

### Tamanhos de Warehouse

| Tamanho | Créditos/Hora | Servidores |
|---------|---------------|------------|
| X-Small | 1 | 1 |
| Small | 2 | 2 |
| Medium | 4 | 4 |
| Large | 8 | 8 |
| X-Large | 16 | 16 |
| 2X-Large | 32 | 32 |
| ... | ... | ... |

### Configurações Importantes

\`\`\`sql
CREATE WAREHOUSE my_warehouse
  WAREHOUSE_SIZE = 'MEDIUM'
  AUTO_SUSPEND = 300          -- Segundos (5 min)
  AUTO_RESUME = TRUE
  INITIALLY_SUSPENDED = TRUE
  MIN_CLUSTER_COUNT = 1       -- Multi-cluster
  MAX_CLUSTER_COUNT = 3
  SCALING_POLICY = 'STANDARD'; -- ou 'ECONOMY'
\`\`\`

### Scaling Policies

- **STANDARD**: Escala rapidamente, prioriza performance
- **ECONOMY**: Escala conservadoramente, prioriza custo

### Resource Monitors

\`\`\`sql
CREATE RESOURCE MONITOR monthly_quota
  WITH CREDIT_QUOTA = 1000
  FREQUENCY = MONTHLY
  START_TIMESTAMP = IMMEDIATELY
  TRIGGERS
    ON 50 PERCENT DO NOTIFY
    ON 75 PERCENT DO NOTIFY
    ON 100 PERCENT DO SUSPEND;

ALTER WAREHOUSE my_warehouse SET RESOURCE_MONITOR = monthly_quota;
\`\`\`

### Query Acceleration Service

Para queries que escalam além do warehouse:

\`\`\`sql
ALTER WAREHOUSE my_warehouse SET 
  ENABLE_QUERY_ACCELERATION = TRUE
  QUERY_ACCELERATION_MAX_SCALE_FACTOR = 8;
\`\`\`

## Otimização de Custos

1. **Auto-suspend**: Configure tempo apropriado (60-300s)
2. **Tamanho correto**: Comece pequeno, aumente se necessário
3. **Multi-cluster**: Para alta concorrência
4. **Resource monitors**: Controle gastos
5. **Result caching**: Queries repetidas são grátis
`,
    codeExamples: [
      {
        title: 'Monitorando Uso de Créditos',
        code: `-- Uso por warehouse nos últimos 30 dias
SELECT 
  warehouse_name,
  SUM(credits_used) as total_credits,
  SUM(credits_used_cloud_services) as cloud_credits,
  SUM(credits_used_compute) as compute_credits
FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY
WHERE start_time >= DATEADD('day', -30, CURRENT_TIMESTAMP())
GROUP BY warehouse_name
ORDER BY total_credits DESC;

-- Queries mais caras
SELECT 
  query_id,
  query_text,
  warehouse_name,
  total_elapsed_time/1000 as seconds,
  bytes_scanned/1e9 as gb_scanned,
  credits_used_cloud_services
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE start_time >= DATEADD('day', -7, CURRENT_TIMESTAMP())
ORDER BY total_elapsed_time DESC
LIMIT 20;`,
        language: 'sql',
        explanation: 'Consultas para monitorar custos e identificar queries caras.',
      },
    ],
    docLinks: [
      'https://docs.snowflake.com/en/user-guide/warehouses',
    ],
  },
];

export const getStudyContentByTopic = (topicId: string): StudyContent[] => {
  return studyContent.filter((s) => s.topicId === topicId);
};

export const getStudyContentByDomain = (domainId: string): StudyContent[] => {
  return studyContent.filter((s) => s.domainId === domainId);
};

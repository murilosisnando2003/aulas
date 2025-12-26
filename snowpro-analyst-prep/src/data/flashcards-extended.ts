import { Flashcard } from '@/types';

// Flashcards adicionais para aumentar a cobertura do conteúdo
export const flashcardsExtended: Flashcard[] = [
  // Mais cards de Domain 1
  {
    id: 'fc-1-1-5',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'Como usar FIRST_VALUE e LAST_VALUE corretamente?',
    back: `**FIRST_VALUE()**: Retorna o primeiro valor na janela.
**LAST_VALUE()**: Retorna o último valor na janela.

**Atenção com LAST_VALUE**: O frame padrão é \`RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\`, então LAST_VALUE pode não retornar o esperado!

\`\`\`sql
-- LAST_VALUE "errado" (frame padrão)
SELECT 
  product,
  revenue,
  LAST_VALUE(revenue) OVER (ORDER BY revenue) as last_val
FROM sales;
-- Retorna o valor da linha atual!

-- LAST_VALUE correto
SELECT 
  product,
  revenue,
  LAST_VALUE(revenue) OVER (
    ORDER BY revenue
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  ) as last_val
FROM sales;
-- Agora retorna o último valor real
\`\`\`

**Dica**: Sempre especifique o frame para LAST_VALUE!`,
    difficulty: 'hard',
    tags: ['window-functions', 'frame'],
  },
  {
    id: 'fc-1-1-6',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'O que é NTILE() e como usá-lo?',
    back: `**NTILE(n)**: Divide as linhas em N grupos (buckets) de tamanho aproximadamente igual.

Cada linha recebe um número de 1 a N indicando seu grupo.

\`\`\`sql
-- Dividir em quartis (4 grupos)
SELECT 
  product,
  revenue,
  NTILE(4) OVER (ORDER BY revenue DESC) as quartile
FROM sales;

-- Dividir em percentis (100 grupos)
SELECT 
  product,
  revenue,
  NTILE(100) OVER (ORDER BY revenue DESC) as percentile
FROM sales;

-- Por partição
SELECT 
  region,
  product,
  revenue,
  NTILE(3) OVER (
    PARTITION BY region 
    ORDER BY revenue DESC
  ) as tercile
FROM sales;
\`\`\`

**Casos de uso**:
- Segmentação de clientes (top 10%, médios, baixos)
- Análise de distribuição
- Identificação de outliers`,
    difficulty: 'medium',
    tags: ['window-functions', 'analytics'],
  },
  {
    id: 'fc-1-2-2',
    topicId: 'topic-1-2',
    domainId: 'domain-1',
    front: 'Qual a diferença entre subquery correlacionada e não correlacionada?',
    back: `**Subquery NÃO Correlacionada**:
- Executa uma vez, independente da query externa
- Resultado é usado para todas as linhas

\`\`\`sql
-- Não correlacionada
SELECT * FROM orders
WHERE amount > (SELECT AVG(amount) FROM orders);
-- A média é calculada uma vez
\`\`\`

**Subquery Correlacionada**:
- Executa para CADA linha da query externa
- Referencia colunas da query externa
- Geralmente mais lenta

\`\`\`sql
-- Correlacionada
SELECT * FROM orders o
WHERE amount > (
  SELECT AVG(amount) FROM orders 
  WHERE customer_id = o.customer_id  -- Referência externa
);
-- A média é calculada para cada cliente
\`\`\`

**Performance**: 
- Não correlacionadas geralmente são mais rápidas
- Considere usar JOINs ou CTEs para evitar subqueries correlacionadas`,
    difficulty: 'medium',
    tags: ['subquery', 'performance'],
  },
  {
    id: 'fc-1-3-2',
    topicId: 'topic-1-3',
    domainId: 'domain-1',
    front: 'Qual a diferença entre UNION e UNION ALL?',
    back: `**UNION ALL**:
- Combina todos os resultados
- Inclui duplicatas
- Mais rápido (sem deduplicação)

**UNION**:
- Combina resultados removendo duplicatas
- Mais lento (precisa deduplicar)

\`\`\`sql
-- UNION ALL: pode ter duplicatas
SELECT name FROM customers_us
UNION ALL
SELECT name FROM customers_eu;

-- UNION: remove duplicatas
SELECT name FROM customers_us
UNION
SELECT name FROM customers_eu;
\`\`\`

**Regras**:
- Mesmo número de colunas
- Tipos de dados compatíveis
- Nomes de coluna vêm da primeira query

**Outras operações de conjunto**:
\`\`\`sql
-- Interseção (em ambos)
SELECT * FROM a INTERSECT SELECT * FROM b;

-- Diferença (em A mas não em B)
SELECT * FROM a EXCEPT SELECT * FROM b;
-- ou MINUS (sinônimo)
SELECT * FROM a MINUS SELECT * FROM b;
\`\`\`

**Dica**: Use UNION ALL quando souber que não há duplicatas ou quando duplicatas são aceitáveis.`,
    difficulty: 'easy',
    tags: ['set-operations', 'union'],
  },
  // Mais cards de Domain 2
  {
    id: 'fc-2-1-3',
    topicId: 'topic-2-1',
    domainId: 'domain-2',
    front: 'Como verificar o tipo de um valor VARIANT?',
    back: `Use **TYPEOF()** ou funções **IS_***:

**TYPEOF()**:
\`\`\`sql
SELECT 
  col,
  TYPEOF(col)  -- Retorna: 'NULL_VALUE', 'BOOLEAN', 'INTEGER', 'DOUBLE', 'VARCHAR', 'ARRAY', 'OBJECT'
FROM my_table;
\`\`\`

**Funções IS_***:
\`\`\`sql
SELECT 
  col,
  IS_NULL_VALUE(col),   -- NULL JSON (diferente de SQL NULL!)
  IS_BOOLEAN(col),
  IS_INTEGER(col),
  IS_DOUBLE(col),
  IS_DECIMAL(col),
  IS_CHAR(col),         -- String
  IS_ARRAY(col),
  IS_OBJECT(col)
FROM my_table;
\`\`\`

**Diferença importante - NULL**:
\`\`\`sql
-- NULL JSON vs SQL NULL
SELECT 
  PARSE_JSON('null'),           -- JSON null
  PARSE_JSON('{"a": null}'):a,  -- JSON null
  NULL;                          -- SQL NULL

-- Para verificar:
SELECT 
  IS_NULL_VALUE(PARSE_JSON('null')),  -- TRUE
  PARSE_JSON('null') IS NULL;          -- FALSE (é um valor!)
\`\`\``,
    difficulty: 'medium',
    tags: ['variant', 'type-checking'],
  },
  {
    id: 'fc-2-1-4',
    topicId: 'topic-2-1',
    domainId: 'domain-2',
    front: 'Como trabalhar com ARRAY_AGG e OBJECT_AGG?',
    back: `**ARRAY_AGG**: Agrega valores em um array.

\`\`\`sql
-- Array simples
SELECT 
  customer_id,
  ARRAY_AGG(product_name) as products
FROM orders
GROUP BY customer_id;

-- Com ordenação
SELECT 
  customer_id,
  ARRAY_AGG(product_name) WITHIN GROUP (ORDER BY order_date) as products
FROM orders
GROUP BY customer_id;

-- Distinct
SELECT 
  customer_id,
  ARRAY_AGG(DISTINCT product_category) as categories
FROM orders
GROUP BY customer_id;
\`\`\`

**OBJECT_AGG**: Agrega pares chave-valor em um objeto.

\`\`\`sql
-- Criar objeto de configurações
SELECT 
  user_id,
  OBJECT_AGG(setting_key, setting_value) as settings
FROM user_settings
GROUP BY user_id;

-- Resultado: {"theme": "dark", "language": "pt", ...}
\`\`\`

**Funções de manipulação de array**:
\`\`\`sql
SELECT 
  ARRAY_SIZE(my_array),
  ARRAY_CONTAINS('value'::VARIANT, my_array),
  ARRAY_POSITION('value'::VARIANT, my_array),
  ARRAY_SLICE(my_array, 0, 3),
  ARRAY_COMPACT(my_array)  -- Remove NULLs
FROM table;
\`\`\``,
    difficulty: 'medium',
    tags: ['array', 'aggregation'],
  },
  {
    id: 'fc-2-2-2',
    topicId: 'topic-2-2',
    domainId: 'domain-2',
    front: 'Como usar UNPIVOT para transformar colunas em linhas?',
    back: `**UNPIVOT**: Transforma colunas em linhas (oposto do PIVOT).

**Sintaxe**:
\`\`\`sql
SELECT * FROM table
UNPIVOT (
  value_column FOR name_column IN (col1, col2, col3)
);
\`\`\`

**Exemplo**:
\`\`\`sql
-- Dados originais: year, q1_sales, q2_sales, q3_sales, q4_sales
CREATE TABLE quarterly (
  year INT, q1_sales INT, q2_sales INT, q3_sales INT, q4_sales INT
);
INSERT INTO quarterly VALUES (2024, 100, 150, 200, 180);

-- UNPIVOT
SELECT * FROM quarterly
UNPIVOT (
  sales FOR quarter IN (q1_sales, q2_sales, q3_sales, q4_sales)
);

-- Resultado:
-- year | quarter    | sales
-- 2024 | Q1_SALES   | 100
-- 2024 | Q2_SALES   | 150
-- 2024 | Q3_SALES   | 200
-- 2024 | Q4_SALES   | 180
\`\`\`

**Com rename**:
\`\`\`sql
SELECT 
  year,
  REPLACE(quarter, '_SALES', '') as quarter,
  sales
FROM quarterly
UNPIVOT (sales FOR quarter IN (q1_sales, q2_sales, q3_sales, q4_sales));
\`\`\`

**Dica**: NULLs são excluídos por padrão. Trate antes do UNPIVOT se necessário.`,
    difficulty: 'medium',
    tags: ['unpivot', 'transformation'],
  },
  // Mais cards de Domain 3
  {
    id: 'fc-3-2-2',
    topicId: 'topic-3-2',
    domainId: 'domain-3',
    front: 'Quais são as opções de ON_ERROR no COPY INTO?',
    back: `**ON_ERROR** controla o comportamento quando erros são encontrados:

| Opção | Comportamento |
|-------|--------------|
| **ABORT_STATEMENT** | Para tudo, nenhum dado é carregado (padrão) |
| **CONTINUE** | Continua carregando, pula linhas com erro |
| **SKIP_FILE** | Pula o arquivo inteiro com erro |
| **SKIP_FILE_n** | Pula arquivo se erros > n |
| **SKIP_FILE_n%** | Pula arquivo se % erros > n |

\`\`\`sql
-- Continuar mesmo com erros
COPY INTO my_table FROM @my_stage
  ON_ERROR = 'CONTINUE';

-- Pular arquivo se mais de 10 erros
COPY INTO my_table FROM @my_stage
  ON_ERROR = 'SKIP_FILE_10';

-- Pular arquivo se mais de 5% de erros
COPY INTO my_table FROM @my_stage
  ON_ERROR = 'SKIP_FILE_5%';
\`\`\`

**Ver erros**:
\`\`\`sql
-- Validar antes de carregar
COPY INTO my_table FROM @my_stage
  VALIDATION_MODE = 'RETURN_ALL_ERRORS';

-- Ou retornar N linhas
COPY INTO my_table FROM @my_stage
  VALIDATION_MODE = 'RETURN_10_ROWS';
\`\`\``,
    difficulty: 'medium',
    tags: ['copy-into', 'error-handling'],
  },
  {
    id: 'fc-3-3-2',
    topicId: 'topic-3-3',
    domainId: 'domain-3',
    front: 'Como monitorar o status do Snowpipe?',
    back: `**Verificar status do Pipe**:
\`\`\`sql
-- Status atual
SELECT SYSTEM$PIPE_STATUS('my_database.my_schema.my_pipe');

-- Retorna JSON com:
-- executionState: RUNNING, PAUSED, STALLED, etc.
-- pendingFileCount: arquivos aguardando
-- lastIngestedTimestamp: última ingestão
\`\`\`

**Histórico de ingestão**:
\`\`\`sql
-- Via INFORMATION_SCHEMA
SELECT * FROM TABLE(
  INFORMATION_SCHEMA.COPY_HISTORY(
    TABLE_NAME => 'my_table',
    START_TIME => DATEADD('hour', -24, CURRENT_TIMESTAMP())
  )
);

-- Via ACCOUNT_USAGE (até 365 dias)
SELECT * 
FROM SNOWFLAKE.ACCOUNT_USAGE.COPY_HISTORY
WHERE pipe_name = 'MY_PIPE'
  AND LOAD_TIME > DATEADD('day', -7, CURRENT_TIMESTAMP());
\`\`\`

**Verificar erros**:
\`\`\`sql
-- Arquivos com erro
SELECT *
FROM TABLE(
  VALIDATE_PIPE_LOAD(
    PIPE_NAME => 'my_pipe',
    START_TIME => DATEADD('hour', -24, CURRENT_TIMESTAMP())
  )
);
\`\`\`

**Refresh manual** (para arquivos perdidos):
\`\`\`sql
ALTER PIPE my_pipe REFRESH;

-- Com prefixo específico
ALTER PIPE my_pipe REFRESH PREFIX = 'path/to/';
\`\`\``,
    difficulty: 'hard',
    tags: ['snowpipe', 'monitoring'],
  },
  // Mais cards de Domain 4
  {
    id: 'fc-4-1-2',
    topicId: 'topic-4-1',
    domainId: 'domain-4',
    front: 'Quais são as limitações de Materialized Views?',
    back: `**Limitações de Materialized Views no Snowflake**:

**Não suportam**:
- JOINs
- Subqueries
- UDFs
- Funções não-determinísticas (CURRENT_TIMESTAMP, RANDOM)
- HAVING clause
- ORDER BY
- LIMIT
- Window functions
- DISTINCT (em alguns casos)
- GROUP BY em colunas não-agregadas

**Outras restrições**:
- Apenas uma tabela base
- Tabela base não pode ser externa
- Não pode ter Time Travel desabilitado
- Custo de storage e manutenção

**Suportam**:
- Agregações simples (SUM, COUNT, AVG, MIN, MAX)
- GROUP BY
- WHERE (filtros simples)
- Expressões determinísticas

\`\`\`sql
-- Válido
CREATE MATERIALIZED VIEW mv_sales AS
SELECT 
  date_trunc('day', sale_date) as day,
  region,
  SUM(amount) as total,
  COUNT(*) as cnt
FROM sales
WHERE status = 'completed'
GROUP BY 1, 2;

-- Inválido (tem JOIN)
CREATE MATERIALIZED VIEW mv_invalid AS
SELECT s.*, c.name
FROM sales s JOIN customers c ON s.cust_id = c.id;
\`\`\`

**Alternativa para JOINs**: Crie tabela pré-processada com Stream/Task.`,
    difficulty: 'hard',
    tags: ['materialized-views', 'limitations'],
  },
  {
    id: 'fc-4-2-2',
    topicId: 'topic-4-2',
    domainId: 'domain-4',
    front: 'Como criar uma UDTF (Table Function)?',
    back: `**UDTF**: Função que retorna uma tabela (múltiplas linhas).

**JavaScript UDTF**:
\`\`\`sql
CREATE FUNCTION split_text(input STRING, delimiter STRING)
RETURNS TABLE (word STRING, position INT)
LANGUAGE JAVASCRIPT
AS \$\$
{
  processRow: function(row, rowWriter, context) {
    var words = row.INPUT.split(row.DELIMITER);
    for (var i = 0; i < words.length; i++) {
      rowWriter.writeRow({WORD: words[i], POSITION: i});
    }
  }
}
\$\$;

-- Uso
SELECT * FROM TABLE(split_text('a,b,c', ','));
\`\`\`

**SQL UDTF (via subquery)**:
\`\`\`sql
CREATE FUNCTION get_top_products(category_id INT, n INT)
RETURNS TABLE (product_name VARCHAR, revenue NUMBER)
AS
\$\$
  SELECT product_name, SUM(amount) as revenue
  FROM sales
  WHERE category = category_id
  GROUP BY product_name
  ORDER BY revenue DESC
  LIMIT n
\$\$;

-- Uso
SELECT * FROM TABLE(get_top_products(1, 5));

-- Com LATERAL para cada linha
SELECT c.category_name, p.*
FROM categories c,
  LATERAL TABLE(get_top_products(c.category_id, 3)) p;
\`\`\`

**Python UDTF** (Snowpark):
\`\`\`python
@udtf(output_schema=["word", "position"])
class SplitText:
    def process(self, text: str, delimiter: str):
        for i, word in enumerate(text.split(delimiter)):
            yield (word, i)
\`\`\``,
    difficulty: 'hard',
    tags: ['udtf', 'programming'],
  },
  {
    id: 'fc-4-3-2',
    topicId: 'topic-4-3',
    domainId: 'domain-4',
    front: 'Quais são os tipos de Streams disponíveis?',
    back: `**Tipos de Stream**:

| Tipo | Captura | Uso |
|------|---------|-----|
| **Standard** | INSERT, UPDATE, DELETE | CDC completo |
| **Append-only** | Apenas INSERT | Logs, eventos |

\`\`\`sql
-- Stream padrão
CREATE STREAM std_stream ON TABLE my_table;

-- Stream append-only
CREATE STREAM append_stream ON TABLE my_table
  APPEND_ONLY = TRUE;
\`\`\`

**Como UPDATE é representado**:
- Standard: DELETE da linha antiga + INSERT da linha nova
- METADATA$ISUPDATE = TRUE para ambas

\`\`\`sql
-- Identificando tipo de mudança
SELECT 
  *,
  CASE 
    WHEN METADATA$ACTION = 'INSERT' AND NOT METADATA$ISUPDATE THEN 'INSERT'
    WHEN METADATA$ACTION = 'DELETE' AND NOT METADATA$ISUPDATE THEN 'DELETE'
    WHEN METADATA$ISUPDATE THEN 'UPDATE'
  END as change_type
FROM my_stream;
\`\`\`

**Streams em Views**:
\`\`\`sql
-- Funciona em views (captura mudanças das tabelas base)
CREATE STREAM view_stream ON VIEW my_view;
\`\`\`

**Stale Streams**:
- Stream fica "stale" se dados mudam além do período de retenção
- Solução: recriar o stream

\`\`\`sql
-- Verificar se stream está stale
SHOW STREAMS LIKE 'my_stream';
-- Olhar coluna STALE
\`\`\``,
    difficulty: 'hard',
    tags: ['streams', 'cdc'],
  },
  {
    id: 'fc-4-4-2',
    topicId: 'topic-4-4',
    domainId: 'domain-4',
    front: 'Como clonar objetos com Time Travel?',
    back: `**Clone com Time Travel**: Cria cópia de objeto em ponto específico no tempo.

\`\`\`sql
-- Clone de tabela no tempo atual
CREATE TABLE my_clone CLONE my_table;

-- Clone em timestamp específico
CREATE TABLE my_clone CLONE my_table
  AT(TIMESTAMP => '2024-01-15 10:00:00'::TIMESTAMP);

-- Clone com offset (5 minutos atrás)
CREATE TABLE my_clone CLONE my_table
  AT(OFFSET => -300);

-- Clone antes de uma query específica
CREATE TABLE my_clone CLONE my_table
  BEFORE(STATEMENT => '<query_id>');
\`\`\`

**Clone de Schema e Database**:
\`\`\`sql
-- Clone de schema inteiro
CREATE SCHEMA my_schema_backup CLONE my_schema
  AT(TIMESTAMP => '2024-01-15 10:00:00'::TIMESTAMP);

-- Clone de database inteiro
CREATE DATABASE my_db_backup CLONE my_database
  AT(TIMESTAMP => '2024-01-15 10:00:00'::TIMESTAMP);
\`\`\`

**Características do Clone**:
- **Zero-copy**: Não duplica dados físicos
- Custo de storage apenas para mudanças
- Clone é independente do original
- Herda grants (opcional)

\`\`\`sql
-- Clone sem copiar grants
CREATE TABLE my_clone CLONE my_table
  COPY GRANTS;  -- ou sem este parâmetro
\`\`\`

**Dica**: Use clones para ambientes de dev/test ou para restauração rápida.`,
    difficulty: 'medium',
    tags: ['clone', 'time-travel'],
  },
  // Mais cards de Domain 5
  {
    id: 'fc-5-2-1',
    topicId: 'topic-5-2',
    domainId: 'domain-5',
    front: 'Quais são as funções de contexto mais usadas?',
    back: `**Funções de Contexto** retornam informações sobre a sessão atual:

| Função | Retorno |
|--------|---------|
| CURRENT_ACCOUNT() | Nome da conta |
| CURRENT_USER() | Nome do usuário |
| CURRENT_ROLE() | Role ativa |
| CURRENT_DATABASE() | Database atual |
| CURRENT_SCHEMA() | Schema atual |
| CURRENT_WAREHOUSE() | Warehouse atual |
| CURRENT_SESSION() | ID da sessão |
| CURRENT_TIMESTAMP() | Timestamp atual |
| CURRENT_DATE | Data atual |
| CURRENT_TIME | Hora atual |

\`\`\`sql
SELECT 
  CURRENT_ACCOUNT() as account,
  CURRENT_USER() as user,
  CURRENT_ROLE() as role,
  CURRENT_DATABASE() as db,
  CURRENT_SCHEMA() as schema,
  CURRENT_WAREHOUSE() as wh,
  CURRENT_TIMESTAMP() as ts;
\`\`\`

**Funções de região**:
\`\`\`sql
SELECT 
  CURRENT_REGION(),           -- Região do cloud
  CURRENT_AVAILABLE_ROLES(),  -- Roles disponíveis
  CURRENT_SECONDARY_ROLES();  -- Secondary roles
\`\`\`

**Uso comum em Row-Level Security**:
\`\`\`sql
CREATE VIEW secure_data AS
SELECT * FROM sensitive_data
WHERE tenant_id = CURRENT_ACCOUNT()
   OR owner = CURRENT_USER();
\`\`\``,
    difficulty: 'easy',
    tags: ['context-functions', 'session'],
  },
  // Mais cards de Domain 6
  {
    id: 'fc-6-2-2',
    topicId: 'topic-6-2',
    domainId: 'domain-6',
    front: 'O que é Search Optimization Service?',
    back: `**Search Optimization Service**: Acelera queries de ponto (equality e IN) em tabelas grandes.

**Quando usar**:
- Tabelas muito grandes (TB+)
- Queries frequentes com filtros de igualdade
- Colunas de alta cardinalidade
- Padrão de acesso de "agulha no palheiro"

\`\`\`sql
-- Habilitar na tabela
ALTER TABLE my_table ADD SEARCH OPTIMIZATION;

-- Em colunas específicas
ALTER TABLE my_table ADD SEARCH OPTIMIZATION 
  ON EQUALITY(col1, col2);

-- Verificar status
SHOW TABLES LIKE 'my_table';
-- Olhar coluna SEARCH_OPTIMIZATION

-- Desabilitar
ALTER TABLE my_table DROP SEARCH OPTIMIZATION;
\`\`\`

**Queries beneficiadas**:
\`\`\`sql
-- Equality
SELECT * FROM orders WHERE order_id = 'ORD-123456';

-- IN clause
SELECT * FROM orders WHERE order_id IN ('ORD-1', 'ORD-2', 'ORD-3');

-- Substring/LIKE
SELECT * FROM logs WHERE message LIKE '%ERROR%';
\`\`\`

**Custo**:
- Custo de manutenção (storage + compute background)
- Monitorar via SEARCH_OPTIMIZATION_HISTORY

\`\`\`sql
SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.SEARCH_OPTIMIZATION_HISTORY
WHERE TABLE_NAME = 'MY_TABLE';
\`\`\`

**Diferença de Clustering**: Clustering melhora range scans, Search Optimization melhora point lookups.`,
    difficulty: 'hard',
    tags: ['search-optimization', 'performance'],
  },
  {
    id: 'fc-6-3-2',
    topicId: 'topic-6-3',
    domainId: 'domain-6',
    front: 'Como analisar o Query Profile para otimização?',
    back: `**Query Profile**: Ferramenta visual para análise de execução de queries.

**Acessando**:
1. Execute query
2. Clique em Query ID
3. Vá para "Query Profile"

**Métricas importantes**:

| Métrica | Significado |
|---------|-------------|
| **Partitions scanned** | Micro-partitions lidas |
| **Partitions total** | Total de partitions |
| **Bytes scanned** | Dados lidos |
| **Bytes sent over network** | Dados transferidos |
| **Spillage** | Dados em disco (ruim!) |
| **Percentage scanned** | Eficiência de pruning |

**Problemas comuns**:

**1. Spilling** (usar disco):
- Aumentar warehouse
- Otimizar query (filtrar antes)
- Reduzir cardinalidade de JOINs

**2. Exploding JOINs**:
- Verificar cardinalidade
- Adicionar condições de JOIN
- Usar subqueries com LIMIT

**3. Pruning ruim** (scanned/total alto):
- Adicionar filtros em clustering keys
- Considerar clustering

\`\`\`sql
-- Ver estatísticas de pruning
SELECT 
  query_id,
  partitions_scanned,
  partitions_total,
  bytes_scanned,
  bytes_spilled_to_local_storage,
  bytes_spilled_to_remote_storage
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE query_id = '<your_query_id>';
\`\`\`

**Dica**: Compare "Partitions scanned" vs "Partitions total" para avaliar eficiência.`,
    difficulty: 'medium',
    tags: ['query-profile', 'optimization'],
  },
];

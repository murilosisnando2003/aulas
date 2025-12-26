import { Flashcard } from '@/types';

export const flashcards: Flashcard[] = [
  // Domain 1 - SQL & Query Fundamentals
  {
    id: 'fc-1-1-1',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'Qual é a diferença entre ROW_NUMBER(), RANK() e DENSE_RANK()?',
    back: `**ROW_NUMBER()**: Atribui um número único sequencial a cada linha, sem duplicatas.

**RANK()**: Atribui o mesmo número para valores iguais, mas pula posições (1, 2, 2, 4).

**DENSE_RANK()**: Atribui o mesmo número para valores iguais, mas NÃO pula posições (1, 2, 2, 3).

\`\`\`sql
SELECT 
  name, score,
  ROW_NUMBER() OVER (ORDER BY score DESC) as row_num,
  RANK() OVER (ORDER BY score DESC) as rank,
  DENSE_RANK() OVER (ORDER BY score DESC) as dense_rank
FROM scores;
\`\`\``,
    difficulty: 'medium',
    tags: ['window-functions', 'ranking'],
  },
  {
    id: 'fc-1-1-2',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'O que fazem as funções LAG() e LEAD() no Snowflake?',
    back: `**LAG()**: Acessa dados de uma linha ANTERIOR na partição.
**LEAD()**: Acessa dados de uma linha POSTERIOR na partição.

Sintaxe: LAG/LEAD(column, offset, default) OVER (PARTITION BY ... ORDER BY ...)

\`\`\`sql
SELECT 
  date,
  revenue,
  LAG(revenue, 1, 0) OVER (ORDER BY date) as prev_revenue,
  LEAD(revenue, 1, 0) OVER (ORDER BY date) as next_revenue,
  revenue - LAG(revenue, 1) OVER (ORDER BY date) as revenue_change
FROM sales;
\`\`\`

Útil para: análise de séries temporais, comparações período a período.`,
    difficulty: 'medium',
    tags: ['window-functions', 'time-series'],
  },
  {
    id: 'fc-1-1-3',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'Qual a diferença entre NVL(), COALESCE() e IFNULL() no Snowflake?',
    back: `Todas retornam o primeiro valor não-NULL, mas têm diferenças:

**NVL(expr1, expr2)**: Aceita apenas 2 argumentos. Se expr1 é NULL, retorna expr2.

**IFNULL(expr1, expr2)**: Sinônimo de NVL. Aceita apenas 2 argumentos.

**COALESCE(expr1, expr2, ... exprN)**: Aceita N argumentos. Retorna o primeiro valor não-NULL.

\`\`\`sql
SELECT 
  NVL(col1, 'default'),
  IFNULL(col1, 'default'),  -- Mesmo que NVL
  COALESCE(col1, col2, col3, 'default')  -- Mais flexível
FROM table;
\`\`\`

**Recomendação**: Use COALESCE por ser padrão SQL ANSI.`,
    difficulty: 'easy',
    tags: ['null-handling', 'functions'],
  },
  {
    id: 'fc-1-1-4',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'Como funciona a função QUALIFY no Snowflake?',
    back: `**QUALIFY** é uma cláusula exclusiva do Snowflake que filtra resultados de funções de janela (window functions).

É como um WHERE, mas para window functions.

**Ordem de execução**:
1. FROM/WHERE
2. GROUP BY
3. HAVING
4. Window Functions
5. **QUALIFY** ← Filtra aqui
6. ORDER BY

\`\`\`sql
-- Top 1 produto por categoria (sem subquery!)
SELECT 
  category,
  product_name,
  revenue,
  ROW_NUMBER() OVER (PARTITION BY category ORDER BY revenue DESC) as rn
FROM products
QUALIFY rn = 1;
\`\`\`

**Vantagem**: Elimina necessidade de CTEs ou subqueries para filtrar window functions.`,
    difficulty: 'hard',
    tags: ['window-functions', 'snowflake-specific'],
  },
  {
    id: 'fc-1-2-1',
    topicId: 'topic-1-2',
    domainId: 'domain-1',
    front: 'O que é uma CTE Recursiva e como usá-la no Snowflake?',
    back: `**CTE Recursiva**: Uma CTE que referencia a si mesma para processar dados hierárquicos.

**Estrutura**:
\`\`\`sql
WITH RECURSIVE cte_name AS (
  -- Anchor member (caso base)
  SELECT ... FROM table WHERE condition
  
  UNION ALL
  
  -- Recursive member (referencia a CTE)
  SELECT ... FROM table 
  JOIN cte_name ON ...
)
SELECT * FROM cte_name;
\`\`\`

**Exemplo - Hierarquia de funcionários**:
\`\`\`sql
WITH RECURSIVE emp_hierarchy AS (
  -- CEO (sem gerente)
  SELECT id, name, manager_id, 1 as level
  FROM employees WHERE manager_id IS NULL
  
  UNION ALL
  
  -- Subordinados
  SELECT e.id, e.name, e.manager_id, h.level + 1
  FROM employees e
  JOIN emp_hierarchy h ON e.manager_id = h.id
)
SELECT * FROM emp_hierarchy;
\`\`\``,
    difficulty: 'hard',
    tags: ['cte', 'recursive', 'hierarchical-data'],
  },
  {
    id: 'fc-1-3-1',
    topicId: 'topic-1-3',
    domainId: 'domain-1',
    front: 'O que é um LATERAL JOIN e quando usá-lo?',
    back: `**LATERAL JOIN**: Permite que uma subquery na cláusula FROM referencie colunas de tabelas anteriores na mesma cláusula FROM.

É uma **subquery correlacionada** na cláusula FROM.

\`\`\`sql
-- Sem LATERAL (não funciona)
SELECT * FROM orders o, 
  (SELECT * FROM order_items WHERE order_id = o.id) -- ERRO!

-- Com LATERAL (funciona)
SELECT * FROM orders o,
  LATERAL (SELECT * FROM order_items oi WHERE oi.order_id = o.id) items;
\`\`\`

**Casos de uso**:
- Top-N por grupo
- Expandir arrays em linhas
- Subqueries que dependem de colunas externas

\`\`\`sql
-- Top 3 produtos por categoria
SELECT c.category_name, p.*
FROM categories c,
  LATERAL (
    SELECT * FROM products 
    WHERE category_id = c.id 
    ORDER BY sales DESC LIMIT 3
  ) p;
\`\`\``,
    difficulty: 'hard',
    tags: ['joins', 'lateral', 'subquery'],
  },
  {
    id: 'fc-1-4-1',
    topicId: 'topic-1-4',
    domainId: 'domain-1',
    front: 'O que é "Spilling" no Query Profile e como resolvê-lo?',
    back: `**Spilling**: Ocorre quando uma operação excede a memória disponível e precisa usar disco.

**Tipos de Spilling**:
- **Local Disk Spill**: Dados vão para SSD local (mais rápido)
- **Remote Disk Spill**: Dados vão para storage remoto (mais lento)

**No Query Profile, aparece como**:
- "Bytes spilled to local storage"
- "Bytes spilled to remote storage"

**Soluções**:
1. **Aumentar warehouse size** (mais memória)
2. **Otimizar a query**:
   - Reduzir dados com filtros mais cedo
   - Evitar SELECT *
   - Usar agregações antes de JOINs
3. **Usar clustering** para melhor pruning
4. **Particionar operações** em chunks menores

\`\`\`sql
-- Ruim: JOIN primeiro, filtra depois
SELECT * FROM big_table1 bt1
JOIN big_table2 bt2 ON bt1.id = bt2.id
WHERE bt1.date > '2024-01-01';

-- Melhor: Filtra primeiro, JOIN depois
SELECT * FROM 
  (SELECT * FROM big_table1 WHERE date > '2024-01-01') bt1
JOIN big_table2 bt2 ON bt1.id = bt2.id;
\`\`\``,
    difficulty: 'medium',
    tags: ['performance', 'query-profile', 'optimization'],
  },
  // Domain 2 - Data Analysis & Transformation
  {
    id: 'fc-2-1-1',
    topicId: 'topic-2-1',
    domainId: 'domain-2',
    front: 'Como usar FLATTEN para expandir dados semi-estruturados?',
    back: `**FLATTEN**: Função de tabela que expande arrays/objetos em linhas.

**Sintaxe**:
\`\`\`sql
SELECT * FROM table,
  LATERAL FLATTEN(input => column, path => 'path', outer => true/false)
\`\`\`

**Parâmetros importantes**:
- **input**: Coluna VARIANT/ARRAY/OBJECT
- **path**: Caminho dentro do objeto (opcional)
- **outer**: Se TRUE, inclui linhas mesmo com NULL/empty
- **recursive**: Expande recursivamente

**Colunas retornadas por FLATTEN**:
- SEQ, KEY, PATH, INDEX, VALUE, THIS

\`\`\`sql
-- Dados JSON
SELECT * FROM orders,
  LATERAL FLATTEN(input => order_data:items) items;

-- Acessando valores
SELECT 
  items.value:product_name::STRING as product,
  items.value:quantity::NUMBER as qty,
  items.index as item_position
FROM orders,
  LATERAL FLATTEN(input => order_data:items) items;
\`\`\``,
    difficulty: 'medium',
    tags: ['semi-structured', 'flatten', 'json'],
  },
  {
    id: 'fc-2-1-2',
    topicId: 'topic-2-1',
    domainId: 'domain-2',
    front: 'Qual a diferença entre VARIANT, OBJECT e ARRAY no Snowflake?',
    back: `**VARIANT**: Tipo genérico que pode armazenar qualquer dado semi-estruturado (JSON, Avro, etc). Tamanho máximo: 16MB.

**OBJECT**: Coleção de pares chave-valor. Chaves são strings, valores são VARIANT.

**ARRAY**: Lista ordenada de valores VARIANT. Índice começa em 0.

\`\`\`sql
-- VARIANT
SELECT PARSE_JSON('{"name": "John", "age": 30}') as variant_col;

-- OBJECT  
SELECT OBJECT_CONSTRUCT('name', 'John', 'age', 30) as obj_col;

-- ARRAY
SELECT ARRAY_CONSTRUCT(1, 2, 3, 'text') as arr_col;

-- Acessando dados
SELECT 
  variant_col:name::STRING,     -- Notação de dois pontos
  variant_col['name']::STRING,  -- Notação de colchetes
  arr_col[0]::NUMBER,           -- Índice de array
  ARRAY_SIZE(arr_col)           -- Tamanho do array
FROM data;
\`\`\`

**Dica**: VARIANT aceita NULL, mas OBJECT/ARRAY não armazenam NULL como valores.`,
    difficulty: 'medium',
    tags: ['semi-structured', 'data-types'],
  },
  {
    id: 'fc-2-2-1',
    topicId: 'topic-2-2',
    domainId: 'domain-2',
    front: 'Como funciona o PIVOT no Snowflake?',
    back: `**PIVOT**: Transforma valores únicos de uma coluna em múltiplas colunas.

**Sintaxe**:
\`\`\`sql
SELECT * FROM table
PIVOT (
  aggregate_function(value_column)
  FOR pivot_column IN ('value1', 'value2', 'value3')
) AS pivot_alias;
\`\`\`

**Exemplo**:
\`\`\`sql
-- Dados originais: year, quarter, revenue
-- Resultado: year, Q1, Q2, Q3, Q4

SELECT * FROM quarterly_sales
PIVOT (
  SUM(revenue)
  FOR quarter IN ('Q1', 'Q2', 'Q3', 'Q4')
) AS p;

-- Com alias para colunas
SELECT year, 
  "'Q1'" AS q1_revenue,
  "'Q2'" AS q2_revenue
FROM quarterly_sales
PIVOT (SUM(revenue) FOR quarter IN ('Q1', 'Q2'));
\`\`\`

**Limitações**:
- Valores do IN devem ser constantes (não dinâmicos)
- Para PIVOT dinâmico, use Stored Procedures`,
    difficulty: 'medium',
    tags: ['pivot', 'transformation'],
  },
  {
    id: 'fc-2-3-1',
    topicId: 'topic-2-3',
    domainId: 'domain-2',
    front: 'Como calcular Moving Average (média móvel) no Snowflake?',
    back: `**Moving Average**: Média de N valores anteriores/posteriores.

**Usando Window Functions**:
\`\`\`sql
-- Média móvel de 7 dias
SELECT 
  date,
  revenue,
  AVG(revenue) OVER (
    ORDER BY date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) AS moving_avg_7d
FROM daily_sales;

-- Média móvel centrada (3 antes + atual + 3 depois)
SELECT 
  date,
  revenue,
  AVG(revenue) OVER (
    ORDER BY date
    ROWS BETWEEN 3 PRECEDING AND 3 FOLLOWING
  ) AS centered_avg
FROM daily_sales;
\`\`\`

**Frame specifications**:
- ROWS BETWEEN: Conta linhas físicas
- RANGE BETWEEN: Usa valores lógicos (útil para gaps)

\`\`\`sql
-- Soma acumulada (running total)
SUM(revenue) OVER (ORDER BY date ROWS UNBOUNDED PRECEDING)
\`\`\``,
    difficulty: 'medium',
    tags: ['time-series', 'window-functions', 'analytics'],
  },
  {
    id: 'fc-2-4-1',
    topicId: 'topic-2-4',
    domainId: 'domain-2',
    front: 'Qual a diferença entre GROUPING SETS, CUBE e ROLLUP?',
    back: `Todas produzem múltiplos níveis de agregação em uma única query:

**GROUPING SETS**: Define exatamente quais combinações.
\`\`\`sql
GROUP BY GROUPING SETS ((region, product), (region), ())
-- Gera: por (region,product), por region, total geral
\`\`\`

**ROLLUP**: Hierarquia de agregações (remove colunas da direita).
\`\`\`sql
GROUP BY ROLLUP (region, product)
-- Equivale a: GROUPING SETS ((region,product), (region), ())
\`\`\`

**CUBE**: Todas as combinações possíveis.
\`\`\`sql
GROUP BY CUBE (region, product)
-- Equivale a: GROUPING SETS (
--   (region, product), (region), (product), ()
-- )
\`\`\`

**Identificando níveis com GROUPING()**:
\`\`\`sql
SELECT 
  region, product, SUM(sales),
  GROUPING(region) as is_region_total,
  GROUPING(product) as is_product_total
FROM sales
GROUP BY CUBE(region, product);
-- GROUPING retorna 1 se a coluna está agregada (NULL por subtotal)
\`\`\``,
    difficulty: 'hard',
    tags: ['aggregation', 'grouping-sets', 'cube', 'rollup'],
  },
  // Domain 3 - Data Loading & Unloading
  {
    id: 'fc-3-1-1',
    topicId: 'topic-3-1',
    domainId: 'domain-3',
    front: 'Quais são os tipos de Stages no Snowflake?',
    back: `**1. User Stage** (@~)
- Um por usuário, criado automaticamente
- Não pode ser alterado ou dropado
- Acessível apenas pelo próprio usuário

**2. Table Stage** (@%tablename)
- Um por tabela, criado automaticamente
- Associado a uma tabela específica
- Útil para carregar dados em uma tabela específica

**3. Named Internal Stage** (@stagename)
- Criado pelo usuário
- Pode ser compartilhado entre usuários
- Mais flexível e recomendado

**4. External Stage** (@stagename)
- Aponta para cloud storage externo (S3, Azure, GCS)
- Requer configuração de credenciais ou storage integration

\`\`\`sql
-- Criar Named Internal Stage
CREATE STAGE my_stage;

-- Criar External Stage (S3)
CREATE STAGE my_ext_stage
  URL = 's3://mybucket/path/'
  STORAGE_INTEGRATION = my_integration;

-- Listar arquivos
LIST @my_stage;
LIST @~;  -- User stage
LIST @%my_table;  -- Table stage
\`\`\``,
    difficulty: 'medium',
    tags: ['stages', 'data-loading'],
  },
  {
    id: 'fc-3-2-1',
    topicId: 'topic-3-2',
    domainId: 'domain-3',
    front: 'Como usar transformações no COPY INTO?',
    back: `**COPY INTO** permite transformações durante o carregamento:

\`\`\`sql
-- Selecionar colunas específicas
COPY INTO my_table (col1, col2, col3)
FROM (
  SELECT $1, $3, $5  -- Referência por posição
  FROM @my_stage/file.csv
);

-- Transformações de dados
COPY INTO my_table
FROM (
  SELECT 
    $1::VARCHAR AS name,
    TO_DATE($2, 'YYYY-MM-DD') AS date,
    TRY_TO_NUMBER($3) AS amount,
    UPPER($4) AS category
  FROM @my_stage/file.csv
);

-- Carregar apenas colunas específicas de JSON
COPY INTO my_table
FROM (
  SELECT 
    $1:name::STRING,
    $1:address:city::STRING,
    $1:items[0]:price::NUMBER
  FROM @my_stage/data.json
);
\`\`\`

**Opções importantes**:
- ON_ERROR: CONTINUE, SKIP_FILE, ABORT_STATEMENT
- VALIDATION_MODE: RETURN_ERRORS, RETURN_N_ROWS
- FORCE: TRUE/FALSE (recarregar arquivos já processados)`,
    difficulty: 'medium',
    tags: ['copy-into', 'data-loading', 'transformation'],
  },
  {
    id: 'fc-3-3-1',
    topicId: 'topic-3-3',
    domainId: 'domain-3',
    front: 'Qual a diferença entre COPY INTO e Snowpipe?',
    back: `**COPY INTO (Bulk Loading)**:
- Executado manualmente ou via schedule
- Síncrono - espera conclusão
- Usa warehouse dedicado
- Melhor para: cargas em batch, grandes volumes de uma vez
- Custo: baseado no warehouse usado

**Snowpipe (Continuous Loading)**:
- Executado automaticamente via eventos
- Assíncrono - retorna imediatamente
- Usa recursos serverless (compute gerenciado)
- Melhor para: ingestão contínua, near real-time
- Custo: por arquivo processado (serverless)

\`\`\`sql
-- Criar Pipe
CREATE PIPE my_pipe
  AUTO_INGEST = TRUE
AS
COPY INTO my_table
FROM @my_stage
FILE_FORMAT = (TYPE = 'JSON');

-- Verificar status
SELECT SYSTEM$PIPE_STATUS('my_pipe');

-- Ver histórico de ingestão
SELECT * FROM TABLE(
  INFORMATION_SCHEMA.COPY_HISTORY(
    TABLE_NAME => 'my_table',
    START_TIME => DATEADD('hour', -24, CURRENT_TIMESTAMP())
  )
);
\`\`\`

**Quando usar Snowpipe**: Dados chegando continuamente, latência < 1 minuto necessária.`,
    difficulty: 'hard',
    tags: ['snowpipe', 'copy-into', 'data-loading'],
  },
  // Domain 4 - Snowflake Objects & Architecture
  {
    id: 'fc-4-1-1',
    topicId: 'topic-4-1',
    domainId: 'domain-4',
    front: 'Qual a diferença entre View, Secure View e Materialized View?',
    back: `**View (Regular)**:
- Query armazenada, executada a cada acesso
- Definição visível via SHOW VIEWS ou GET_DDL
- Pode expor lógica de negócios

**Secure View**:
- Query armazenada, executada a cada acesso  
- Definição OCULTA de usuários
- Otimizações podem ser limitadas (sem query rewrite)
- Ideal para: mascaramento de dados, multi-tenant

**Materialized View**:
- Resultados PRÉ-COMPUTADOS e armazenados
- Atualizada automaticamente (background)
- Custo de storage + manutenção
- Ideal para: aggregations caras, dashboards

\`\`\`sql
-- View regular
CREATE VIEW v_sales AS SELECT * FROM sales WHERE status = 'active';

-- Secure View
CREATE SECURE VIEW sv_sales AS SELECT * FROM sales WHERE tenant_id = CURRENT_ACCOUNT();

-- Materialized View
CREATE MATERIALIZED VIEW mv_daily_sales AS
SELECT date, SUM(amount) as total
FROM sales GROUP BY date;
\`\`\`

**Limitações de Materialized Views**:
- Sem JOINs, sem UDFs, sem subqueries
- Apenas agregações simples
- Fonte deve ser tabela (não view)`,
    difficulty: 'medium',
    tags: ['views', 'security', 'performance'],
  },
  {
    id: 'fc-4-2-1',
    topicId: 'topic-4-2',
    domainId: 'domain-4',
    front: 'Qual a diferença entre Stored Procedure e UDF?',
    back: `**Stored Procedure**:
- Executa lógica procedural (pode ter side effects)
- Pode executar DDL/DML
- Chamada com CALL
- Retorna valor único
- Suporta: JavaScript, SQL, Python, Java, Scala

**UDF (User-Defined Function)**:
- Função pura (sem side effects)
- Apenas leitura de dados
- Chamada inline em queries
- Retorna valor para cada linha
- Tipos: Scalar UDF, UDTF (tabela)

\`\`\`sql
-- Stored Procedure (JavaScript)
CREATE PROCEDURE sp_update_status(order_id VARCHAR)
RETURNS VARCHAR
LANGUAGE JAVASCRIPT
AS \$\$
  var stmt = snowflake.createStatement({sqlText: \`UPDATE orders SET status='processed' WHERE id='\${ORDER_ID}'\`});
  stmt.execute();
  return 'Success';
\$\$;
CALL sp_update_status('ORD-123');

-- UDF Scalar
CREATE FUNCTION calculate_tax(amount NUMBER)
RETURNS NUMBER
AS \$\$ amount * 0.1 \$\$;
SELECT calculate_tax(100);  -- Retorna 10

-- UDTF (Table Function)
CREATE FUNCTION split_string(input STRING, delimiter STRING)
RETURNS TABLE(value STRING)
LANGUAGE SQL
AS \$\$ SELECT VALUE FROM TABLE(SPLIT_TO_TABLE(input, delimiter)) \$\$;
SELECT * FROM TABLE(split_string('a,b,c', ','));
\`\`\``,
    difficulty: 'hard',
    tags: ['stored-procedures', 'udf', 'programming'],
  },
  {
    id: 'fc-4-3-1',
    topicId: 'topic-4-3',
    domainId: 'domain-4',
    front: 'Como funcionam Streams e Tasks juntos para CDC?',
    back: `**Stream**: Captura mudanças (INSERT, UPDATE, DELETE) em uma tabela.

**Task**: Executa SQL em schedule ou quando acionada.

**Juntos**: Pipeline de CDC automatizado.

\`\`\`sql
-- 1. Criar Stream na tabela fonte
CREATE STREAM orders_stream ON TABLE orders;

-- 2. Criar Task que processa mudanças
CREATE TASK process_orders
  WAREHOUSE = my_wh
  SCHEDULE = '1 MINUTE'
  WHEN SYSTEM\$STREAM_HAS_DATA('orders_stream')
AS
  MERGE INTO orders_processed t
  USING orders_stream s
  ON t.id = s.id
  WHEN MATCHED AND s.METADATA\$ACTION = 'DELETE' THEN DELETE
  WHEN MATCHED THEN UPDATE SET t.* = s.*
  WHEN NOT MATCHED AND s.METADATA\$ACTION = 'INSERT' THEN INSERT VALUES (s.*);

-- 3. Ativar Task
ALTER TASK process_orders RESUME;
\`\`\`

**Colunas de metadados do Stream**:
- METADATA\$ACTION: INSERT ou DELETE
- METADATA\$ISUPDATE: TRUE se é parte de UPDATE
- METADATA\$ROW_ID: ID único da mudança

**Tipos de Stream**:
- Standard (default): INSERT, UPDATE, DELETE
- Append-only: Apenas INSERT`,
    difficulty: 'hard',
    tags: ['streams', 'tasks', 'cdc', 'etl'],
  },
  {
    id: 'fc-4-4-1',
    topicId: 'topic-4-4',
    domainId: 'domain-4',
    front: 'Como funciona Time Travel e quais são suas limitações?',
    back: `**Time Travel**: Acesso a dados históricos por até 90 dias (Enterprise+).

**Métodos de acesso**:
\`\`\`sql
-- Por timestamp
SELECT * FROM table AT(TIMESTAMP => '2024-01-15 10:00:00'::TIMESTAMP);

-- Por offset (segundos atrás)
SELECT * FROM table AT(OFFSET => -3600);  -- 1 hora atrás

-- Por statement ID
SELECT * FROM table BEFORE(STATEMENT => '<query_id>');
\`\`\`

**Restauração**:
\`\`\`sql
-- Restaurar tabela dropada
UNDROP TABLE my_table;

-- Clonar de ponto no tempo
CREATE TABLE table_backup CLONE my_table AT(TIMESTAMP => '2024-01-15 10:00:00');
\`\`\`

**Configuração**:
\`\`\`sql
ALTER TABLE my_table SET DATA_RETENTION_TIME_IN_DAYS = 30;
\`\`\`

**Retenção por edição**:
- Standard: 0-1 dia
- Enterprise: 0-90 dias

**Fail-safe**: 7 dias adicionais APÓS Time Travel.
- Apenas Snowflake pode recuperar
- Não acessível por SQL
- Para disaster recovery apenas`,
    difficulty: 'medium',
    tags: ['time-travel', 'data-recovery', 'fail-safe'],
  },
  // Domain 5 - Data Visualization & Reporting
  {
    id: 'fc-5-1-1',
    topicId: 'topic-5-1',
    domainId: 'domain-5',
    front: 'Quais tipos de gráficos estão disponíveis no Snowsight?',
    back: `**Tipos de visualização no Snowsight**:

📊 **Bar Chart**: Comparação de categorias
📈 **Line Chart**: Tendências ao longo do tempo
🔵 **Scatter Plot**: Correlação entre variáveis
🍕 **Pie/Donut Chart**: Proporções do todo
📉 **Area Chart**: Tendências com volume
🔢 **Scorecard**: KPIs e métricas únicas
📋 **Table**: Dados tabulares

**Criando dashboards**:
1. Execute query no Worksheet
2. Clique em "Chart" para visualizar
3. Configure eixos, cores, labels
4. "Add to Dashboard" ou crie novo

**Filtros e Parâmetros**:
\`\`\`sql
-- Usar variáveis em queries
SELECT * FROM sales
WHERE date >= :start_date
AND region = :selected_region;
\`\`\`

**Compartilhamento**:
- Share com usuários/roles
- Exportar como PNG/CSV
- Agendar refreshes

**Dica**: Snowsight Dashboards são úteis para análise ad-hoc. Para BI avançado, use ferramentas como Tableau/Power BI.`,
    difficulty: 'easy',
    tags: ['snowsight', 'visualization', 'dashboards'],
  },
  {
    id: 'fc-5-3-1',
    topicId: 'topic-5-3',
    domainId: 'domain-5',
    front: 'Como otimizar queries para ferramentas de BI?',
    back: `**Melhores práticas para BI tools**:

**1. Usar Materialized Views**:
\`\`\`sql
CREATE MATERIALIZED VIEW mv_sales_summary AS
SELECT region, product, date_trunc('day', sale_date) as day,
       SUM(amount) as total, COUNT(*) as count
FROM sales GROUP BY 1,2,3;
\`\`\`

**2. Pré-agregar dados**:
- Criar tabelas agregadas para dashboards
- Reduzir volume de dados transferidos

**3. Result Caching**:
- Queries idênticas usam cache (24h)
- Mesmo com warehouse suspenso

**4. Clustering para filtros comuns**:
\`\`\`sql
ALTER TABLE sales CLUSTER BY (region, date);
\`\`\`

**5. Projeções otimizadas**:
- Criar views com apenas colunas necessárias
- Evitar SELECT * em reports

**6. Row-Level Security**:
\`\`\`sql
CREATE ROW ACCESS POLICY rap_region AS (region VARCHAR)
RETURNS BOOLEAN ->
  region IN (SELECT allowed_region FROM user_permissions 
             WHERE user_name = CURRENT_USER());
             
ALTER TABLE sales ADD ROW ACCESS POLICY rap_region ON (region);
\`\`\`

**Drivers recomendados**: ODBC, JDBC, Snowflake Connector (Python).`,
    difficulty: 'medium',
    tags: ['bi-tools', 'optimization', 'performance'],
  },
  // Domain 6 - Performance & Cost Optimization
  {
    id: 'fc-6-1-1',
    topicId: 'topic-6-1',
    domainId: 'domain-6',
    front: 'Como escolher o tamanho correto de Virtual Warehouse?',
    back: `**Tamanhos disponíveis** (cada nível dobra recursos):
XS → S → M → L → XL → 2XL → 3XL → 4XL → 5XL → 6XL

**Créditos por hora** (aproximado):
- XS: 1 crédito/hora
- S: 2 créditos/hora
- M: 4 créditos/hora
- L: 8 créditos/hora
- XL: 16 créditos/hora

**Como escolher**:
1. **Comece pequeno** (XS/S) e aumente conforme necessário
2. **Monitore Query Profile** para spilling
3. **Considere o workload**:
   - Ad-hoc queries: XS-S
   - BI/Reporting: M-L
   - ETL pesado: L-XL+
   - Data Science: XL+

**Multi-cluster para concorrência**:
\`\`\`sql
CREATE WAREHOUSE my_wh
  WAREHOUSE_SIZE = 'MEDIUM'
  MIN_CLUSTER_COUNT = 1
  MAX_CLUSTER_COUNT = 5
  SCALING_POLICY = 'STANDARD';  -- ou 'ECONOMY'
\`\`\`

**Auto-suspend/resume**:
\`\`\`sql
ALTER WAREHOUSE my_wh SET 
  AUTO_SUSPEND = 60,      -- Segundos
  AUTO_RESUME = TRUE;
\`\`\`

**Dica**: Warehouse maior ≠ sempre mais rápido. Queries simples não se beneficiam de warehouses grandes.`,
    difficulty: 'medium',
    tags: ['warehouse', 'sizing', 'cost'],
  },
  {
    id: 'fc-6-2-1',
    topicId: 'topic-6-2',
    domainId: 'domain-6',
    front: 'O que são Micro-partitions e Clustering no Snowflake?',
    back: `**Micro-partitions**:
- Unidade de armazenamento (50-500MB comprimidos)
- Criadas automaticamente durante ingestão
- Imutáveis (copy-on-write)
- Metadata armazenado (min/max, count, etc.)

**Partition Pruning**:
- Snowflake usa metadata para ignorar partições
- Reduz I/O significativamente

**Clustering**:
- Reorganiza dados por colunas específicas
- Melhora partition pruning

\`\`\`sql
-- Definir clustering key
CREATE TABLE sales (...)
CLUSTER BY (date, region);

-- Ou alterar tabela existente
ALTER TABLE sales CLUSTER BY (date, region);

-- Verificar clustering info
SELECT SYSTEM\$CLUSTERING_INFORMATION('sales', '(date, region)');

-- Clustering depth
SELECT SYSTEM\$CLUSTERING_DEPTH('sales');
\`\`\`

**Automatic Clustering**:
\`\`\`sql
ALTER TABLE sales RESUME RECLUSTER;
-- Snowflake gerencia reclustering em background
\`\`\`

**Quando usar clustering**:
- Tabelas grandes (TB+)
- Queries filtram consistentemente pelas mesmas colunas
- Benefício supera custo de manutenção

**Custo**: Clustering tem custo de compute para manutenção.`,
    difficulty: 'hard',
    tags: ['micro-partitions', 'clustering', 'performance'],
  },
  {
    id: 'fc-6-3-1',
    topicId: 'topic-6-3',
    domainId: 'domain-6',
    front: 'Como usar Result Caching efetivamente?',
    back: `**Tipos de Cache no Snowflake**:

**1. Result Cache** (Query Result):
- Cache de resultados de queries
- Válido por 24 horas
- Sem custo de compute
- Compartilhado entre usuários

**2. Local Disk Cache** (Warehouse):
- Dados acessados recentemente
- Por warehouse
- Perdido ao suspender warehouse

**3. Remote Disk Cache** (Metadata):
- Metadata de micro-partitions
- Gerenciado automaticamente

**Result Cache - Requisitos**:
- Query exatamente igual
- Dados não modificados
- Mesma role (para secure views)

\`\`\`sql
-- Forçar uso do cache
ALTER SESSION SET USE_CACHED_RESULT = TRUE;

-- Verificar se usou cache (Query Profile)
-- Procure por: "QUERY RESULT REUSE"

-- Desabilitar cache (para testing)
ALTER SESSION SET USE_CACHED_RESULT = FALSE;
\`\`\`

**Dicas**:
- Standardize queries para maximizar cache hits
- Evite funções não-determinísticas (CURRENT_TIMESTAMP)
- Cache funciona mesmo com warehouse suspenso!

\`\`\`sql
-- Ruim: timestamp diferente a cada execução
SELECT * FROM sales WHERE date > CURRENT_DATE - 7;

-- Melhor: resultado mais consistente
SELECT * FROM sales WHERE date > :start_date;
\`\`\``,
    difficulty: 'medium',
    tags: ['caching', 'performance', 'optimization'],
  },
  // Additional important cards
  {
    id: 'fc-extra-1',
    topicId: 'topic-2-1',
    domainId: 'domain-2',
    front: 'Como usar PARSE_JSON, TRY_PARSE_JSON e IS_*?',
    back: `**PARSE_JSON**: Converte string JSON para VARIANT.
\`\`\`sql
SELECT PARSE_JSON('{"name": "John", "age": 30}');
-- Erro se JSON inválido!
\`\`\`

**TRY_PARSE_JSON**: Retorna NULL se JSON inválido.
\`\`\`sql
SELECT TRY_PARSE_JSON('invalid json');  -- Retorna NULL
SELECT TRY_PARSE_JSON('{"valid": true}');  -- Retorna VARIANT
\`\`\`

**Funções IS_* para validação**:
\`\`\`sql
SELECT 
  IS_NULL_VALUE(col),      -- Verifica NULL JSON
  IS_OBJECT(col),          -- Verifica se é objeto {}
  IS_ARRAY(col),           -- Verifica se é array []
  IS_INTEGER(col),         -- Verifica se é inteiro
  IS_DECIMAL(col),         -- Verifica se é decimal
  IS_BOOLEAN(col),         -- Verifica se é boolean
  IS_CHAR(col),            -- Verifica se é string
  TYPEOF(col)              -- Retorna tipo como string
FROM data;
\`\`\`

**Construção de JSON**:
\`\`\`sql
SELECT 
  OBJECT_CONSTRUCT('name', 'John', 'age', 30),
  ARRAY_CONSTRUCT(1, 2, 3),
  ARRAY_AGG(column) WITHIN GROUP (ORDER BY col)
FROM table;
\`\`\``,
    difficulty: 'medium',
    tags: ['json', 'semi-structured', 'validation'],
  },
  {
    id: 'fc-extra-2',
    topicId: 'topic-4-2',
    domainId: 'domain-4',
    front: 'O que é Snowpark e quando usá-lo?',
    back: `**Snowpark**: API para processamento de dados em Python, Java ou Scala diretamente no Snowflake.

**Características**:
- Código executa dentro do Snowflake
- DataFrame API similar a Spark/Pandas
- Pushdown automático de operações
- Integrado com ML libraries

\`\`\`python
from snowflake.snowpark import Session
from snowflake.snowpark.functions import col, sum

# Criar sessão
session = Session.builder.configs(connection_params).create()

# DataFrame operations
df = session.table("sales")
result = (df
    .filter(col("region") == "US")
    .group_by("product")
    .agg(sum("amount").alias("total"))
    .sort(col("total").desc())
)

result.show()

# Registrar UDF
@udf
def celsius_to_fahrenheit(c: float) -> float:
    return c * 9/5 + 32

# Usar stored procedure
@sproc
def process_data(session: Session, table_name: str) -> str:
    df = session.table(table_name)
    df.write.save_as_table("processed_" + table_name)
    return "Success"
\`\`\`

**Casos de uso**:
- ML feature engineering
- Transformações complexas
- Integração com Python ecosystem
- Data Scientists preferindo Python a SQL`,
    difficulty: 'hard',
    tags: ['snowpark', 'python', 'programming'],
  },
  {
    id: 'fc-extra-3',
    topicId: 'topic-6-1',
    domainId: 'domain-6',
    front: 'Como configurar e usar Resource Monitors?',
    back: `**Resource Monitor**: Controla gastos com créditos.

\`\`\`sql
-- Criar monitor com limite mensal
CREATE RESOURCE MONITOR monthly_monitor
  WITH 
    CREDIT_QUOTA = 1000
    FREQUENCY = MONTHLY
    START_TIMESTAMP = IMMEDIATELY
    TRIGGERS
      ON 50 PERCENT DO NOTIFY
      ON 75 PERCENT DO NOTIFY
      ON 90 PERCENT DO SUSPEND
      ON 100 PERCENT DO SUSPEND_IMMEDIATE;

-- Associar a warehouse
ALTER WAREHOUSE my_wh SET RESOURCE_MONITOR = monthly_monitor;

-- Associar a nível de conta (requer ACCOUNTADMIN)
ALTER ACCOUNT SET RESOURCE_MONITOR = monthly_monitor;
\`\`\`

**Ações disponíveis**:
- **NOTIFY**: Envia notificação
- **SUSPEND**: Suspende após queries terminarem
- **SUSPEND_IMMEDIATE**: Suspende imediatamente (pode cancelar queries)

**Verificar uso**:
\`\`\`sql
-- Ver monitors
SHOW RESOURCE MONITORS;

-- Ver uso atual
SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.RESOURCE_MONITORS;

-- Histórico de créditos por warehouse
SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY
WHERE START_TIME > DATEADD('day', -30, CURRENT_DATE);
\`\`\`

**Dica**: Configure notificações em 50%, 75%, 90% para evitar surpresas.`,
    difficulty: 'medium',
    tags: ['resource-monitor', 'cost-management', 'governance'],
  },
];

import { flashcardsExtended } from './flashcards-extended';
import { flashcardsComplete } from './flashcards-complete';

// Combina todos os flashcards
const allFlashcards = [...flashcards, ...flashcardsExtended, ...flashcardsComplete];

export const getFlashcardsByDomain = (domainId: string): Flashcard[] => {
  return allFlashcards.filter((f) => f.domainId === domainId);
};

export const getFlashcardsByTopic = (topicId: string): Flashcard[] => {
  return allFlashcards.filter((f) => f.topicId === topicId);
};

export const getRandomFlashcards = (count: number): Flashcard[] => {
  const shuffled = [...allFlashcards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export { allFlashcards };

import { Flashcard } from '@/types';

// Flashcards completos cobrindo 100% dos objetivos do exame
// Organizados por domínio do exame oficial

export const flashcardsComplete: Flashcard[] = [
  // ============================================
  // DOMAIN 1: Snowflake SQL for Data Analysis (25-30%)
  // ============================================
  
  // --- Window Functions ---
  {
    id: 'fc-sql-1',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'Quais são as funções de ranking disponíveis no Snowflake?',
    back: `**Funções de Ranking**:

| Função | Descrição | Gaps para empates |
|--------|-----------|------------------|
| ROW_NUMBER() | Número único sequencial | Não há empates |
| RANK() | Mesmo rank para iguais | Sim (1,2,2,4) |
| DENSE_RANK() | Mesmo rank para iguais | Não (1,2,2,3) |
| NTILE(n) | Divide em n grupos | N/A |
| PERCENT_RANK() | Rank percentual (0-1) | N/A |
| CUME_DIST() | Distribuição cumulativa | N/A |

\`\`\`sql
SELECT 
  name, score,
  ROW_NUMBER() OVER (ORDER BY score DESC) as row_num,
  RANK() OVER (ORDER BY score DESC) as rank,
  DENSE_RANK() OVER (ORDER BY score DESC) as dense_rank,
  NTILE(4) OVER (ORDER BY score DESC) as quartile,
  PERCENT_RANK() OVER (ORDER BY score DESC) as pct_rank
FROM students;
\`\`\``,
    difficulty: 'medium',
    tags: ['window-functions', 'ranking', 'sql'],
  },
  {
    id: 'fc-sql-2',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'Quais são as funções de navegação em janelas (offset functions)?',
    back: `**Funções de Navegação**:

| Função | Descrição |
|--------|-----------|
| LAG(col, n, default) | Valor de n linhas ANTES |
| LEAD(col, n, default) | Valor de n linhas DEPOIS |
| FIRST_VALUE(col) | Primeiro valor da janela |
| LAST_VALUE(col) | Último valor da janela |
| NTH_VALUE(col, n) | N-ésimo valor da janela |

\`\`\`sql
SELECT 
  date, revenue,
  LAG(revenue, 1, 0) OVER (ORDER BY date) as prev_day,
  LEAD(revenue, 1, 0) OVER (ORDER BY date) as next_day,
  FIRST_VALUE(revenue) OVER (ORDER BY date) as first_day,
  LAST_VALUE(revenue) OVER (
    ORDER BY date 
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  ) as last_day
FROM sales;
\`\`\`

**Atenção**: LAST_VALUE requer frame specification completa!`,
    difficulty: 'medium',
    tags: ['window-functions', 'lag', 'lead'],
  },
  {
    id: 'fc-sql-3',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'O que é o frame specification em window functions e quais são as opções?',
    back: `**Frame Specification**: Define o conjunto de linhas para a função de janela.

**Sintaxe**:
\`\`\`sql
{ ROWS | RANGE } BETWEEN start AND end
\`\`\`

**Opções de start/end**:
- UNBOUNDED PRECEDING: Início da partição
- n PRECEDING: n linhas/valores antes
- CURRENT ROW: Linha atual
- n FOLLOWING: n linhas/valores depois
- UNBOUNDED FOLLOWING: Fim da partição

**ROWS vs RANGE**:
- **ROWS**: Conta linhas físicas
- **RANGE**: Usa valores lógicos (com ORDER BY)

\`\`\`sql
-- Running total (todas linhas anteriores)
SUM(amount) OVER (
  ORDER BY date 
  ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
)

-- Média móvel 7 dias
AVG(amount) OVER (
  ORDER BY date 
  ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
)

-- Média centralizada
AVG(amount) OVER (
  ORDER BY date 
  ROWS BETWEEN 3 PRECEDING AND 3 FOLLOWING
)
\`\`\`

**Frame padrão**: RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`,
    difficulty: 'hard',
    tags: ['window-functions', 'frame'],
  },
  {
    id: 'fc-sql-4',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'Como funciona a cláusula QUALIFY e por que é exclusiva do Snowflake?',
    back: `**QUALIFY**: Filtra resultados de window functions APÓS o cálculo.

**Ordem de execução SQL**:
1. FROM, JOIN
2. WHERE
3. GROUP BY
4. HAVING
5. **Window Functions**
6. **QUALIFY** ← Filtra aqui
7. DISTINCT
8. ORDER BY
9. LIMIT

**Vantagem**: Elimina necessidade de subquery/CTE.

\`\`\`sql
-- Sem QUALIFY (tradicional)
SELECT * FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) as rn
  FROM employees
) WHERE rn = 1;

-- Com QUALIFY (elegante)
SELECT *
FROM employees
QUALIFY ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) = 1;

-- Top 3 por categoria
SELECT category, product, sales
FROM products
QUALIFY DENSE_RANK() OVER (PARTITION BY category ORDER BY sales DESC) <= 3;

-- Deduplicação mantendo mais recente
SELECT *
FROM events
QUALIFY ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY event_time DESC) = 1;
\`\`\`

**Nota**: QUALIFY é exclusivo do Snowflake e Teradata. Não é SQL ANSI padrão.`,
    difficulty: 'medium',
    tags: ['qualify', 'window-functions', 'snowflake-specific'],
  },

  // --- String Functions ---
  {
    id: 'fc-sql-5',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'Quais são as principais funções de string no Snowflake?',
    back: `**Funções de String**:

| Função | Descrição |
|--------|-----------|
| CONCAT(s1, s2, ...) | Concatena strings |
| \\|\\| | Operador de concatenação |
| LENGTH(s) | Tamanho da string |
| UPPER(s) / LOWER(s) | Maiúsculas/minúsculas |
| TRIM(s) / LTRIM / RTRIM | Remove espaços |
| SUBSTRING(s, start, len) | Extrai parte |
| REPLACE(s, old, new) | Substitui texto |
| SPLIT(s, delimiter) | Divide em array |
| SPLIT_PART(s, delim, n) | Retorna n-ésima parte |
| REGEXP_REPLACE(s, pattern, repl) | Substituição com regex |
| REGEXP_SUBSTR(s, pattern) | Extração com regex |
| REGEXP_COUNT(s, pattern) | Conta matches |

\`\`\`sql
SELECT 
  CONCAT(first_name, ' ', last_name),
  first_name || ' ' || last_name,  -- Mesmo resultado
  UPPER(email),
  SPLIT(tags, ','),
  SPLIT_PART(full_name, ' ', 1) as first_name,
  REGEXP_REPLACE(phone, '[^0-9]', '') as clean_phone,
  REGEXP_SUBSTR(email, '@(.+)$', 1, 1, 'e', 1) as domain
FROM users;
\`\`\``,
    difficulty: 'easy',
    tags: ['string-functions', 'sql'],
  },
  {
    id: 'fc-sql-6',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'Como usar funções REGEXP no Snowflake?',
    back: `**Funções de Expressão Regular**:

\`\`\`sql
-- REGEXP_LIKE: Verifica se match existe (retorna boolean)
SELECT * FROM emails WHERE REGEXP_LIKE(email, '^[a-z]+@.+\\\\.[a-z]+$');

-- REGEXP_SUBSTR: Extrai substring que faz match
SELECT REGEXP_SUBSTR(text, '\\\\d+') as first_number;

-- Com grupo de captura (parâmetros: subject, pattern, position, occurrence, params, group)
SELECT REGEXP_SUBSTR('email@domain.com', '@(.+)\\\\.', 1, 1, 'e', 1);
-- Retorna: 'domain'

-- REGEXP_REPLACE: Substitui matches
SELECT REGEXP_REPLACE(phone, '[^0-9]', '');  -- Remove não-números

-- REGEXP_COUNT: Conta ocorrências
SELECT REGEXP_COUNT(text, '\\\\bword\\\\b');  -- Conta 'word'

-- REGEXP_INSTR: Posição do match
SELECT REGEXP_INSTR(text, '\\\\d+');  -- Posição do primeiro número
\`\`\`

**Parâmetros comuns**:
- 'i': Case insensitive
- 'c': Case sensitive (padrão)
- 'm': Multiline (^ e $ por linha)
- 'e': Extract subexpression

**Dica**: Use \\\\\\\\ para escapar em strings SQL.`,
    difficulty: 'hard',
    tags: ['regex', 'string-functions'],
  },

  // --- Date/Time Functions ---
  {
    id: 'fc-sql-7',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'Quais são as funções de data e hora mais importantes?',
    back: `**Funções de Data/Hora**:

| Função | Descrição |
|--------|-----------|
| CURRENT_DATE | Data atual |
| CURRENT_TIMESTAMP | Timestamp atual |
| DATEADD(part, n, date) | Adiciona intervalo |
| DATEDIFF(part, start, end) | Diferença entre datas |
| DATE_TRUNC(part, date) | Trunca para unidade |
| EXTRACT(part FROM date) | Extrai componente |
| TO_DATE(string, format) | Converte para date |
| TO_TIMESTAMP(string, format) | Converte para timestamp |
| LAST_DAY(date) | Último dia do mês |
| DAYNAME(date) | Nome do dia |
| MONTHNAME(date) | Nome do mês |

\`\`\`sql
SELECT 
  CURRENT_DATE,
  DATEADD('day', 7, CURRENT_DATE) as next_week,
  DATEADD('month', -1, CURRENT_DATE) as last_month,
  DATEDIFF('day', created_at, CURRENT_DATE) as days_old,
  DATE_TRUNC('month', order_date) as month_start,
  DATE_TRUNC('week', order_date) as week_start,
  EXTRACT('year' FROM order_date) as year,
  EXTRACT('dow' FROM order_date) as day_of_week,
  LAST_DAY(order_date) as month_end
FROM orders;
\`\`\`

**Parts válidos**: year, quarter, month, week, day, hour, minute, second`,
    difficulty: 'easy',
    tags: ['date-functions', 'sql'],
  },
  {
    id: 'fc-sql-8',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'O que é TIME_SLICE e como usá-lo para análise de séries temporais?',
    back: `**TIME_SLICE**: Alinha timestamps para intervalos regulares.

**Sintaxe**:
\`\`\`sql
TIME_SLICE(date_or_time, slice_length, date_or_time_part [, start_or_end])
\`\`\`

**Parâmetros**:
- slice_length: Tamanho do intervalo
- date_or_time_part: SECOND, MINUTE, HOUR, DAY, etc.
- start_or_end: 'START' (padrão) ou 'END'

\`\`\`sql
-- Agrupar por intervalos de 15 minutos
SELECT 
  TIME_SLICE(event_time, 15, 'MINUTE') as time_bucket,
  COUNT(*) as event_count
FROM events
GROUP BY 1
ORDER BY 1;

-- Agrupar por semanas (começando segunda)
SELECT 
  TIME_SLICE(order_date, 1, 'WEEK') as week_start,
  SUM(amount) as weekly_total
FROM orders
GROUP BY 1;

-- Final do intervalo
SELECT 
  TIME_SLICE(timestamp, 1, 'HOUR', 'END') as hour_end,
  AVG(value) as hourly_avg
FROM metrics
GROUP BY 1;
\`\`\`

**Uso comum**: Agregação de métricas em intervalos regulares para dashboards.`,
    difficulty: 'medium',
    tags: ['time-series', 'time-slice'],
  },

  // --- Conditional Functions ---
  {
    id: 'fc-sql-9',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'Quais são todas as funções condicionais disponíveis no Snowflake?',
    back: `**Funções Condicionais**:

| Função | Descrição |
|--------|-----------|
| CASE WHEN | Condicional padrão SQL |
| IFF(cond, true, false) | IF inline (3 args) |
| IFNULL(a, b) | b se a é NULL |
| NVL(a, b) | Sinônimo de IFNULL |
| NVL2(a, b, c) | b se a não-NULL, c se NULL |
| NULLIF(a, b) | NULL se a = b |
| COALESCE(a, b, ...) | Primeiro não-NULL |
| ZEROIFNULL(a) | 0 se NULL |
| NULLIFZERO(a) | NULL se 0 |
| DECODE(expr, s1, r1, s2, r2, ..., default) | Match e retorno |
| EQUAL_NULL(a, b) | Comparação NULL-safe |

\`\`\`sql
SELECT 
  CASE 
    WHEN score >= 90 THEN 'A'
    WHEN score >= 80 THEN 'B'
    ELSE 'C'
  END as grade,
  
  IFF(status = 'active', 'Yes', 'No') as is_active,
  NVL(discount, 0) as discount,
  NVL2(manager_id, 'Has Manager', 'No Manager'),
  COALESCE(phone, email, 'No Contact') as contact,
  NULLIF(status, 'unknown') as clean_status,
  DECODE(type, 1, 'A', 2, 'B', 3, 'C', 'Other') as type_name
FROM users;
\`\`\``,
    difficulty: 'medium',
    tags: ['conditional-functions', 'null-handling'],
  },

  // --- CTEs ---
  {
    id: 'fc-sql-10',
    topicId: 'topic-1-2',
    domainId: 'domain-1',
    front: 'Qual a estrutura de uma CTE recursiva e quais são seus componentes?',
    back: `**CTE Recursiva**: Componentes obrigatórios:

1. **Anchor Member**: Caso base (não referencia a CTE)
2. **UNION ALL**: Obrigatório entre anchor e recursive
3. **Recursive Member**: Referencia a CTE

\`\`\`sql
WITH RECURSIVE hierarchy AS (
  -- ANCHOR: Caso base (raiz da hierarquia)
  SELECT 
    employee_id,
    name,
    manager_id,
    1 as level,
    name as path
  FROM employees
  WHERE manager_id IS NULL
  
  UNION ALL
  
  -- RECURSIVE: Referencia a própria CTE
  SELECT 
    e.employee_id,
    e.name,
    e.manager_id,
    h.level + 1,
    h.path || ' > ' || e.name
  FROM employees e
  INNER JOIN hierarchy h ON e.manager_id = h.employee_id
  -- Limite de segurança (evita loops infinitos)
  WHERE h.level < 10
)
SELECT * FROM hierarchy
ORDER BY path;
\`\`\`

**Limites**:
- Máximo de iterações configurável
- Pode causar loops infinitos sem condição de parada
- USE: hierarquias, grafos, sequências

**Dica**: Sempre inclua condição de parada (WHERE level < N).`,
    difficulty: 'hard',
    tags: ['cte', 'recursive', 'hierarchical'],
  },

  // --- Aggregations ---
  {
    id: 'fc-sql-11',
    topicId: 'topic-2-4',
    domainId: 'domain-2',
    front: 'Explique GROUPING SETS, ROLLUP e CUBE com exemplos',
    back: `**Multi-level Aggregations**:

**GROUPING SETS**: Define combinações específicas.
\`\`\`sql
GROUP BY GROUPING SETS (
  (region, product),  -- Por região e produto
  (region),           -- Só por região
  ()                  -- Total geral
)
\`\`\`

**ROLLUP**: Hierarquia (remove da direita).
\`\`\`sql
GROUP BY ROLLUP(year, quarter, month)
-- Equivale a:
-- (year, quarter, month), (year, quarter), (year), ()
\`\`\`

**CUBE**: Todas combinações.
\`\`\`sql
GROUP BY CUBE(region, product)
-- Equivale a:
-- (region, product), (region), (product), ()
\`\`\`

**Identificando níveis**:
\`\`\`sql
SELECT 
  region,
  product,
  SUM(sales) as total,
  GROUPING(region) as is_all_regions,
  GROUPING(product) as is_all_products,
  GROUPING_ID(region, product) as grouping_level
FROM sales
GROUP BY CUBE(region, product);

-- GROUPING retorna 1 se coluna está agregada (subtotal)
-- GROUPING_ID é bitmask das colunas agregadas
\`\`\``,
    difficulty: 'hard',
    tags: ['grouping-sets', 'rollup', 'cube', 'aggregation'],
  },

  // --- PIVOT/UNPIVOT ---
  {
    id: 'fc-sql-12',
    topicId: 'topic-2-2',
    domainId: 'domain-2',
    front: 'Como usar PIVOT e UNPIVOT para transformar dados?',
    back: `**PIVOT**: Linhas → Colunas
\`\`\`sql
SELECT * FROM monthly_sales
PIVOT (
  SUM(amount) 
  FOR month IN ('Jan', 'Feb', 'Mar', 'Apr')
) AS p;

-- Resultado:
-- product | 'Jan' | 'Feb' | 'Mar' | 'Apr'
-- A       | 100   | 150   | 200   | 180
\`\`\`

**UNPIVOT**: Colunas → Linhas
\`\`\`sql
SELECT * FROM wide_table
UNPIVOT (
  sales FOR quarter IN (q1, q2, q3, q4)
);

-- Resultado:
-- year | quarter | sales
-- 2024 | Q1      | 100
-- 2024 | Q2      | 150
\`\`\`

**Limitações do PIVOT**:
- Valores IN devem ser constantes (não dinâmicos)
- Para PIVOT dinâmico, use stored procedure:

\`\`\`sql
-- PIVOT dinâmico com procedure
CREATE PROCEDURE dynamic_pivot(table_name VARCHAR, pivot_col VARCHAR)
RETURNS TABLE(...)
LANGUAGE SQL
AS
DECLARE
  distinct_values RESULTSET;
  pivot_query VARCHAR;
BEGIN
  -- Obter valores distintos e construir query
  -- ...
END;
\`\`\``,
    difficulty: 'medium',
    tags: ['pivot', 'unpivot', 'transformation'],
  },

  // ============================================
  // DOMAIN 2: Semi-Structured Data (15-20%)
  // ============================================
  
  {
    id: 'fc-semi-1',
    topicId: 'topic-2-1',
    domainId: 'domain-2',
    front: 'Quais são os 3 tipos de dados semi-estruturados e suas diferenças?',
    back: `**Tipos Semi-Estruturados**:

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| VARIANT | Qualquer valor | JSON, número, string, NULL |
| OBJECT | Pares chave-valor | {"key": "value"} |
| ARRAY | Lista ordenada | [1, 2, 3] |

**Características**:
- Tamanho máximo: **16 MB** por valor
- Compressão automática
- Otimizado para consultas colunares

**VARIANT pode conter**:
- Primitivos: NUMBER, STRING, BOOLEAN
- NULL (JSON null, diferente de SQL NULL)
- OBJECT
- ARRAY

\`\`\`sql
-- Criação
SELECT 
  PARSE_JSON('{"name": "John"}') as variant_obj,
  OBJECT_CONSTRUCT('key', 'value') as object_val,
  ARRAY_CONSTRUCT(1, 2, 3) as array_val;

-- Verificação de tipo
SELECT 
  TYPEOF(variant_col),  -- 'OBJECT', 'ARRAY', 'VARCHAR', etc.
  IS_OBJECT(variant_col),
  IS_ARRAY(variant_col),
  IS_VARCHAR(variant_col);
\`\`\`

**Dica**: VARIANT é o tipo mais flexível, aceita qualquer coisa.`,
    difficulty: 'medium',
    tags: ['variant', 'semi-structured', 'data-types'],
  },
  {
    id: 'fc-semi-2',
    topicId: 'topic-2-1',
    domainId: 'domain-2',
    front: 'Quais são as duas notações para acessar dados semi-estruturados?',
    back: `**Notações de Acesso**:

**1. Notação de Dois Pontos (Colon)**:
\`\`\`sql
SELECT 
  data:name,                    -- Campo simples
  data:address:city,            -- Aninhado
  data:items[0]:product,        -- Array + objeto
  data:tags[0]                  -- Array simples
FROM table;
\`\`\`

**2. Notação de Colchetes (Bracket)**:
\`\`\`sql
SELECT 
  data['name'],
  data['address']['city'],
  data['items'][0]['product']
FROM table;
\`\`\`

**Quando usar colchetes**:
- Chaves com caracteres especiais: \`data['first-name']\`
- Chaves que são palavras reservadas: \`data['select']\`
- Acesso dinâmico: \`data[variable_name]\`

**Cast obrigatório**:
\`\`\`sql
SELECT 
  data:name::VARCHAR,           -- String
  data:age::INTEGER,            -- Inteiro
  data:price::FLOAT,            -- Decimal
  data:active::BOOLEAN,         -- Booleano
  data:created::TIMESTAMP       -- Timestamp
FROM table;
\`\`\`

**Dica**: Sempre faça cast explícito para garantir o tipo correto!`,
    difficulty: 'easy',
    tags: ['semi-structured', 'access-notation'],
  },
  {
    id: 'fc-semi-3',
    topicId: 'topic-2-1',
    domainId: 'domain-2',
    front: 'Qual a diferença entre IS NULL e IS_NULL_VALUE para VARIANT?',
    back: `**Diferença Crítica**:

- **IS NULL**: Verifica se é SQL NULL (ausência de valor)
- **IS_NULL_VALUE()**: Verifica se é JSON null (valor null literal)

\`\`\`sql
-- Exemplo de diferença
SELECT 
  col,
  col IS NULL as sql_null,
  IS_NULL_VALUE(col) as json_null
FROM (
  SELECT PARSE_JSON('null') as col      -- JSON null
  UNION ALL
  SELECT NULL                            -- SQL NULL
  UNION ALL  
  SELECT PARSE_JSON('{"a": null}'):a    -- JSON null dentro de objeto
);

-- Resultados:
-- col  | sql_null | json_null
-- null | FALSE    | TRUE        ← JSON null é um valor!
-- NULL | TRUE     | NULL        ← SQL NULL
-- null | FALSE    | TRUE        ← JSON null
\`\`\`

**Importante**:
- PARSE_JSON('null') retorna um VALOR (não é SQL NULL)
- Para verificar ambos: \`col IS NULL OR IS_NULL_VALUE(col)\`

**Funções de verificação de tipo**:
\`\`\`sql
SELECT 
  IS_NULL_VALUE(col),
  IS_BOOLEAN(col),
  IS_INTEGER(col),
  IS_DOUBLE(col),
  IS_DECIMAL(col),
  IS_CHAR(col),        -- String
  IS_ARRAY(col),
  IS_OBJECT(col)
FROM table;
\`\`\``,
    difficulty: 'hard',
    tags: ['null', 'variant', 'json'],
  },
  {
    id: 'fc-semi-4',
    topicId: 'topic-2-2',
    domainId: 'domain-2',
    front: 'Explique FLATTEN em detalhes: sintaxe, parâmetros e colunas de saída',
    back: `**FLATTEN**: Expande arrays/objetos em linhas.

**Sintaxe Completa**:
\`\`\`sql
LATERAL FLATTEN(
  INPUT => expression,
  PATH => 'path.to.array',
  OUTER => TRUE/FALSE,
  RECURSIVE => TRUE/FALSE,
  MODE => 'OBJECT'/'ARRAY'/'BOTH'
)
\`\`\`

**Parâmetros**:
| Parâmetro | Descrição | Padrão |
|-----------|-----------|--------|
| INPUT | Coluna VARIANT/ARRAY/OBJECT | Obrigatório |
| PATH | Caminho dentro do objeto | '' |
| OUTER | Incluir linhas para NULL/empty | FALSE |
| RECURSIVE | Expandir recursivamente | FALSE |
| MODE | OBJECT, ARRAY, ou BOTH | BOTH |

**Colunas de Saída**:
| Coluna | Descrição |
|--------|-----------|
| SEQ | Número sequencial único |
| KEY | Chave (para objetos) |
| PATH | Caminho completo |
| INDEX | Índice do array |
| VALUE | Valor do elemento |
| THIS | Elemento pai |

\`\`\`sql
SELECT 
  o.order_id,
  f.index as item_position,
  f.value:product::STRING as product,
  f.value:quantity::NUMBER as qty
FROM orders o,
  LATERAL FLATTEN(INPUT => o.items, OUTER => TRUE) f;
\`\`\`

**OUTER => TRUE**: Mantém linhas mesmo se array vazio/NULL.`,
    difficulty: 'hard',
    tags: ['flatten', 'semi-structured'],
  },
  {
    id: 'fc-semi-5',
    topicId: 'topic-2-3',
    domainId: 'domain-2',
    front: 'Quais funções são usadas para construir dados semi-estruturados?',
    back: `**Funções de Construção**:

**Objetos**:
\`\`\`sql
-- OBJECT_CONSTRUCT: Cria objeto
SELECT OBJECT_CONSTRUCT('name', 'John', 'age', 30);
-- {"age": 30, "name": "John"}

-- OBJECT_CONSTRUCT_KEEP_NULL: Mantém NULLs
SELECT OBJECT_CONSTRUCT_KEEP_NULL('a', 1, 'b', NULL);
-- {"a": 1, "b": null}

-- OBJECT_INSERT: Adiciona/atualiza chave
SELECT OBJECT_INSERT(obj, 'new_key', 'value');

-- OBJECT_DELETE: Remove chave
SELECT OBJECT_DELETE(obj, 'key_to_remove');
\`\`\`

**Arrays**:
\`\`\`sql
-- ARRAY_CONSTRUCT: Cria array
SELECT ARRAY_CONSTRUCT(1, 2, 3, 'text');
-- [1, 2, 3, "text"]

-- ARRAY_APPEND: Adiciona ao final
SELECT ARRAY_APPEND(arr, 'new_item');

-- ARRAY_INSERT: Insere em posição
SELECT ARRAY_INSERT(arr, 0, 'first');

-- ARRAY_CAT: Concatena arrays
SELECT ARRAY_CAT(arr1, arr2);

-- ARRAY_COMPACT: Remove NULLs
SELECT ARRAY_COMPACT(ARRAY_CONSTRUCT(1, NULL, 2, NULL, 3));
-- [1, 2, 3]

-- ARRAY_DISTINCT: Remove duplicatas
SELECT ARRAY_DISTINCT(arr);
\`\`\`

**Agregação**:
\`\`\`sql
-- ARRAY_AGG: Agrega em array
SELECT customer_id, ARRAY_AGG(order_id) as orders
FROM orders GROUP BY customer_id;

-- OBJECT_AGG: Agrega em objeto
SELECT OBJECT_AGG(key, value) FROM key_value_pairs;
\`\`\``,
    difficulty: 'medium',
    tags: ['object-construct', 'array-construct', 'semi-structured'],
  },

  // ============================================
  // DOMAIN 3: Data Loading (15-20%)
  // ============================================
  
  {
    id: 'fc-load-1',
    topicId: 'topic-3-1',
    domainId: 'domain-3',
    front: 'Quais são os 4 tipos de stages e suas características?',
    back: `**Tipos de Stage**:

| Tipo | Símbolo | Criação | Acesso |
|------|---------|---------|--------|
| User Stage | @~ | Automático | Só o usuário |
| Table Stage | @%table | Automático | Por tabela |
| Named Internal | @name | Manual | Configurável |
| External | @name | Manual | Cloud storage |

**User Stage (@~)**:
- Um por usuário, automático
- Não pode ser alterado/dropado
- Acessível apenas pelo próprio usuário

**Table Stage (@%tablename)**:
- Um por tabela, automático
- Para cargas específicas de uma tabela
- Não suporta file formats nomeados

**Named Internal Stage**:
\`\`\`sql
CREATE STAGE my_stage
  FILE_FORMAT = my_format
  DIRECTORY = (ENABLE = TRUE);  -- Para directory tables
\`\`\`

**External Stage**:
\`\`\`sql
CREATE STAGE my_s3_stage
  URL = 's3://bucket/path/'
  STORAGE_INTEGRATION = my_int;  -- Recomendado

-- Ou com credenciais (não recomendado)
CREATE STAGE my_s3_stage
  URL = 's3://bucket/path/'
  CREDENTIALS = (AWS_KEY_ID = '...' AWS_SECRET_KEY = '...');
\`\`\`

**Comandos**:
\`\`\`sql
LIST @my_stage;
PUT file:///path/file.csv @my_stage;
GET @my_stage/file.csv file:///local/;
REMOVE @my_stage/file.csv;
\`\`\``,
    difficulty: 'medium',
    tags: ['stages', 'data-loading'],
  },
  {
    id: 'fc-load-2',
    topicId: 'topic-3-2',
    domainId: 'domain-3',
    front: 'Explique todas as opções de ON_ERROR no COPY INTO',
    back: `**ON_ERROR Options**:

| Opção | Comportamento |
|-------|--------------|
| ABORT_STATEMENT | Para tudo, rollback (padrão) |
| CONTINUE | Continua, pula linhas com erro |
| SKIP_FILE | Pula arquivo inteiro com erro |
| SKIP_FILE_num | Pula se erros > num |
| SKIP_FILE_num% | Pula se % erros > num% |

\`\`\`sql
-- Parar em qualquer erro (padrão)
COPY INTO table FROM @stage
  ON_ERROR = 'ABORT_STATEMENT';

-- Continuar, ignorar linhas com erro
COPY INTO table FROM @stage
  ON_ERROR = 'CONTINUE';

-- Pular arquivo se mais de 10 erros
COPY INTO table FROM @stage
  ON_ERROR = 'SKIP_FILE_10';

-- Pular arquivo se mais de 5% de erros
COPY INTO table FROM @stage
  ON_ERROR = 'SKIP_FILE_5%';
\`\`\`

**Validação sem carregar**:
\`\`\`sql
-- Retorna erros sem carregar
COPY INTO table FROM @stage
  VALIDATION_MODE = 'RETURN_ALL_ERRORS';

-- Retorna primeiras N linhas
COPY INTO table FROM @stage
  VALIDATION_MODE = 'RETURN_10_ROWS';

-- Retorna erros das primeiras N linhas
COPY INTO table FROM @stage
  VALIDATION_MODE = 'RETURN_ERRORS'
  FILES = ('file1.csv');
\`\`\`

**Dica**: Use VALIDATION_MODE primeiro para testar!`,
    difficulty: 'medium',
    tags: ['copy-into', 'error-handling'],
  },
  {
    id: 'fc-load-3',
    topicId: 'topic-3-2',
    domainId: 'domain-3',
    front: 'Quais são as opções importantes de File Format?',
    back: `**File Format Options por Tipo**:

**CSV**:
\`\`\`sql
CREATE FILE FORMAT csv_format
  TYPE = 'CSV'
  FIELD_DELIMITER = ','
  RECORD_DELIMITER = '\\n'
  SKIP_HEADER = 1
  FIELD_OPTIONALLY_ENCLOSED_BY = '"'
  NULL_IF = ('NULL', 'null', '')
  EMPTY_FIELD_AS_NULL = TRUE
  ESCAPE = '\\\\'
  ESCAPE_UNENCLOSED_FIELD = '\\\\'
  DATE_FORMAT = 'YYYY-MM-DD'
  TIMESTAMP_FORMAT = 'AUTO'
  ENCODING = 'UTF8';
\`\`\`

**JSON**:
\`\`\`sql
CREATE FILE FORMAT json_format
  TYPE = 'JSON'
  STRIP_OUTER_ARRAY = TRUE      -- Remove [ ] externo
  STRIP_NULL_VALUES = TRUE      -- Remove nulls
  IGNORE_UTF8_ERRORS = TRUE
  ALLOW_DUPLICATE = TRUE        -- Permite keys duplicadas
  DATE_FORMAT = 'AUTO'
  TIMESTAMP_FORMAT = 'AUTO';
\`\`\`

**PARQUET**:
\`\`\`sql
CREATE FILE FORMAT parquet_format
  TYPE = 'PARQUET'
  COMPRESSION = 'SNAPPY'        -- AUTO, SNAPPY, LZO, GZIP
  BINARY_AS_TEXT = FALSE;
\`\`\`

**AVRO/ORC**: Similar a Parquet.

**Uso**:
\`\`\`sql
-- Referência direta
COPY INTO table FROM @stage
  FILE_FORMAT = (TYPE = 'CSV' SKIP_HEADER = 1);

-- File format nomeado
COPY INTO table FROM @stage
  FILE_FORMAT = my_format;
\`\`\``,
    difficulty: 'medium',
    tags: ['file-format', 'data-loading'],
  },
  {
    id: 'fc-load-4',
    topicId: 'topic-3-3',
    domainId: 'domain-3',
    front: 'Explique Snowpipe: criação, monitoramento e diferenças do COPY',
    back: `**Snowpipe**: Ingestão contínua e serverless.

**Criação**:
\`\`\`sql
CREATE PIPE my_pipe
  AUTO_INGEST = TRUE
  AWS_SNS_TOPIC = 'arn:aws:sns:...'  -- Opcional
AS
COPY INTO target_table
FROM @my_stage
FILE_FORMAT = (TYPE = 'JSON')
MATCH_BY_COLUMN_NAME = CASE_INSENSITIVE;
\`\`\`

**Monitoramento**:
\`\`\`sql
-- Status do pipe
SELECT SYSTEM$PIPE_STATUS('my_pipe');
-- Retorna JSON com: executionState, pendingFileCount, etc.

-- Histórico de ingestão
SELECT * FROM TABLE(INFORMATION_SCHEMA.COPY_HISTORY(
  TABLE_NAME => 'target_table',
  START_TIME => DATEADD('hour', -24, CURRENT_TIMESTAMP())
));

-- Refresh manual (arquivos perdidos)
ALTER PIPE my_pipe REFRESH;
ALTER PIPE my_pipe REFRESH PREFIX = 'path/';
\`\`\`

**Snowpipe vs COPY INTO**:

| Aspecto | Snowpipe | COPY INTO |
|---------|----------|-----------|
| Execução | Assíncrono | Síncrono |
| Trigger | Evento ou schedule | Manual |
| Compute | Serverless | Warehouse |
| Latência | Segundos-minutos | Imediato |
| Custo | Por arquivo | Por tempo de WH |
| Melhor para | Streaming | Batch |

**Dica**: Use Snowpipe para near-real-time, COPY para batch grandes.`,
    difficulty: 'hard',
    tags: ['snowpipe', 'continuous-loading'],
  },

  // ============================================
  // DOMAIN 4: Snowflake Objects (15-20%)
  // ============================================
  
  {
    id: 'fc-obj-1',
    topicId: 'topic-4-1',
    domainId: 'domain-4',
    front: 'Compare Standard Views, Secure Views e Materialized Views',
    back: `**Comparação de Views**:

| Característica | Standard | Secure | Materialized |
|---------------|----------|--------|--------------|
| Definição visível | Sim | Não | Sim |
| Resultado armazenado | Não | Não | Sim |
| Atualização | N/A | N/A | Automática |
| Custo storage | Não | Não | Sim |
| JOINs permitidos | Sim | Sim | Não |
| UDFs permitidas | Sim | Sim | Não |
| Query optimization | Total | Limitada | N/A |

**Secure View**:
\`\`\`sql
CREATE SECURE VIEW sv AS SELECT ...;
-- Definição oculta via SHOW VIEWS/GET_DDL
-- Otimizações podem ser limitadas
\`\`\`

**Materialized View**:
\`\`\`sql
CREATE MATERIALIZED VIEW mv AS
SELECT date, SUM(amount) as total
FROM sales
GROUP BY date;

-- Limitações:
-- Sem JOINs, UDFs, subqueries
-- Só agregações simples
-- Tabela base única
-- Custo de storage + manutenção
\`\`\`

**Quando usar**:
- **Standard**: Uso geral, sem requisitos de segurança
- **Secure**: Ocultar lógica, multi-tenant, row-level security
- **Materialized**: Agregações caras executadas frequentemente

**Dica**: Secure Views podem ser mais lentas devido a otimizações limitadas!`,
    difficulty: 'hard',
    tags: ['views', 'secure-view', 'materialized-view'],
  },
  {
    id: 'fc-obj-2',
    topicId: 'topic-4-2',
    domainId: 'domain-4',
    front: 'Qual a diferença entre UDF e Stored Procedure?',
    back: `**UDF vs Stored Procedure**:

| Aspecto | UDF | Stored Procedure |
|---------|-----|------------------|
| Propósito | Cálculo/transformação | Lógica procedural |
| Side effects | Não permitidos | Permitidos (DDL/DML) |
| Chamada | Inline em query | CALL statement |
| Retorno | Valor por linha | Valor único |
| Transações | N/A | Controle total |

**UDF Scalar**:
\`\`\`sql
CREATE FUNCTION celsius_to_fahrenheit(c FLOAT)
RETURNS FLOAT
AS $$ c * 9/5 + 32 $$;

SELECT celsius_to_fahrenheit(100);  -- 212
\`\`\`

**UDTF (Table Function)**:
\`\`\`sql
CREATE FUNCTION split_string(input STRING)
RETURNS TABLE(word STRING)
AS $$ SELECT VALUE FROM TABLE(SPLIT_TO_TABLE(input, ' ')) $$;

SELECT * FROM TABLE(split_string('hello world'));
\`\`\`

**Stored Procedure**:
\`\`\`sql
CREATE PROCEDURE update_prices(factor FLOAT)
RETURNS VARCHAR
LANGUAGE SQL
AS
BEGIN
  UPDATE products SET price = price * factor;
  RETURN 'Updated ' || SQLROWCOUNT || ' rows';
END;

CALL update_prices(1.1);
\`\`\`

**Linguagens suportadas**:
- UDF: SQL, JavaScript, Python, Java, Scala
- Procedure: SQL, JavaScript, Python, Java, Scala

**Dica**: Use UDF para transformações, Procedure para operações.`,
    difficulty: 'medium',
    tags: ['udf', 'stored-procedure', 'programming'],
  },
  {
    id: 'fc-obj-3',
    topicId: 'topic-4-3',
    domainId: 'domain-4',
    front: 'Explique o fluxo completo de CDC com Streams e Tasks',
    back: `**CDC (Change Data Capture) Pipeline**:

**1. Criar Stream na tabela fonte**:
\`\`\`sql
CREATE STREAM orders_changes ON TABLE orders;
-- Captura INSERT, UPDATE, DELETE
\`\`\`

**2. Verificar mudanças**:
\`\`\`sql
-- Colunas de metadados:
-- METADATA$ACTION: 'INSERT' ou 'DELETE'
-- METADATA$ISUPDATE: TRUE se parte de UPDATE
-- METADATA$ROW_ID: ID único da mudança

SELECT * FROM orders_changes;
\`\`\`

**3. Criar Task para processar**:
\`\`\`sql
CREATE TASK sync_orders
  WAREHOUSE = etl_wh
  SCHEDULE = '5 MINUTE'
  WHEN SYSTEM$STREAM_HAS_DATA('orders_changes')
AS
MERGE INTO orders_warehouse t
USING orders_changes s
ON t.order_id = s.order_id
WHEN MATCHED AND METADATA$ACTION = 'DELETE' AND NOT METADATA$ISUPDATE
  THEN DELETE
WHEN MATCHED
  THEN UPDATE SET t.* = s.*
WHEN NOT MATCHED AND METADATA$ACTION = 'INSERT'
  THEN INSERT VALUES (s.*);
\`\`\`

**4. Ativar Task**:
\`\`\`sql
ALTER TASK sync_orders RESUME;
\`\`\`

**Task Trees (DAG)**:
\`\`\`sql
CREATE TASK child_task
  WAREHOUSE = wh
  AFTER parent_task  -- Executa após parent
AS ...;

-- Ativar de baixo para cima, depois root
ALTER TASK child_task RESUME;
ALTER TASK parent_task RESUME;
\`\`\`

**Dica**: Stream é consumido automaticamente após DML bem-sucedido.`,
    difficulty: 'hard',
    tags: ['streams', 'tasks', 'cdc'],
  },
  {
    id: 'fc-obj-4',
    topicId: 'topic-4-4',
    domainId: 'domain-4',
    front: 'Explique Time Travel: retenção, consultas e restauração',
    back: `**Time Travel**: Acesso a dados históricos.

**Retenção por Edição**:
| Edição | Retenção Máxima |
|--------|-----------------|
| Standard | 0-1 dia |
| Enterprise+ | 0-90 dias |

**Configuração**:
\`\`\`sql
-- Tabela
ALTER TABLE t SET DATA_RETENTION_TIME_IN_DAYS = 30;

-- Schema/Database
ALTER SCHEMA s SET DATA_RETENTION_TIME_IN_DAYS = 30;
\`\`\`

**Consultas Históricas**:
\`\`\`sql
-- Por timestamp
SELECT * FROM t AT(TIMESTAMP => '2024-01-15 10:00:00'::TIMESTAMP);

-- Por offset (segundos atrás)
SELECT * FROM t AT(OFFSET => -3600);  -- 1 hora atrás

-- Antes de um statement
SELECT * FROM t BEFORE(STATEMENT => 'query-id-here');
\`\`\`

**Restauração**:
\`\`\`sql
-- Restaurar tabela dropada
UNDROP TABLE t;

-- Clonar de ponto no tempo
CREATE TABLE t_backup CLONE t AT(TIMESTAMP => '...');

-- Restaurar dados específicos
INSERT INTO t SELECT * FROM t AT(TIMESTAMP => '...')
WHERE id NOT IN (SELECT id FROM t);
\`\`\`

**Fail-safe** (após Time Travel):
- 7 dias adicionais
- Só Snowflake pode recuperar (contato com suporte)
- Sem acesso via SQL

**Custo**: Storage para todas as versões!`,
    difficulty: 'medium',
    tags: ['time-travel', 'fail-safe', 'recovery'],
  },

  // ============================================
  // DOMAIN 5: Performance (10-15%)
  // ============================================
  
  {
    id: 'fc-perf-1',
    topicId: 'topic-6-1',
    domainId: 'domain-6',
    front: 'Explique os tamanhos de warehouse e créditos',
    back: `**Tamanhos e Créditos**:

| Tamanho | Créditos/hora | Servidores |
|---------|---------------|------------|
| X-Small | 1 | 1 |
| Small | 2 | 2 |
| Medium | 4 | 4 |
| Large | 8 | 8 |
| X-Large | 16 | 16 |
| 2X-Large | 32 | 32 |
| 3X-Large | 64 | 64 |
| 4X-Large | 128 | 128 |
| 5X-Large | 256 | 256 |
| 6X-Large | 512 | 512 |

**Multi-cluster Warehouses**:
\`\`\`sql
CREATE WAREHOUSE mc_wh
  WAREHOUSE_SIZE = 'MEDIUM'
  MIN_CLUSTER_COUNT = 1
  MAX_CLUSTER_COUNT = 5
  SCALING_POLICY = 'STANDARD';  -- ou 'ECONOMY'
\`\`\`

**Scaling Policies**:
- **STANDARD**: Escala rapidamente, prioriza performance
- **ECONOMY**: Escala conservadoramente, prioriza custo

**Auto-suspend/resume**:
\`\`\`sql
ALTER WAREHOUSE wh SET
  AUTO_SUSPEND = 300,  -- Segundos (5 min)
  AUTO_RESUME = TRUE;
\`\`\`

**Query Acceleration Service**:
\`\`\`sql
ALTER WAREHOUSE wh SET
  ENABLE_QUERY_ACCELERATION = TRUE
  QUERY_ACCELERATION_MAX_SCALE_FACTOR = 8;
\`\`\`

**Dica**: Warehouse maior ≠ sempre mais rápido. Queries simples não escalam!`,
    difficulty: 'medium',
    tags: ['warehouse', 'credits', 'sizing'],
  },
  {
    id: 'fc-perf-2',
    topicId: 'topic-6-2',
    domainId: 'domain-6',
    front: 'Explique micro-partitions e clustering',
    back: `**Micro-partitions**:
- Unidade de armazenamento: **50-500 MB** comprimidos
- Criadas automaticamente na ingestão
- **Imutáveis** (copy-on-write)
- Metadata: min/max, count, distinct values

**Partition Pruning**:
- Snowflake usa metadata para pular partições
- Reduz I/O significativamente

**Clustering**:
\`\`\`sql
-- Definir clustering key
CREATE TABLE t (...) CLUSTER BY (date, region);

-- Ou alterar existente
ALTER TABLE t CLUSTER BY (date, region);

-- Verificar informações
SELECT SYSTEM$CLUSTERING_INFORMATION('t', '(date, region)');
-- Retorna: average_depth, partition_depth_histogram, etc.

-- Verificar profundidade
SELECT SYSTEM$CLUSTERING_DEPTH('t');

-- Reclustering automático
ALTER TABLE t RESUME RECLUSTER;
\`\`\`

**Quando usar Clustering**:
- Tabelas grandes (TB+)
- Queries filtram consistentemente mesmas colunas
- ORDER BY frequente nas mesmas colunas

**Clustering Keys - Boas práticas**:
- Máximo 3-4 colunas
- Colunas de filtro frequente primeiro
- Evite colunas de alta cardinalidade únicas

**Custo**:
- Clustering inicial: compute
- Manutenção: compute contínuo (automatic reclustering)

**Clustering vs Search Optimization**:
- Clustering: Range scans (BETWEEN, <, >)
- Search Optimization: Point lookups (=, IN)`,
    difficulty: 'hard',
    tags: ['micro-partitions', 'clustering', 'performance'],
  },
  {
    id: 'fc-perf-3',
    topicId: 'topic-6-3',
    domainId: 'domain-6',
    front: 'Explique os tipos de cache no Snowflake',
    back: `**3 Tipos de Cache**:

**1. Result Cache (Query Result)**:
- Cache de resultados de queries
- Válido por **24 horas**
- Sem custo de compute
- Compartilhado entre usuários (mesma query)
- Invalidado quando dados mudam

\`\`\`sql
-- Verificar uso
-- No Query Profile: "QUERY RESULT REUSE"

-- Desabilitar para teste
ALTER SESSION SET USE_CACHED_RESULT = FALSE;
\`\`\`

**2. Local Disk Cache (Warehouse)**:
- Dados em SSD do warehouse
- Por warehouse
- Perdido ao suspender
- Acelera queries repetidas no mesmo warehouse

**3. Metadata Cache**:
- Metadata de micro-partitions
- Gerenciado automaticamente
- Acelera partition pruning

**Requisitos para Result Cache**:
- Query exatamente igual (incluindo whitespace)
- Dados não modificados
- Mesma role (para secure views)
- Não usa funções não-determinísticas

**Funções que invalidam cache**:
\`\`\`sql
-- Estas impedem result caching:
CURRENT_TIMESTAMP()
CURRENT_DATE()
RANDOM()
UUID_STRING()
\`\`\`

**Dica**: Padronize queries para maximizar cache hits!`,
    difficulty: 'medium',
    tags: ['caching', 'result-cache', 'performance'],
  },
  {
    id: 'fc-perf-4',
    topicId: 'topic-6-3',
    domainId: 'domain-6',
    front: 'Como analisar o Query Profile para identificar problemas?',
    back: `**Query Profile**: Ferramenta visual de análise.

**Métricas Importantes**:

| Métrica | Significado | Problema se... |
|---------|-------------|----------------|
| Partitions scanned/total | Eficiência de pruning | % alto |
| Bytes spilled to local | Memória insuficiente | > 0 (moderado) |
| Bytes spilled to remote | Memória muito insuficiente | > 0 (crítico) |
| Rows produced | Linhas retornadas | Muito alto (join explosion) |

**Problemas Comuns**:

**1. Spilling**:
\`\`\`
Bytes spilled to local/remote storage > 0
\`\`\`
Soluções:
- Aumentar warehouse
- Filtrar dados mais cedo
- Otimizar JOINs

**2. Poor Pruning**:
\`\`\`
Partitions scanned ≈ Partitions total
\`\`\`
Soluções:
- Adicionar filtros em clustering keys
- Implementar clustering

**3. Join Explosion**:
\`\`\`
Rows produced >> expected
\`\`\`
Soluções:
- Verificar cardinalidade
- Adicionar condições de JOIN
- Usar DISTINCT ou agregação

**4. Remote I/O**:
\`\`\`
Network bytes high
\`\`\`
Soluções:
- Reduzir colunas selecionadas
- Filtrar mais cedo

**Dica**: Compare "Partitions scanned" vs "Partitions total" primeiro!`,
    difficulty: 'medium',
    tags: ['query-profile', 'troubleshooting', 'performance'],
  },

  // ============================================
  // DOMAIN 6: Data Sharing (5-10%)
  // ============================================
  
  {
    id: 'fc-share-1',
    topicId: 'topic-5-3',
    domainId: 'domain-5',
    front: 'Como funciona Secure Data Sharing no Snowflake?',
    back: `**Secure Data Sharing**: Compartilhamento sem cópia de dados.

**Criar Share**:
\`\`\`sql
-- Provider (quem compartilha)
CREATE SHARE my_share;

-- Adicionar objetos
GRANT USAGE ON DATABASE db TO SHARE my_share;
GRANT USAGE ON SCHEMA db.schema TO SHARE my_share;
GRANT SELECT ON TABLE db.schema.table TO SHARE my_share;
GRANT SELECT ON VIEW db.schema.secure_view TO SHARE my_share;

-- Adicionar contas consumidoras
ALTER SHARE my_share ADD ACCOUNTS = consumer_account;
\`\`\`

**Consumir Share**:
\`\`\`sql
-- Consumer
CREATE DATABASE shared_db FROM SHARE provider_account.my_share;

-- Usar normalmente
SELECT * FROM shared_db.schema.table;
\`\`\`

**Reader Accounts** (para não-clientes Snowflake):
\`\`\`sql
CREATE MANAGED ACCOUNT reader_acct
  ADMIN_NAME = 'admin'
  ADMIN_PASSWORD = 'password'
  TYPE = READER;

ALTER SHARE my_share ADD ACCOUNTS = reader_acct;
\`\`\`

**Características**:
- Sem cópia de dados
- Dados sempre atualizados
- Consumer paga apenas compute
- Cross-region/cloud possível (replicação)

**Secure Views obrigatórias para**:
- Ocultar lógica de transformação
- Row-level security`,
    difficulty: 'medium',
    tags: ['data-sharing', 'share'],
  },

  // ============================================
  // DOMAIN 7: Security (5-10%)
  // ============================================
  
  {
    id: 'fc-sec-1',
    topicId: 'topic-4-1',
    domainId: 'domain-4',
    front: 'Explique as system-defined roles e hierarquia',
    back: `**System-Defined Roles**:

| Role | Responsabilidade |
|------|-----------------|
| ACCOUNTADMIN | Tudo (combinação de todas) |
| SECURITYADMIN | Usuários, roles, grants |
| SYSADMIN | Objetos (warehouses, databases) |
| USERADMIN | Usuários e roles |
| PUBLIC | Concedida a todos automaticamente |
| ORGADMIN | Gestão de organização |

**Hierarquia Padrão**:
\`\`\`
ACCOUNTADMIN
    ├── SECURITYADMIN
    │       └── USERADMIN
    └── SYSADMIN
            └── (custom roles)
                    └── PUBLIC
\`\`\`

**Best Practices**:
\`\`\`sql
-- Criar roles customizadas
CREATE ROLE analyst_role;
CREATE ROLE data_engineer_role;

-- Hierarquia
GRANT ROLE analyst_role TO ROLE data_engineer_role;
GRANT ROLE data_engineer_role TO ROLE SYSADMIN;

-- Conceder a usuários
GRANT ROLE analyst_role TO USER john;

-- NUNCA usar ACCOUNTADMIN para trabalho diário!
\`\`\`

**Future Grants**:
\`\`\`sql
-- Grants automáticos para novos objetos
GRANT SELECT ON FUTURE TABLES IN SCHEMA s TO ROLE analyst;
GRANT USAGE ON FUTURE SCHEMAS IN DATABASE d TO ROLE analyst;
\`\`\`

**Dica**: ACCOUNTADMIN só para administração, não para trabalho diário!`,
    difficulty: 'medium',
    tags: ['roles', 'rbac', 'security'],
  },
  {
    id: 'fc-sec-2',
    topicId: 'topic-4-1',
    domainId: 'domain-4',
    front: 'Explique Masking Policies e Row Access Policies',
    back: `**Masking Policies** (Column-level Security):

\`\`\`sql
-- Criar política
CREATE MASKING POLICY mask_pii AS (val STRING)
RETURNS STRING ->
  CASE
    WHEN CURRENT_ROLE() IN ('ADMIN') THEN val
    WHEN CURRENT_ROLE() IN ('ANALYST') THEN '***-**-' || RIGHT(val, 4)
    ELSE '*****'
  END;

-- Aplicar a coluna
ALTER TABLE users MODIFY COLUMN ssn SET MASKING POLICY mask_pii;

-- Remover
ALTER TABLE users MODIFY COLUMN ssn UNSET MASKING POLICY;
\`\`\`

**Row Access Policies** (Row-level Security):

\`\`\`sql
-- Criar política
CREATE ROW ACCESS POLICY region_filter AS (region_col VARCHAR)
RETURNS BOOLEAN ->
  CURRENT_ROLE() = 'ADMIN'
  OR region_col IN (
    SELECT region FROM user_regions 
    WHERE user_name = CURRENT_USER()
  );

-- Aplicar a tabela
ALTER TABLE sales ADD ROW ACCESS POLICY region_filter ON (region);

-- Remover
ALTER TABLE sales DROP ROW ACCESS POLICY region_filter;
\`\`\`

**Object Tagging**:
\`\`\`sql
-- Criar tag
CREATE TAG pii_level ALLOWED_VALUES 'high', 'medium', 'low';

-- Aplicar
ALTER TABLE users SET TAG pii_level = 'high';
ALTER TABLE users MODIFY COLUMN ssn SET TAG pii_level = 'high';

-- Consultar
SELECT * FROM TABLE(INFORMATION_SCHEMA.TAG_REFERENCES('users', 'table'));
\`\`\`

**Dica**: Masking = colunas, Row Access = linhas!`,
    difficulty: 'hard',
    tags: ['masking', 'row-access-policy', 'security'],
  },
  {
    id: 'fc-sec-3',
    topicId: 'topic-6-1',
    domainId: 'domain-6',
    front: 'Como configurar e usar Resource Monitors?',
    back: `**Resource Monitors**: Controle de gastos.

\`\`\`sql
CREATE RESOURCE MONITOR monthly_limit
  WITH
    CREDIT_QUOTA = 1000                -- Limite de créditos
    FREQUENCY = MONTHLY                -- DAILY, WEEKLY, MONTHLY, YEARLY, NEVER
    START_TIMESTAMP = IMMEDIATELY
    TRIGGERS
      ON 50 PERCENT DO NOTIFY
      ON 75 PERCENT DO NOTIFY
      ON 90 PERCENT DO SUSPEND
      ON 100 PERCENT DO SUSPEND_IMMEDIATE;
\`\`\`

**Ações**:
| Ação | Comportamento |
|------|--------------|
| NOTIFY | Envia notificação |
| SUSPEND | Suspende após queries terminarem |
| SUSPEND_IMMEDIATE | Suspende imediatamente (cancela queries) |

**Associar a warehouse**:
\`\`\`sql
ALTER WAREHOUSE wh SET RESOURCE_MONITOR = monthly_limit;
\`\`\`

**Associar a conta** (requer ACCOUNTADMIN):
\`\`\`sql
ALTER ACCOUNT SET RESOURCE_MONITOR = monthly_limit;
\`\`\`

**Monitorar**:
\`\`\`sql
SHOW RESOURCE MONITORS;

SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.RESOURCE_MONITORS;

SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY
WHERE START_TIME > DATEADD('day', -30, CURRENT_DATE);
\`\`\`

**Dica**: Configure notificações em 50%, 75%, 90% para evitar surpresas!`,
    difficulty: 'medium',
    tags: ['resource-monitor', 'cost-management'],
  },

  // ============================================
  // DOMAIN 8: Snowsight (5-10%)
  // ============================================
  
  {
    id: 'fc-sight-1',
    topicId: 'topic-5-1',
    domainId: 'domain-5',
    front: 'Quais são as context functions mais importantes?',
    back: `**Context Functions**:

| Função | Retorna |
|--------|---------|
| CURRENT_ACCOUNT() | Nome da conta |
| CURRENT_USER() | Usuário atual |
| CURRENT_ROLE() | Role ativa |
| CURRENT_DATABASE() | Database do contexto |
| CURRENT_SCHEMA() | Schema do contexto |
| CURRENT_WAREHOUSE() | Warehouse ativo |
| CURRENT_SESSION() | ID da sessão |
| CURRENT_TIMESTAMP() | Timestamp atual |
| CURRENT_DATE | Data atual |
| CURRENT_TIME | Hora atual |
| CURRENT_REGION() | Região cloud |
| CURRENT_AVAILABLE_ROLES() | Roles disponíveis |
| CURRENT_SECONDARY_ROLES() | Secondary roles |
| CURRENT_CLIENT() | Cliente (driver) |
| CURRENT_IP_ADDRESS() | IP do cliente |

**Uso em Políticas de Segurança**:
\`\`\`sql
-- Row-level security
CREATE VIEW secure_data AS
SELECT * FROM data
WHERE tenant_id = CURRENT_ACCOUNT();

-- Masking baseada em role
CREATE MASKING POLICY mp AS (val STRING)
RETURNS STRING ->
  IFF(CURRENT_ROLE() = 'ADMIN', val, '***');
\`\`\`

**Variáveis de Sessão**:
\`\`\`sql
-- Definir
SET my_var = 'value';

-- Usar
SELECT * FROM table WHERE col = $my_var;

-- Em worksheets Snowsight: use :variable
SELECT * FROM table WHERE date >= :start_date;
\`\`\`

**Dica**: Context functions são essenciais para multi-tenancy!`,
    difficulty: 'easy',
    tags: ['context-functions', 'snowsight'],
  },
  {
    id: 'fc-sight-2',
    topicId: 'topic-5-1',
    domainId: 'domain-5',
    front: 'Quais tipos de gráficos estão disponíveis no Snowsight?',
    back: `**Tipos de Visualização no Snowsight**:

| Tipo | Uso |
|------|-----|
| Bar Chart | Comparação de categorias |
| Line Chart | Tendências temporais |
| Area Chart | Tendências com volume |
| Scatter Plot | Correlação entre variáveis |
| Heatmap | Padrões em matriz |
| Scorecard | KPIs e métricas únicas |
| Table | Dados tabulares |

**Criando Dashboards**:
1. Execute query no worksheet
2. Clique em "Chart" 
3. Configure tipo, eixos, cores
4. Clique em "+ Dashboard" ou adicione a existente

**Filtros e Parâmetros**:
\`\`\`sql
-- Use :nome para parâmetros
SELECT * FROM sales
WHERE date >= :start_date
  AND region = :selected_region;
\`\`\`

**Compartilhamento**:
- Share com usuários/roles
- Definir permissões (view, edit)
- Exportar como PNG

**Auto-refresh**:
- Configure refresh automático
- Intervalos: 1 min, 5 min, etc.

**Alerts**:
\`\`\`sql
-- Criar alerta
CREATE ALERT high_errors
  WAREHOUSE = wh
  SCHEDULE = '1 HOUR'
  IF (EXISTS (
    SELECT 1 FROM errors WHERE count > 100
  ))
  THEN
    CALL send_notification();
\`\`\`

**Dica**: Snowsight é ótimo para análise ad-hoc. Para BI avançado, use ferramentas dedicadas!`,
    difficulty: 'easy',
    tags: ['snowsight', 'dashboards', 'visualization'],
  },
];

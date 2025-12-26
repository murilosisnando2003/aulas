import { Flashcard } from '@/types';

// Parte 3 - Cobertura de tópicos restantes
export const flashcardsFullCoverage3: Flashcard[] = [
  // ============================================
  // SNOWFLAKE DATA TYPES COMPLETOS
  // ============================================
  {
    id: 'fc-full-51',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'Quais são todos os tipos de dados suportados pelo Snowflake?',
    back: `**Tipos Numéricos**:
| Tipo | Descrição |
|------|-----------|
| NUMBER(p,s) / DECIMAL | Precisão exata (até 38 dígitos) |
| INT / INTEGER | Alias para NUMBER(38,0) |
| BIGINT | Alias para NUMBER(38,0) |
| SMALLINT | Alias para NUMBER(38,0) |
| TINYINT | Alias para NUMBER(38,0) |
| FLOAT / DOUBLE | Ponto flutuante 64-bit |

**Tipos de String**:
| Tipo | Max Size |
|------|----------|
| VARCHAR(n) | 16MB |
| CHAR(n) | 16MB |
| STRING | 16MB |
| TEXT | 16MB |
| BINARY(n) | 8MB |
| VARBINARY(n) | 8MB |

**Tipos de Data/Hora**:
| Tipo | Descrição |
|------|-----------|
| DATE | Apenas data |
| TIME | Apenas hora (até nanosegundos) |
| TIMESTAMP_NTZ | Sem timezone |
| TIMESTAMP_LTZ | Timezone local |
| TIMESTAMP_TZ | Com timezone |

**Tipos Semi-Estruturados**:
| Tipo | Max Size |
|------|----------|
| VARIANT | 16MB |
| OBJECT | 16MB |
| ARRAY | 16MB |

**Outros**:
| Tipo | Descrição |
|------|-----------|
| BOOLEAN | TRUE/FALSE |
| GEOGRAPHY | Coordenadas esféricas |
| GEOMETRY | Coordenadas cartesianas |

**Dica**: Snowflake usa storage variável - tipos menores não economizam espaço.`,
    difficulty: 'easy',
    tags: ['data-types', 'fundamentals'],
  },

  // ============================================
  // TIMESTAMP TYPES
  // ============================================
  {
    id: 'fc-full-52',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'Qual a diferença entre TIMESTAMP_NTZ, TIMESTAMP_LTZ e TIMESTAMP_TZ?',
    back: `**TIMESTAMP_NTZ** (No Time Zone):
- Não armazena timezone
- Não faz conversões
- Sempre exibe valor literal

\`\`\`sql
SELECT '2024-01-15 10:00:00'::TIMESTAMP_NTZ;
-- Sempre 10:00:00, independente do timezone da sessão
\`\`\`

**TIMESTAMP_LTZ** (Local Time Zone):
- Armazena em UTC internamente
- Converte para timezone da sessão ao exibir
- Muda baseado em TIMEZONE do usuário

\`\`\`sql
ALTER SESSION SET TIMEZONE = 'America/Sao_Paulo';
SELECT CURRENT_TIMESTAMP()::TIMESTAMP_LTZ;
-- Mostra hora de SP

ALTER SESSION SET TIMEZONE = 'UTC';
SELECT CURRENT_TIMESTAMP()::TIMESTAMP_LTZ;
-- Mostra hora UTC (3h à frente)
\`\`\`

**TIMESTAMP_TZ** (With Time Zone):
- Armazena valor + timezone específico
- Mantém timezone original
- Mais explícito

\`\`\`sql
SELECT '2024-01-15 10:00:00 +03:00'::TIMESTAMP_TZ;
-- Sempre mostra +03:00

SELECT CONVERT_TIMEZONE('America/New_York', my_tz_column);
-- Converte explicitamente
\`\`\`

**Padrão da Sessão**:
\`\`\`sql
-- Ver tipo padrão
SHOW PARAMETERS LIKE 'TIMESTAMP_TYPE_MAPPING';

-- Alterar padrão
ALTER SESSION SET TIMESTAMP_TYPE_MAPPING = 'TIMESTAMP_NTZ';
\`\`\`

**Quando usar**:
- **NTZ**: Logs, eventos locais
- **LTZ**: Dados globais que precisam de conversão
- **TZ**: Quando origem do timezone é importante`,
    difficulty: 'medium',
    tags: ['timestamp', 'timezone', 'data-types'],
  },

  // ============================================
  // CONDITIONAL EXPRESSIONS
  // ============================================
  {
    id: 'fc-full-53',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'Quais são as expressões condicionais disponíveis?',
    back: `**CASE Expression**:
\`\`\`sql
-- Simple CASE
SELECT CASE status
  WHEN 'A' THEN 'Active'
  WHEN 'I' THEN 'Inactive'
  ELSE 'Unknown'
END as status_desc;

-- Searched CASE
SELECT CASE
  WHEN age < 18 THEN 'Minor'
  WHEN age < 65 THEN 'Adult'
  ELSE 'Senior'
END as age_group;
\`\`\`

**IFF** (IF simplificado):
\`\`\`sql
SELECT IFF(condition, true_value, false_value);
SELECT IFF(score >= 70, 'Pass', 'Fail');
\`\`\`

**NULLIF**:
\`\`\`sql
-- Retorna NULL se valores iguais
SELECT NULLIF(value, 0);  -- Evita divisão por zero
SELECT 100 / NULLIF(denominator, 0);
\`\`\`

**COALESCE / IFNULL / NVL**:
\`\`\`sql
-- Primeiro não-NULL
SELECT COALESCE(phone, mobile, email, 'No contact');
SELECT IFNULL(value, 'default');  -- 2 argumentos
SELECT NVL(value, 'default');     -- Sinônimo
\`\`\`

**NVL2**:
\`\`\`sql
-- Se não NULL, retorna expr2; se NULL, retorna expr3
SELECT NVL2(commission, salary + commission, salary);
\`\`\`

**ZEROIFNULL / NULLIFZERO**:
\`\`\`sql
SELECT ZEROIFNULL(null_column);   -- NULL → 0
SELECT NULLIFZERO(zero_column);   -- 0 → NULL
\`\`\`

**DECODE** (legado, similar a CASE):
\`\`\`sql
SELECT DECODE(status, 'A', 'Active', 'I', 'Inactive', 'Unknown');
\`\`\`

**GREATEST / LEAST**:
\`\`\`sql
SELECT GREATEST(a, b, c);  -- Maior valor
SELECT LEAST(a, b, c);     -- Menor valor
\`\`\``,
    difficulty: 'medium',
    tags: ['conditional', 'case', 'null-handling'],
  },

  // ============================================
  // DATE/TIME FUNCTIONS
  // ============================================
  {
    id: 'fc-full-54',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'Quais são as principais funções de data e hora?',
    back: `**Funções de Data Atual**:
\`\`\`sql
SELECT CURRENT_DATE();                    -- Data atual
SELECT CURRENT_TIME();                    -- Hora atual
SELECT CURRENT_TIMESTAMP();               -- Data e hora
SELECT GETDATE();                         -- Sinônimo
SELECT SYSDATE();                         -- Não usa cache (cada linha diferente)
\`\`\`

**Extração de Partes**:
\`\`\`sql
SELECT YEAR(date_col);      -- 2024
SELECT MONTH(date_col);     -- 1-12
SELECT DAY(date_col);       -- 1-31
SELECT DAYOFWEEK(date_col); -- 0=Sunday...6=Saturday
SELECT DAYOFYEAR(date_col); -- 1-366
SELECT WEEK(date_col);      -- 1-54
SELECT QUARTER(date_col);   -- 1-4
SELECT HOUR(ts_col);        -- 0-23
SELECT MINUTE(ts_col);      -- 0-59
SELECT SECOND(ts_col);      -- 0-59

-- Via EXTRACT
SELECT EXTRACT(YEAR FROM date_col);
SELECT DATE_PART('month', date_col);
\`\`\`

**Aritmética de Datas**:
\`\`\`sql
SELECT DATEADD('day', 7, date_col);       -- Adicionar 7 dias
SELECT DATEADD('month', -1, date_col);    -- Subtrair 1 mês
SELECT DATEDIFF('day', start_date, end_date);  -- Diferença em dias
SELECT DATEDIFF('hour', ts1, ts2);        -- Diferença em horas
SELECT TIMEDIFF(HOUR, ts1, ts2);          -- Alternativa
\`\`\`

**Truncamento**:
\`\`\`sql
SELECT DATE_TRUNC('month', date_col);     -- Primeiro dia do mês
SELECT DATE_TRUNC('week', date_col);      -- Primeira segunda-feira
SELECT DATE_TRUNC('year', date_col);      -- 1º de janeiro
SELECT DATE_TRUNC('hour', ts_col);        -- Início da hora
\`\`\`

**Conversão**:
\`\`\`sql
SELECT TO_DATE('2024-01-15', 'YYYY-MM-DD');
SELECT TO_TIMESTAMP('2024-01-15 10:30:00', 'YYYY-MM-DD HH24:MI:SS');
SELECT TO_CHAR(date_col, 'DD/MM/YYYY');
\`\`\`

**Dias especiais**:
\`\`\`sql
SELECT LAST_DAY(date_col);                -- Último dia do mês
SELECT MONTHNAME(date_col);               -- 'January'
SELECT DAYNAME(date_col);                 -- 'Monday'
\`\`\``,
    difficulty: 'medium',
    tags: ['date-functions', 'time-functions', 'datetime'],
  },

  // ============================================
  // STRING FUNCTIONS
  // ============================================
  {
    id: 'fc-full-55',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'Quais são as principais funções de string?',
    back: `**Manipulação Básica**:
\`\`\`sql
SELECT LENGTH('hello');                    -- 5
SELECT UPPER('hello');                     -- 'HELLO'
SELECT LOWER('HELLO');                     -- 'hello'
SELECT INITCAP('john doe');                -- 'John Doe'
SELECT REVERSE('hello');                   -- 'olleh'
SELECT REPEAT('ab', 3);                    -- 'ababab'
\`\`\`

**Substring e Posição**:
\`\`\`sql
SELECT SUBSTR('hello world', 1, 5);        -- 'hello'
SELECT SUBSTRING('hello world', 7);        -- 'world'
SELECT LEFT('hello', 2);                   -- 'he'
SELECT RIGHT('hello', 2);                  -- 'lo'
SELECT POSITION('o' IN 'hello');           -- 5 (1-based)
SELECT CHARINDEX('o', 'hello');            -- 5 (sinônimo)
\`\`\`

**Trim e Padding**:
\`\`\`sql
SELECT TRIM('  hello  ');                  -- 'hello'
SELECT LTRIM('  hello');                   -- 'hello'
SELECT RTRIM('hello  ');                   -- 'hello'
SELECT LPAD('123', 5, '0');                -- '00123'
SELECT RPAD('123', 5, '0');                -- '12300'
\`\`\`

**Split e Concat**:
\`\`\`sql
SELECT CONCAT('a', 'b', 'c');              -- 'abc'
SELECT 'a' || 'b' || 'c';                  -- 'abc'
SELECT CONCAT_WS('-', 'a', 'b', 'c');      -- 'a-b-c'
SELECT SPLIT('a,b,c', ',');                -- ["a","b","c"]
SELECT SPLIT_PART('a-b-c', '-', 2);        -- 'b'
SELECT STRTOK('a-b-c', '-', 2);            -- 'b' (sinônimo)
\`\`\`

**Replace e Translate**:
\`\`\`sql
SELECT REPLACE('hello', 'l', 'L');         -- 'heLLo'
SELECT TRANSLATE('hello', 'el', 'ip');     -- 'hippo'
\`\`\`

**Regex**:
\`\`\`sql
SELECT REGEXP_LIKE('hello', '^h.*o$');     -- TRUE
SELECT REGEXP_SUBSTR('abc123def', '\\\\d+'); -- '123'
SELECT REGEXP_REPLACE('a1b2c3', '\\\\d', 'X'); -- 'aXbXcX'
SELECT REGEXP_COUNT('abcabc', 'a');        -- 2
SELECT REGEXP_INSTR('abc123', '\\\\d');     -- 4 (posição do 1)
\`\`\``,
    difficulty: 'medium',
    tags: ['string-functions', 'regex', 'text'],
  },

  // ============================================
  // NUMERIC FUNCTIONS
  // ============================================
  {
    id: 'fc-full-56',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'Quais são as principais funções numéricas?',
    back: `**Arredondamento**:
\`\`\`sql
SELECT ROUND(123.456, 2);     -- 123.46
SELECT ROUND(123.456, -1);    -- 120
SELECT FLOOR(123.9);          -- 123
SELECT CEIL(123.1);           -- 124
SELECT CEILING(123.1);        -- 124 (sinônimo)
SELECT TRUNCATE(123.456, 2);  -- 123.45 (sem arredondamento)
\`\`\`

**Matemáticas Básicas**:
\`\`\`sql
SELECT ABS(-10);              -- 10
SELECT MOD(10, 3);            -- 1
SELECT POWER(2, 10);          -- 1024
SELECT SQRT(16);              -- 4
SELECT CBRT(27);              -- 3 (raiz cúbica)
SELECT EXP(1);                -- 2.718... (e^1)
SELECT LN(10);                -- Log natural
SELECT LOG(10, 100);          -- 2 (log base 10 de 100)
SELECT LOG10(100);            -- 2
\`\`\`

**Sinal e Valor**:
\`\`\`sql
SELECT SIGN(-5);              -- -1
SELECT SIGN(0);               -- 0
SELECT SIGN(5);               -- 1
\`\`\`

**Random**:
\`\`\`sql
SELECT RANDOM();              -- Número aleatório signed 64-bit
SELECT RANDOM(42);            -- Com seed
SELECT UNIFORM(1, 100, RANDOM());  -- Entre 1 e 100
\`\`\`

**Trigonométricas**:
\`\`\`sql
SELECT SIN(3.14159/2);        -- ~1
SELECT COS(0);                -- 1
SELECT TAN(3.14159/4);        -- ~1
SELECT ASIN(1);               -- ~1.57 (π/2)
SELECT ATAN(1);               -- ~0.785 (π/4)
SELECT ATAN2(1, 1);           -- ~0.785
SELECT DEGREES(3.14159);      -- ~180
SELECT RADIANS(180);          -- ~3.14159
\`\`\`

**Conversão**:
\`\`\`sql
SELECT TO_DECIMAL('123.45', 10, 2);
SELECT TRY_TO_DECIMAL('abc');  -- NULL (não erro)
\`\`\``,
    difficulty: 'easy',
    tags: ['numeric-functions', 'math', 'arithmetic'],
  },

  // ============================================
  // AGGREGATE FUNCTIONS COMPLETAS
  // ============================================
  {
    id: 'fc-full-57',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'Quais são todas as funções de agregação disponíveis?',
    back: `**Básicas**:
\`\`\`sql
SELECT COUNT(*);                           -- Total de linhas
SELECT COUNT(column);                      -- Não-nulls
SELECT COUNT(DISTINCT column);             -- Únicos
SELECT SUM(amount);
SELECT AVG(amount);
SELECT MIN(value);
SELECT MAX(value);
\`\`\`

**Estatísticas**:
\`\`\`sql
SELECT STDDEV(value);                      -- Desvio padrão (sample)
SELECT STDDEV_POP(value);                  -- Desvio padrão (population)
SELECT VARIANCE(value);                    -- Variância (sample)
SELECT VAR_POP(value);                     -- Variância (population)
SELECT SKEW(value);                        -- Assimetria
SELECT KURTOSIS(value);                    -- Curtose
\`\`\`

**Correlação**:
\`\`\`sql
SELECT CORR(x, y);                         -- Correlação
SELECT COVAR_POP(x, y);                    -- Covariância (population)
SELECT COVAR_SAMP(x, y);                   -- Covariância (sample)
SELECT REGR_SLOPE(y, x);                   -- Inclinação regressão
SELECT REGR_INTERCEPT(y, x);               -- Intercepto regressão
SELECT REGR_R2(y, x);                      -- R² (coef determinação)
\`\`\`

**Booleanas**:
\`\`\`sql
SELECT BOOLAND_AGG(condition);             -- AND de todos
SELECT BOOLOR_AGG(condition);              -- OR de todos
SELECT BOOLXOR_AGG(condition);             -- XOR de todos
\`\`\`

**Bit Manipulation**:
\`\`\`sql
SELECT BITAND_AGG(value);
SELECT BITOR_AGG(value);
SELECT BITXOR_AGG(value);
\`\`\`

**Arrays**:
\`\`\`sql
SELECT ARRAY_AGG(value);                   -- Agrupa em array
SELECT ARRAY_AGG(DISTINCT value);
SELECT ARRAY_UNION_AGG(array_col);         -- União de arrays
\`\`\`

**Objetos**:
\`\`\`sql
SELECT OBJECT_AGG(key, value);             -- Agrupa em objeto
\`\`\`

**Condicionais**:
\`\`\`sql
SELECT COUNT_IF(condition);                -- COUNT com filtro
SELECT SUM(IFF(condition, value, 0));      -- SUM condicional
\`\`\``,
    difficulty: 'medium',
    tags: ['aggregate-functions', 'statistics', 'grouping'],
  },

  // ============================================
  // STORED PROCEDURES AVANÇADO
  // ============================================
  {
    id: 'fc-full-58',
    topicId: 'topic-4-2',
    domainId: 'domain-4',
    front: 'Como criar Stored Procedures avançadas?',
    back: `**Linguagens Suportadas**:
- SQL (Snowflake Scripting)
- JavaScript
- Python
- Java
- Scala

**SQL Procedure com Resultset**:
\`\`\`sql
CREATE PROCEDURE get_orders_by_date(start_date DATE, end_date DATE)
RETURNS TABLE (order_id INT, amount FLOAT, order_date DATE)
LANGUAGE SQL
AS
BEGIN
  RETURN TABLE(
    SELECT order_id, amount, order_date
    FROM orders
    WHERE order_date BETWEEN start_date AND end_date
  );
END;

-- Chamar
CALL get_orders_by_date('2024-01-01', '2024-12-31');
\`\`\`

**JavaScript Procedure**:
\`\`\`sql
CREATE PROCEDURE process_json(input VARIANT)
RETURNS VARIANT
LANGUAGE JAVASCRIPT
AS
$$
  var result = [];
  for (var i = 0; i < INPUT.items.length; i++) {
    result.push({
      id: INPUT.items[i].id,
      processed: true
    });
  }
  return result;
$$;
\`\`\`

**Python Procedure**:
\`\`\`sql
CREATE PROCEDURE ml_predict(model_name VARCHAR, features ARRAY)
RETURNS FLOAT
LANGUAGE PYTHON
RUNTIME_VERSION = '3.10'
PACKAGES = ('numpy', 'scikit-learn')
HANDLER = 'predict'
AS
$$
import numpy as np
def predict(session, model_name, features):
    # Load model and predict
    return 0.95
$$;
\`\`\`

**Tratamento de Erros**:
\`\`\`sql
CREATE PROCEDURE safe_delete(table_name VARCHAR, id INT)
RETURNS VARCHAR
LANGUAGE SQL
AS
BEGIN
  DELETE FROM IDENTIFIER(table_name) WHERE id = :id;
  RETURN 'Deleted ' || SQLROWCOUNT || ' rows';
EXCEPTION
  WHEN STATEMENT_ERROR THEN
    RETURN 'Error: ' || SQLERRM;
END;
\`\`\``,
    difficulty: 'hard',
    tags: ['stored-procedures', 'javascript', 'python'],
  },

  // ============================================
  // UDFS COMPLETO
  // ============================================
  {
    id: 'fc-full-59',
    topicId: 'topic-4-2',
    domainId: 'domain-4',
    front: 'Quais são os tipos de UDFs e como criá-los?',
    back: `**Tipos de UDF**:
1. **Scalar UDF**: Um valor por input
2. **UDTF (Table Function)**: Múltiplas linhas por input
3. **Secure UDF**: Definição oculta

**SQL Scalar UDF**:
\`\`\`sql
CREATE FUNCTION format_phone(phone VARCHAR)
RETURNS VARCHAR
AS
$$
  '(' || SUBSTR(phone, 1, 2) || ') ' || 
  SUBSTR(phone, 3, 5) || '-' || 
  SUBSTR(phone, 8, 4)
$$;

SELECT format_phone('11987654321');
-- (11) 98765-4321
\`\`\`

**JavaScript UDF**:
\`\`\`sql
CREATE FUNCTION parse_email(email VARCHAR)
RETURNS OBJECT
LANGUAGE JAVASCRIPT
AS
$$
  var parts = EMAIL.split('@');
  return {
    username: parts[0],
    domain: parts[1]
  };
$$;
\`\`\`

**Python UDF**:
\`\`\`sql
CREATE FUNCTION sentiment(text VARCHAR)
RETURNS FLOAT
LANGUAGE PYTHON
RUNTIME_VERSION = '3.10'
PACKAGES = ('textblob',)
HANDLER = 'analyze'
AS
$$
from textblob import TextBlob
def analyze(text):
    return TextBlob(text).sentiment.polarity
$$;
\`\`\`

**UDTF (Table Function)**:
\`\`\`sql
CREATE FUNCTION split_string(input VARCHAR, delimiter VARCHAR)
RETURNS TABLE (part VARCHAR, position INT)
LANGUAGE SQL
AS
$$
  SELECT 
    f.value::VARCHAR as part,
    f.index as position
  FROM TABLE(FLATTEN(INPUT => SPLIT(input, delimiter))) f
$$;

SELECT * FROM TABLE(split_string('a,b,c', ','));
\`\`\`

**Overloading** (mesmo nome, diferentes parâmetros):
\`\`\`sql
CREATE FUNCTION my_func(x INT) ...;
CREATE FUNCTION my_func(x INT, y INT) ...;
CREATE FUNCTION my_func(x VARCHAR) ...;
\`\`\``,
    difficulty: 'hard',
    tags: ['udf', 'udtf', 'functions'],
  },

  // ============================================
  // OBJECT PRIVILEGES
  // ============================================
  {
    id: 'fc-full-60',
    topicId: 'topic-4-1',
    domainId: 'domain-4',
    front: 'Quais são todos os privilégios de objetos no Snowflake?',
    back: `**Account-level**:
\`\`\`sql
GRANT CREATE DATABASE ON ACCOUNT TO ROLE developer;
GRANT CREATE WAREHOUSE ON ACCOUNT TO ROLE developer;
GRANT CREATE INTEGRATION ON ACCOUNT TO ROLE admin;
GRANT EXECUTE TASK ON ACCOUNT TO ROLE etl_role;
GRANT MONITOR EXECUTION ON ACCOUNT TO ROLE ops;
\`\`\`

**Database**:
\`\`\`sql
GRANT USAGE ON DATABASE db TO ROLE analyst;
GRANT CREATE SCHEMA ON DATABASE db TO ROLE developer;
GRANT MONITOR ON DATABASE db TO ROLE ops;
\`\`\`

**Schema**:
\`\`\`sql
GRANT USAGE ON SCHEMA schema TO ROLE analyst;
GRANT CREATE TABLE ON SCHEMA schema TO ROLE developer;
GRANT CREATE VIEW ON SCHEMA schema TO ROLE developer;
GRANT CREATE FUNCTION ON SCHEMA schema TO ROLE developer;
GRANT CREATE PROCEDURE ON SCHEMA schema TO ROLE developer;
GRANT CREATE PIPE ON SCHEMA schema TO ROLE etl;
GRANT CREATE STREAM ON SCHEMA schema TO ROLE etl;
GRANT CREATE TASK ON SCHEMA schema TO ROLE etl;
GRANT CREATE STAGE ON SCHEMA schema TO ROLE etl;
\`\`\`

**Table/View**:
\`\`\`sql
GRANT SELECT ON TABLE t TO ROLE analyst;
GRANT INSERT ON TABLE t TO ROLE writer;
GRANT UPDATE ON TABLE t TO ROLE writer;
GRANT DELETE ON TABLE t TO ROLE writer;
GRANT TRUNCATE ON TABLE t TO ROLE admin;
GRANT REFERENCES ON TABLE t TO ROLE developer;  -- Para FKs
\`\`\`

**Warehouse**:
\`\`\`sql
GRANT USAGE ON WAREHOUSE wh TO ROLE analyst;
GRANT OPERATE ON WAREHOUSE wh TO ROLE ops;    -- Start/Stop
GRANT MODIFY ON WAREHOUSE wh TO ROLE admin;   -- Alterar config
GRANT MONITOR ON WAREHOUSE wh TO ROLE ops;
\`\`\`

**Future Grants**:
\`\`\`sql
GRANT SELECT ON FUTURE TABLES IN SCHEMA s TO ROLE analyst;
GRANT USAGE ON FUTURE SCHEMAS IN DATABASE db TO ROLE analyst;
\`\`\`

**ALL**:
\`\`\`sql
GRANT ALL ON TABLE t TO ROLE admin;
GRANT ALL ON ALL TABLES IN SCHEMA s TO ROLE admin;
\`\`\``,
    difficulty: 'medium',
    tags: ['privileges', 'grants', 'rbac'],
  },

  // ============================================
  // SYSTEM FUNCTIONS
  // ============================================
  {
    id: 'fc-full-61',
    topicId: 'topic-5-1',
    domainId: 'domain-5',
    front: 'Quais são as principais funções SYSTEM$ do Snowflake?',
    back: `**Clustering**:
\`\`\`sql
SELECT SYSTEM$CLUSTERING_INFORMATION('table_name');
SELECT SYSTEM$CLUSTERING_INFORMATION('table_name', '(col1, col2)');
SELECT SYSTEM$CLUSTERING_DEPTH('table_name');
\`\`\`

**Streams e Tasks**:
\`\`\`sql
SELECT SYSTEM$STREAM_HAS_DATA('stream_name');
SELECT SYSTEM$STREAM_GET_TABLE_TIMESTAMP('stream_name');
SELECT SYSTEM$TASK_DEPENDENTS_ENABLE('task_name');
\`\`\`

**Pipes**:
\`\`\`sql
SELECT SYSTEM$PIPE_STATUS('pipe_name');
SELECT SYSTEM$PIPE_FORCE_RESUME('pipe_name');
\`\`\`

**Query e Performance**:
\`\`\`sql
SELECT SYSTEM$EXPLAIN_PLAN_JSON('SELECT * FROM t');
SELECT SYSTEM$EXPLAIN_JSON_TO_TEXT(
  SYSTEM$EXPLAIN_PLAN_JSON('SELECT * FROM t')
);
SELECT SYSTEM$ESTIMATE_QUERY_ACCELERATION('query_id');
\`\`\`

**Segurança**:
\`\`\`sql
SELECT SYSTEM$GET_TAG_ON_CURRENT_COLUMN('tag_name');
SELECT SYSTEM$GET_TAG_ON_CURRENT_TABLE('tag_name');
SELECT SYSTEM$TYPEOF(expression);
\`\`\`

**Replicação**:
\`\`\`sql
SELECT SYSTEM$GLOBAL_ACCOUNT_SET_PARAMETER(...);
SELECT SYSTEM$LINK_ACCOUNT_OBJECTS_BY_NAME(...);
\`\`\`

**Logs e Eventos**:
\`\`\`sql
SELECT SYSTEM$LOG('INFO', 'Message');
SELECT SYSTEM$LOG_TRACE('Trace message');
\`\`\`

**Utilidades**:
\`\`\`sql
SELECT SYSTEM$CANCEL_QUERY('query_id');
SELECT SYSTEM$CANCEL_ALL_QUERIES();
SELECT SYSTEM$WHITELIST();                     -- IPs do Snowflake
SELECT SYSTEM$WHITELIST_PRIVATELINK();
SELECT SYSTEM$GET_SNOWFLAKE_PLATFORM_INFO();
\`\`\`

**Dica**: Prefixo SYSTEM$ indica funções especiais do sistema.`,
    difficulty: 'hard',
    tags: ['system-functions', 'administration', 'monitoring'],
  },

  // ============================================
  // OPTIMIZATION STRATEGIES
  // ============================================
  {
    id: 'fc-full-62',
    topicId: 'topic-6-2',
    domainId: 'domain-6',
    front: 'Quais são as estratégias de otimização de performance?',
    back: `**1. Query Design**:
\`\`\`sql
-- Usar SELECT específico (não SELECT *)
SELECT id, name FROM users;

-- Filtrar cedo (WHERE antes de JOIN)
SELECT * FROM (
  SELECT * FROM large_table WHERE date > '2024-01-01'
) l JOIN small_table s ON l.id = s.id;

-- Usar LIMIT para testes
SELECT * FROM huge_table LIMIT 100;
\`\`\`

**2. Partition Pruning**:
\`\`\`sql
-- Clustering key alinhado com filtros
ALTER TABLE sales CLUSTER BY (date, region);

-- Filtrar por cluster key
SELECT * FROM sales 
WHERE date BETWEEN '2024-01-01' AND '2024-01-31';
\`\`\`

**3. Warehouse Sizing**:
- Aumente tamanho para queries grandes
- Multi-cluster para mais concorrência
- AUTO_SUSPEND para economia

**4. Caching**:
\`\`\`sql
-- Metadata cache (automático)
-- Result cache (24h)
-- Local disk cache (warehouse)

-- Desabilitar para testes
ALTER SESSION SET USE_CACHED_RESULT = FALSE;
\`\`\`

**5. Materialized Views**:
\`\`\`sql
CREATE MATERIALIZED VIEW mv_daily_sales AS
SELECT date, SUM(amount) as total
FROM sales GROUP BY date;
\`\`\`

**6. Search Optimization**:
\`\`\`sql
ALTER TABLE products ADD SEARCH OPTIMIZATION 
ON SUBSTRING(description);
\`\`\`

**7. Avoid Anti-patterns**:
- Evite funções em WHERE (quebra pruning)
- Evite SELECT DISTINCT sem necessidade
- Evite JOINs cartesianos
- Evite ORDER BY em subqueries

**8. Monitor via Query Profile**:
- Verifique spilling
- Verifique partition pruning
- Identifique operadores lentos`,
    difficulty: 'hard',
    tags: ['optimization', 'performance', 'best-practices'],
  },

  // ============================================
  // BILLING E CREDITS
  // ============================================
  {
    id: 'fc-full-63',
    topicId: 'topic-6-1',
    domainId: 'domain-6',
    front: 'Como funciona o modelo de billing do Snowflake?',
    back: `**Componentes de Custo**:

**1. Compute (Credits)**:
- Warehouses: Por tempo ativo
- Serverless: Tasks, Snowpipe, etc.
- Cloud Services: >10% do compute diário

\`\`\`sql
-- Ver uso de warehouse
SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY
ORDER BY START_TIME DESC;

-- Serverless
SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.SERVERLESS_TASK_HISTORY;
\`\`\`

**2. Storage**:
- On-Demand: Por TB/mês
- Capacity: Pré-comprado, mais barato
- Inclui: Tabelas, Time Travel, Fail-safe

\`\`\`sql
SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.STORAGE_USAGE
ORDER BY USAGE_DATE DESC;
\`\`\`

**3. Data Transfer**:
- Egress para internet: Cobrado
- Cross-region replication: Cobrado
- Dentro da região: Grátis

**Créditos por Tamanho**:
| Tamanho | Créditos/hora |
|---------|---------------|
| XS | 1 |
| S | 2 |
| M | 4 |
| L | 8 |
| XL | 16 |
| 2XL | 32 |
| 3XL | 64 |
| 4XL | 128 |

**Monitorar Custos**:
\`\`\`sql
-- Por warehouse
SELECT 
  WAREHOUSE_NAME,
  SUM(CREDITS_USED) as total_credits
FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY
WHERE START_TIME > DATEADD('month', -1, CURRENT_DATE)
GROUP BY WAREHOUSE_NAME
ORDER BY total_credits DESC;
\`\`\`

**Otimizar**:
- AUTO_SUSPEND agressivo
- Right-sizing de warehouses
- Resource monitors
- Evitar queries ineficientes`,
    difficulty: 'medium',
    tags: ['billing', 'credits', 'cost-optimization'],
  },

  // ============================================
  // CONNECT BY (HIERARCHICAL)
  // ============================================
  {
    id: 'fc-full-64',
    topicId: 'topic-1-3',
    domainId: 'domain-1',
    front: 'Como fazer queries hierárquicas com CONNECT BY?',
    back: `**CONNECT BY**: Queries hierárquicas (árvores, grafos).

**Sintaxe Básica**:
\`\`\`sql
SELECT 
  LEVEL,
  employee_id,
  name,
  manager_id,
  SYS_CONNECT_BY_PATH(name, '/') as path
FROM employees
START WITH manager_id IS NULL          -- Raiz(es)
CONNECT BY PRIOR employee_id = manager_id;  -- Relacionamento
\`\`\`

**Pseudo-colunas**:
- **LEVEL**: Profundidade na hierarquia
- **CONNECT_BY_ISLEAF**: 1 se é folha (sem filhos)
- **CONNECT_BY_ISCYCLE**: 1 se detectou ciclo
- **CONNECT_BY_ROOT**: Valor na raiz

**Funções**:
\`\`\`sql
-- Caminho completo
SYS_CONNECT_BY_PATH(column, delimiter)

-- Exemplo: '/CEO/VP/Director/Manager'
\`\`\`

**Exemplos**:
\`\`\`sql
-- Org chart com indentação
SELECT 
  REPEAT('  ', LEVEL - 1) || name as org_tree,
  title,
  LEVEL
FROM employees
START WITH manager_id IS NULL
CONNECT BY PRIOR employee_id = manager_id
ORDER SIBLINGS BY name;

-- Bill of Materials
SELECT 
  LEVEL,
  product_id,
  component_id,
  quantity,
  SYS_CONNECT_BY_PATH(component_id, '->') as path
FROM bom
START WITH parent_product_id IS NULL
CONNECT BY PRIOR component_id = parent_product_id;
\`\`\`

**Alternativa com CTE Recursiva**:
\`\`\`sql
WITH RECURSIVE hierarchy AS (
  SELECT id, name, parent_id, 1 as level
  FROM items WHERE parent_id IS NULL
  UNION ALL
  SELECT i.id, i.name, i.parent_id, h.level + 1
  FROM items i JOIN hierarchy h ON i.parent_id = h.id
)
SELECT * FROM hierarchy;
\`\`\`

**Dica**: CONNECT BY é mais legível, CTE mais padrão.`,
    difficulty: 'hard',
    tags: ['connect-by', 'hierarchical', 'recursive'],
  },

  // ============================================
  // ACCESS HISTORY E LINEAGE
  // ============================================
  {
    id: 'fc-full-65',
    topicId: 'topic-5-1',
    domainId: 'domain-5',
    front: 'Como usar Access History para auditoria e lineage?',
    back: `**ACCESS_HISTORY**: Rastreia acesso a dados.

**Consultar**:
\`\`\`sql
SELECT 
  query_id,
  query_start_time,
  user_name,
  direct_objects_accessed,
  base_objects_accessed,
  objects_modified
FROM SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY
WHERE query_start_time > DATEADD('day', -7, CURRENT_TIMESTAMP())
ORDER BY query_start_time DESC;
\`\`\`

**Estrutura de DIRECT_OBJECTS_ACCESSED**:
\`\`\`json
[{
  "objectId": 123,
  "objectName": "MY_DB.MY_SCHEMA.MY_TABLE",
  "objectDomain": "Table",
  "columns": [
    {"columnId": 456, "columnName": "SENSITIVE_COL"}
  ]
}]
\`\`\`

**Data Lineage**:
\`\`\`sql
-- Queries que escreveram em uma tabela
SELECT 
  query_id,
  query_start_time,
  user_name,
  objects_modified
FROM SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY
WHERE objects_modified IS NOT NULL
AND ARRAY_CONTAINS(
  'MY_DB.MY_SCHEMA.TARGET_TABLE'::VARIANT,
  TRANSFORM(objects_modified, x -> x:objectName)
);
\`\`\`

**Column Lineage**:
\`\`\`sql
SELECT 
  query_id,
  f.value:objectName as source_table,
  c.value:columnName as source_column
FROM SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY,
  LATERAL FLATTEN(direct_objects_accessed) f,
  LATERAL FLATTEN(f.value:columns) c
WHERE query_start_time > DATEADD('day', -1, CURRENT_TIMESTAMP());
\`\`\`

**Casos de Uso**:
- Auditoria de acesso a PII
- Impact analysis antes de mudanças
- Compliance (GDPR, HIPAA)
- Identificar queries que usam tabelas

**Retenção**: 365 dias no ACCOUNT_USAGE.`,
    difficulty: 'hard',
    tags: ['access-history', 'lineage', 'audit'],
  },
];

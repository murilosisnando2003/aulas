import { Flashcard } from '@/types';

// Flashcards para garantir cobertura 100% de TODOS os objetivos
// Cada flashcard é mapeado para um sub-objetivo específico do exame

export const flashcardsFullCoverage: Flashcard[] = [
  // ============================================
  // FUNÇÕES DE CONVERSÃO E HASH
  // ============================================
  {
    id: 'fc-full-1',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'Quais são as funções de conversão de tipo no Snowflake?',
    back: `**Funções de Conversão**:

| Função | Descrição |
|--------|-----------|
| CAST(expr AS type) | Conversão explícita |
| expr::type | Sintaxe alternativa de cast |
| TRY_CAST(expr AS type) | Retorna NULL se falhar |
| TO_VARCHAR(expr) | Converte para string |
| TO_NUMBER(expr) | Converte para número |
| TO_DECIMAL(expr) | Converte para decimal |
| TO_BOOLEAN(expr) | Converte para boolean |
| TO_DATE(expr, format) | Converte para date |
| TO_TIMESTAMP(expr, format) | Converte para timestamp |
| TO_TIME(expr, format) | Converte para time |
| TO_BINARY(expr) | Converte para binary |

\`\`\`sql
-- Exemplos
SELECT 
  CAST('123' AS NUMBER),
  '123'::NUMBER,
  TRY_CAST('abc' AS NUMBER),  -- NULL (não erro)
  TO_DATE('2024-01-15', 'YYYY-MM-DD'),
  TO_TIMESTAMP('2024-01-15 10:30:00', 'YYYY-MM-DD HH24:MI:SS'),
  TO_BOOLEAN('true'),
  TO_NUMBER('$1,234.56', '$9,999.99');
\`\`\`

**TRY_* functions**: Versões seguras que retornam NULL em vez de erro:
- TRY_CAST, TRY_TO_NUMBER, TRY_TO_DATE, TRY_TO_TIMESTAMP, TRY_TO_BOOLEAN`,
    difficulty: 'medium',
    tags: ['conversion-functions', 'cast'],
  },
  {
    id: 'fc-full-2',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'Quais são as funções de hash disponíveis no Snowflake?',
    back: `**Funções de Hash**:

| Função | Descrição |
|--------|-----------|
| HASH(expr, ...) | Hash interno do Snowflake (signed 64-bit) |
| MD5(expr) | Hash MD5 (128-bit, retorna hex string) |
| MD5_BINARY(expr) | Hash MD5 (retorna binary) |
| SHA1(expr) | Hash SHA-1 (160-bit) |
| SHA1_BINARY(expr) | SHA-1 como binary |
| SHA2(expr, bits) | SHA-2 (224, 256, 384, ou 512 bits) |
| SHA2_BINARY(expr, bits) | SHA-2 como binary |

\`\`\`sql
SELECT 
  HASH('hello'),                    -- -837723845034508365
  HASH(col1, col2, col3),           -- Hash de múltiplas colunas
  MD5('hello'),                     -- '5d41402abc4b2a76b9719d911017c592'
  SHA1('hello'),                    -- 'aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d'
  SHA2('hello', 256),               -- SHA-256
  SHA2_HEX('hello', 256);           -- Mesmo que SHA2
\`\`\`

**Usos comuns**:
- Surrogate keys
- Deduplicação
- Comparação de dados
- Masking (não criptografia!)

**Nota**: HASH() é específico do Snowflake e pode mudar entre versões. Use MD5/SHA para portabilidade.`,
    difficulty: 'medium',
    tags: ['hash-functions', 'security'],
  },

  // ============================================
  // LISTAGG E AGREGAÇÃO DE STRINGS
  // ============================================
  {
    id: 'fc-full-3',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'Como usar LISTAGG para concatenar valores de múltiplas linhas?',
    back: `**LISTAGG**: Concatena valores de múltiplas linhas em uma string.

**Sintaxe**:
\`\`\`sql
LISTAGG(column, delimiter) WITHIN GROUP (ORDER BY order_column)
\`\`\`

**Exemplos**:
\`\`\`sql
-- Básico: lista de produtos por cliente
SELECT 
  customer_id,
  LISTAGG(product_name, ', ') WITHIN GROUP (ORDER BY product_name) as products
FROM orders
GROUP BY customer_id;
-- Resultado: 'Laptop, Mouse, Teclado'

-- Com DISTINCT
SELECT 
  LISTAGG(DISTINCT category, ', ') WITHIN GROUP (ORDER BY category)
FROM products;

-- Limitar tamanho (evitar truncamento)
SELECT 
  LISTAGG(name, ', ') WITHIN GROUP (ORDER BY name) as names
FROM (SELECT name FROM users LIMIT 100);
\`\`\`

**Limite**: Resultado máximo de 16MB.

**Alternativa com ARRAY**:
\`\`\`sql
-- Se precisar de mais controle
SELECT 
  customer_id,
  ARRAY_TO_STRING(ARRAY_AGG(DISTINCT product_name), ', ') as products
FROM orders
GROUP BY customer_id;
\`\`\``,
    difficulty: 'medium',
    tags: ['listagg', 'aggregation', 'string'],
  },

  // ============================================
  // MERGE STATEMENT
  // ============================================
  {
    id: 'fc-full-4',
    topicId: 'topic-3-2',
    domainId: 'domain-3',
    front: 'Como funciona o MERGE para operações de upsert?',
    back: `**MERGE**: Combina INSERT, UPDATE e DELETE em uma operação.

**Sintaxe**:
\`\`\`sql
MERGE INTO target_table t
USING source_table s
ON t.id = s.id

WHEN MATCHED AND s.status = 'delete' THEN 
  DELETE

WHEN MATCHED THEN 
  UPDATE SET 
    t.name = s.name,
    t.updated_at = CURRENT_TIMESTAMP()

WHEN NOT MATCHED THEN 
  INSERT (id, name, created_at)
  VALUES (s.id, s.name, CURRENT_TIMESTAMP());
\`\`\`

**Cláusulas**:
- **WHEN MATCHED**: Linha existe em target E source
- **WHEN NOT MATCHED**: Linha existe em source mas NÃO em target
- **WHEN NOT MATCHED BY SOURCE**: Linha existe em target mas NÃO em source (Snowflake extended)

**Com Streams (CDC)**:
\`\`\`sql
MERGE INTO target t
USING source_stream s
ON t.id = s.id
WHEN MATCHED AND METADATA$ACTION = 'DELETE' AND NOT METADATA$ISUPDATE THEN
  DELETE
WHEN MATCHED AND METADATA$ISUPDATE THEN
  UPDATE SET t.* = s.*
WHEN NOT MATCHED AND METADATA$ACTION = 'INSERT' THEN
  INSERT VALUES (s.*);
\`\`\`

**Dica**: MERGE é atômico - tudo ou nada.`,
    difficulty: 'hard',
    tags: ['merge', 'upsert', 'dml'],
  },

  // ============================================
  // MULTI-TABLE INSERT
  // ============================================
  {
    id: 'fc-full-5',
    topicId: 'topic-3-2',
    domainId: 'domain-3',
    front: 'O que é Multi-Table INSERT e como usá-lo?',
    back: `**Multi-Table INSERT**: Insere dados em múltiplas tabelas de uma vez.

**INSERT ALL (incondicional)**:
\`\`\`sql
INSERT ALL
  INTO table1 (col1, col2) VALUES (a, b)
  INTO table2 (col1, col2) VALUES (c, d)
  INTO table3 (col1, col2) VALUES (e, f)
SELECT a, b, c, d, e, f FROM source;
\`\`\`

**INSERT ALL (condicional)**:
\`\`\`sql
INSERT ALL
  WHEN category = 'A' THEN INTO table_a (id, name) VALUES (id, name)
  WHEN category = 'B' THEN INTO table_b (id, name) VALUES (id, name)
  WHEN amount > 1000 THEN INTO large_orders (id, amount) VALUES (id, amount)
  ELSE INTO other_table (id) VALUES (id)
SELECT id, name, category, amount FROM source;
\`\`\`

**INSERT FIRST (primeira condição verdadeira)**:
\`\`\`sql
INSERT FIRST
  WHEN score >= 90 THEN INTO grade_a VALUES (...)
  WHEN score >= 80 THEN INTO grade_b VALUES (...)
  WHEN score >= 70 THEN INTO grade_c VALUES (...)
  ELSE INTO grade_f VALUES (...)
SELECT * FROM students;
-- Cada linha vai para apenas UMA tabela
\`\`\`

**Uso**: ETL, particionamento lógico, routing de dados.`,
    difficulty: 'hard',
    tags: ['multi-table-insert', 'etl'],
  },

  // ============================================
  // SEQUENCES E IDENTITY
  // ============================================
  {
    id: 'fc-full-6',
    topicId: 'topic-4-2',
    domainId: 'domain-4',
    front: 'Qual a diferença entre SEQUENCE e IDENTITY no Snowflake?',
    back: `**IDENTITY**: Coluna auto-incremento em uma tabela específica.

\`\`\`sql
CREATE TABLE orders (
  id INT IDENTITY(1,1),  -- Start, Increment
  -- ou
  id INT AUTOINCREMENT,  -- Sinônimo
  name VARCHAR
);

-- Inserir sem especificar ID
INSERT INTO orders (name) VALUES ('Order 1');
\`\`\`

**SEQUENCE**: Objeto separado, pode ser compartilhado.

\`\`\`sql
-- Criar sequence
CREATE SEQUENCE order_seq START = 1 INCREMENT = 1;

-- Usar em INSERT
INSERT INTO orders (id, name) 
VALUES (order_seq.NEXTVAL, 'Order 1');

-- Consultar valor atual
SELECT order_seq.NEXTVAL;  -- Próximo valor
-- Nota: Não há CURRVAL no Snowflake!

-- Em múltiplas linhas
INSERT INTO orders (id, name)
SELECT order_seq.NEXTVAL, name FROM staging;
\`\`\`

**Diferenças**:

| Aspecto | IDENTITY | SEQUENCE |
|---------|----------|----------|
| Escopo | Por tabela | Objeto global |
| Compartilhamento | Não | Sim, entre tabelas |
| Gaps | Possíveis | Possíveis |
| Performance | Melhor | Ligeiramente menor |

**Dica**: Use IDENTITY para casos simples, SEQUENCE para IDs compartilhados.`,
    difficulty: 'medium',
    tags: ['sequence', 'identity', 'autoincrement'],
  },

  // ============================================
  // TRANSAÇÕES E CONTROLE
  // ============================================
  {
    id: 'fc-full-7',
    topicId: 'topic-4-2',
    domainId: 'domain-4',
    front: 'Como funcionam transações no Snowflake?',
    back: `**Transações no Snowflake**:

**Controle Manual**:
\`\`\`sql
BEGIN TRANSACTION;  -- ou BEGIN, START TRANSACTION

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;  -- ou ROLLBACK para desfazer
\`\`\`

**Auto-commit**: Por padrão, cada statement é uma transação.

**Em Stored Procedures**:
\`\`\`sql
CREATE PROCEDURE transfer(from_id INT, to_id INT, amount FLOAT)
RETURNS VARCHAR
LANGUAGE SQL
AS
BEGIN
  BEGIN TRANSACTION;
  
  UPDATE accounts SET balance = balance - amount WHERE id = from_id;
  UPDATE accounts SET balance = balance + amount WHERE id = to_id;
  
  -- Validação
  IF ((SELECT balance FROM accounts WHERE id = from_id) < 0) THEN
    ROLLBACK;
    RETURN 'Insufficient funds';
  END IF;
  
  COMMIT;
  RETURN 'Success';
END;
\`\`\`

**Propriedades ACID**:
- **Atomicidade**: Tudo ou nada
- **Consistência**: Dados sempre válidos
- **Isolamento**: READ COMMITTED (padrão)
- **Durabilidade**: Commits são permanentes

**Scoped Transactions** (Snowflake-específico):
\`\`\`sql
-- Transação aninhada é independente
BEGIN TRANSACTION NAME inner_txn;
  -- operações
COMMIT;  -- Não afeta transação externa
\`\`\`

**Dica**: DDL sempre auto-commit (não pode ser em transação).`,
    difficulty: 'hard',
    tags: ['transactions', 'acid', 'commit', 'rollback'],
  },

  // ============================================
  // CALLER RIGHTS VS OWNER RIGHTS
  // ============================================
  {
    id: 'fc-full-8',
    topicId: 'topic-4-2',
    domainId: 'domain-4',
    front: 'Qual a diferença entre Caller Rights e Owner Rights em Stored Procedures?',
    back: `**Caller Rights vs Owner Rights**:

**Owner Rights (padrão)**:
- Executa com permissões do OWNER da procedure
- Caller não precisa de permissões nos objetos
- Mais seguro para encapsulamento

\`\`\`sql
CREATE PROCEDURE sensitive_report()
RETURNS TABLE()
LANGUAGE SQL
EXECUTE AS OWNER  -- Padrão
AS
$$
  SELECT * FROM sensitive_data  -- Owner tem acesso
$$;
\`\`\`

**Caller Rights**:
- Executa com permissões do CALLER
- Caller precisa ter permissões nos objetos
- Mais flexível para diferentes usuários

\`\`\`sql
CREATE PROCEDURE user_report()
RETURNS TABLE()
LANGUAGE SQL
EXECUTE AS CALLER
AS
$$
  SELECT * FROM user_data  -- Caller precisa de SELECT
  WHERE user_id = CURRENT_USER()
$$;
\`\`\`

**Comparação**:

| Aspecto | Owner Rights | Caller Rights |
|---------|--------------|---------------|
| Permissões | Do owner | Do caller |
| Segurança | Mais restritivo | Mais permissivo |
| Contexto | Role do owner | Role do caller |
| CURRENT_USER() | Retorna caller | Retorna caller |
| CURRENT_ROLE() | Pode variar | Role do caller |

**Uso típico**:
- **Owner Rights**: Relatórios com dados sensíveis
- **Caller Rights**: Utilities que operam nos dados do usuário`,
    difficulty: 'hard',
    tags: ['stored-procedures', 'security', 'execute-as'],
  },

  // ============================================
  // DIRECTORY TABLES
  // ============================================
  {
    id: 'fc-full-9',
    topicId: 'topic-3-1',
    domainId: 'domain-3',
    front: 'O que são Directory Tables em Stages?',
    back: `**Directory Tables**: Metadados de arquivos em stages como tabela.

**Habilitar**:
\`\`\`sql
-- Em novo stage
CREATE STAGE my_stage
  DIRECTORY = (ENABLE = TRUE);

-- Em stage existente
ALTER STAGE my_stage SET DIRECTORY = (ENABLE = TRUE);

-- Refresh manual
ALTER STAGE my_stage REFRESH;
\`\`\`

**Consultar**:
\`\`\`sql
-- Listar arquivos com metadados
SELECT * FROM DIRECTORY(@my_stage);

-- Colunas disponíveis:
-- RELATIVE_PATH: Caminho do arquivo
-- SIZE: Tamanho em bytes
-- LAST_MODIFIED: Timestamp de modificação
-- MD5: Hash MD5 (se disponível)
-- ETAG: ETag do cloud storage
\`\`\`

**Exemplos de uso**:
\`\`\`sql
-- Encontrar arquivos grandes
SELECT * FROM DIRECTORY(@my_stage)
WHERE SIZE > 1000000
ORDER BY SIZE DESC;

-- Arquivos modificados recentemente
SELECT * FROM DIRECTORY(@my_stage)
WHERE LAST_MODIFIED > DATEADD('day', -7, CURRENT_TIMESTAMP());

-- Contar arquivos por extensão
SELECT 
  SPLIT_PART(RELATIVE_PATH, '.', -1) as extension,
  COUNT(*) as file_count
FROM DIRECTORY(@my_stage)
GROUP BY extension;
\`\`\`

**Benefício**: Mais rápido que LIST, pode fazer JOINs e filtros SQL.`,
    difficulty: 'medium',
    tags: ['stages', 'directory-tables', 'metadata'],
  },

  // ============================================
  // EXTERNAL TABLES
  // ============================================
  {
    id: 'fc-full-10',
    topicId: 'topic-3-1',
    domainId: 'domain-3',
    front: 'O que são External Tables e quando usá-las?',
    back: `**External Tables**: Tabelas que referenciam dados em stages externos sem carregar.

**Criar**:
\`\`\`sql
CREATE EXTERNAL TABLE ext_sales (
  date DATE AS (VALUE:date::DATE),
  product VARCHAR AS (VALUE:product::VARCHAR),
  amount NUMBER AS (VALUE:amount::NUMBER)
)
WITH LOCATION = @my_ext_stage/sales/
FILE_FORMAT = (TYPE = 'PARQUET')
AUTO_REFRESH = TRUE;
\`\`\`

**Particionamento**:
\`\`\`sql
CREATE EXTERNAL TABLE ext_logs (
  log_date DATE AS (
    TO_DATE(SPLIT_PART(METADATA$FILENAME, '/', 3), 'YYYY-MM-DD')
  ),
  message VARCHAR AS (VALUE:message::VARCHAR)
)
PARTITION BY (log_date)
WITH LOCATION = @logs_stage/
AUTO_REFRESH = TRUE;
\`\`\`

**Colunas de Metadados**:
- METADATA$FILENAME: Caminho do arquivo
- METADATA$FILE_ROW_NUMBER: Número da linha
- METADATA$FILE_CONTENT_KEY: Chave única
- METADATA$FILE_LAST_MODIFIED: Timestamp

**Quando usar**:
- Data lake com muitos arquivos
- Dados que não precisam ser carregados
- Queries ocasionais em dados históricos
- Evitar custos de storage interno

**Limitações**:
- Mais lento que tabelas internas
- Sem DML (INSERT, UPDATE, DELETE)
- Sem Time Travel
- Sem clustering

**Dica**: Use para exploração, carregue para produção.`,
    difficulty: 'hard',
    tags: ['external-tables', 'data-lake'],
  },

  // ============================================
  // DYNAMIC DATA MASKING DETALHADO
  // ============================================
  {
    id: 'fc-full-11',
    topicId: 'topic-4-1',
    domainId: 'domain-4',
    front: 'Como criar e aplicar Masking Policies completas?',
    back: `**Dynamic Data Masking**: Ocultar dados sensíveis por role/condição.

**Criar Policy**:
\`\`\`sql
CREATE MASKING POLICY mask_email AS (val STRING) 
RETURNS STRING ->
  CASE
    WHEN CURRENT_ROLE() IN ('ADMIN', 'DBA') THEN val
    WHEN CURRENT_ROLE() = 'ANALYST' THEN 
      REGEXP_REPLACE(val, '.+@', '***@')
    ELSE '***@***.***'
  END;

-- Policy para números
CREATE MASKING POLICY mask_ssn AS (val STRING)
RETURNS STRING ->
  CASE
    WHEN CURRENT_ROLE() IN ('HR_ADMIN') THEN val
    ELSE '***-**-' || RIGHT(val, 4)
  END;

-- Policy condicional complexa
CREATE MASKING POLICY mask_salary AS (val NUMBER)
RETURNS NUMBER ->
  CASE
    WHEN CURRENT_ROLE() IN ('FINANCE') THEN val
    WHEN CURRENT_ROLE() IN ('MANAGER') AND val < 100000 THEN val
    ELSE NULL
  END;
\`\`\`

**Aplicar**:
\`\`\`sql
ALTER TABLE employees MODIFY COLUMN email 
  SET MASKING POLICY mask_email;

ALTER TABLE employees MODIFY COLUMN ssn 
  SET MASKING POLICY mask_ssn;
\`\`\`

**Gerenciar**:
\`\`\`sql
-- Ver policies
SHOW MASKING POLICIES;

-- Ver onde está aplicada
SELECT * FROM TABLE(INFORMATION_SCHEMA.POLICY_REFERENCES(
  POLICY_NAME => 'mask_email'
));

-- Remover
ALTER TABLE employees MODIFY COLUMN email 
  UNSET MASKING POLICY;
\`\`\`

**Regras**:
- Uma policy por coluna
- Tipo de entrada = tipo de saída
- Pode usar funções, CASE, subconsultas`,
    difficulty: 'hard',
    tags: ['masking-policy', 'security', 'column-level'],
  },

  // ============================================
  // ROW ACCESS POLICY DETALHADO
  // ============================================
  {
    id: 'fc-full-12',
    topicId: 'topic-4-1',
    domainId: 'domain-4',
    front: 'Como implementar Row Access Policies para multi-tenancy?',
    back: `**Row Access Policy**: Filtrar linhas baseado em condições.

**Criar Policy**:
\`\`\`sql
-- Simples: por role
CREATE ROW ACCESS POLICY rap_by_role AS (region VARCHAR)
RETURNS BOOLEAN ->
  CURRENT_ROLE() = 'ADMIN' 
  OR region IN (
    SELECT allowed_region FROM user_permissions 
    WHERE user_name = CURRENT_USER()
  );

-- Multi-tenant
CREATE ROW ACCESS POLICY rap_tenant AS (tenant_id INT)
RETURNS BOOLEAN ->
  EXISTS (
    SELECT 1 FROM session_context 
    WHERE context_tenant_id = tenant_id
    AND context_user = CURRENT_USER()
  );

-- Com mapping table
CREATE ROW ACCESS POLICY rap_department AS (dept_id INT)
RETURNS BOOLEAN ->
  CURRENT_ROLE() IN ('ADMIN', 'EXECUTIVE')
  OR dept_id IN (
    SELECT department_id FROM user_departments
    WHERE username = CURRENT_USER()
  );
\`\`\`

**Aplicar**:
\`\`\`sql
ALTER TABLE sales ADD ROW ACCESS POLICY rap_by_role ON (region);

-- Múltiplas colunas (AND implícito)
ALTER TABLE orders ADD ROW ACCESS POLICY rap_tenant ON (tenant_id);
\`\`\`

**Gerenciar**:
\`\`\`sql
-- Ver policies
SHOW ROW ACCESS POLICIES;

-- Ver aplicações
SELECT * FROM TABLE(INFORMATION_SCHEMA.POLICY_REFERENCES(
  POLICY_NAME => 'rap_by_role'
));

-- Remover
ALTER TABLE sales DROP ROW ACCESS POLICY rap_by_role;
\`\`\`

**Best Practices**:
- Use mapping tables para flexibilidade
- Minimize subconsultas complexas
- Considere impacto em performance
- Combine com Secure Views para máxima segurança`,
    difficulty: 'hard',
    tags: ['row-access-policy', 'security', 'multi-tenant'],
  },

  // ============================================
  // OBJECT TAGGING
  // ============================================
  {
    id: 'fc-full-13',
    topicId: 'topic-4-1',
    domainId: 'domain-4',
    front: 'Como usar Object Tagging para governança de dados?',
    back: `**Object Tagging**: Metadados para classificação e governança.

**Criar Tags**:
\`\`\`sql
-- Tag simples
CREATE TAG cost_center;

-- Tag com valores permitidos
CREATE TAG data_classification 
  ALLOWED_VALUES 'public', 'internal', 'confidential', 'restricted';

-- Tag para PII
CREATE TAG pii_type
  ALLOWED_VALUES 'none', 'name', 'email', 'ssn', 'phone', 'address';
\`\`\`

**Aplicar Tags**:
\`\`\`sql
-- Em objetos
ALTER DATABASE sales_db SET TAG cost_center = 'SALES-001';
ALTER SCHEMA sales_db.public SET TAG data_classification = 'internal';
ALTER TABLE customers SET TAG data_classification = 'confidential';

-- Em colunas
ALTER TABLE customers MODIFY COLUMN email SET TAG pii_type = 'email';
ALTER TABLE customers MODIFY COLUMN ssn SET TAG pii_type = 'ssn';

-- Em warehouses
ALTER WAREHOUSE analytics_wh SET TAG cost_center = 'ANALYTICS-001';
\`\`\`

**Consultar Tags**:
\`\`\`sql
-- Ver tags de um objeto
SELECT * FROM TABLE(INFORMATION_SCHEMA.TAG_REFERENCES(
  'customers', 'TABLE'
));

-- Encontrar todos objetos com uma tag
SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.TAG_REFERENCES
WHERE TAG_NAME = 'DATA_CLASSIFICATION'
AND TAG_VALUE = 'confidential';

-- Lineage de tags
SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.TAG_REFERENCES
WHERE TAG_NAME = 'PII_TYPE';
\`\`\`

**Tag-Based Masking**:
\`\`\`sql
-- Policy que usa tags
CREATE MASKING POLICY mask_by_tag AS (val STRING)
RETURNS STRING ->
  CASE 
    WHEN SYSTEM$GET_TAG_ON_CURRENT_COLUMN('pii_type') = 'ssn'
      AND CURRENT_ROLE() NOT IN ('ADMIN') THEN '***-**-****'
    ELSE val
  END;
\`\`\``,
    difficulty: 'hard',
    tags: ['tagging', 'governance', 'classification'],
  },

  // ============================================
  // DATA CLEAN ROOMS
  // ============================================
  {
    id: 'fc-full-14',
    topicId: 'topic-5-3',
    domainId: 'domain-5',
    front: 'O que são Data Clean Rooms no Snowflake?',
    back: `**Data Clean Rooms**: Ambiente seguro para análise colaborativa sem expor dados brutos.

**Conceito**:
- Duas ou mais partes compartilham dados
- Análises conjuntas sem ver dados individuais
- Só resultados agregados são retornados
- Proteção de privacidade e propriedade intelectual

**Implementação**:
\`\`\`sql
-- Provider: Criar ambiente seguro
CREATE SECURE VIEW clean_room_view AS
SELECT 
  -- Apenas métricas agregadas
  customer_segment,
  COUNT(*) as customer_count,
  AVG(lifetime_value) as avg_ltv
FROM customers
GROUP BY customer_segment
HAVING COUNT(*) >= 100;  -- Mínimo de k-anonymity

-- Provider: Compartilhar
CREATE SHARE clean_room_share;
GRANT SELECT ON clean_room_view TO SHARE clean_room_share;
ALTER SHARE clean_room_share ADD ACCOUNTS = partner_account;
\`\`\`

**Com Templates Padronizados**:
\`\`\`sql
-- Procedure que controla queries permitidas
CREATE SECURE PROCEDURE run_approved_analysis(analysis_type VARCHAR)
RETURNS TABLE(...)
EXECUTE AS OWNER
AS
$$
  CASE analysis_type
    WHEN 'overlap' THEN
      -- Query de overlap aprovada
    WHEN 'demographics' THEN
      -- Query demográfica aprovada
    ELSE
      RAISE EXCEPTION 'Analysis not approved';
  END
$$;
\`\`\`

**Proteções**:
- Secure Views (oculta definição)
- Row Access Policies
- Masking Policies
- Aggregation requirements (k-anonymity)
- Query restrictions via procedures

**Snowflake Native Data Clean Rooms**: Solução gerenciada disponível.`,
    difficulty: 'hard',
    tags: ['clean-rooms', 'collaboration', 'privacy'],
  },

  // ============================================
  // SNOWFLAKE NATIVE APPS
  // ============================================
  {
    id: 'fc-full-15',
    topicId: 'topic-5-3',
    domainId: 'domain-5',
    front: 'O que são Snowflake Native Apps?',
    back: `**Native Apps**: Aplicações construídas e distribuídas dentro do Snowflake.

**Conceito**:
- Apps rodam diretamente no Snowflake do consumidor
- Dados nunca saem da conta do consumidor
- Provider não vê dados do consumidor
- Distribuição via Marketplace ou Private Listings

**Componentes de um Native App**:
1. **Application Package**: Container do app
2. **Setup Script**: Configura objetos no install
3. **Manifest**: Metadata do app
4. **Versões**: Gerenciamento de releases

**Estrutura básica**:
\`\`\`sql
-- Provider: Criar package
CREATE APPLICATION PACKAGE my_app_package;

-- Adicionar código
CREATE SCHEMA my_app_package.code_schema;
CREATE PROCEDURE my_app_package.code_schema.analyze_data()
  ...;

-- Setup script (executado na instalação)
-- scripts/setup.sql
CREATE APPLICATION ROLE app_user;
CREATE SCHEMA IF NOT EXISTS core;
GRANT USAGE ON SCHEMA core TO APPLICATION ROLE app_user;
\`\`\`

**manifest.yml**:
\`\`\`yaml
manifest_version: 1
artifacts:
  setup_script: scripts/setup.sql
  readme: README.md
configuration:
  log_level: INFO
\`\`\`

**Consumer: Instalar**:
\`\`\`sql
-- Do Marketplace ou Listing
CREATE APPLICATION my_app 
FROM APPLICATION PACKAGE provider.my_app_package;

-- Usar
CALL my_app.core.analyze_data();
\`\`\`

**Benefícios**:
- Segurança (dados não saem)
- Monetização via Marketplace
- Atualizações automáticas`,
    difficulty: 'hard',
    tags: ['native-apps', 'marketplace', 'distribution'],
  },

  // ============================================
  // ALERTS
  // ============================================
  {
    id: 'fc-full-16',
    topicId: 'topic-5-1',
    domainId: 'domain-5',
    front: 'Como configurar Alerts no Snowflake?',
    back: `**Alerts**: Monitoramento automatizado com ações.

**Criar Alert**:
\`\`\`sql
CREATE ALERT high_error_rate
  WAREHOUSE = monitoring_wh
  SCHEDULE = '5 MINUTE'
  IF (EXISTS (
    SELECT 1 FROM error_logs
    WHERE timestamp > DATEADD('minute', -5, CURRENT_TIMESTAMP())
    GROUP BY error_type
    HAVING COUNT(*) > 100
  ))
  THEN
    CALL send_slack_notification('High error rate detected!');
\`\`\`

**Ativar/Desativar**:
\`\`\`sql
ALTER ALERT high_error_rate RESUME;
ALTER ALERT high_error_rate SUSPEND;
\`\`\`

**Exemplos de Uso**:
\`\`\`sql
-- Monitorar custos
CREATE ALERT credit_usage_alert
  WAREHOUSE = monitoring_wh
  SCHEDULE = '1 HOUR'
  IF (EXISTS (
    SELECT 1 FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY
    WHERE START_TIME > DATEADD('hour', -1, CURRENT_TIMESTAMP())
    GROUP BY ALL
    HAVING SUM(CREDITS_USED) > 100
  ))
  THEN
    CALL notify_admin('High credit usage in last hour');

-- Monitorar data freshness
CREATE ALERT stale_data_alert
  WAREHOUSE = monitoring_wh
  SCHEDULE = '30 MINUTE'
  IF (EXISTS (
    SELECT 1 FROM data_loads
    WHERE table_name = 'critical_table'
    AND last_load < DATEADD('hour', -2, CURRENT_TIMESTAMP())
  ))
  THEN
    CALL send_pagerduty_alert('Critical table not updated');
\`\`\`

**Histórico**:
\`\`\`sql
-- Ver execuções
SELECT * FROM TABLE(INFORMATION_SCHEMA.ALERT_HISTORY())
ORDER BY SCHEDULED_TIME DESC;
\`\`\`

**Dica**: Use warehouse pequeno dedicado para alerts (custo mínimo).`,
    difficulty: 'medium',
    tags: ['alerts', 'monitoring', 'automation'],
  },

  // ============================================
  // EXPLAIN E QUERY PLAN
  // ============================================
  {
    id: 'fc-full-17',
    topicId: 'topic-1-4',
    domainId: 'domain-1',
    front: 'Como usar EXPLAIN para analisar queries?',
    back: `**EXPLAIN**: Mostra o plano de execução sem executar.

**Sintaxe**:
\`\`\`sql
EXPLAIN
SELECT * FROM large_table WHERE date > '2024-01-01';

-- Com formato específico
EXPLAIN USING TEXT
SELECT * FROM large_table;

EXPLAIN USING TABULAR
SELECT * FROM large_table;

EXPLAIN USING JSON
SELECT * FROM large_table;
\`\`\`

**Operações Comuns no Plano**:

| Operação | Significado |
|----------|-------------|
| TableScan | Leitura de tabela |
| Filter | Aplicação de WHERE |
| Aggregate | GROUP BY / agregações |
| Sort | ORDER BY |
| Join | Junção de tabelas |
| WindowFunction | Funções de janela |
| Limit | LIMIT/TOP |
| UnionAll | UNION ALL |

**Exemplo de Output**:
\`\`\`
GlobalStats:
  partitionsTotal=1000
  partitionsAssigned=50
  bytesAssigned=1073741824
  
Operations:
1:0 -> Result
1:1   -> Aggregate
1:2     -> Filter
1:3       -> TableScan[TABLE_NAME]
             partitionsScanned=50
             partitionsTotal=1000
\`\`\`

**O que observar**:
- partitionsScanned vs partitionsTotal (pruning)
- Ordem das operações
- Tipo de Join usado
- Presença de Sort

**Limitações**:
- Não mostra tempo de execução
- Não mostra spilling
- Para detalhes, use Query Profile

**Dica**: EXPLAIN é rápido, use para testar otimizações antes de executar.`,
    difficulty: 'medium',
    tags: ['explain', 'query-plan', 'optimization'],
  },

  // ============================================
  // SERVERLESS FEATURES
  // ============================================
  {
    id: 'fc-full-18',
    topicId: 'topic-6-1',
    domainId: 'domain-6',
    front: 'Quais são os recursos serverless do Snowflake?',
    back: `**Recursos Serverless**: Compute gerenciado sem warehouse.

**1. Snowpipe**:
- Ingestão contínua de dados
- Cobrado por arquivo/dados processados
- Sem warehouse dedicado

**2. Serverless Tasks**:
\`\`\`sql
CREATE TASK serverless_task
  USER_TASK_MANAGED_INITIAL_WAREHOUSE_SIZE = 'XSMALL'
  -- Sem WAREHOUSE = ...
  SCHEDULE = '1 HOUR'
AS
  CALL process_data();
\`\`\`

**3. Automatic Clustering**:
\`\`\`sql
ALTER TABLE large_table RESUME RECLUSTER;
-- Background, serverless
\`\`\`

**4. Search Optimization Service**:
\`\`\`sql
ALTER TABLE large_table ADD SEARCH OPTIMIZATION;
-- Manutenção serverless
\`\`\`

**5. Materialized View Maintenance**:
- Atualização automática em background
- Cobrado como serverless compute

**6. Replication**:
- Database replication
- Failover groups
- Compute gerenciado

**7. Query Acceleration Service**:
\`\`\`sql
ALTER WAREHOUSE wh SET ENABLE_QUERY_ACCELERATION = TRUE;
-- Recursos adicionais on-demand
\`\`\`

**Cobrança Serverless**:
- Medido em "serverless credits"
- Geralmente mais barato que warehouse equivalente
- Pay-per-use

**Monitorar Uso**:
\`\`\`sql
SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.SERVERLESS_TASK_HISTORY;
SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.PIPE_USAGE_HISTORY;
SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.SEARCH_OPTIMIZATION_HISTORY;
\`\`\``,
    difficulty: 'medium',
    tags: ['serverless', 'compute', 'cost'],
  },

  // ============================================
  // INFORMATION_SCHEMA vs ACCOUNT_USAGE
  // ============================================
  {
    id: 'fc-full-19',
    topicId: 'topic-5-1',
    domainId: 'domain-5',
    front: 'Qual a diferença entre INFORMATION_SCHEMA e ACCOUNT_USAGE?',
    back: `**INFORMATION_SCHEMA**: Metadados em tempo real do database atual.

\`\`\`sql
-- Por database
SELECT * FROM my_database.INFORMATION_SCHEMA.TABLES;
SELECT * FROM my_database.INFORMATION_SCHEMA.COLUMNS;
SELECT * FROM my_database.INFORMATION_SCHEMA.VIEWS;

-- Funções de tabela
SELECT * FROM TABLE(INFORMATION_SCHEMA.QUERY_HISTORY());
SELECT * FROM TABLE(INFORMATION_SCHEMA.COPY_HISTORY(...));
\`\`\`

**ACCOUNT_USAGE (SNOWFLAKE database)**: Histórico da conta toda.

\`\`\`sql
-- Histórico até 365 dias
SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY;
SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.LOGIN_HISTORY;
SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY;
SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.STORAGE_USAGE;
SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.TABLES;
SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.COLUMNS;
\`\`\`

**Comparação**:

| Aspecto | INFORMATION_SCHEMA | ACCOUNT_USAGE |
|---------|-------------------|---------------|
| Escopo | Database atual | Conta toda |
| Latência | Tempo real | 45 min - 3 horas |
| Histórico | Limitado (7-14 dias) | Até 365 dias |
| Permissão | USAGE no DB | IMPORTED PRIVILEGES |
| Dropped objects | Não | Sim |

**Quando usar**:
- **INFORMATION_SCHEMA**: Metadata atual, scripts de automação
- **ACCOUNT_USAGE**: Análise histórica, auditoria, billing

**Dica**: Para histórico de queries longas, use ACCOUNT_USAGE.`,
    difficulty: 'medium',
    tags: ['information-schema', 'account-usage', 'metadata'],
  },

  // ============================================
  // ASOF JOIN
  // ============================================
  {
    id: 'fc-full-20',
    topicId: 'topic-1-3',
    domainId: 'domain-1',
    front: 'O que é ASOF JOIN e quando usá-lo?',
    back: `**ASOF JOIN**: Join baseado em "melhor match" temporal.

**Problema que resolve**: Juntar eventos com dados de referência onde timestamps não são exatos.

**Sintaxe**:
\`\`\`sql
SELECT *
FROM events e
ASOF JOIN prices p
  MATCH_CONDITION (e.event_time >= p.price_time)
  ON e.symbol = p.symbol;
\`\`\`

**Exemplo - Preços de Ações**:
\`\`\`sql
-- Trades: quando ocorreram transações
-- Prices: preços a cada minuto

SELECT 
  t.trade_id,
  t.symbol,
  t.trade_time,
  t.quantity,
  p.price,
  t.quantity * p.price as trade_value
FROM trades t
ASOF JOIN prices p
  MATCH_CONDITION (t.trade_time >= p.price_time)
  ON t.symbol = p.symbol;
-- Para cada trade, pega o preço mais recente ANTES do trade
\`\`\`

**Exemplo - Logs com Configuração**:
\`\`\`sql
-- Qual era a configuração ativa quando o erro ocorreu?
SELECT 
  e.error_id,
  e.error_time,
  e.message,
  c.config_value
FROM error_logs e
ASOF JOIN config_history c
  MATCH_CONDITION (e.error_time >= c.effective_from)
  ON e.config_name = c.config_name;
\`\`\`

**Características**:
- Match mais próximo que satisfaz a condição
- Muito mais eficiente que self-join com subquery
- Específico para séries temporais
- Uma linha de resultado por linha da tabela esquerda

**Dica**: Ideal para point-in-time analysis.`,
    difficulty: 'hard',
    tags: ['asof-join', 'time-series', 'joins'],
  },

  // ============================================
  // SAMPLING
  // ============================================
  {
    id: 'fc-full-21',
    topicId: 'topic-1-4',
    domainId: 'domain-1',
    front: 'Como usar SAMPLE para amostragem de dados?',
    back: `**SAMPLE/TABLESAMPLE**: Amostragem eficiente de dados.

**Métodos**:

**1. Row-based (BERNOULLI)**:
\`\`\`sql
-- 10% das linhas (probabilístico)
SELECT * FROM large_table SAMPLE (10);

-- Equivalente
SELECT * FROM large_table TABLESAMPLE BERNOULLI (10);
\`\`\`

**2. Block-based (SYSTEM)**:
\`\`\`sql
-- 10% dos blocos (mais rápido, menos preciso)
SELECT * FROM large_table TABLESAMPLE SYSTEM (10);
\`\`\`

**3. Fixed number of rows**:
\`\`\`sql
-- Exatamente 1000 linhas
SELECT * FROM large_table SAMPLE (1000 ROWS);
\`\`\`

**Com SEED (reproduzível)**:
\`\`\`sql
-- Mesma amostra toda vez
SELECT * FROM large_table SAMPLE (10) SEED (42);

-- Amostra diferente
SELECT * FROM large_table SAMPLE (10) SEED (123);
\`\`\`

**Usos**:
\`\`\`sql
-- Desenvolvimento/teste
SELECT * FROM production_table SAMPLE (1);

-- Análise exploratória
SELECT 
  category,
  AVG(price) as avg_price
FROM large_catalog SAMPLE (5)
GROUP BY category;

-- A/B testing
SELECT * FROM users 
SAMPLE (50) SEED (1) -- Grupo A
UNION ALL
SELECT * FROM users
SAMPLE (50) SEED (2); -- Grupo B
\`\`\`

**Dica**: SYSTEM é mais rápido mas menos uniforme que BERNOULLI.`,
    difficulty: 'medium',
    tags: ['sample', 'tablesample', 'performance'],
  },

  // ============================================
  // SHOW COMMANDS
  // ============================================
  {
    id: 'fc-full-22',
    topicId: 'topic-5-1',
    domainId: 'domain-5',
    front: 'Quais são os principais comandos SHOW para metadata?',
    back: `**Comandos SHOW**: Listar objetos e propriedades.

**Objetos**:
\`\`\`sql
SHOW DATABASES;
SHOW SCHEMAS IN DATABASE my_db;
SHOW TABLES IN SCHEMA my_db.my_schema;
SHOW VIEWS IN SCHEMA my_db.my_schema;
SHOW COLUMNS IN TABLE my_table;

SHOW WAREHOUSES;
SHOW STAGES;
SHOW FILE FORMATS;
SHOW PIPES;
SHOW STREAMS;
SHOW TASKS;
SHOW SEQUENCES;

SHOW USERS;
SHOW ROLES;
SHOW GRANTS TO USER john;
SHOW GRANTS ON TABLE my_table;
SHOW FUTURE GRANTS IN SCHEMA my_schema;
\`\`\`

**Com Filtros**:
\`\`\`sql
-- LIKE pattern
SHOW TABLES LIKE 'sales%';

-- STARTS WITH
SHOW TABLES STARTS WITH 'fact_';

-- IN específico
SHOW TABLES IN SCHEMA analytics.public;

-- LIMIT
SHOW TABLES LIMIT 10;
\`\`\`

**Resultado como Tabela**:
\`\`\`sql
-- Usar resultado em query
SELECT "name", "rows" 
FROM TABLE(RESULT_SCAN(LAST_QUERY_ID()))
WHERE "rows" > 1000000;

-- Ou direto
SHOW TABLES;
SELECT * FROM TABLE(RESULT_SCAN(LAST_QUERY_ID()));
\`\`\`

**DESCRIBE (detalhes)**:
\`\`\`sql
DESCRIBE TABLE my_table;
DESC TABLE my_table;  -- Abreviação

DESCRIBE VIEW my_view;
DESCRIBE FUNCTION my_function(INT);
DESCRIBE PROCEDURE my_procedure(VARCHAR);
\`\`\`

**GET_DDL (definição)**:
\`\`\`sql
SELECT GET_DDL('TABLE', 'my_table');
SELECT GET_DDL('VIEW', 'my_view');
SELECT GET_DDL('SCHEMA', 'my_schema', TRUE);  -- Inclui objetos
\`\`\``,
    difficulty: 'easy',
    tags: ['show', 'describe', 'metadata'],
  },

  // ============================================
  // NETWORK POLICIES
  // ============================================
  {
    id: 'fc-full-23',
    topicId: 'topic-4-1',
    domainId: 'domain-4',
    front: 'O que são Network Policies e como configurá-las?',
    back: `**Network Policies**: Controle de acesso por IP.

**Criar Policy**:
\`\`\`sql
-- Permitir IPs específicos
CREATE NETWORK POLICY office_only
  ALLOWED_IP_LIST = ('192.168.1.0/24', '10.0.0.0/8')
  BLOCKED_IP_LIST = ('192.168.1.100');

-- Com comentário
CREATE NETWORK POLICY vpn_required
  ALLOWED_IP_LIST = ('203.0.113.0/24')
  COMMENT = 'Only allow VPN access';
\`\`\`

**Aplicar**:
\`\`\`sql
-- A nível de conta (ACCOUNTADMIN)
ALTER ACCOUNT SET NETWORK_POLICY = office_only;

-- A nível de usuário
ALTER USER john SET NETWORK_POLICY = vpn_required;
\`\`\`

**Prioridade**:
1. User-level policy (mais específica)
2. Account-level policy (fallback)

**Gerenciar**:
\`\`\`sql
-- Ver policies
SHOW NETWORK POLICIES;

-- Descrever
DESCRIBE NETWORK POLICY office_only;

-- Modificar
ALTER NETWORK POLICY office_only SET
  ALLOWED_IP_LIST = ('192.168.1.0/24', '10.0.0.0/8', '172.16.0.0/12');

-- Remover de usuário
ALTER USER john UNSET NETWORK_POLICY;

-- Remover de conta
ALTER ACCOUNT UNSET NETWORK_POLICY;

-- Drop
DROP NETWORK POLICY office_only;
\`\`\`

**Casos de Uso**:
- Restringir acesso a escritório/VPN
- Compliance (HIPAA, SOC2)
- Ambiente de produção bloqueado

**Dica**: Cuidado ao aplicar em conta - pode se bloquear!`,
    difficulty: 'medium',
    tags: ['network-policy', 'security', 'ip-filtering'],
  },

  // ============================================
  // REPLICATION
  // ============================================
  {
    id: 'fc-full-24',
    topicId: 'topic-4-4',
    domainId: 'domain-4',
    front: 'Como funciona Database Replication no Snowflake?',
    back: `**Database Replication**: Cópia de databases entre contas/regiões.

**Tipos**:
1. **Database Replication**: Databases individuais
2. **Failover Groups**: Múltiplos objetos com failover

**Configurar Replication**:
\`\`\`sql
-- Conta origem: Habilitar replicação
ALTER DATABASE my_db ENABLE REPLICATION TO ACCOUNTS org.target_account;

-- Conta destino: Criar réplica
CREATE DATABASE my_db_replica
  AS REPLICA OF org.source_account.my_db;

-- Refresh manual
ALTER DATABASE my_db_replica REFRESH;

-- Schedule automático
ALTER DATABASE my_db_replica SET
  REPLICATION_SCHEDULE = '10 MINUTE';
\`\`\`

**Failover Groups** (DR):
\`\`\`sql
-- Origem: Criar grupo
CREATE FAILOVER GROUP my_fg
  OBJECT_TYPES = DATABASES, ROLES, WAREHOUSES
  ALLOWED_DATABASES = db1, db2
  ALLOWED_ACCOUNTS = org.dr_account
  REPLICATION_SCHEDULE = '10 MINUTE';

-- Destino: Criar réplica secundária
CREATE FAILOVER GROUP my_fg
  AS REPLICA OF org.primary_account.my_fg;

-- Failover (promover secundário)
ALTER FAILOVER GROUP my_fg PRIMARY;
\`\`\`

**Monitorar**:
\`\`\`sql
-- Status de replicação
SHOW REPLICATION DATABASES;

-- Histórico
SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.REPLICATION_GROUP_REFRESH_HISTORY;

-- Lag
SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.DATABASE_REPLICATION_USAGE_HISTORY;
\`\`\`

**Custos**:
- Data transfer entre regiões
- Storage na réplica
- Compute para refresh`,
    difficulty: 'hard',
    tags: ['replication', 'disaster-recovery', 'failover'],
  },

  // ============================================
  // RESULT_SCAN E LAST_QUERY_ID
  // ============================================
  {
    id: 'fc-full-25',
    topicId: 'topic-5-1',
    domainId: 'domain-5',
    front: 'Como usar RESULT_SCAN e LAST_QUERY_ID?',
    back: `**RESULT_SCAN**: Acessa resultados de query anterior como tabela.

**LAST_QUERY_ID**: Retorna ID da última query.

\`\`\`sql
-- Executar query
SHOW TABLES;

-- Acessar resultado
SELECT * FROM TABLE(RESULT_SCAN(LAST_QUERY_ID()));

-- Filtrar resultado
SELECT "name", "rows" 
FROM TABLE(RESULT_SCAN(LAST_QUERY_ID()))
WHERE "rows" > 1000000;
\`\`\`

**Com Query ID específico**:
\`\`\`sql
-- Guardar ID
SET qid = LAST_QUERY_ID();

-- Usar depois
SELECT * FROM TABLE(RESULT_SCAN($qid));

-- Ou diretamente
SELECT * FROM TABLE(RESULT_SCAN('01ab23cd-...'));
\`\`\`

**Casos de Uso**:
\`\`\`sql
-- Processar resultado de SHOW
SHOW WAREHOUSES;
SELECT 
  "name",
  "size",
  "state"
FROM TABLE(RESULT_SCAN(LAST_QUERY_ID()))
WHERE "state" = 'STARTED';

-- Validar COPY
COPY INTO my_table FROM @stage;
SELECT * FROM TABLE(RESULT_SCAN(LAST_QUERY_ID()))
WHERE "status" != 'LOADED';

-- Debug de EXPLAIN
EXPLAIN SELECT * FROM large_table;
SELECT * FROM TABLE(RESULT_SCAN(LAST_QUERY_ID()));
\`\`\`

**Limitações**:
- Resultado expira após algum tempo
- Não persiste entre sessões
- Limitado ao tamanho do result cache

**Dica**: Útil para automação e scripts dinâmicos.`,
    difficulty: 'medium',
    tags: ['result-scan', 'last-query-id', 'metadata'],
  },

  // ============================================
  // PERCENTILE FUNCTIONS
  // ============================================
  {
    id: 'fc-full-26',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'Como calcular percentis e medianas no Snowflake?',
    back: `**Funções de Percentil**:

**PERCENTILE_CONT** (interpolado):
\`\`\`sql
-- Mediana (percentil 50)
SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY salary)
FROM employees;

-- Múltiplos percentis
SELECT 
  PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY salary) as p25,
  PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY salary) as median,
  PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY salary) as p75,
  PERCENTILE_CONT(0.90) WITHIN GROUP (ORDER BY salary) as p90
FROM employees;
\`\`\`

**PERCENTILE_DISC** (valor exato):
\`\`\`sql
-- Retorna valor real mais próximo
SELECT PERCENTILE_DISC(0.5) WITHIN GROUP (ORDER BY salary)
FROM employees;
\`\`\`

**MEDIAN** (atalho para percentil 50):
\`\`\`sql
SELECT MEDIAN(salary) FROM employees;
-- Equivalente a PERCENTILE_CONT(0.5)
\`\`\`

**Por Grupo**:
\`\`\`sql
SELECT 
  department,
  MEDIAN(salary) as median_salary,
  PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY salary) as p90_salary
FROM employees
GROUP BY department;
\`\`\`

**Como Window Function** (PERCENTILE_CONT não suporta, use alternativa):
\`\`\`sql
SELECT 
  employee_id,
  salary,
  PERCENT_RANK() OVER (ORDER BY salary) as percentile_rank
FROM employees;
\`\`\`

**Diferença CONT vs DISC**:
- CONT: Interpola entre valores (pode não existir nos dados)
- DISC: Retorna valor exato dos dados`,
    difficulty: 'medium',
    tags: ['percentile', 'median', 'statistics'],
  },

  // ============================================
  // APPROXIMATE FUNCTIONS
  // ============================================
  {
    id: 'fc-full-27',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'Quais são as funções de aproximação e quando usá-las?',
    back: `**Funções Aproximadas**: Resultados rápidos para big data.

**APPROX_COUNT_DISTINCT** (HyperLogLog):
\`\`\`sql
-- Contagem distinta aproximada (muito mais rápido)
SELECT APPROX_COUNT_DISTINCT(user_id) as unique_users
FROM events;

-- Erro típico: ~2%
-- Comparar com exato:
SELECT 
  COUNT(DISTINCT user_id) as exact,
  APPROX_COUNT_DISTINCT(user_id) as approx
FROM events;
\`\`\`

**APPROX_TOP_K**:
\`\`\`sql
-- Top valores aproximados
SELECT APPROX_TOP_K(product_id, 10) as top_products
FROM orders;
\`\`\`

**APPROX_PERCENTILE**:
\`\`\`sql
-- Percentil aproximado
SELECT APPROX_PERCENTILE(response_time, 0.95) as p95_latency
FROM api_logs;
\`\`\`

**HLL (HyperLogLog) Functions**:
\`\`\`sql
-- Criar estado HLL (para merge depois)
SELECT HLL(user_id) as hll_state
FROM events
GROUP BY date;

-- Combinar estados
SELECT HLL_COMBINE(hll_state) as combined_hll
FROM daily_hll_states;

-- Estimar contagem
SELECT HLL_ESTIMATE(HLL_COMBINE(hll_state))
FROM daily_hll_states;

-- Exportar/Importar (para armazenar)
SELECT HLL_EXPORT(HLL(user_id)) as hll_binary
FROM events;
\`\`\`

**Quando usar**:
- Datasets muito grandes (bilhões de linhas)
- Precisão exata não necessária
- Agregações em tempo real
- Dashboards de monitoramento

**Dica**: 100x mais rápido que COUNT(DISTINCT) em grandes datasets.`,
    difficulty: 'hard',
    tags: ['approximate', 'hll', 'performance'],
  },

  // ============================================
  // GENERATOR E SEQUENCES
  // ============================================
  {
    id: 'fc-full-28',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'Como gerar séries de dados com GENERATOR?',
    back: `**GENERATOR**: Gera linhas sem tabela fonte.

**Sintaxe**:
\`\`\`sql
SELECT * FROM TABLE(GENERATOR(ROWCOUNT => 1000));
\`\`\`

**Com SEQ para sequência**:
\`\`\`sql
-- Números de 1 a 100
SELECT SEQ4() as num
FROM TABLE(GENERATOR(ROWCOUNT => 100));

-- Diferentes tamanhos de SEQ
SELECT 
  SEQ1() as seq1,   -- TINYINT
  SEQ2() as seq2,   -- SMALLINT
  SEQ4() as seq4,   -- INT
  SEQ8() as seq8    -- BIGINT
FROM TABLE(GENERATOR(ROWCOUNT => 10));
\`\`\`

**Gerar Datas**:
\`\`\`sql
-- Todas as datas de 2024
SELECT DATEADD('day', SEQ4(), '2024-01-01'::DATE) as date
FROM TABLE(GENERATOR(ROWCOUNT => 366))
WHERE date <= '2024-12-31';

-- Últimos 30 dias
SELECT DATEADD('day', -SEQ4(), CURRENT_DATE) as date
FROM TABLE(GENERATOR(ROWCOUNT => 30));
\`\`\`

**Gerar Timestamps**:
\`\`\`sql
-- Horários de um dia (a cada hora)
SELECT DATEADD('hour', SEQ4(), '2024-01-01 00:00:00'::TIMESTAMP) as hour
FROM TABLE(GENERATOR(ROWCOUNT => 24));
\`\`\`

**Dados de Teste**:
\`\`\`sql
-- Gerar dados aleatórios
SELECT 
  SEQ4() as id,
  'User_' || SEQ4() as username,
  RANDOM() as random_value,
  UNIFORM(1, 100, RANDOM()) as random_1_to_100,
  UUID_STRING() as uuid
FROM TABLE(GENERATOR(ROWCOUNT => 1000));
\`\`\`

**Dica**: Ótimo para criar tabelas de dimensão de tempo.`,
    difficulty: 'medium',
    tags: ['generator', 'seq', 'test-data'],
  },

  // ============================================
  // QUALIFY COM DIFERENTES PADRÕES
  // ============================================
  {
    id: 'fc-full-29',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    front: 'Quais são os padrões comuns de uso do QUALIFY?',
    back: `**Padrões de QUALIFY**:

**1. Deduplicação (manter mais recente)**:
\`\`\`sql
SELECT *
FROM events
QUALIFY ROW_NUMBER() OVER (
  PARTITION BY user_id, event_type 
  ORDER BY event_time DESC
) = 1;
\`\`\`

**2. Top N por grupo**:
\`\`\`sql
-- Top 3 produtos por categoria
SELECT *
FROM products
QUALIFY ROW_NUMBER() OVER (
  PARTITION BY category 
  ORDER BY sales DESC
) <= 3;

-- Usando RANK (inclui empates)
SELECT *
FROM products
QUALIFY RANK() OVER (
  PARTITION BY category 
  ORDER BY sales DESC
) <= 3;
\`\`\`

**3. Primeiro/Último por grupo**:
\`\`\`sql
-- Primeira compra de cada cliente
SELECT *
FROM orders
QUALIFY ROW_NUMBER() OVER (
  PARTITION BY customer_id 
  ORDER BY order_date ASC
) = 1;

-- Última compra
SELECT *
FROM orders
QUALIFY ROW_NUMBER() OVER (
  PARTITION BY customer_id 
  ORDER BY order_date DESC
) = 1;
\`\`\`

**4. Filtrar outliers**:
\`\`\`sql
-- Remover top e bottom 5%
SELECT *
FROM sales
QUALIFY PERCENT_RANK() OVER (ORDER BY amount) 
  BETWEEN 0.05 AND 0.95;
\`\`\`

**5. Linhas com valor acima da média do grupo**:
\`\`\`sql
SELECT *
FROM employees
QUALIFY salary > AVG(salary) OVER (PARTITION BY department);
\`\`\`

**6. Mudanças de valor (change detection)**:
\`\`\`sql
SELECT *
FROM price_history
QUALIFY price != LAG(price) OVER (
  PARTITION BY product_id 
  ORDER BY effective_date
);
\`\`\``,
    difficulty: 'hard',
    tags: ['qualify', 'patterns', 'window-functions'],
  },

  // ============================================
  // COPY OPTIONS AVANÇADAS
  // ============================================
  {
    id: 'fc-full-30',
    topicId: 'topic-3-2',
    domainId: 'domain-3',
    front: 'Quais são todas as opções do COPY INTO?',
    back: `**Opções Completas do COPY INTO**:

**Controle de Arquivos**:
\`\`\`sql
COPY INTO table FROM @stage
  FILES = ('file1.csv', 'file2.csv')  -- Arquivos específicos
  PATTERN = '.*sales.*\\\\.csv'         -- Regex
  FORCE = TRUE                         -- Recarregar arquivos
  PURGE = TRUE                         -- Deletar após carga
  RETURN_FAILED_ONLY = TRUE            -- Só retornar erros
\`\`\`

**Tratamento de Erros**:
\`\`\`sql
ON_ERROR = ABORT_STATEMENT    -- Para tudo (padrão)
ON_ERROR = CONTINUE           -- Pula linhas com erro
ON_ERROR = SKIP_FILE          -- Pula arquivo com erro
ON_ERROR = SKIP_FILE_10       -- Pula se > 10 erros
ON_ERROR = SKIP_FILE_5%       -- Pula se > 5% erros

-- Limite de erros
SIZE_LIMIT = 10000000         -- Max bytes a carregar
\`\`\`

**Validação**:
\`\`\`sql
VALIDATION_MODE = RETURN_ERRORS      -- Retorna erros
VALIDATION_MODE = RETURN_ALL_ERRORS  -- Todos os erros
VALIDATION_MODE = RETURN_10_ROWS     -- Primeiras N linhas
\`\`\`

**Transformação na Carga**:
\`\`\`sql
COPY INTO table (col1, col2, col3)
FROM (
  SELECT 
    $1::VARCHAR,                    -- Coluna 1
    UPPER($2),                      -- Transformação
    TO_DATE($3, 'YYYY-MM-DD'),     -- Conversão
    CURRENT_TIMESTAMP(),            -- Valor fixo
    METADATA$FILENAME               -- Metadado
  FROM @stage
)
\`\`\`

**Opções de Match**:
\`\`\`sql
MATCH_BY_COLUMN_NAME = CASE_SENSITIVE
MATCH_BY_COLUMN_NAME = CASE_INSENSITIVE
MATCH_BY_COLUMN_NAME = NONE          -- Por posição (padrão)

ENFORCE_LENGTH = TRUE                 -- Erro se truncar
TRUNCATECOLUMNS = TRUE                -- Truncar strings longas
\`\`\`

**Metadados Disponíveis**:
- METADATA$FILENAME
- METADATA$FILE_ROW_NUMBER
- METADATA$FILE_CONTENT_KEY
- METADATA$FILE_LAST_MODIFIED
- METADATA$START_SCAN_TIME`,
    difficulty: 'hard',
    tags: ['copy-into', 'options', 'data-loading'],
  },
];

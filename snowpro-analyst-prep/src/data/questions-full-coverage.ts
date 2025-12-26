import { Question } from '@/types';

// Questões para cobertura 100% de todos os objetivos do exame
export const questionsFullCoverage: Question[] = [
  // ============================================
  // DOMAIN 1: SQL & DATA TYPES
  // ============================================
  {
    id: 'qfc-1',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    question: 'Qual função deve ser usada para calcular a mediana de uma coluna numérica?',
    options: [
      'MEDIAN(column)',
      'AVG(column)',
      'MIDDLE(column)',
      'MED(column)'
    ],
    correctAnswer: 0,
    explanation: 'MEDIAN() é a função correta para calcular a mediana. É equivalente a PERCENTILE_CONT(0.5). AVG() calcula a média, não a mediana.',
    difficulty: 'medium',
    tags: ['aggregate-functions', 'statistics'],
  },
  {
    id: 'qfc-2',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    question: 'Qual é a diferença entre PERCENTILE_CONT e PERCENTILE_DISC?',
    options: [
      'PERCENTILE_CONT interpola entre valores, PERCENTILE_DISC retorna um valor existente nos dados',
      'PERCENTILE_CONT é mais rápido que PERCENTILE_DISC',
      'PERCENTILE_DISC interpola entre valores, PERCENTILE_CONT retorna um valor existente',
      'Não há diferença, são sinônimos'
    ],
    correctAnswer: 0,
    explanation: 'PERCENTILE_CONT (continuous) interpola entre valores adjacentes para calcular o percentil exato, podendo retornar um valor que não existe nos dados. PERCENTILE_DISC (discrete) retorna um valor real existente no dataset.',
    difficulty: 'hard',
    tags: ['percentile', 'aggregate-functions'],
  },
  {
    id: 'qfc-3',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    question: 'Qual função de hash é recomendada para criar surrogate keys portáteis entre sistemas?',
    options: [
      'HASH()',
      'MD5() ou SHA2()',
      'RANDOM()',
      'UUID_STRING()'
    ],
    correctAnswer: 1,
    explanation: 'MD5() ou SHA2() são funções de hash padronizadas e portáteis. HASH() é específica do Snowflake e pode mudar entre versões. UUID_STRING() gera identificadores únicos mas não é baseado nos dados.',
    difficulty: 'medium',
    tags: ['hash-functions', 'surrogate-keys'],
  },
  {
    id: 'qfc-4',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    question: 'Como usar LISTAGG com eliminação de duplicatas?',
    options: [
      'LISTAGG(column, \',\') WITHIN GROUP (ORDER BY column)',
      'LISTAGG(DISTINCT column, \',\') WITHIN GROUP (ORDER BY column)',
      'DISTINCT LISTAGG(column, \',\')',
      'LISTAGG não suporta DISTINCT'
    ],
    correctAnswer: 1,
    explanation: 'LISTAGG suporta a palavra-chave DISTINCT logo após o nome da função para eliminar valores duplicados antes da concatenação: LISTAGG(DISTINCT column, delimiter).',
    difficulty: 'medium',
    tags: ['listagg', 'aggregation'],
  },
  {
    id: 'qfc-5',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    question: 'Qual função retorna NULL em caso de erro de conversão em vez de lançar exceção?',
    options: [
      'CAST(expr AS type)',
      'SAFE_CAST(expr AS type)',
      'TRY_CAST(expr AS type)',
      'CONVERT(type, expr)'
    ],
    correctAnswer: 2,
    explanation: 'TRY_CAST() retorna NULL se a conversão falhar em vez de lançar um erro. CAST() lança erro em caso de falha. Existem também TRY_TO_NUMBER, TRY_TO_DATE, etc.',
    difficulty: 'easy',
    tags: ['conversion-functions', 'error-handling'],
  },
  {
    id: 'qfc-6',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    question: 'Qual é a vantagem de APPROX_COUNT_DISTINCT sobre COUNT(DISTINCT)?',
    options: [
      'É mais preciso',
      'Funciona com mais tipos de dados',
      'É significativamente mais rápido em grandes datasets',
      'Pode ser usado em GROUP BY'
    ],
    correctAnswer: 2,
    explanation: 'APPROX_COUNT_DISTINCT usa o algoritmo HyperLogLog e é muito mais rápido (até 100x) em grandes datasets, com erro típico de ~2%. Ideal para análises onde precisão absoluta não é necessária.',
    difficulty: 'medium',
    tags: ['approximate-functions', 'performance'],
  },
  {
    id: 'qfc-7',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    question: 'Como gerar uma série de números de 1 a 100 sem usar uma tabela existente?',
    options: [
      'SELECT * FROM GENERATE_SERIES(1, 100)',
      'SELECT SEQ4() FROM TABLE(GENERATOR(ROWCOUNT => 100))',
      'SELECT SEQUENCE(1, 100)',
      'SELECT RANGE(1, 100)'
    ],
    correctAnswer: 1,
    explanation: 'GENERATOR() com ROWCOUNT cria linhas virtuais, e SEQ4() gera números sequenciais. Note que SEQ4() começa em 0, então para 1-100 seria SEQ4() + 1.',
    difficulty: 'medium',
    tags: ['generator', 'seq'],
  },
  {
    id: 'qfc-8',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    question: 'Qual a diferença entre TIMESTAMP_NTZ e TIMESTAMP_LTZ?',
    options: [
      'NTZ armazena timezone, LTZ não',
      'LTZ converte para o timezone da sessão ao exibir, NTZ não faz conversões',
      'São idênticos, apenas nomes diferentes',
      'NTZ é para timestamps locais, LTZ é para UTC'
    ],
    correctAnswer: 1,
    explanation: 'TIMESTAMP_NTZ (No Time Zone) armazena o valor literal sem conversões. TIMESTAMP_LTZ (Local Time Zone) armazena em UTC internamente e converte para o timezone da sessão ao exibir.',
    difficulty: 'hard',
    tags: ['timestamp', 'timezone'],
  },

  // ============================================
  // SEMI-STRUCTURED DATA
  // ============================================
  {
    id: 'qfc-9',
    topicId: 'topic-1-2',
    domainId: 'domain-1',
    question: 'Qual é a diferença entre FLATTEN e LATERAL FLATTEN?',
    options: [
      'LATERAL FLATTEN é mais lento',
      'LATERAL FLATTEN permite acesso a colunas de outras tabelas na mesma query',
      'FLATTEN só funciona com JSON',
      'Não há diferença'
    ],
    correctAnswer: 1,
    explanation: 'LATERAL FLATTEN é correlacionado, permitindo que o FLATTEN acesse colunas de outras tabelas na mesma query. Sem LATERAL, o FLATTEN opera de forma independente.',
    difficulty: 'hard',
    tags: ['lateral', 'flatten'],
  },
  {
    id: 'qfc-10',
    topicId: 'topic-1-2',
    domainId: 'domain-1',
    question: 'O que o parâmetro OUTER => TRUE faz no FLATTEN?',
    options: [
      'Faz um outer join com a tabela original',
      'Mantém linhas mesmo quando o array está vazio ou NULL',
      'Expande arrays aninhados',
      'Retorna apenas o envelope externo do JSON'
    ],
    correctAnswer: 1,
    explanation: 'OUTER => TRUE preserva a linha original mesmo quando o array/objeto está vazio ou NULL, retornando NULL para os campos do FLATTEN. Sem isso, linhas com arrays vazios são excluídas.',
    difficulty: 'hard',
    tags: ['flatten', 'semi-structured'],
  },
  {
    id: 'qfc-11',
    topicId: 'topic-1-2',
    domainId: 'domain-1',
    question: 'Como remover valores NULL de um array?',
    options: [
      'ARRAY_REMOVE_NULL(array)',
      'ARRAY_COMPACT(array)',
      'FILTER(array, x -> x IS NOT NULL)',
      'ARRAY_CLEAN(array)'
    ],
    correctAnswer: 1,
    explanation: 'ARRAY_COMPACT remove todos os valores NULL de um array. Também pode-se usar ARRAY_CONSTRUCT_COMPACT na criação para evitar NULLs desde o início.',
    difficulty: 'medium',
    tags: ['array', 'semi-structured'],
  },
  {
    id: 'qfc-12',
    topicId: 'topic-1-2',
    domainId: 'domain-1',
    question: 'Qual função cria um objeto JSON a partir de pares chave-valor?',
    options: [
      'JSON_OBJECT(key, value, ...)',
      'OBJECT_CONSTRUCT(key, value, ...)',
      'CREATE_OBJECT(key, value, ...)',
      'BUILD_JSON(key, value, ...)'
    ],
    correctAnswer: 1,
    explanation: 'OBJECT_CONSTRUCT() cria um objeto VARIANT a partir de pares chave-valor. Use OBJECT_CONSTRUCT_KEEP_NULL() se quiser manter chaves com valores NULL.',
    difficulty: 'easy',
    tags: ['object-construct', 'semi-structured'],
  },

  // ============================================
  // JOINS
  // ============================================
  {
    id: 'qfc-13',
    topicId: 'topic-1-3',
    domainId: 'domain-1',
    question: 'Quando usar ASOF JOIN?',
    options: [
      'Para joins com condições de igualdade',
      'Para joins em séries temporais onde os timestamps não são exatos',
      'Para joins com múltiplas tabelas',
      'Para joins com agregações'
    ],
    correctAnswer: 1,
    explanation: 'ASOF JOIN é ideal para séries temporais onde você precisa encontrar o registro mais próximo antes de um determinado momento. Ex: encontrar o preço mais recente antes de uma transação.',
    difficulty: 'hard',
    tags: ['asof-join', 'time-series'],
  },
  {
    id: 'qfc-14',
    topicId: 'topic-1-3',
    domainId: 'domain-1',
    question: 'O que a cláusula NATURAL JOIN faz?',
    options: [
      'Join baseado em todas as colunas com mesmo nome',
      'Join sem condição (cartesiano)',
      'Join com ordenação natural',
      'Join com índice natural'
    ],
    correctAnswer: 0,
    explanation: 'NATURAL JOIN automaticamente faz join em todas as colunas que têm o mesmo nome em ambas as tabelas. Não é recomendado em produção pois pode quebrar se schema mudar.',
    difficulty: 'medium',
    tags: ['joins', 'natural-join'],
  },
  {
    id: 'qfc-15',
    topicId: 'topic-1-3',
    domainId: 'domain-1',
    question: 'Como fazer uma query hierárquica para exibir estrutura organizacional?',
    options: [
      'Usando HIERARCHICAL SELECT',
      'Usando CONNECT BY com START WITH e PRIOR',
      'Usando GROUP BY com ROLLUP',
      'Não é possível no Snowflake'
    ],
    correctAnswer: 1,
    explanation: 'CONNECT BY permite queries hierárquicas. START WITH define a raiz, PRIOR define o relacionamento pai-filho. SYS_CONNECT_BY_PATH mostra o caminho completo.',
    difficulty: 'hard',
    tags: ['connect-by', 'hierarchical'],
  },

  // ============================================
  // PERFORMANCE
  // ============================================
  {
    id: 'qfc-16',
    topicId: 'topic-1-4',
    domainId: 'domain-1',
    question: 'O que indica \'spilling\' no Query Profile?',
    options: [
      'A query está usando muito cache',
      'Dados intermediários excederam a memória e foram escritos em disco',
      'A query está otimizada',
      'Houve erro de sintaxe'
    ],
    correctAnswer: 1,
    explanation: 'Spilling ocorre quando dados intermediários não cabem na memória e são escritos em disco local ou remoto. Isso degrada a performance. Solução: aumentar tamanho do warehouse.',
    difficulty: 'medium',
    tags: ['query-profile', 'spilling', 'performance'],
  },
  {
    id: 'qfc-17',
    topicId: 'topic-1-4',
    domainId: 'domain-1',
    question: 'Qual método de amostragem é mais rápido mas menos uniforme?',
    options: [
      'BERNOULLI',
      'SYSTEM',
      'ROW',
      'RANDOM'
    ],
    correctAnswer: 1,
    explanation: 'TABLESAMPLE SYSTEM amostra blocos inteiros de dados, sendo mais rápido mas menos uniforme. BERNOULLI amostra linha por linha, mais uniforme mas mais lento.',
    difficulty: 'medium',
    tags: ['sample', 'performance'],
  },
  {
    id: 'qfc-18',
    topicId: 'topic-1-4',
    domainId: 'domain-1',
    question: 'O que o comando EXPLAIN mostra?',
    options: [
      'O plano de execução sem executar a query',
      'Estatísticas de execução após rodar',
      'Erros de sintaxe',
      'Custo em créditos'
    ],
    correctAnswer: 0,
    explanation: 'EXPLAIN mostra o plano de execução estimado sem executar a query. Para ver métricas reais de execução, use o Query Profile após executar.',
    difficulty: 'easy',
    tags: ['explain', 'query-plan'],
  },

  // ============================================
  // DOMAIN 2: SNOWSIGHT & VISUALIZATION
  // ============================================
  {
    id: 'qfc-19',
    topicId: 'topic-2-2',
    domainId: 'domain-2',
    question: 'Qual tipo de gráfico é mais adequado para mostrar correlação entre duas variáveis numéricas?',
    options: [
      'Bar chart',
      'Line chart',
      'Scatter plot',
      'Pie chart'
    ],
    correctAnswer: 2,
    explanation: 'Scatter plot (gráfico de dispersão) é ideal para visualizar correlação entre duas variáveis numéricas, mostrando a relação e distribuição dos pontos.',
    difficulty: 'easy',
    tags: ['visualization', 'charts'],
  },
  {
    id: 'qfc-20',
    topicId: 'topic-2-2',
    domainId: 'domain-2',
    question: 'Como adicionar um filtro global que afeta todos os tiles de um dashboard?',
    options: [
      'Editando cada tile individualmente',
      'Usando a opção de filtro do dashboard',
      'Criando uma view comum',
      'Não é possível'
    ],
    correctAnswer: 1,
    explanation: 'Dashboards no Snowsight suportam filtros globais que podem ser aplicados a todos os tiles. Basta adicionar um filtro no nível do dashboard.',
    difficulty: 'medium',
    tags: ['dashboard', 'filters'],
  },
  {
    id: 'qfc-21',
    topicId: 'topic-2-1',
    domainId: 'domain-2',
    question: 'Qual função retorna o nome do warehouse atual?',
    options: [
      'CURRENT_WAREHOUSE()',
      'GET_WAREHOUSE()',
      'WAREHOUSE_NAME()',
      'SESSION_WAREHOUSE()'
    ],
    correctAnswer: 0,
    explanation: 'CURRENT_WAREHOUSE() retorna o nome do warehouse ativo na sessão. Outras funções de contexto incluem CURRENT_DATABASE(), CURRENT_SCHEMA(), CURRENT_ROLE(), CURRENT_USER().',
    difficulty: 'easy',
    tags: ['context-functions'],
  },

  // ============================================
  // DOMAIN 3: DATA LOADING
  // ============================================
  {
    id: 'qfc-22',
    topicId: 'topic-3-1',
    domainId: 'domain-3',
    question: 'Qual é a diferença entre stage interno e externo?',
    options: [
      'Interno é mais rápido',
      'Externo aponta para cloud storage do cliente (S3, GCS, Azure)',
      'Interno suporta mais formatos',
      'Não há diferença'
    ],
    correctAnswer: 1,
    explanation: 'Stages externos apontam para cloud storage gerenciado pelo cliente (S3, GCS, Azure Blob). Stages internos usam storage gerenciado pelo Snowflake.',
    difficulty: 'easy',
    tags: ['stages', 'external-stage'],
  },
  {
    id: 'qfc-23',
    topicId: 'topic-3-1',
    domainId: 'domain-3',
    question: 'O que são Directory Tables em um stage?',
    options: [
      'Tabelas que armazenam dados do stage',
      'Metadados dos arquivos no stage acessíveis via SQL',
      'Tabelas de log',
      'Índices do stage'
    ],
    correctAnswer: 1,
    explanation: 'Directory Tables fornecem metadados (nome, tamanho, data de modificação) dos arquivos em um stage como uma tabela SQL, permitindo queries e JOINs.',
    difficulty: 'medium',
    tags: ['directory-tables', 'stages'],
  },
  {
    id: 'qfc-24',
    topicId: 'topic-3-1',
    domainId: 'domain-3',
    question: 'Qual a principal limitação de External Tables?',
    options: [
      'Não suportam JSON',
      'São read-only e não suportam DML',
      'Precisam de warehouse especial',
      'Limitadas a 1TB'
    ],
    correctAnswer: 1,
    explanation: 'External Tables são read-only. Não suportam INSERT, UPDATE, DELETE, nem Time Travel. Os dados permanecem no storage externo e são apenas referenciados.',
    difficulty: 'medium',
    tags: ['external-tables'],
  },
  {
    id: 'qfc-25',
    topicId: 'topic-3-2',
    domainId: 'domain-3',
    question: 'Qual opção do COPY INTO permite continuar carregando mesmo com erros em algumas linhas?',
    options: [
      'SKIP_ERRORS = TRUE',
      'ON_ERROR = CONTINUE',
      'IGNORE_ERRORS = TRUE',
      'ERROR_MODE = SKIP'
    ],
    correctAnswer: 1,
    explanation: 'ON_ERROR = CONTINUE faz o COPY pular linhas com erros e continuar carregando. Outras opções: ABORT_STATEMENT (padrão), SKIP_FILE, SKIP_FILE_N, SKIP_FILE_N%.',
    difficulty: 'easy',
    tags: ['copy-into', 'error-handling'],
  },
  {
    id: 'qfc-26',
    topicId: 'topic-3-2',
    domainId: 'domain-3',
    question: 'O que o parâmetro MATCH_BY_COLUMN_NAME faz no COPY INTO?',
    options: [
      'Ordena as colunas alfabeticamente',
      'Faz match por nome de coluna em vez de posição',
      'Valida nomes de colunas',
      'Renomeia colunas'
    ],
    correctAnswer: 1,
    explanation: 'MATCH_BY_COLUMN_NAME permite que o COPY faça match de colunas pelo nome (case-sensitive ou insensitive) em vez da ordem posicional. Essencial para Schema Evolution.',
    difficulty: 'medium',
    tags: ['copy-into', 'schema-evolution'],
  },
  {
    id: 'qfc-27',
    topicId: 'topic-3-2',
    domainId: 'domain-3',
    question: 'O que é Schema Evolution no contexto de data loading?',
    options: [
      'Migração manual de schemas',
      'Adição automática de novas colunas durante COPY',
      'Versionamento de schemas',
      'Backup de schemas'
    ],
    correctAnswer: 1,
    explanation: 'Schema Evolution permite que novas colunas em arquivos de origem sejam automaticamente adicionadas à tabela durante o COPY. Habilite com ALTER TABLE SET ENABLE_SCHEMA_EVOLUTION = TRUE.',
    difficulty: 'hard',
    tags: ['schema-evolution', 'copy-into'],
  },
  {
    id: 'qfc-28',
    topicId: 'topic-3-2',
    domainId: 'domain-3',
    question: 'Qual a sintaxe correta para um MERGE que faz upsert?',
    options: [
      'MERGE INTO target USING source ON condition WHEN MATCHED UPDATE WHEN NOT MATCHED INSERT',
      'MERGE target source ON condition UPDATE else INSERT',
      'MERGE INTO target USING source ON condition WHEN MATCHED THEN UPDATE SET ... WHEN NOT MATCHED THEN INSERT ...',
      'UPSERT INTO target FROM source WHERE ...'
    ],
    correctAnswer: 2,
    explanation: 'A sintaxe correta é MERGE INTO target USING source ON condition, seguido de WHEN MATCHED THEN UPDATE SET... e WHEN NOT MATCHED THEN INSERT VALUES...',
    difficulty: 'medium',
    tags: ['merge', 'upsert'],
  },
  {
    id: 'qfc-29',
    topicId: 'topic-3-3',
    domainId: 'domain-3',
    question: 'Qual coluna de metadados de Stream indica se uma linha é uma atualização?',
    options: [
      'METADATA$UPDATED',
      'METADATA$ISUPDATE',
      'METADATA$TYPE',
      'METADATA$CHANGE_TYPE'
    ],
    correctAnswer: 1,
    explanation: 'METADATA$ISUPDATE é TRUE quando a linha representa uma atualização. METADATA$ACTION indica INSERT ou DELETE. Em updates, há dois registros: DELETE do antigo e INSERT do novo.',
    difficulty: 'hard',
    tags: ['streams', 'cdc'],
  },
  {
    id: 'qfc-30',
    topicId: 'topic-3-3',
    domainId: 'domain-3',
    question: 'O que acontece se uma Task falha?',
    options: [
      'O Snowflake automaticamente tenta novamente indefinidamente',
      'A Task é suspensa e precisa de intervenção',
      'Após o número configurado de retries, a Task para de executar aquela run',
      'O sistema envia email automaticamente'
    ],
    correctAnswer: 2,
    explanation: 'Tasks podem ser configuradas com SUSPEND_TASK_AFTER_NUM_FAILURES para suspender após N falhas consecutivas. Por padrão, cada run individual pode falhar mas a Task continua schedulada.',
    difficulty: 'medium',
    tags: ['tasks', 'error-handling'],
  },
  {
    id: 'qfc-31',
    topicId: 'topic-3-3',
    domainId: 'domain-3',
    question: 'Qual condição faz uma Task executar apenas quando há dados novos em um Stream?',
    options: [
      'IF STREAM_HAS_DATA(stream_name)',
      'WHEN SYSTEM$STREAM_HAS_DATA(\'stream_name\')',
      'CONDITION = STREAM_READY(stream_name)',
      'TRIGGER = STREAM_DATA(stream_name)'
    ],
    correctAnswer: 1,
    explanation: 'A cláusula WHEN SYSTEM$STREAM_HAS_DATA(\'stream_name\') faz a Task executar apenas quando há dados pendentes no stream, economizando compute.',
    difficulty: 'hard',
    tags: ['tasks', 'streams'],
  },

  // ============================================
  // DOMAIN 4: DATA MANAGEMENT & SECURITY
  // ============================================
  {
    id: 'qfc-32',
    topicId: 'topic-4-1',
    domainId: 'domain-4',
    question: 'Qual é a diferença entre Masking Policy e Row Access Policy?',
    options: [
      'Masking é para colunas, Row Access é para linhas',
      'Masking esconde tabelas inteiras',
      'São a mesma coisa',
      'Row Access é mais rápido'
    ],
    correctAnswer: 0,
    explanation: 'Masking Policy controla o que é mostrado em uma coluna específica (ocultar ou transformar valores). Row Access Policy controla quais linhas um usuário pode ver.',
    difficulty: 'medium',
    tags: ['masking-policy', 'row-access-policy'],
  },
  {
    id: 'qfc-33',
    topicId: 'topic-4-1',
    domainId: 'domain-4',
    question: 'Como aplicar uma Network Policy a um usuário específico?',
    options: [
      'ALTER USER user SET NETWORK_POLICY = policy_name',
      'GRANT NETWORK_POLICY policy_name TO USER user',
      'CREATE NETWORK RULE FOR USER user',
      'SET NETWORK_POLICY = policy_name FOR USER user'
    ],
    correctAnswer: 0,
    explanation: 'ALTER USER username SET NETWORK_POLICY = policy_name aplica a política de rede a um usuário específico, restringindo de quais IPs ele pode conectar.',
    difficulty: 'medium',
    tags: ['network-policy', 'security'],
  },
  {
    id: 'qfc-34',
    topicId: 'topic-4-1',
    domainId: 'domain-4',
    question: 'Para que serve Object Tagging?',
    options: [
      'Melhorar performance de queries',
      'Classificar e categorizar objetos para governança de dados',
      'Criar índices',
      'Fazer backup'
    ],
    correctAnswer: 1,
    explanation: 'Object Tagging permite classificar objetos (databases, schemas, tables, columns) com metadados para governança, compliance, e automação de políticas (ex: tag-based masking).',
    difficulty: 'medium',
    tags: ['tagging', 'governance'],
  },
  {
    id: 'qfc-35',
    topicId: 'topic-4-2',
    domainId: 'domain-4',
    question: 'Qual a diferença entre EXECUTE AS OWNER e EXECUTE AS CALLER em procedures?',
    options: [
      'OWNER é mais rápido',
      'OWNER usa permissões do criador, CALLER usa permissões de quem chama',
      'CALLER é o padrão',
      'Não há diferença prática'
    ],
    correctAnswer: 1,
    explanation: 'EXECUTE AS OWNER (padrão) executa com as permissões do owner da procedure. EXECUTE AS CALLER executa com as permissões de quem está chamando a procedure.',
    difficulty: 'hard',
    tags: ['stored-procedures', 'execute-as'],
  },
  {
    id: 'qfc-36',
    topicId: 'topic-4-2',
    domainId: 'domain-4',
    question: 'Qual a diferença entre SEQUENCE e IDENTITY?',
    options: [
      'SEQUENCE é mais rápido',
      'SEQUENCE é um objeto separado que pode ser compartilhado entre tabelas',
      'IDENTITY suporta valores negativos',
      'São idênticos'
    ],
    correctAnswer: 1,
    explanation: 'SEQUENCE é um objeto independente que pode ser usado em múltiplas tabelas. IDENTITY é específica de uma tabela. SEQUENCE oferece mais flexibilidade para IDs compartilhados.',
    difficulty: 'medium',
    tags: ['sequence', 'identity'],
  },
  {
    id: 'qfc-37',
    topicId: 'topic-4-3',
    domainId: 'domain-4',
    question: 'Por que usar SECURE VIEW em vez de VIEW normal?',
    options: [
      'Performance melhor',
      'Oculta a definição da view e previne inferência de dados',
      'Suporta mais tipos de dados',
      'Permite escrita'
    ],
    correctAnswer: 1,
    explanation: 'SECURE VIEW oculta a definição da view de usuários não-owners e previne que otimizações do query exponham dados subjacentes. Obrigatória para Data Sharing.',
    difficulty: 'medium',
    tags: ['secure-view', 'security'],
  },
  {
    id: 'qfc-38',
    topicId: 'topic-4-4',
    domainId: 'domain-4',
    question: 'Qual o período de retenção padrão do Time Travel?',
    options: [
      '7 dias',
      '1 dia para Standard, 90 para Enterprise',
      '1 dia (configurável até 90 no Enterprise)',
      '30 dias'
    ],
    correctAnswer: 2,
    explanation: 'O padrão é 1 dia para todas as edições. Enterprise edition permite até 90 dias (DATA_RETENTION_TIME_IN_DAYS). O período após Time Travel é Fail-safe (7 dias, apenas Snowflake pode recuperar).',
    difficulty: 'medium',
    tags: ['time-travel', 'data-retention'],
  },
  {
    id: 'qfc-39',
    topicId: 'topic-4-4',
    domainId: 'domain-4',
    question: 'Qual comando usa Time Travel para restaurar uma tabela deletada?',
    options: [
      'RESTORE TABLE table_name',
      'UNDROP TABLE table_name',
      'RECOVER TABLE table_name',
      'UNDELETE TABLE table_name'
    ],
    correctAnswer: 1,
    explanation: 'UNDROP TABLE restaura uma tabela que foi dropada, desde que esteja dentro do período de Time Travel. Também funciona com UNDROP SCHEMA e UNDROP DATABASE.',
    difficulty: 'easy',
    tags: ['time-travel', 'undrop'],
  },
  {
    id: 'qfc-40',
    topicId: 'topic-4-4',
    domainId: 'domain-4',
    question: 'Qual a diferença entre CLONE e COPY de uma tabela?',
    options: [
      'CLONE é zero-copy (metadados), COPY duplica dados fisicamente',
      'São a mesma coisa',
      'COPY é mais rápido',
      'CLONE não funciona com tabelas grandes'
    ],
    correctAnswer: 0,
    explanation: 'CLONE usa zero-copy cloning - cria uma nova referência aos mesmos micro-partitions sem duplicar dados. Modificações subsequentes são independentes (copy-on-write).',
    difficulty: 'medium',
    tags: ['clone', 'zero-copy'],
  },
  {
    id: 'qfc-41',
    topicId: 'topic-4-4',
    domainId: 'domain-4',
    question: 'Como configurar replicação de database para disaster recovery?',
    options: [
      'CREATE REPLICA DATABASE',
      'ALTER DATABASE ENABLE REPLICATION TO ACCOUNTS account_name',
      'REPLICATE DATABASE TO account_name',
      'CREATE FAILOVER DATABASE'
    ],
    correctAnswer: 1,
    explanation: 'Primeiro, ALTER DATABASE db ENABLE REPLICATION TO ACCOUNTS. Depois, na conta destino, CREATE DATABASE AS REPLICA OF. Para DR completo, use Failover Groups.',
    difficulty: 'hard',
    tags: ['replication', 'disaster-recovery'],
  },

  // ============================================
  // DOMAIN 5: SNOWFLAKE ECOSYSTEM
  // ============================================
  {
    id: 'qfc-42',
    topicId: 'topic-5-1',
    domainId: 'domain-5',
    question: 'Qual a diferença entre INFORMATION_SCHEMA e ACCOUNT_USAGE?',
    options: [
      'INFORMATION_SCHEMA é mais rápido',
      'INFORMATION_SCHEMA é tempo real por database, ACCOUNT_USAGE tem histórico de 365 dias da conta toda',
      'São idênticos',
      'ACCOUNT_USAGE é gratuito'
    ],
    correctAnswer: 1,
    explanation: 'INFORMATION_SCHEMA fornece metadata em tempo real do database atual. ACCOUNT_USAGE (SNOWFLAKE database) mantém histórico de até 365 dias de toda a conta, com latência de 45min a 3h.',
    difficulty: 'medium',
    tags: ['information-schema', 'account-usage'],
  },
  {
    id: 'qfc-43',
    topicId: 'topic-5-1',
    domainId: 'domain-5',
    question: 'Como usar RESULT_SCAN para trabalhar com resultados de SHOW commands?',
    options: [
      'SELECT * FROM LAST_RESULT',
      'SELECT * FROM TABLE(RESULT_SCAN(LAST_QUERY_ID()))',
      'SELECT * FROM SHOW_RESULT',
      'GET RESULTS FROM LAST QUERY'
    ],
    correctAnswer: 1,
    explanation: 'RESULT_SCAN com LAST_QUERY_ID() permite tratar o resultado de qualquer query anterior (incluindo SHOW) como uma tabela para filtragem e análise.',
    difficulty: 'medium',
    tags: ['result-scan', 'show-commands'],
  },
  {
    id: 'qfc-44',
    topicId: 'topic-5-2',
    domainId: 'domain-5',
    question: 'O que são Alerts no Snowflake?',
    options: [
      'Logs de erro',
      'Monitoramento automatizado com ações baseadas em condições',
      'Notificações de billing',
      'Métricas de performance'
    ],
    correctAnswer: 1,
    explanation: 'Alerts são objetos que monitoram uma condição SQL em schedule e executam uma ação (como chamar uma procedure) quando a condição é verdadeira.',
    difficulty: 'medium',
    tags: ['alerts', 'monitoring'],
  },
  {
    id: 'qfc-45',
    topicId: 'topic-5-3',
    domainId: 'domain-5',
    question: 'O que é um Reader Account?',
    options: [
      'Uma conta para fazer backup',
      'Uma conta managed criada pelo provider para consumidores sem Snowflake',
      'Uma conta apenas para leitura',
      'Um tipo de role'
    ],
    correctAnswer: 1,
    explanation: 'Reader Accounts são contas gerenciadas criadas por um provider para permitir que consumidores sem conta Snowflake própria acessem dados compartilhados. O provider paga o compute.',
    difficulty: 'hard',
    tags: ['reader-account', 'data-sharing'],
  },
  {
    id: 'qfc-46',
    topicId: 'topic-5-3',
    domainId: 'domain-5',
    question: 'O que são Data Clean Rooms?',
    options: [
      'Tabelas sem dados sujos',
      'Ambiente para análise colaborativa sem expor dados brutos',
      'Área de staging',
      'Backup de dados'
    ],
    correctAnswer: 1,
    explanation: 'Data Clean Rooms permitem que múltiplas partes analisem dados conjuntamente sem expor dados brutos individuais - apenas resultados agregados são compartilhados.',
    difficulty: 'hard',
    tags: ['clean-rooms', 'collaboration'],
  },
  {
    id: 'qfc-47',
    topicId: 'topic-5-3',
    domainId: 'domain-5',
    question: 'O que é um Native App no Snowflake?',
    options: [
      'Um app mobile',
      'Uma aplicação construída e distribuída dentro do Snowflake',
      'Um conector JDBC',
      'Uma API externa'
    ],
    correctAnswer: 1,
    explanation: 'Native Apps são aplicações que rodam diretamente no Snowflake do consumidor, permitindo que providers distribuam lógica de negócio sem que dados saiam da conta do consumidor.',
    difficulty: 'hard',
    tags: ['native-apps', 'marketplace'],
  },

  // ============================================
  // DOMAIN 6: PERFORMANCE & OPTIMIZATION
  // ============================================
  {
    id: 'qfc-48',
    topicId: 'topic-6-1',
    domainId: 'domain-6',
    question: 'Qual a diferença entre STANDARD e ECONOMY scaling policy?',
    options: [
      'ECONOMY é mais rápido',
      'STANDARD escala rapidamente priorizando performance, ECONOMY é mais conservador priorizando custo',
      'STANDARD suporta mais clusters',
      'São idênticos'
    ],
    correctAnswer: 1,
    explanation: 'STANDARD scaling policy adiciona clusters rapidamente quando há queue de queries. ECONOMY espera mais tempo antes de escalar, economizando custos mas com possível latência maior.',
    difficulty: 'medium',
    tags: ['warehouse', 'scaling-policy'],
  },
  {
    id: 'qfc-49',
    topicId: 'topic-6-1',
    domainId: 'domain-6',
    question: 'O que um Resource Monitor pode fazer quando atinge 100% do limite?',
    options: [
      'NOTIFY, SUSPEND, ou SUSPEND_IMMEDIATE',
      'Apenas notificar',
      'Deletar dados',
      'Escalar warehouse'
    ],
    correctAnswer: 0,
    explanation: 'Resource Monitors podem NOTIFY (enviar alerta), SUSPEND (suspender após query atual terminar), ou SUSPEND_IMMEDIATE (abortar queries em execução e suspender).',
    difficulty: 'medium',
    tags: ['resource-monitor', 'cost-control'],
  },
  {
    id: 'qfc-50',
    topicId: 'topic-6-2',
    domainId: 'domain-6',
    question: 'O que o Query Acceleration Service faz?',
    options: [
      'Cacheia resultados',
      'Aloca recursos serverless adicionais para queries que se beneficiam de paralelismo extra',
      'Comprime dados',
      'Cria índices'
    ],
    correctAnswer: 1,
    explanation: 'QAS identifica porções de queries que podem se beneficiar de paralelismo adicional e aloca recursos serverless automaticamente. Ideal para queries grandes e variáveis.',
    difficulty: 'medium',
    tags: ['qas', 'performance'],
  },
  {
    id: 'qfc-51',
    topicId: 'topic-6-2',
    domainId: 'domain-6',
    question: 'Quais são os três níveis de cache no Snowflake?',
    options: [
      'Query Result Cache, Local Disk Cache, Remote Disk Cache',
      'L1, L2, L3 Cache',
      'Table Cache, Column Cache, Row Cache',
      'Metadata Cache, Result Cache, Data Cache'
    ],
    correctAnswer: 3,
    explanation: 'Snowflake usa: Metadata Cache (schema, stats), Result Cache (resultados de queries idênticas por 24h), e Data Cache (micro-partitions em disco local do warehouse).',
    difficulty: 'hard',
    tags: ['caching', 'performance'],
  },
  {
    id: 'qfc-52',
    topicId: 'topic-6-2',
    domainId: 'domain-6',
    question: 'Quando o Search Optimization Service é mais útil?',
    options: [
      'Para todas as queries',
      'Para queries com point lookups e substring searches em tabelas grandes',
      'Para agregações',
      'Para JOINs'
    ],
    correctAnswer: 1,
    explanation: 'Search Optimization é ideal para queries com filtros de igualdade (WHERE id = X), LIKE/IN com muitos valores, e buscas em dados semi-estruturados. Não ajuda em scans completos.',
    difficulty: 'hard',
    tags: ['search-optimization', 'performance'],
  },
  {
    id: 'qfc-53',
    topicId: 'topic-6-2',
    domainId: 'domain-6',
    question: 'Como verificar se uma tabela está bem clusterizada?',
    options: [
      'DESCRIBE TABLE',
      'SYSTEM$CLUSTERING_INFORMATION(\'table_name\')',
      'SHOW CLUSTERS',
      'EXPLAIN'
    ],
    correctAnswer: 1,
    explanation: 'SYSTEM$CLUSTERING_INFORMATION retorna métricas como clustering_depth e average_overlap que indicam quão bem os dados estão organizados pelo clustering key.',
    difficulty: 'medium',
    tags: ['clustering', 'performance'],
  },
  {
    id: 'qfc-54',
    topicId: 'topic-6-1',
    domainId: 'domain-6',
    question: 'Quais recursos do Snowflake são serverless?',
    options: [
      'Apenas Snowpipe',
      'Snowpipe, Serverless Tasks, Auto Clustering, Search Optimization, Materialized View Maintenance',
      'Apenas warehouses',
      'Apenas External Functions'
    ],
    correctAnswer: 1,
    explanation: 'Recursos serverless incluem: Snowpipe, Serverless Tasks, Automatic Clustering, Search Optimization Service, Materialized View Maintenance, e Query Acceleration Service.',
    difficulty: 'medium',
    tags: ['serverless', 'architecture'],
  },
  {
    id: 'qfc-55',
    topicId: 'topic-6-1',
    domainId: 'domain-6',
    question: 'Qual é a diferença entre um warehouse Standard e Snowpark-optimized?',
    options: [
      'Snowpark-optimized é mais barato',
      'Snowpark-optimized tem mais memória para workloads de ML e UDFs Python/Java',
      'Standard suporta mais usuários',
      'Não há diferença'
    ],
    correctAnswer: 1,
    explanation: 'Warehouses Snowpark-optimized têm 16x mais memória por nó, otimizados para workloads de machine learning, UDFs Python/Java/Scala que precisam de mais memória.',
    difficulty: 'hard',
    tags: ['warehouse', 'snowpark'],
  },
];

import { Question } from '@/types';

export const questions: Question[] = [
  // Domain 1 - SQL & Query Fundamentals
  {
    id: 'q-1-1-1',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    question: 'Qual função de janela você usaria para obter o valor da linha anterior na mesma partição?',
    options: ['FIRST_VALUE()', 'LAG()', 'LEAD()', 'LAST_VALUE()'],
    correctAnswer: 1,
    explanation:
      'LAG() acessa dados de uma linha ANTERIOR na partição. LEAD() acessa a linha POSTERIOR. FIRST_VALUE() e LAST_VALUE() retornam o primeiro/último valor da janela.',
    difficulty: 'easy',
    tags: ['window-functions'],
  },
  {
    id: 'q-1-1-2',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    question:
      'Qual é a diferença principal entre RANK() e DENSE_RANK() quando há valores duplicados?',
    options: [
      'RANK() não permite duplicados',
      'DENSE_RANK() pula posições após duplicados',
      'RANK() pula posições após duplicados, DENSE_RANK() não',
      'Não há diferença',
    ],
    correctAnswer: 2,
    explanation:
      'RANK() atribui o mesmo número para valores iguais e pula posições (1, 2, 2, 4). DENSE_RANK() atribui o mesmo número para valores iguais mas NÃO pula posições (1, 2, 2, 3).',
    difficulty: 'medium',
    tags: ['window-functions', 'ranking'],
  },
  {
    id: 'q-1-1-3',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    question: 'Qual cláusula é exclusiva do Snowflake para filtrar resultados de funções de janela?',
    options: ['WHERE', 'HAVING', 'QUALIFY', 'FILTER'],
    correctAnswer: 2,
    explanation:
      'QUALIFY é uma cláusula exclusiva do Snowflake que permite filtrar resultados de window functions diretamente, sem necessidade de subqueries ou CTEs.',
    difficulty: 'medium',
    tags: ['window-functions', 'snowflake-specific'],
  },
  {
    id: 'q-1-2-1',
    topicId: 'topic-1-2',
    domainId: 'domain-1',
    question: 'Para criar uma CTE recursiva no Snowflake, qual palavra-chave você deve adicionar?',
    options: ['LOOP', 'RECURSIVE', 'ITERATE', 'HIERARCHY'],
    correctAnswer: 1,
    explanation:
      'Para criar uma CTE recursiva no Snowflake, você usa WITH RECURSIVE. A CTE então pode referenciar a si mesma na parte recursiva.',
    difficulty: 'easy',
    tags: ['cte', 'recursive'],
  },
  {
    id: 'q-1-3-1',
    topicId: 'topic-1-3',
    domainId: 'domain-1',
    question:
      'Qual tipo de JOIN permite que uma subquery na cláusula FROM referencie colunas de tabelas anteriores?',
    options: ['CROSS JOIN', 'NATURAL JOIN', 'LATERAL JOIN', 'SELF JOIN'],
    correctAnswer: 2,
    explanation:
      'LATERAL JOIN permite que uma subquery na cláusula FROM referencie colunas de tabelas anteriores na mesma cláusula FROM, funcionando como uma subquery correlacionada.',
    difficulty: 'hard',
    tags: ['joins', 'lateral'],
  },
  {
    id: 'q-1-4-1',
    topicId: 'topic-1-4',
    domainId: 'domain-1',
    question:
      'O que indica "Bytes spilled to remote storage" no Query Profile?',
    options: [
      'Dados foram escritos no cache local',
      'A query usou mais memória que o disponível e usou storage remoto',
      'Os resultados foram salvos para cache',
      'A query falhou por falta de espaço',
    ],
    correctAnswer: 1,
    explanation:
      'Spilling to remote storage indica que a operação excedeu a memória disponível e precisou usar storage remoto (mais lento que local). Isso pode ser resolvido aumentando o warehouse ou otimizando a query.',
    difficulty: 'medium',
    tags: ['performance', 'query-profile'],
  },
  // Domain 2 - Data Analysis & Transformation
  {
    id: 'q-2-1-1',
    topicId: 'topic-2-1',
    domainId: 'domain-2',
    question: 'Qual função você usaria para expandir um array JSON em múltiplas linhas?',
    options: ['SPLIT()', 'FLATTEN()', 'EXPAND()', 'UNNEST()'],
    correctAnswer: 1,
    explanation:
      'FLATTEN() é uma função de tabela do Snowflake que expande arrays e objetos em múltiplas linhas, permitindo consultar dados semi-estruturados de forma tabular.',
    difficulty: 'easy',
    tags: ['semi-structured', 'flatten'],
  },
  {
    id: 'q-2-1-2',
    topicId: 'topic-2-1',
    domainId: 'domain-2',
    question:
      'Qual é o tipo de dado que pode armazenar qualquer valor semi-estruturado no Snowflake?',
    options: ['JSON', 'OBJECT', 'ARRAY', 'VARIANT'],
    correctAnswer: 3,
    explanation:
      'VARIANT é o tipo de dado genérico que pode armazenar qualquer valor semi-estruturado: JSON, Avro, ORC, Parquet, XML. OBJECT e ARRAY são subtipos específicos.',
    difficulty: 'easy',
    tags: ['semi-structured', 'data-types'],
  },
  {
    id: 'q-2-1-3',
    topicId: 'topic-2-1',
    domainId: 'domain-2',
    question: 'Qual função você usaria para converter uma string JSON em VARIANT de forma segura (sem erro)?',
    options: ['PARSE_JSON()', 'TRY_PARSE_JSON()', 'TO_VARIANT()', 'CAST()'],
    correctAnswer: 1,
    explanation:
      'TRY_PARSE_JSON() retorna NULL se o JSON for inválido, enquanto PARSE_JSON() gera um erro. Use TRY_PARSE_JSON() quando não tiver certeza se o input é JSON válido.',
    difficulty: 'medium',
    tags: ['json', 'functions'],
  },
  {
    id: 'q-2-2-1',
    topicId: 'topic-2-2',
    domainId: 'domain-2',
    question: 'Qual operação transforma valores únicos de uma coluna em múltiplas colunas?',
    options: ['UNPIVOT', 'PIVOT', 'TRANSPOSE', 'ROTATE'],
    correctAnswer: 1,
    explanation:
      'PIVOT transforma valores únicos de uma coluna em múltiplas colunas (linhas para colunas). UNPIVOT faz o oposto: transforma colunas em linhas.',
    difficulty: 'easy',
    tags: ['pivot', 'transformation'],
  },
  {
    id: 'q-2-3-1',
    topicId: 'topic-2-3',
    domainId: 'domain-2',
    question:
      'Para calcular uma média móvel de 7 dias, qual especificação de frame você usaria?',
    options: [
      'ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW',
      'ROWS BETWEEN 6 PRECEDING AND CURRENT ROW',
      'RANGE BETWEEN 7 PRECEDING AND CURRENT ROW',
      'ROWS BETWEEN 7 PRECEDING AND 7 FOLLOWING',
    ],
    correctAnswer: 1,
    explanation:
      'Para média móvel de 7 dias (dia atual + 6 anteriores), use ROWS BETWEEN 6 PRECEDING AND CURRENT ROW. Isso inclui a linha atual mais as 6 linhas anteriores.',
    difficulty: 'medium',
    tags: ['time-series', 'window-functions'],
  },
  {
    id: 'q-2-4-1',
    topicId: 'topic-2-4',
    domainId: 'domain-2',
    question: 'Qual cláusula gera todas as combinações possíveis de agregação para as colunas especificadas?',
    options: ['ROLLUP', 'CUBE', 'GROUPING SETS', 'GROUP BY ALL'],
    correctAnswer: 1,
    explanation:
      'CUBE gera todas as combinações possíveis de agregação. ROLLUP gera agregações hierárquicas (remove colunas da direita). GROUPING SETS permite especificar exatamente quais combinações.',
    difficulty: 'medium',
    tags: ['aggregation', 'cube'],
  },
  // Domain 3 - Data Loading & Unloading
  {
    id: 'q-3-1-1',
    topicId: 'topic-3-1',
    domainId: 'domain-3',
    question: 'Qual símbolo representa o User Stage no Snowflake?',
    options: ['@%', '@~', '@@', '@#'],
    correctAnswer: 1,
    explanation:
      '@~ representa o User Stage (criado automaticamente para cada usuário). @% representa o Table Stage. @ sem prefixo especial representa Named Stages.',
    difficulty: 'easy',
    tags: ['stages'],
  },
  {
    id: 'q-3-1-2',
    topicId: 'topic-3-1',
    domainId: 'domain-3',
    question: 'Qual tipo de stage NÃO pode ser dropado ou alterado?',
    options: ['Named Stage', 'External Stage', 'User Stage', 'Table Stage'],
    correctAnswer: 2,
    explanation:
      'User Stage (@~) e Table Stage (@%tablename) são criados automaticamente pelo Snowflake e não podem ser alterados ou dropados. Apenas Named Stages e External Stages podem ser gerenciados pelo usuário.',
    difficulty: 'medium',
    tags: ['stages'],
  },
  {
    id: 'q-3-2-1',
    topicId: 'topic-3-2',
    domainId: 'domain-3',
    question:
      'Qual opção do COPY INTO permite continuar o carregamento mesmo quando há erros em algumas linhas?',
    options: ['SKIP_ERRORS = TRUE', 'ON_ERROR = CONTINUE', 'IGNORE_ERRORS = TRUE', 'ERROR_MODE = SKIP'],
    correctAnswer: 1,
    explanation:
      'ON_ERROR = CONTINUE permite que o COPY INTO continue processando mesmo quando encontra erros em algumas linhas. Outras opções incluem SKIP_FILE, ABORT_STATEMENT.',
    difficulty: 'easy',
    tags: ['copy-into'],
  },
  {
    id: 'q-3-3-1',
    topicId: 'topic-3-3',
    domainId: 'domain-3',
    question: 'Qual é a principal diferença entre Snowpipe e COPY INTO em termos de execução?',
    options: [
      'Snowpipe é mais rápido para grandes volumes',
      'COPY INTO é automático, Snowpipe é manual',
      'Snowpipe é assíncrono e serverless, COPY INTO é síncrono e usa warehouse',
      'Snowpipe suporta mais formatos de arquivo',
    ],
    correctAnswer: 2,
    explanation:
      'Snowpipe é assíncrono (retorna imediatamente) e usa recursos serverless. COPY INTO é síncrono (espera conclusão) e usa um virtual warehouse dedicado.',
    difficulty: 'medium',
    tags: ['snowpipe', 'copy-into'],
  },
  // Domain 4 - Snowflake Objects & Architecture
  {
    id: 'q-4-1-1',
    topicId: 'topic-4-1',
    domainId: 'domain-4',
    question:
      'Qual tipo de view oculta sua definição SQL de outros usuários?',
    options: ['Standard View', 'Materialized View', 'Secure View', 'Dynamic View'],
    correctAnswer: 2,
    explanation:
      'Secure Views ocultam sua definição SQL de usuários que não são owners. Isso é útil para proteção de lógica de negócio e multi-tenancy.',
    difficulty: 'easy',
    tags: ['views', 'security'],
  },
  {
    id: 'q-4-1-2',
    topicId: 'topic-4-1',
    domainId: 'domain-4',
    question: 'Qual é uma limitação das Materialized Views no Snowflake?',
    options: [
      'Não podem usar funções de agregação',
      'Não podem ter JOINs ou subqueries',
      'Não podem ser atualizadas automaticamente',
      'Não podem usar clustering',
    ],
    correctAnswer: 1,
    explanation:
      'Materialized Views no Snowflake não suportam JOINs, subqueries, UDFs, ou funções não-determinísticas. Apenas agregações simples sobre uma única tabela base são permitidas.',
    difficulty: 'hard',
    tags: ['materialized-views', 'limitations'],
  },
  {
    id: 'q-4-2-1',
    topicId: 'topic-4-2',
    domainId: 'domain-4',
    question: 'Qual é a principal diferença entre uma Stored Procedure e uma UDF?',
    options: [
      'UDFs são mais rápidas',
      'Stored Procedures podem executar DDL/DML, UDFs são apenas leitura',
      'UDFs suportam mais linguagens',
      'Stored Procedures não retornam valores',
    ],
    correctAnswer: 1,
    explanation:
      'Stored Procedures podem executar DDL/DML e ter side effects. UDFs são funções puras, apenas leitura, que retornam um valor para cada linha de entrada.',
    difficulty: 'medium',
    tags: ['stored-procedures', 'udf'],
  },
  {
    id: 'q-4-3-1',
    topicId: 'topic-4-3',
    domainId: 'domain-4',
    question: 'Qual função você usaria para verificar se um Stream tem dados antes de executar uma Task?',
    options: [
      'STREAM_HAS_DATA()',
      'SYSTEM$STREAM_HAS_DATA()',
      'CHECK_STREAM()',
      'STREAM_STATUS()',
    ],
    correctAnswer: 1,
    explanation:
      'SYSTEM$STREAM_HAS_DATA() retorna TRUE se o stream tem mudanças não consumidas. É comumente usado na cláusula WHEN de uma Task para evitar execuções desnecessárias.',
    difficulty: 'medium',
    tags: ['streams', 'tasks'],
  },
  {
    id: 'q-4-4-1',
    topicId: 'topic-4-4',
    domainId: 'domain-4',
    question: 'Qual é o período máximo de retenção de Time Travel na edição Enterprise?',
    options: ['1 dia', '7 dias', '30 dias', '90 dias'],
    correctAnswer: 3,
    explanation:
      'Na edição Enterprise (e superiores), Time Travel pode reter dados por até 90 dias. Na edição Standard, o máximo é 1 dia.',
    difficulty: 'easy',
    tags: ['time-travel'],
  },
  {
    id: 'q-4-4-2',
    topicId: 'topic-4-4',
    domainId: 'domain-4',
    question: 'O que acontece com dados após o período de Time Travel expirar?',
    options: [
      'São deletados permanentemente',
      'Vão para o Fail-safe por 7 dias adicionais',
      'São arquivados automaticamente',
      'São comprimidos para economizar espaço',
    ],
    correctAnswer: 1,
    explanation:
      'Após o Time Travel expirar, os dados vão para o Fail-safe por 7 dias adicionais. Durante o Fail-safe, apenas o Snowflake pode recuperar os dados (não acessível por SQL).',
    difficulty: 'medium',
    tags: ['time-travel', 'fail-safe'],
  },
  // Domain 5 - Data Visualization & Reporting
  {
    id: 'q-5-1-1',
    topicId: 'topic-5-1',
    domainId: 'domain-5',
    question: 'Por quanto tempo os resultados de query ficam em cache no Snowflake?',
    options: ['1 hora', '12 horas', '24 horas', '7 dias'],
    correctAnswer: 2,
    explanation:
      'Result cache no Snowflake mantém os resultados por 24 horas. Se a mesma query for executada (e os dados não mudaram), o resultado é retornado do cache sem usar compute.',
    difficulty: 'easy',
    tags: ['caching', 'result-cache'],
  },
  {
    id: 'q-5-2-1',
    topicId: 'topic-5-2',
    domainId: 'domain-5',
    question: 'Qual função retorna o nome do warehouse atualmente em uso?',
    options: ['CURRENT_WAREHOUSE()', 'GET_WAREHOUSE()', 'WAREHOUSE_NAME()', 'SESSION_WAREHOUSE()'],
    correctAnswer: 0,
    explanation:
      'CURRENT_WAREHOUSE() retorna o nome do warehouse atualmente em uso na sessão. Outras funções de contexto incluem CURRENT_DATABASE(), CURRENT_SCHEMA(), CURRENT_ROLE().',
    difficulty: 'easy',
    tags: ['context-functions'],
  },
  // Domain 6 - Performance & Cost Optimization
  {
    id: 'q-6-1-1',
    topicId: 'topic-6-1',
    domainId: 'domain-6',
    question: 'Quantos créditos por hora um warehouse XL consome aproximadamente?',
    options: ['4 créditos', '8 créditos', '16 créditos', '32 créditos'],
    correctAnswer: 2,
    explanation:
      'XL (Extra Large) consome aproximadamente 16 créditos por hora. Cada tamanho dobra: XS=1, S=2, M=4, L=8, XL=16, 2XL=32, etc.',
    difficulty: 'medium',
    tags: ['warehouse', 'credits'],
  },
  {
    id: 'q-6-1-2',
    topicId: 'topic-6-1',
    domainId: 'domain-6',
    question: 'Qual recurso permite que um warehouse escale automaticamente para lidar com alta concorrência?',
    options: ['Auto-suspend', 'Auto-resume', 'Multi-cluster warehouse', 'Query acceleration'],
    correctAnswer: 2,
    explanation:
      'Multi-cluster warehouses permitem scaling horizontal automático. Quando a demanda aumenta, clusters adicionais são iniciados automaticamente.',
    difficulty: 'medium',
    tags: ['warehouse', 'multi-cluster'],
  },
  {
    id: 'q-6-2-1',
    topicId: 'topic-6-2',
    domainId: 'domain-6',
    question: 'Qual é o tamanho típico de uma micro-partition no Snowflake?',
    options: ['1-10 MB', '50-500 MB (comprimido)', '1-5 GB', '10-50 GB'],
    correctAnswer: 1,
    explanation:
      'Micro-partitions têm tipicamente entre 50-500 MB de dados comprimidos. São criadas automaticamente durante a ingestão e são imutáveis.',
    difficulty: 'medium',
    tags: ['micro-partitions', 'storage'],
  },
  {
    id: 'q-6-2-2',
    topicId: 'topic-6-2',
    domainId: 'domain-6',
    question: 'Qual função retorna informações sobre a qualidade do clustering de uma tabela?',
    options: [
      'CLUSTER_INFO()',
      'SYSTEM$CLUSTERING_INFORMATION()',
      'GET_CLUSTERING_STATUS()',
      'TABLE_CLUSTERING()',
    ],
    correctAnswer: 1,
    explanation:
      'SYSTEM$CLUSTERING_INFORMATION() retorna estatísticas sobre a qualidade do clustering, incluindo average_depth e partition_overlap.',
    difficulty: 'hard',
    tags: ['clustering', 'functions'],
  },
  {
    id: 'q-6-3-1',
    topicId: 'topic-6-3',
    domainId: 'domain-6',
    question: 'Qual condição deve ser verdadeira para que o result cache seja usado?',
    options: [
      'Warehouse deve estar ativo',
      'Query deve ser executada pelo mesmo usuário',
      'Query deve ser exatamente igual e dados não podem ter mudado',
      'Session deve ter a mesma role',
    ],
    correctAnswer: 2,
    explanation:
      'Para usar result cache, a query deve ser exatamente igual (incluindo whitespace) e os dados subjacentes não podem ter sido modificados desde a última execução.',
    difficulty: 'medium',
    tags: ['caching', 'performance'],
  },
  // Additional questions for comprehensive coverage
  {
    id: 'q-extra-1',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    question: 'Qual função retorna o primeiro valor não-NULL de uma lista de expressões?',
    options: ['NVL()', 'IFNULL()', 'COALESCE()', 'NULLIF()'],
    correctAnswer: 2,
    explanation:
      'COALESCE() aceita N argumentos e retorna o primeiro valor não-NULL. NVL() e IFNULL() aceitam apenas 2 argumentos. NULLIF() retorna NULL se dois valores são iguais.',
    difficulty: 'easy',
    tags: ['null-handling', 'functions'],
  },
  {
    id: 'q-extra-2',
    topicId: 'topic-2-1',
    domainId: 'domain-2',
    question: 'Qual é o tamanho máximo de um valor VARIANT no Snowflake?',
    options: ['1 MB', '8 MB', '16 MB', '64 MB'],
    correctAnswer: 2,
    explanation:
      'Um valor VARIANT pode ter no máximo 16 MB. Para dados maiores, considere dividir em múltiplas linhas ou usar tabelas separadas.',
    difficulty: 'medium',
    tags: ['variant', 'semi-structured'],
  },
  {
    id: 'q-extra-3',
    topicId: 'topic-3-2',
    domainId: 'domain-3',
    question:
      'Qual opção do COPY INTO você usaria para recarregar um arquivo que já foi processado anteriormente?',
    options: ['RELOAD = TRUE', 'FORCE = TRUE', 'OVERWRITE = TRUE', 'REFRESH = TRUE'],
    correctAnswer: 1,
    explanation:
      'FORCE = TRUE permite recarregar arquivos que já foram processados. Por padrão, Snowflake rastreia arquivos carregados e os ignora em cargas subsequentes.',
    difficulty: 'medium',
    tags: ['copy-into', 'data-loading'],
  },
  {
    id: 'q-extra-4',
    topicId: 'topic-4-3',
    domainId: 'domain-4',
    question: 'Qual coluna de metadados do Stream indica se uma mudança é parte de um UPDATE?',
    options: ['METADATA$ACTION', 'METADATA$ISUPDATE', 'METADATA$TYPE', 'METADATA$CHANGE'],
    correctAnswer: 1,
    explanation:
      'METADATA$ISUPDATE retorna TRUE se a linha é parte de um UPDATE. METADATA$ACTION mostra INSERT ou DELETE. Um UPDATE aparece como DELETE + INSERT com METADATA$ISUPDATE = TRUE.',
    difficulty: 'hard',
    tags: ['streams', 'cdc'],
  },
  {
    id: 'q-extra-5',
    topicId: 'topic-6-1',
    domainId: 'domain-6',
    question: 'Qual ação de Resource Monitor suspende queries em execução imediatamente?',
    options: ['SUSPEND', 'STOP', 'SUSPEND_IMMEDIATE', 'KILL'],
    correctAnswer: 2,
    explanation:
      'SUSPEND_IMMEDIATE para o warehouse imediatamente, podendo cancelar queries em execução. SUSPEND espera as queries atuais terminarem antes de suspender.',
    difficulty: 'medium',
    tags: ['resource-monitor', 'cost-management'],
  },
];

import { questionsExtended } from './questions-extended';

// Combina questions base com questions estendidos
const allQuestions = [...questions, ...questionsExtended];

export const getQuestionsByDomain = (domainId: string): Question[] => {
  return allQuestions.filter((q) => q.domainId === domainId);
};

export const getQuestionsByTopic = (topicId: string): Question[] => {
  return allQuestions.filter((q) => q.topicId === topicId);
};

export const getRandomQuestions = (count: number, domainId?: string): Question[] => {
  const filtered = domainId ? allQuestions.filter((q) => q.domainId === domainId) : allQuestions;
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export { allQuestions };

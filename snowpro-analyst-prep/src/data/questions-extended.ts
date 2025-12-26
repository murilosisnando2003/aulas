import { Question } from '@/types';

// Questões adicionais para aumentar a cobertura do conteúdo
export const questionsExtended: Question[] = [
  // Domain 1 - SQL & Query Fundamentals
  {
    id: 'q-1-1-4',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    question:
      'Qual é o frame specification padrão quando você usa ORDER BY em uma window function?',
    options: [
      'ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING',
      'RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW',
      'ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING',
      'RANGE BETWEEN 1 PRECEDING AND 1 FOLLOWING',
    ],
    correctAnswer: 1,
    explanation:
      'O frame padrão quando ORDER BY está presente é RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. Isso afeta funções como LAST_VALUE() de forma inesperada.',
    difficulty: 'hard',
    tags: ['window-functions', 'frame'],
  },
  {
    id: 'q-1-1-5',
    topicId: 'topic-1-1',
    domainId: 'domain-1',
    question:
      'Você precisa dividir um conjunto de dados em 4 grupos de tamanho igual para análise de quartis. Qual função você usaria?',
    options: ['RANK()', 'ROW_NUMBER()', 'NTILE(4)', 'DENSE_RANK()'],
    correctAnswer: 2,
    explanation:
      'NTILE(n) divide as linhas em n grupos (buckets) de tamanho aproximadamente igual, perfeito para análise de quartis.',
    difficulty: 'medium',
    tags: ['window-functions', 'analytics'],
  },
  {
    id: 'q-1-2-2',
    topicId: 'topic-1-2',
    domainId: 'domain-1',
    question:
      'Uma subquery que referencia colunas da query externa é chamada de:',
    options: [
      'Subquery inline',
      'Subquery não correlacionada',
      'Subquery correlacionada',
      'Subquery independente',
    ],
    correctAnswer: 2,
    explanation:
      'Uma subquery correlacionada referencia colunas da query externa e é executada para cada linha da query principal.',
    difficulty: 'easy',
    tags: ['subquery'],
  },
  {
    id: 'q-1-3-2',
    topicId: 'topic-1-3',
    domainId: 'domain-1',
    question:
      'Qual operação de conjunto retorna linhas que existem na primeira query mas NÃO na segunda?',
    options: ['UNION', 'INTERSECT', 'EXCEPT', 'CROSS JOIN'],
    correctAnswer: 2,
    explanation:
      'EXCEPT (ou MINUS) retorna linhas da primeira query que não existem na segunda. INTERSECT retorna linhas em ambas.',
    difficulty: 'easy',
    tags: ['set-operations'],
  },
  // Domain 2 - Data Analysis & Transformation
  {
    id: 'q-2-1-4',
    topicId: 'topic-2-1',
    domainId: 'domain-2',
    question:
      'Qual função você usaria para verificar se um valor VARIANT contém um array?',
    options: ['TYPEOF()', 'IS_ARRAY()', 'CHECK_ARRAY()', 'ARRAY_CHECK()'],
    correctAnswer: 1,
    explanation:
      'IS_ARRAY() retorna TRUE se o valor VARIANT é um array. TYPEOF() retorna o tipo como string.',
    difficulty: 'easy',
    tags: ['variant', 'type-checking'],
  },
  {
    id: 'q-2-1-5',
    topicId: 'topic-2-1',
    domainId: 'domain-2',
    question:
      'Qual função agrega valores de múltiplas linhas em um único objeto JSON com pares chave-valor?',
    options: ['ARRAY_AGG()', 'OBJECT_AGG()', 'OBJECT_CONSTRUCT()', 'JSON_AGG()'],
    correctAnswer: 1,
    explanation:
      'OBJECT_AGG(key, value) agrega pares chave-valor em um único objeto JSON. ARRAY_AGG() cria um array.',
    difficulty: 'medium',
    tags: ['aggregation', 'json'],
  },
  {
    id: 'q-2-2-2',
    topicId: 'topic-2-2',
    domainId: 'domain-2',
    question:
      'Qual operação transforma colunas em linhas (oposto do PIVOT)?',
    options: ['TRANSPOSE', 'UNPIVOT', 'FLATTEN', 'ROTATE'],
    correctAnswer: 1,
    explanation:
      'UNPIVOT transforma colunas em linhas, convertendo uma tabela "wide" em "long". É o oposto do PIVOT.',
    difficulty: 'easy',
    tags: ['unpivot'],
  },
  {
    id: 'q-2-4-2',
    topicId: 'topic-2-4',
    domainId: 'domain-2',
    question:
      'Qual função você usaria para identificar se uma coluna está agregada (NULL por subtotal) em um GROUPING SETS?',
    options: ['IS_NULL()', 'GROUPING()', 'IS_AGGREGATE()', 'SUBTOTAL()'],
    correctAnswer: 1,
    explanation:
      'GROUPING(column) retorna 1 se a coluna está agregada (é um subtotal) e 0 caso contrário.',
    difficulty: 'hard',
    tags: ['grouping-sets', 'aggregation'],
  },
  // Domain 3 - Data Loading & Unloading
  {
    id: 'q-3-1-3',
    topicId: 'topic-3-1',
    domainId: 'domain-3',
    question: 'Qual tipo de stage é mais adequado para compartilhar arquivos entre múltiplos usuários?',
    options: ['User Stage', 'Table Stage', 'Named Internal Stage', 'Temporary Stage'],
    correctAnswer: 2,
    explanation:
      'Named Internal Stages podem ser compartilhados entre usuários através de grants. User e Table stages são específicos.',
    difficulty: 'medium',
    tags: ['stages'],
  },
  {
    id: 'q-3-2-2',
    topicId: 'topic-3-2',
    domainId: 'domain-3',
    question:
      'Qual opção do COPY INTO você usaria para validar o formato dos dados sem realmente carregá-los?',
    options: [
      'DRY_RUN = TRUE',
      'VALIDATE_ONLY = TRUE',
      'VALIDATION_MODE = RETURN_ALL_ERRORS',
      'TEST_MODE = TRUE',
    ],
    correctAnswer: 2,
    explanation:
      'VALIDATION_MODE = RETURN_ALL_ERRORS valida os dados e retorna erros sem carregar. Também pode usar RETURN_n_ROWS.',
    difficulty: 'medium',
    tags: ['copy-into', 'validation'],
  },
  {
    id: 'q-3-3-2',
    topicId: 'topic-3-3',
    domainId: 'domain-3',
    question:
      'Qual função você usaria para verificar o status atual de um Snowpipe?',
    options: [
      'PIPE_STATUS()',
      'SYSTEM$PIPE_STATUS()',
      'GET_PIPE_STATUS()',
      'CHECK_PIPE()',
    ],
    correctAnswer: 1,
    explanation:
      'SYSTEM$PIPE_STATUS(pipe_name) retorna o status atual do pipe, incluindo estado de execução e arquivos pendentes.',
    difficulty: 'medium',
    tags: ['snowpipe'],
  },
  // Domain 4 - Snowflake Objects & Architecture
  {
    id: 'q-4-1-3',
    topicId: 'topic-4-1',
    domainId: 'domain-4',
    question:
      'Qual tipo de view seria melhor para um dashboard que precisa de agregações atualizadas automaticamente?',
    options: ['Standard View', 'Secure View', 'Materialized View', 'Dynamic View'],
    correctAnswer: 2,
    explanation:
      'Materialized Views pré-computam resultados e são atualizadas automaticamente, ideal para dashboards com agregações.',
    difficulty: 'medium',
    tags: ['materialized-views'],
  },
  {
    id: 'q-4-2-2',
    topicId: 'topic-4-2',
    domainId: 'domain-4',
    question: 'Qual tipo de função retorna múltiplas linhas (uma tabela) como resultado?',
    options: ['Scalar UDF', 'UDTF', 'Stored Procedure', 'Aggregate UDF'],
    correctAnswer: 1,
    explanation:
      'UDTF (User-Defined Table Function) retorna uma tabela com múltiplas linhas, diferente de UDFs escalares que retornam um valor.',
    difficulty: 'medium',
    tags: ['udtf', 'programming'],
  },
  {
    id: 'q-4-3-2',
    topicId: 'topic-4-3',
    domainId: 'domain-4',
    question:
      'Um Stream fica "stale" quando:',
    options: [
      'Não é usado por 24 horas',
      'A tabela fonte é dropada',
      'Mudanças excedem o período de retenção de dados',
      'O warehouse é suspenso',
    ],
    correctAnswer: 2,
    explanation:
      'Um Stream fica stale quando as mudanças na tabela fonte excedem o período de DATA_RETENTION_TIME_IN_DAYS e não podem mais ser acessadas.',
    difficulty: 'hard',
    tags: ['streams'],
  },
  {
    id: 'q-4-4-3',
    topicId: 'topic-4-4',
    domainId: 'domain-4',
    question:
      'Qual comando você usaria para criar uma cópia de uma tabela em um ponto específico no tempo?',
    options: [
      'CREATE TABLE ... COPY FROM',
      'CREATE TABLE ... CLONE ... AT()',
      'CREATE TABLE ... RESTORE FROM',
      'DUPLICATE TABLE ... AT()',
    ],
    correctAnswer: 1,
    explanation:
      'CREATE TABLE new_table CLONE source_table AT(TIMESTAMP => ...) cria uma cópia zero-copy no ponto especificado.',
    difficulty: 'medium',
    tags: ['clone', 'time-travel'],
  },
  // Domain 5 - Data Visualization & Reporting
  {
    id: 'q-5-1-2',
    topicId: 'topic-5-1',
    domainId: 'domain-5',
    question:
      'O result cache do Snowflake é compartilhado entre usuários quando:',
    options: [
      'Sempre é compartilhado',
      'Nunca é compartilhado',
      'Apenas para queries em Secure Views',
      'Quando a query é idêntica e os dados não mudaram',
    ],
    correctAnswer: 3,
    explanation:
      'O result cache é compartilhado entre usuários quando a query é exatamente igual e os dados não foram modificados. Para Secure Views, a role também deve ser a mesma.',
    difficulty: 'medium',
    tags: ['result-cache'],
  },
  {
    id: 'q-5-2-2',
    topicId: 'topic-5-2',
    domainId: 'domain-5',
    question: 'Qual função retorna o nome da role atualmente ativa na sessão?',
    options: ['SESSION_ROLE()', 'ACTIVE_ROLE()', 'CURRENT_ROLE()', 'GET_ROLE()'],
    correctAnswer: 2,
    explanation:
      'CURRENT_ROLE() retorna o nome da role atualmente ativa. É uma das várias funções de contexto disponíveis.',
    difficulty: 'easy',
    tags: ['context-functions'],
  },
  // Domain 6 - Performance & Cost Optimization
  {
    id: 'q-6-1-3',
    topicId: 'topic-6-1',
    domainId: 'domain-6',
    question:
      'Qual scaling policy prioriza economia de custos sobre performance?',
    options: ['STANDARD', 'ECONOMY', 'CONSERVATIVE', 'OPTIMIZED'],
    correctAnswer: 1,
    explanation:
      'ECONOMY scaling policy escala clusters de forma conservadora para economizar custos. STANDARD prioriza performance.',
    difficulty: 'easy',
    tags: ['warehouse', 'scaling'],
  },
  {
    id: 'q-6-2-3',
    topicId: 'topic-6-2',
    domainId: 'domain-6',
    question:
      'O Search Optimization Service é mais eficaz para qual tipo de query?',
    options: [
      'Range scans (WHERE date BETWEEN ...)',
      'Full table scans',
      'Point lookups (WHERE id = ...)',
      'Aggregations (GROUP BY)',
    ],
    correctAnswer: 2,
    explanation:
      'Search Optimization Service acelera point lookups (equality e IN) em tabelas grandes. Clustering é melhor para range scans.',
    difficulty: 'hard',
    tags: ['search-optimization'],
  },
  {
    id: 'q-6-3-2',
    topicId: 'topic-6-3',
    domainId: 'domain-6',
    question:
      'No Query Profile, o que indica "Bytes spilled to local storage"?',
    options: [
      'Dados foram escritos em cache para reutilização',
      'A query usou mais memória do que disponível e usou SSD local',
      'Os resultados foram salvos para o próximo usuário',
      'Houve erro de memória e a query falhou',
    ],
    correctAnswer: 1,
    explanation:
      'Spilling to local storage significa que a operação excedeu a memória disponível e precisou usar SSD local. É mais rápido que remote spill, mas ainda indica que mais memória seria benéfica.',
    difficulty: 'medium',
    tags: ['query-profile', 'performance'],
  },
  {
    id: 'q-6-3-3',
    topicId: 'topic-6-3',
    domainId: 'domain-6',
    question:
      'Qual é a principal causa de "Exploding JOINs" no Query Profile?',
    options: [
      'Usar INNER JOIN em vez de LEFT JOIN',
      'Junções com cardinalidade alta resultando em muitas linhas',
      'Falta de índices nas colunas de join',
      'Usar muitas colunas no SELECT',
    ],
    correctAnswer: 1,
    explanation:
      'Exploding JOINs ocorrem quando a cardinalidade das tabelas resulta em um número muito grande de linhas combinadas. A solução é adicionar condições de join mais específicas ou filtrar antes do join.',
    difficulty: 'medium',
    tags: ['query-profile', 'joins'],
  },
];

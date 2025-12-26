import { Domain } from '@/types';

// Baseado no guia oficial do exame SnowPro Advanced: Data Analyst
// https://learn.snowflake.com/en/certifications/snowpro-advanced-data-analyst/

export const domains: Domain[] = [
  {
    id: 'domain-1',
    name: 'Snowflake SQL for Data Analysis',
    description: 'SQL avançado para análise de dados incluindo window functions, CTEs, joins complexos e otimização de queries.',
    weight: 28,
    color: '#29B5E8',
    topics: [
      {
        id: 'topic-1-1',
        domainId: 'domain-1',
        name: 'Advanced SQL Querying',
        description: 'Window functions, ranking, navigation functions, e frame specifications',
        objectives: [
          'Window functions: ROW_NUMBER, RANK, DENSE_RANK, NTILE, PERCENT_RANK, CUME_DIST',
          'Navigation functions: LAG, LEAD, FIRST_VALUE, LAST_VALUE, NTH_VALUE',
          'Frame specifications: ROWS vs RANGE, UNBOUNDED PRECEDING/FOLLOWING',
          'QUALIFY clause para filtrar resultados de window functions',
          'Funções de string: CONCAT, SPLIT, SPLIT_PART, REGEXP_SUBSTR, REGEXP_REPLACE',
          'Funções de data: DATEADD, DATEDIFF, DATE_TRUNC, TIME_SLICE, EXTRACT',
          'Funções condicionais: CASE, IFF, NVL, NVL2, COALESCE, NULLIF, DECODE',
          'Funções de agregação: SUM, AVG, COUNT, LISTAGG, ARRAY_AGG, OBJECT_AGG',
        ],
      },
      {
        id: 'topic-1-2',
        domainId: 'domain-1',
        name: 'CTEs e Subqueries',
        description: 'Common Table Expressions, incluindo CTEs recursivas',
        objectives: [
          'Criar e usar CTEs (WITH clause) para queries complexas',
          'Implementar CTEs recursivas com anchor e recursive members',
          'UNION ALL obrigatório entre anchor e recursive members',
          'Subqueries correlacionadas vs não correlacionadas',
          'Subqueries em SELECT, FROM e WHERE',
        ],
      },
      {
        id: 'topic-1-3',
        domainId: 'domain-1',
        name: 'JOINs e Set Operations',
        description: 'Tipos de joins e operações de conjunto',
        objectives: [
          'INNER, LEFT, RIGHT, FULL OUTER, CROSS joins',
          'NATURAL joins e condições de join complexas',
          'LATERAL joins para subqueries correlacionadas',
          'Self-joins para dados hierárquicos',
          'ASOF joins para séries temporais',
          'UNION, UNION ALL, INTERSECT, EXCEPT/MINUS',
        ],
      },
      {
        id: 'topic-1-4',
        domainId: 'domain-1',
        name: 'Query Optimization',
        description: 'Otimização de queries e análise de performance',
        objectives: [
          'Analisar Query Profile no Snowsight',
          'Identificar spilling (local e remote)',
          'Partition pruning e clustering',
          'Result caching e metadata caching',
          'Otimização de JOINs',
        ],
      },
    ],
  },
  {
    id: 'domain-2',
    name: 'Semi-Structured Data',
    description: 'Trabalho com dados semi-estruturados: JSON, VARIANT, ARRAY, OBJECT e funções relacionadas.',
    weight: 18,
    color: '#00A3E0',
    topics: [
      {
        id: 'topic-2-1',
        domainId: 'domain-2',
        name: 'VARIANT, OBJECT e ARRAY',
        description: 'Tipos de dados semi-estruturados e acesso a dados',
        objectives: [
          'VARIANT: tipo genérico para qualquer dado semi-estruturado (max 16MB)',
          'OBJECT: pares chave-valor',
          'ARRAY: listas ordenadas',
          'Notação de dois pontos (data:field) e colchetes (data[\'field\'])',
          'Cast explícito de tipos (::VARCHAR, ::NUMBER, etc.)',
          'IS NULL vs IS_NULL_VALUE() para JSON null',
          'TYPEOF() e funções IS_* para verificação de tipo',
        ],
      },
      {
        id: 'topic-2-2',
        domainId: 'domain-2',
        name: 'FLATTEN Function',
        description: 'Expansão de arrays e objetos em linhas',
        objectives: [
          'LATERAL FLATTEN para expandir arrays/objetos',
          'Parâmetros: INPUT, PATH, OUTER, RECURSIVE, MODE',
          'Colunas de saída: SEQ, KEY, PATH, INDEX, VALUE, THIS',
          'OUTER = TRUE para preservar NULLs',
          'FLATTEN aninhado para estruturas complexas',
        ],
      },
      {
        id: 'topic-2-3',
        domainId: 'domain-2',
        name: 'Funções Semi-Estruturadas',
        description: 'Manipulação e construção de dados semi-estruturados',
        objectives: [
          'PARSE_JSON e TRY_PARSE_JSON',
          'OBJECT_CONSTRUCT, OBJECT_INSERT, OBJECT_DELETE, OBJECT_KEYS',
          'ARRAY_CONSTRUCT, ARRAY_APPEND, ARRAY_SIZE, ARRAY_SLICE',
          'ARRAY_CONTAINS, ARRAY_POSITION, ARRAY_COMPACT, ARRAY_DISTINCT',
          'ARRAY_AGG e OBJECT_AGG para agregação',
          'GET, GET_PATH para acesso seguro',
        ],
      },
      {
        id: 'topic-2-4',
        domainId: 'domain-2',
        name: 'Agregações Avançadas',
        description: 'GROUPING SETS, CUBE, ROLLUP',
        objectives: [
          'GROUPING SETS para combinações específicas de agregação',
          'ROLLUP para agregações hierárquicas',
          'CUBE para todas as combinações de agregação',
          'GROUPING() e GROUPING_ID() para identificar níveis',
          'PIVOT e UNPIVOT para transformação de dados',
        ],
      },
    ],
  },
  {
    id: 'domain-3',
    name: 'Data Loading & Unloading',
    description: 'Carregamento e descarregamento de dados usando stages, COPY INTO e Snowpipe.',
    weight: 17,
    color: '#0073B7',
    topics: [
      {
        id: 'topic-3-1',
        domainId: 'domain-3',
        name: 'Stages',
        description: 'Tipos de stages e configuração',
        objectives: [
          'User Stage (@~): automático, por usuário',
          'Table Stage (@%table): automático, por tabela',
          'Named Internal Stage: criado pelo usuário',
          'External Stage: S3, Azure Blob, GCS',
          'Storage Integrations para acesso seguro',
          'Comandos: LIST, PUT, GET, REMOVE',
          'Directory Tables para listagem de arquivos',
        ],
      },
      {
        id: 'topic-3-2',
        domainId: 'domain-3',
        name: 'COPY INTO',
        description: 'Carregamento e descarregamento de dados',
        objectives: [
          'COPY INTO <table> para carga',
          'COPY INTO <location> para descarga',
          'Transformações durante COPY (SELECT com expressões)',
          'ON_ERROR: ABORT_STATEMENT, CONTINUE, SKIP_FILE',
          'VALIDATION_MODE para testar sem carregar',
          'FORCE para recarregar arquivos',
          'File Formats: CSV, JSON, Parquet, Avro, ORC',
          'STRIP_OUTER_ARRAY para JSON arrays',
        ],
      },
      {
        id: 'topic-3-3',
        domainId: 'domain-3',
        name: 'Snowpipe',
        description: 'Ingestão contínua de dados',
        objectives: [
          'CREATE PIPE com AUTO_INGEST',
          'Notificações de cloud events (S3, Azure, GCS)',
          'SYSTEM$PIPE_STATUS para monitoramento',
          'COPY_HISTORY e PIPE_USAGE_HISTORY',
          'ALTER PIPE REFRESH para arquivos perdidos',
          'Diferenças de custo: serverless vs warehouse',
          'Snowpipe Streaming para latência mínima',
        ],
      },
    ],
  },
  {
    id: 'domain-4',
    name: 'Snowflake Objects & Architecture',
    description: 'Views, UDFs, Stored Procedures, Streams, Tasks, Time Travel e Cloning.',
    weight: 17,
    color: '#005A9C',
    topics: [
      {
        id: 'topic-4-1',
        domainId: 'domain-4',
        name: 'Views',
        description: 'Tipos de views e casos de uso',
        objectives: [
          'Standard Views: definição visível',
          'Secure Views: definição oculta, otimizações limitadas',
          'Materialized Views: resultados pré-computados',
          'Limitações de Materialized Views (sem JOINs, UDFs)',
          'Views em dados semi-estruturados',
        ],
      },
      {
        id: 'topic-4-2',
        domainId: 'domain-4',
        name: 'UDFs e Stored Procedures',
        description: 'Funções e procedimentos customizados',
        objectives: [
          'Scalar UDFs: retornam um valor por linha',
          'UDTFs: retornam tabela (múltiplas linhas)',
          'Linguagens: SQL, JavaScript, Python, Java, Scala',
          'Stored Procedures: permitem DDL/DML',
          'Diferenças: UDF (sem side effects) vs SP (com side effects)',
          'Caller rights vs Owner rights',
          'Snowpark para Python/Java/Scala',
        ],
      },
      {
        id: 'topic-4-3',
        domainId: 'domain-4',
        name: 'Streams e Tasks',
        description: 'CDC e automação de pipelines',
        objectives: [
          'Streams: captura de INSERT, UPDATE, DELETE',
          'Standard streams vs Append-only streams',
          'Colunas: METADATA$ACTION, METADATA$ISUPDATE, METADATA$ROW_ID',
          'SYSTEM$STREAM_HAS_DATA() para verificação',
          'Tasks: schedule com CRON ou intervalo',
          'Task Trees (DAGs) com AFTER clause',
          'Serverless tasks',
        ],
      },
      {
        id: 'topic-4-4',
        domainId: 'domain-4',
        name: 'Time Travel e Cloning',
        description: 'Recuperação e cópia de dados',
        objectives: [
          'Time Travel: Standard (0-1 dia), Enterprise (0-90 dias)',
          'Consultas históricas: AT(TIMESTAMP/OFFSET), BEFORE(STATEMENT)',
          'UNDROP para recuperar objetos',
          'Fail-safe: 7 dias após Time Travel (só Snowflake)',
          'DATA_RETENTION_TIME_IN_DAYS',
          'Zero-copy cloning',
          'Clone com Time Travel',
        ],
      },
    ],
  },
  {
    id: 'domain-5',
    name: 'Visualization, Sharing & Collaboration',
    description: 'Snowsight, dashboards, data sharing e Marketplace.',
    weight: 10,
    color: '#00416A',
    topics: [
      {
        id: 'topic-5-1',
        domainId: 'domain-5',
        name: 'Snowsight',
        description: 'Interface de análise e dashboards',
        objectives: [
          'Worksheets: criação, organização, compartilhamento',
          'Context functions: CURRENT_WAREHOUSE, DATABASE, SCHEMA, ROLE, USER',
          'Variáveis de sessão: SET var = value; $var ou :var',
          'Tipos de gráficos: bar, line, scatter, area, heatmap, scorecard',
          'Dashboards: filtros, parâmetros, auto-refresh',
          'Alerts para monitoramento',
        ],
      },
      {
        id: 'topic-5-2',
        domainId: 'domain-5',
        name: 'Result Caching',
        description: 'Caching de resultados de queries',
        objectives: [
          'Result cache: 24 horas de validade',
          'Compartilhado entre usuários (mesma query)',
          'Invalidado quando dados mudam',
          'USE_CACHED_RESULT parameter',
          'Funções não-determinísticas invalidam cache',
        ],
      },
      {
        id: 'topic-5-3',
        domainId: 'domain-5',
        name: 'Data Sharing',
        description: 'Compartilhamento seguro de dados',
        objectives: [
          'CREATE SHARE e GRANT objetos',
          'Consumer: CREATE DATABASE FROM SHARE',
          'Reader Accounts para não-clientes Snowflake',
          'Secure Views obrigatórias para sharing',
          'Cross-region/cloud sharing',
          'Snowflake Marketplace',
        ],
      },
    ],
  },
  {
    id: 'domain-6',
    name: 'Performance & Cost Optimization',
    description: 'Otimização de warehouses, clustering, caching e monitoramento de custos.',
    weight: 10,
    color: '#002D4D',
    topics: [
      {
        id: 'topic-6-1',
        domainId: 'domain-6',
        name: 'Virtual Warehouses',
        description: 'Configuração e otimização de compute',
        objectives: [
          'Tamanhos: XS(1) a 6XL(512) créditos/hora',
          'Auto-suspend e auto-resume',
          'Multi-cluster warehouses: MIN/MAX clusters',
          'Scaling policies: STANDARD vs ECONOMY',
          'Query Acceleration Service',
          'Resource Monitors: NOTIFY, SUSPEND, SUSPEND_IMMEDIATE',
        ],
      },
      {
        id: 'topic-6-2',
        domainId: 'domain-6',
        name: 'Storage Optimization',
        description: 'Micro-partitions, clustering e search optimization',
        objectives: [
          'Micro-partitions: 50-500 MB comprimidos',
          'Clustering keys para melhorar pruning',
          'SYSTEM$CLUSTERING_INFORMATION e CLUSTERING_DEPTH',
          'Automatic reclustering',
          'Search Optimization Service para point lookups',
          'Clustering vs Search Optimization',
        ],
      },
      {
        id: 'topic-6-3',
        domainId: 'domain-6',
        name: 'Query Performance',
        description: 'Análise e otimização de queries',
        objectives: [
          'Query Profile: identificar bottlenecks',
          'Spilling: local vs remote storage',
          'Partition pruning statistics',
          'Join explosion detection',
          'Result, metadata e local disk cache',
          'Query history e statistics',
        ],
      },
    ],
  },
];

export const getDomainById = (id: string): Domain | undefined => {
  return domains.find((d) => d.id === id);
};

export const getTopicById = (topicId: string): { topic: Domain['topics'][0]; domain: Domain } | undefined => {
  for (const domain of domains) {
    const topic = domain.topics.find((t) => t.id === topicId);
    if (topic) {
      return { topic, domain };
    }
  }
  return undefined;
};

export const getAllTopics = () => {
  return domains.flatMap((domain) => domain.topics);
};

export const getTotalWeight = () => {
  return domains.reduce((sum, d) => sum + d.weight, 0);
};

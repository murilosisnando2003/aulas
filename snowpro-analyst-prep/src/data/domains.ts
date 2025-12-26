import { Domain } from '@/types';

// Baseado no guia oficial do exame SnowPro Advanced: Data Analyst
// https://learn.snowflake.com/en/certifications/snowpro-advanced-data-analyst/

export const domains: Domain[] = [
  {
    id: 'domain-1',
    name: 'Snowflake SQL & Query Fundamentals',
    description: 'Domínio de SQL e fundamentos de consultas no Snowflake, incluindo funções, operadores, e sintaxe avançada.',
    weight: 20,
    color: '#29B5E8', // Snowflake blue
    topics: [
      {
        id: 'topic-1-1',
        domainId: 'domain-1',
        name: 'Funções SQL Avançadas',
        description: 'Funções de janela, funções agregadas, funções de string, data e numéricas',
        objectives: [
          'Utilizar funções de janela (WINDOW functions) como ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD',
          'Aplicar funções agregadas com GROUP BY e HAVING',
          'Manipular dados com funções de string (CONCAT, SPLIT, REGEXP)',
          'Trabalhar com funções de data e hora (DATEADD, DATEDIFF, DATE_TRUNC)',
          'Usar funções condicionais (CASE, IFF, NULLIF, COALESCE, NVL)',
        ],
      },
      {
        id: 'topic-1-2',
        domainId: 'domain-1',
        name: 'CTEs e Subqueries',
        description: 'Common Table Expressions, subqueries correlacionadas e não correlacionadas',
        objectives: [
          'Criar e usar CTEs (WITH clause) para melhorar legibilidade',
          'Implementar CTEs recursivas para dados hierárquicos',
          'Utilizar subqueries em cláusulas SELECT, FROM e WHERE',
          'Diferenciar subqueries correlacionadas de não correlacionadas',
          'Otimizar queries usando CTEs vs subqueries',
        ],
      },
      {
        id: 'topic-1-3',
        domainId: 'domain-1',
        name: 'JOINs e Set Operations',
        description: 'Diferentes tipos de JOINs e operações de conjunto',
        objectives: [
          'Aplicar INNER, LEFT, RIGHT, FULL OUTER e CROSS JOINs',
          'Usar NATURAL JOIN e condições de join complexas',
          'Implementar LATERAL JOINs para subqueries correlacionadas',
          'Utilizar UNION, INTERSECT e EXCEPT/MINUS',
          'Entender performance implications de diferentes tipos de JOIN',
        ],
      },
      {
        id: 'topic-1-4',
        domainId: 'domain-1',
        name: 'Query Optimization',
        description: 'Técnicas de otimização de consultas e análise de planos de execução',
        objectives: [
          'Analisar Query Profile no Snowflake UI',
          'Identificar operações custosas (spilling, pruning)',
          'Usar EXPLAIN para entender planos de execução',
          'Aplicar técnicas de partition pruning',
          'Otimizar queries com micro-partitions e clustering',
        ],
      },
    ],
  },
  {
    id: 'domain-2',
    name: 'Data Analysis & Transformation',
    description: 'Análise e transformação de dados usando recursos avançados do Snowflake.',
    weight: 25,
    color: '#00A3E0',
    topics: [
      {
        id: 'topic-2-1',
        domainId: 'domain-2',
        name: 'Semi-Structured Data',
        description: 'Trabalho com JSON, XML, Avro, Parquet e ORC',
        objectives: [
          'Consultar dados semi-estruturados usando notação de ponto e colchetes',
          'Usar FLATTEN para expandir arrays e objetos',
          'Aplicar funções PARSE_JSON, TO_JSON, OBJECT_CONSTRUCT',
          'Trabalhar com VARIANT, OBJECT e ARRAY data types',
          'Converter entre dados estruturados e semi-estruturados',
        ],
      },
      {
        id: 'topic-2-2',
        domainId: 'domain-2',
        name: 'Pivot e Unpivot',
        description: 'Transformação de linhas em colunas e vice-versa',
        objectives: [
          'Usar PIVOT para transformar linhas em colunas',
          'Aplicar UNPIVOT para transformar colunas em linhas',
          'Implementar dynamic pivoting com stored procedures',
          'Combinar PIVOT com agregações complexas',
        ],
      },
      {
        id: 'topic-2-3',
        domainId: 'domain-2',
        name: 'Time Series Analysis',
        description: 'Análise de séries temporais e dados históricos',
        objectives: [
          'Usar funções de janela para cálculos de séries temporais',
          'Implementar moving averages e running totals',
          'Trabalhar com TIME_SLICE e DATE_TRUNC',
          'Analisar tendências com LAG e LEAD',
          'Usar ASOF JOINs para dados temporais',
        ],
      },
      {
        id: 'topic-2-4',
        domainId: 'domain-2',
        name: 'Advanced Aggregations',
        description: 'Agregações avançadas incluindo GROUPING SETS, CUBE e ROLLUP',
        objectives: [
          'Implementar GROUPING SETS para múltiplas agregações',
          'Usar CUBE para todas as combinações de agregação',
          'Aplicar ROLLUP para agregações hierárquicas',
          'Combinar diferentes níveis de agregação em uma query',
          'Usar GROUPING e GROUPING_ID para identificar níveis',
        ],
      },
    ],
  },
  {
    id: 'domain-3',
    name: 'Data Loading & Unloading',
    description: 'Carregamento e descarregamento de dados usando stages, pipes e formatos de arquivo.',
    weight: 15,
    color: '#0073B7',
    topics: [
      {
        id: 'topic-3-1',
        domainId: 'domain-3',
        name: 'Stages e File Formats',
        description: 'Configuração e uso de stages internos e externos',
        objectives: [
          'Criar e configurar Internal Stages (User, Table, Named)',
          'Configurar External Stages (S3, Azure Blob, GCS)',
          'Definir File Formats para CSV, JSON, Parquet, etc.',
          'Usar PUT e GET para upload/download de arquivos',
          'Listar e gerenciar arquivos em stages',
        ],
      },
      {
        id: 'topic-3-2',
        domainId: 'domain-3',
        name: 'COPY INTO',
        description: 'Comando COPY INTO para carga e descarga de dados',
        objectives: [
          'Usar COPY INTO <table> para carregar dados',
          'Usar COPY INTO <location> para descarregar dados',
          'Aplicar transformações durante o COPY',
          'Configurar opções de tratamento de erros',
          'Monitorar e validar cargas de dados',
        ],
      },
      {
        id: 'topic-3-3',
        domainId: 'domain-3',
        name: 'Snowpipe',
        description: 'Ingestão contínua de dados com Snowpipe',
        objectives: [
          'Criar e configurar Pipes para ingestão automática',
          'Configurar notificações de cloud events',
          'Monitorar status de ingestão do Snowpipe',
          'Entender diferenças entre Snowpipe e COPY INTO',
          'Gerenciar e troubleshoot Snowpipe',
        ],
      },
    ],
  },
  {
    id: 'domain-4',
    name: 'Snowflake Objects & Architecture',
    description: 'Objetos do Snowflake, arquitetura e recursos de plataforma.',
    weight: 15,
    color: '#005A9C',
    topics: [
      {
        id: 'topic-4-1',
        domainId: 'domain-4',
        name: 'Views e Materialized Views',
        description: 'Criação e uso de views, secure views e materialized views',
        objectives: [
          'Criar e usar Views regulares',
          'Implementar Secure Views para proteção de dados',
          'Configurar Materialized Views para performance',
          'Entender custos e benefícios de Materialized Views',
          'Usar views com dados semi-estruturados',
        ],
      },
      {
        id: 'topic-4-2',
        domainId: 'domain-4',
        name: 'Stored Procedures e UDFs',
        description: 'Criação de lógica procedural e funções definidas pelo usuário',
        objectives: [
          'Criar Stored Procedures em JavaScript e SQL',
          'Desenvolver User-Defined Functions (UDFs)',
          'Implementar UDTFs (Table Functions)',
          'Usar Snowpark para procedures em Python/Java/Scala',
          'Entender diferenças entre procedures e UDFs',
        ],
      },
      {
        id: 'topic-4-3',
        domainId: 'domain-4',
        name: 'Streams e Tasks',
        description: 'Change Data Capture e automação de tarefas',
        objectives: [
          'Criar e usar Streams para CDC',
          'Configurar Tasks para automação',
          'Implementar pipelines de dados com Tasks e Streams',
          'Usar SYSTEM$STREAM_HAS_DATA para verificação',
          'Monitorar e gerenciar tasks programadas',
        ],
      },
      {
        id: 'topic-4-4',
        domainId: 'domain-4',
        name: 'Time Travel e Fail-Safe',
        description: 'Recursos de proteção e recuperação de dados',
        objectives: [
          'Usar Time Travel para consultar dados históricos',
          'Restaurar dados com UNDROP e AT/BEFORE',
          'Configurar DATA_RETENTION_TIME_IN_DAYS',
          'Entender Fail-safe e suas limitações',
          'Clonar objetos em pontos específicos no tempo',
        ],
      },
    ],
  },
  {
    id: 'domain-5',
    name: 'Data Visualization & Reporting',
    description: 'Visualização de dados, dashboards e integração com ferramentas de BI.',
    weight: 15,
    color: '#00416A',
    topics: [
      {
        id: 'topic-5-1',
        domainId: 'domain-5',
        name: 'Snowsight Dashboards',
        description: 'Criação de dashboards e visualizações no Snowsight',
        objectives: [
          'Criar dashboards no Snowsight',
          'Configurar diferentes tipos de gráficos',
          'Usar filtros e parâmetros em dashboards',
          'Compartilhar dashboards com outros usuários',
          'Exportar dados e visualizações',
        ],
      },
      {
        id: 'topic-5-2',
        domainId: 'domain-5',
        name: 'Worksheets e Query Results',
        description: 'Trabalho eficiente com worksheets e resultados',
        objectives: [
          'Organizar e gerenciar worksheets',
          'Usar query history e result caching',
          'Aplicar variáveis e parâmetros em queries',
          'Formatar e exportar resultados',
          'Usar context functions em worksheets',
        ],
      },
      {
        id: 'topic-5-3',
        domainId: 'domain-5',
        name: 'BI Tools Integration',
        description: 'Integração com ferramentas de Business Intelligence',
        objectives: [
          'Conectar Tableau, Power BI, Looker ao Snowflake',
          'Otimizar queries para ferramentas de BI',
          'Usar Snowflake drivers e connectors',
          'Implementar row-level security para BI',
          'Gerenciar performance com BI tools',
        ],
      },
    ],
  },
  {
    id: 'domain-6',
    name: 'Performance & Cost Optimization',
    description: 'Otimização de performance, gerenciamento de custos e melhores práticas.',
    weight: 10,
    color: '#002D4D',
    topics: [
      {
        id: 'topic-6-1',
        domainId: 'domain-6',
        name: 'Virtual Warehouses',
        description: 'Configuração e otimização de warehouses',
        objectives: [
          'Escolher tamanho apropriado de warehouse',
          'Configurar auto-suspend e auto-resume',
          'Usar multi-cluster warehouses',
          'Implementar resource monitors',
          'Entender créditos e billing',
        ],
      },
      {
        id: 'topic-6-2',
        domainId: 'domain-6',
        name: 'Clustering e Micro-partitions',
        description: 'Otimização de armazenamento e acesso a dados',
        objectives: [
          'Entender micro-partitions e metadata',
          'Implementar clustering keys',
          'Monitorar clustering depth',
          'Usar AUTOMATIC_CLUSTERING',
          'Analisar partition pruning',
        ],
      },
      {
        id: 'topic-6-3',
        domainId: 'domain-6',
        name: 'Query Performance',
        description: 'Análise e otimização de performance de queries',
        objectives: [
          'Usar Query Profile para diagnóstico',
          'Identificar e resolver spilling',
          'Otimizar joins e agregações',
          'Usar result caching efetivamente',
          'Implementar search optimization service',
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

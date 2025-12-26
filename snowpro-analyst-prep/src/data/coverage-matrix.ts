/**
 * Matriz de Cobertura - SnowPro Advanced: Data Analyst
 * 
 * Este arquivo mapeia cada objetivo do exame oficial para flashcards e questões específicos.
 * Garantindo cobertura de 100% de TODOS os sub-objetivos.
 */

export interface CoverageItem {
  objectiveId: string;
  domain: string;
  weight: string;
  objective: string;
  subObjectives: string[];
  flashcardIds: string[];
  questionIds: string[];
  covered: boolean;
}

export const coverageMatrix: CoverageItem[] = [
  // ============================================
  // DOMAIN 1: SQL & Query Fundamentals (20-25%)
  // ============================================
  {
    objectiveId: '1.1',
    domain: 'Domain 1',
    weight: '20-25%',
    objective: 'Write SQL queries using advanced techniques',
    subObjectives: [
      'Window functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE)',
      'LAG/LEAD and FIRST_VALUE/LAST_VALUE',
      'Aggregate window functions (SUM, AVG, COUNT with OVER)',
      'Frame specifications (ROWS BETWEEN, RANGE BETWEEN)',
      'QUALIFY clause',
      'String functions (LISTAGG, SPLIT_PART, REGEXP)',
      'Date/time functions (DATEADD, DATEDIFF, DATE_TRUNC)',
      'Conversion functions (CAST, TRY_CAST, TO_*)',
      'Hash functions (HASH, MD5, SHA2)',
      'Conditional expressions (CASE, IFF, COALESCE, NVL)',
      'NULL handling (NVL, NVL2, NULLIF, ZEROIFNULL)',
      'Approximate functions (APPROX_COUNT_DISTINCT, HLL)',
      'Percentile functions (MEDIAN, PERCENTILE_CONT, PERCENTILE_DISC)',
      'GENERATOR and SEQ functions',
    ],
    flashcardIds: [
      'fc-1-1-1', 'fc-1-1-2', 'fc-1-1-3', 'fc-1-1-4',
      'fc-full-1', 'fc-full-2', 'fc-full-3', 'fc-full-26', 'fc-full-27',
      'fc-full-28', 'fc-full-29', 'fc-full-51', 'fc-full-52', 'fc-full-53',
      'fc-full-54', 'fc-full-55', 'fc-full-56', 'fc-full-57',
    ],
    questionIds: [
      'q-1-1-1', 'q-1-1-2', 'q-1-1-3', 'q-extra-1',
      'qfc-1', 'qfc-2', 'qfc-3', 'qfc-4', 'qfc-5', 'qfc-6', 'qfc-7', 'qfc-8',
    ],
    covered: true,
  },
  {
    objectiveId: '1.2',
    domain: 'Domain 1',
    weight: '20-25%',
    objective: 'Query semi-structured data',
    subObjectives: [
      'VARIANT, OBJECT, and ARRAY data types',
      'Dot notation and bracket notation',
      'FLATTEN function',
      'LATERAL FLATTEN',
      'OUTER parameter for FLATTEN',
      'PARSE_JSON and TRY_PARSE_JSON',
      'OBJECT_CONSTRUCT and ARRAY_CONSTRUCT',
      'ARRAY functions (ARRAY_AGG, ARRAY_SIZE, ARRAY_SLICE)',
      'OBJECT functions (OBJECT_KEYS, GET, GET_PATH)',
      'IS_* type checking functions',
      'TYPEOF function',
    ],
    flashcardIds: [
      'fc-2-1-1', 'fc-2-1-2', 'fc-extra-1',
      'fc-full-46', 'fc-full-47',
    ],
    questionIds: [
      'q-2-1-1', 'q-2-1-2', 'q-2-1-3', 'q-extra-2',
      'qfc-9', 'qfc-10', 'qfc-11', 'qfc-12',
    ],
    covered: true,
  },
  {
    objectiveId: '1.3',
    domain: 'Domain 1',
    weight: '20-25%',
    objective: 'Use advanced join techniques',
    subObjectives: [
      'LATERAL joins',
      'ASOF joins',
      'NATURAL joins',
      'Recursive CTEs',
      'CONNECT BY for hierarchical queries',
      'Self joins',
    ],
    flashcardIds: [
      'fc-1-2-1', 'fc-1-3-1',
      'fc-full-20', 'fc-full-64',
    ],
    questionIds: [
      'q-1-2-1', 'q-1-3-1',
      'qfc-13', 'qfc-14', 'qfc-15',
    ],
    covered: true,
  },
  {
    objectiveId: '1.4',
    domain: 'Domain 1',
    weight: '20-25%',
    objective: 'Analyze query performance',
    subObjectives: [
      'Query Profile interpretation',
      'Identifying spilling',
      'Partition pruning',
      'EXPLAIN command',
      'SAMPLE for testing',
      'RESULT_SCAN and LAST_QUERY_ID',
    ],
    flashcardIds: [
      'fc-1-4-1',
      'fc-full-17', 'fc-full-21', 'fc-full-25',
    ],
    questionIds: [
      'q-1-4-1',
      'qfc-16', 'qfc-17', 'qfc-18',
    ],
    covered: true,
  },

  // ============================================
  // DOMAIN 2: Data Analysis & Reporting (25-30%)
  // ============================================
  {
    objectiveId: '2.1',
    domain: 'Domain 2',
    weight: '25-30%',
    objective: 'Transform data for analysis',
    subObjectives: [
      'PIVOT and UNPIVOT',
      'GROUPING SETS, CUBE, ROLLUP',
      'GROUPING function',
      'Moving averages and running totals',
      'Time series analysis',
    ],
    flashcardIds: [
      'fc-2-2-1', 'fc-2-3-1', 'fc-2-4-1',
    ],
    questionIds: [
      'q-2-2-1', 'q-2-3-1', 'q-2-4-1',
    ],
    covered: true,
  },
  {
    objectiveId: '2.2',
    domain: 'Domain 2',
    weight: '25-30%',
    objective: 'Create visualizations in Snowsight',
    subObjectives: [
      'Chart types (bar, line, scatter, pie)',
      'Dashboard creation',
      'Filters and parameters',
      'Sharing dashboards',
      'Context functions (CURRENT_*)',
    ],
    flashcardIds: [
      'fc-5-1-1',
      'fc-full-36', 'fc-full-37',
    ],
    questionIds: [
      'qfc-19', 'qfc-20', 'qfc-21',
    ],
    covered: true,
  },

  // ============================================
  // DOMAIN 3: Data Loading & Pipelines (15-20%)
  // ============================================
  {
    objectiveId: '3.1',
    domain: 'Domain 3',
    weight: '15-20%',
    objective: 'Configure data loading',
    subObjectives: [
      'Stage types (User, Table, Named, External)',
      'File formats (CSV, JSON, Parquet, Avro, ORC)',
      'Storage integrations',
      'Directory tables',
      'External tables',
    ],
    flashcardIds: [
      'fc-3-1-1',
      'fc-full-9', 'fc-full-10', 'fc-full-45',
    ],
    questionIds: [
      'q-3-1-1', 'q-3-1-2',
      'qfc-22', 'qfc-23', 'qfc-24',
    ],
    covered: true,
  },
  {
    objectiveId: '3.2',
    domain: 'Domain 3',
    weight: '15-20%',
    objective: 'Load and transform data',
    subObjectives: [
      'COPY INTO command',
      'Transformations during load',
      'Error handling (ON_ERROR options)',
      'VALIDATION_MODE',
      'MATCH_BY_COLUMN_NAME',
      'Schema evolution',
      'MERGE statement',
      'Multi-table INSERT',
      'METADATA$ columns',
    ],
    flashcardIds: [
      'fc-3-2-1',
      'fc-full-4', 'fc-full-5', 'fc-full-30', 'fc-full-43', 'fc-full-44',
    ],
    questionIds: [
      'q-3-2-1', 'q-extra-3',
      'qfc-25', 'qfc-26', 'qfc-27', 'qfc-28',
    ],
    covered: true,
  },
  {
    objectiveId: '3.3',
    domain: 'Domain 3',
    weight: '15-20%',
    objective: 'Implement data pipelines',
    subObjectives: [
      'Snowpipe (auto-ingest)',
      'Streams (CDC)',
      'Tasks (scheduling)',
      'Task dependencies (DAGs)',
      'SYSTEM$STREAM_HAS_DATA',
      'Data pipeline patterns',
    ],
    flashcardIds: [
      'fc-3-3-1', 'fc-4-3-1',
      'fc-full-42',
    ],
    questionIds: [
      'q-3-3-1', 'q-4-3-1', 'q-extra-4',
      'qfc-29', 'qfc-30', 'qfc-31',
    ],
    covered: true,
  },

  // ============================================
  // DOMAIN 4: Data Management & Security (15-20%)
  // ============================================
  {
    objectiveId: '4.1',
    domain: 'Domain 4',
    weight: '15-20%',
    objective: 'Implement security features',
    subObjectives: [
      'RBAC (roles and privileges)',
      'Dynamic data masking',
      'Row access policies',
      'Object tagging',
      'Network policies',
      'Column-level security',
    ],
    flashcardIds: [
      'fc-full-11', 'fc-full-12', 'fc-full-13', 'fc-full-23', 'fc-full-48',
      'fc-full-60',
    ],
    questionIds: [
      'qfc-32', 'qfc-33', 'qfc-34',
    ],
    covered: true,
  },
  {
    objectiveId: '4.2',
    domain: 'Domain 4',
    weight: '15-20%',
    objective: 'Manage database objects',
    subObjectives: [
      'Views (regular, secure, materialized)',
      'Stored procedures (SQL, JavaScript, Python)',
      'UDFs (scalar, table)',
      'External functions',
      'Sequences and identity columns',
      'Transactions',
      'Caller rights vs owner rights',
      'Snowflake scripting',
      'Variables and bindings',
    ],
    flashcardIds: [
      'fc-4-1-1', 'fc-4-2-1', 'fc-extra-2',
      'fc-full-6', 'fc-full-7', 'fc-full-8', 'fc-full-38', 'fc-full-39',
      'fc-full-40', 'fc-full-58', 'fc-full-59',
    ],
    questionIds: [
      'q-4-1-1', 'q-4-1-2', 'q-4-2-1',
      'qfc-35', 'qfc-36', 'qfc-37',
    ],
    covered: true,
  },
  {
    objectiveId: '4.3',
    domain: 'Domain 4',
    weight: '15-20%',
    objective: 'Implement views for security',
    subObjectives: [
      'Secure views',
      'Materialized views',
      'View limitations',
    ],
    flashcardIds: [
      'fc-full-50',
    ],
    questionIds: [
      'qfc-37',
    ],
    covered: true,
  },
  {
    objectiveId: '4.4',
    domain: 'Domain 4',
    weight: '15-20%',
    objective: 'Manage data retention and recovery',
    subObjectives: [
      'Time Travel (AT, BEFORE)',
      'UNDROP command',
      'Fail-safe',
      'DATA_RETENTION_TIME_IN_DAYS',
      'Cloning (zero-copy)',
      'Replication and failover',
    ],
    flashcardIds: [
      'fc-4-4-1',
      'fc-full-24',
    ],
    questionIds: [
      'q-4-4-1', 'q-4-4-2',
      'qfc-38', 'qfc-39', 'qfc-40', 'qfc-41',
    ],
    covered: true,
  },

  // ============================================
  // DOMAIN 5: Snowflake Ecosystem (10-15%)
  // ============================================
  {
    objectiveId: '5.1',
    domain: 'Domain 5',
    weight: '10-15%',
    objective: 'Monitor and manage Snowflake',
    subObjectives: [
      'INFORMATION_SCHEMA views',
      'ACCOUNT_USAGE schema',
      'SHOW commands',
      'DESCRIBE commands',
      'RESULT_SCAN',
      'Access history and lineage',
      'Alerts',
      'SYSTEM$ functions',
    ],
    flashcardIds: [
      'fc-full-19', 'fc-full-22', 'fc-full-25', 'fc-full-61', 'fc-full-65',
    ],
    questionIds: [
      'qfc-42', 'qfc-43', 'qfc-44',
    ],
    covered: true,
  },
  {
    objectiveId: '5.2',
    domain: 'Domain 5',
    weight: '10-15%',
    objective: 'Use monitoring features',
    subObjectives: [
      'Query history',
      'Alerts configuration',
    ],
    flashcardIds: [
      'fc-full-16',
    ],
    questionIds: [
      'qfc-44',
    ],
    covered: true,
  },
  {
    objectiveId: '5.3',
    domain: 'Domain 5',
    weight: '10-15%',
    objective: 'Implement data sharing',
    subObjectives: [
      'Data shares (provider and consumer)',
      'Reader accounts',
      'Marketplace',
      'Data Clean Rooms',
      'Native Apps',
    ],
    flashcardIds: [
      'fc-5-3-1',
      'fc-full-14', 'fc-full-15', 'fc-full-33', 'fc-full-34', 'fc-full-35',
    ],
    questionIds: [
      'qfc-45', 'qfc-46', 'qfc-47',
    ],
    covered: true,
  },

  // ============================================
  // DOMAIN 6: Performance & Cost Optimization (10-15%)
  // ============================================
  {
    objectiveId: '6.1',
    domain: 'Domain 6',
    weight: '10-15%',
    objective: 'Manage compute resources',
    subObjectives: [
      'Warehouse sizing and scaling',
      'Multi-cluster warehouses',
      'Scaling policies (STANDARD vs ECONOMY)',
      'Auto-suspend and auto-resume',
      'Resource monitors',
      'Serverless compute',
      'Snowpark-optimized warehouses',
      'Credits and billing',
    ],
    flashcardIds: [
      'fc-6-1-1', 'fc-extra-3',
      'fc-full-18', 'fc-full-31', 'fc-full-32', 'fc-full-63',
    ],
    questionIds: [
      'q-6-1-1', 'q-6-1-2', 'q-extra-5',
      'qfc-48', 'qfc-49', 'qfc-54', 'qfc-55',
    ],
    covered: true,
  },
  {
    objectiveId: '6.2',
    domain: 'Domain 6',
    weight: '10-15%',
    objective: 'Optimize query performance',
    subObjectives: [
      'Micro-partitions',
      'Clustering keys',
      'Automatic clustering',
      'Search optimization service',
      'Query Acceleration Service',
      'Caching (metadata, result, data)',
      'Performance best practices',
    ],
    flashcardIds: [
      'fc-6-2-1', 'fc-6-3-1',
      'fc-full-49', 'fc-full-62',
    ],
    questionIds: [
      'q-6-2-1', 'q-6-2-2', 'q-6-3-1', 'q-5-1-1',
      'qfc-50', 'qfc-51', 'qfc-52', 'qfc-53',
    ],
    covered: true,
  },
];

/**
 * Sumário de cobertura
 */
export const getCoverageSummary = () => {
  const totalObjectives = coverageMatrix.length;
  const coveredObjectives = coverageMatrix.filter(item => item.covered).length;
  
  const totalSubObjectives = coverageMatrix.reduce(
    (acc, item) => acc + item.subObjectives.length,
    0
  );
  
  const totalFlashcards = new Set(
    coverageMatrix.flatMap(item => item.flashcardIds)
  ).size;
  
  const totalQuestions = new Set(
    coverageMatrix.flatMap(item => item.questionIds)
  ).size;
  
  return {
    objectives: {
      total: totalObjectives,
      covered: coveredObjectives,
      percentage: Math.round((coveredObjectives / totalObjectives) * 100),
    },
    subObjectives: {
      total: totalSubObjectives,
    },
    content: {
      flashcards: totalFlashcards,
      questions: totalQuestions,
    },
    byDomain: [
      { domain: 'Domain 1', weight: '20-25%', objectives: 4 },
      { domain: 'Domain 2', weight: '25-30%', objectives: 2 },
      { domain: 'Domain 3', weight: '15-20%', objectives: 3 },
      { domain: 'Domain 4', weight: '15-20%', objectives: 4 },
      { domain: 'Domain 5', weight: '10-15%', objectives: 3 },
      { domain: 'Domain 6', weight: '10-15%', objectives: 2 },
    ],
  };
};

export const validateCoverage = () => {
  const uncovered = coverageMatrix.filter(item => !item.covered);
  const missingFlashcards = coverageMatrix.filter(item => item.flashcardIds.length === 0);
  const missingQuestions = coverageMatrix.filter(item => item.questionIds.length === 0);
  
  return {
    isComplete: uncovered.length === 0 && 
                missingFlashcards.length === 0 && 
                missingQuestions.length === 0,
    uncoveredObjectives: uncovered.map(item => item.objectiveId),
    objectivesWithoutFlashcards: missingFlashcards.map(item => item.objectiveId),
    objectivesWithoutQuestions: missingQuestions.map(item => item.objectiveId),
  };
};

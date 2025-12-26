// Objetivos Oficiais do Exame SnowPro Advanced: Data Analyst
// Baseado no Exam Study Guide oficial da Snowflake
// https://learn.snowflake.com/en/certifications/snowpro-advanced-data-analyst/

export interface ExamObjective {
  id: string;
  domain: string;
  domainWeight: string;
  topic: string;
  objective: string;
  subObjectives: string[];
  documentationLinks: string[];
}

export const examObjectives: ExamObjective[] = [
  // ============================================
  // DOMAIN 1: Snowflake SQL for Data Analysis (25-30%)
  // ============================================
  {
    id: 'obj-1-1',
    domain: 'Snowflake SQL for Data Analysis',
    domainWeight: '25-30%',
    topic: 'Advanced SQL Querying',
    objective: 'Write advanced SQL queries for complex data analysis',
    subObjectives: [
      'Use Common Table Expressions (CTEs) including recursive CTEs',
      'Apply window functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE, LAG, LEAD, FIRST_VALUE, LAST_VALUE)',
      'Implement QUALIFY clause for filtering window function results',
      'Use PIVOT and UNPIVOT for data transformation',
      'Apply GROUPING SETS, ROLLUP, and CUBE for multi-level aggregations',
      'Write correlated and non-correlated subqueries',
      'Use LATERAL joins for correlated subqueries in FROM clause',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/sql-reference/constructs/qualify',
      'https://docs.snowflake.com/en/sql-reference/functions-analytic',
      'https://docs.snowflake.com/en/sql-reference/constructs/pivot',
    ],
  },
  {
    id: 'obj-1-2',
    domain: 'Snowflake SQL for Data Analysis',
    domainWeight: '25-30%',
    topic: 'Data Type Functions',
    objective: 'Use built-in functions for data manipulation and analysis',
    subObjectives: [
      'String functions (CONCAT, SPLIT, REGEXP_REPLACE, REGEXP_SUBSTR, TRIM, UPPER, LOWER, SUBSTRING)',
      'Date and time functions (DATEADD, DATEDIFF, DATE_TRUNC, EXTRACT, TO_DATE, TO_TIMESTAMP)',
      'Numeric functions (ROUND, TRUNC, ABS, CEIL, FLOOR, MOD, POWER, SQRT)',
      'Conditional functions (CASE, IFF, NULLIF, COALESCE, NVL, NVL2, DECODE, ZEROIFNULL)',
      'Aggregate functions (SUM, AVG, COUNT, MIN, MAX, LISTAGG, ARRAY_AGG, OBJECT_AGG)',
      'Conversion functions (CAST, TRY_CAST, TO_VARCHAR, TO_NUMBER, TO_BOOLEAN)',
      'Hash functions (HASH, MD5, SHA1, SHA2)',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/sql-reference/functions-all',
    ],
  },
  {
    id: 'obj-1-3',
    domain: 'Snowflake SQL for Data Analysis',
    domainWeight: '25-30%',
    topic: 'Joins and Set Operations',
    objective: 'Combine data from multiple sources using joins and set operations',
    subObjectives: [
      'INNER, LEFT, RIGHT, FULL OUTER, and CROSS joins',
      'NATURAL joins and join conditions',
      'Self-joins for hierarchical data',
      'ASOF joins for time-series data',
      'UNION, UNION ALL, INTERSECT, EXCEPT/MINUS operations',
      'Understanding join cardinality and performance implications',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/sql-reference/constructs/join',
    ],
  },
  {
    id: 'obj-1-4',
    domain: 'Snowflake SQL for Data Analysis',
    domainWeight: '25-30%',
    topic: 'Query Optimization',
    objective: 'Optimize SQL queries for performance',
    subObjectives: [
      'Use EXPLAIN to understand query plans',
      'Analyze Query Profile in Snowsight',
      'Identify and resolve spilling (local and remote)',
      'Understand partition pruning and clustering',
      'Use result caching effectively',
      'Optimize JOIN operations',
      'Use LIMIT and TOP for result limiting',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/user-guide/ui-query-profile',
    ],
  },

  // ============================================
  // DOMAIN 2: Semi-Structured Data (15-20%)
  // ============================================
  {
    id: 'obj-2-1',
    domain: 'Semi-Structured Data',
    domainWeight: '15-20%',
    topic: 'VARIANT Data Type',
    objective: 'Work with VARIANT, OBJECT, and ARRAY data types',
    subObjectives: [
      'Understand VARIANT, OBJECT, and ARRAY data types',
      'Access nested data using dot notation and bracket notation',
      'Use PARSE_JSON and TRY_PARSE_JSON for JSON parsing',
      'Use TO_JSON and TO_VARIANT for data conversion',
      'Understand NULL handling in semi-structured data (IS_NULL_VALUE vs IS NULL)',
      'Use TYPEOF and IS_* functions for type checking',
      'Maximum size limits (16MB per VARIANT value)',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/sql-reference/data-types-semistructured',
    ],
  },
  {
    id: 'obj-2-2',
    domain: 'Semi-Structured Data',
    domainWeight: '15-20%',
    topic: 'FLATTEN Function',
    objective: 'Use FLATTEN to expand semi-structured data',
    subObjectives: [
      'FLATTEN syntax and parameters (INPUT, PATH, OUTER, RECURSIVE, MODE)',
      'Output columns: SEQ, KEY, PATH, INDEX, VALUE, THIS',
      'LATERAL FLATTEN for row expansion',
      'Nested FLATTEN for deeply nested structures',
      'OUTER parameter for preserving NULLs',
      'RECURSIVE parameter for hierarchical data',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/sql-reference/functions/flatten',
    ],
  },
  {
    id: 'obj-2-3',
    domain: 'Semi-Structured Data',
    domainWeight: '15-20%',
    topic: 'Semi-Structured Data Functions',
    objective: 'Manipulate semi-structured data with built-in functions',
    subObjectives: [
      'OBJECT_CONSTRUCT, OBJECT_INSERT, OBJECT_DELETE, OBJECT_KEYS',
      'ARRAY_CONSTRUCT, ARRAY_APPEND, ARRAY_INSERT, ARRAY_SIZE, ARRAY_SLICE',
      'ARRAY_CONTAINS, ARRAY_POSITION, ARRAY_COMPACT, ARRAY_DISTINCT',
      'GET, GET_PATH, GET_IGNORE_CASE for data access',
      'STRIP_NULL_VALUE for NULL handling',
      'XMLGET for XML data',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/sql-reference/functions/object_construct',
    ],
  },
  {
    id: 'obj-2-4',
    domain: 'Semi-Structured Data',
    domainWeight: '15-20%',
    topic: 'Loading Semi-Structured Data',
    objective: 'Load and query various semi-structured formats',
    subObjectives: [
      'Loading JSON, Avro, ORC, Parquet, and XML',
      'File format options for semi-structured data',
      'STRIP_OUTER_ARRAY for JSON arrays',
      'Schema detection and inference',
      'Automatic schema evolution',
      'Querying data in stages without loading',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/user-guide/semistructured-intro',
    ],
  },

  // ============================================
  // DOMAIN 3: Data Loading and Transformation (15-20%)
  // ============================================
  {
    id: 'obj-3-1',
    domain: 'Data Loading and Transformation',
    domainWeight: '15-20%',
    topic: 'Stages',
    objective: 'Configure and use stages for data loading',
    subObjectives: [
      'User stages (@~), table stages (@%tablename), named stages (@stagename)',
      'Internal vs external stages',
      'External stage configuration (S3, Azure Blob, GCS)',
      'Storage integrations for secure access',
      'PUT and GET commands',
      'LIST, REMOVE commands for stage management',
      'Directory tables on stages',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/user-guide/data-load-overview',
    ],
  },
  {
    id: 'obj-3-2',
    domain: 'Data Loading and Transformation',
    domainWeight: '15-20%',
    topic: 'COPY INTO',
    objective: 'Load and unload data using COPY INTO',
    subObjectives: [
      'COPY INTO <table> for loading data',
      'COPY INTO <location> for unloading data',
      'Transformation during COPY (column selection, expressions)',
      'File format options (CSV, JSON, Parquet, etc.)',
      'Error handling options (ON_ERROR, VALIDATION_MODE)',
      'COPY options (FORCE, RETURN_FAILED_ONLY, PURGE)',
      'Monitoring COPY operations (COPY_HISTORY)',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/sql-reference/sql/copy-into-table',
    ],
  },
  {
    id: 'obj-3-3',
    domain: 'Data Loading and Transformation',
    domainWeight: '15-20%',
    topic: 'Snowpipe',
    objective: 'Configure continuous data ingestion with Snowpipe',
    subObjectives: [
      'Creating and configuring pipes',
      'AUTO_INGEST for cloud event notifications',
      'SYSTEM$PIPE_STATUS for monitoring',
      'COPY_HISTORY and PIPE_USAGE_HISTORY',
      'Snowpipe REST API',
      'Snowpipe Streaming',
      'Error handling and retry logic',
      'Cost considerations vs batch loading',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro',
    ],
  },
  {
    id: 'obj-3-4',
    domain: 'Data Loading and Transformation',
    domainWeight: '15-20%',
    topic: 'Data Transformation',
    objective: 'Transform data during and after loading',
    subObjectives: [
      'ELT vs ETL patterns in Snowflake',
      'Using views for transformation layers',
      'MERGE for upsert operations',
      'INSERT/UPDATE/DELETE with complex logic',
      'Multi-table inserts',
      'CTAS (CREATE TABLE AS SELECT)',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/sql-reference/sql/merge',
    ],
  },

  // ============================================
  // DOMAIN 4: Snowflake Objects (15-20%)
  // ============================================
  {
    id: 'obj-4-1',
    domain: 'Snowflake Objects',
    domainWeight: '15-20%',
    topic: 'Views',
    objective: 'Create and manage different types of views',
    subObjectives: [
      'Standard views',
      'Secure views (definition hiding, optimization limitations)',
      'Materialized views (requirements, limitations, maintenance)',
      'Recursive views',
      'Views on semi-structured data',
      'View dependencies and impact analysis',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/user-guide/views-introduction',
    ],
  },
  {
    id: 'obj-4-2',
    domain: 'Snowflake Objects',
    domainWeight: '15-20%',
    topic: 'User-Defined Functions',
    objective: 'Create UDFs and UDTFs for custom logic',
    subObjectives: [
      'SQL UDFs (scalar)',
      'JavaScript UDFs',
      'Python UDFs (including packages)',
      'Java and Scala UDFs',
      'UDTFs (table functions)',
      'Secure UDFs',
      'UDF best practices and limitations',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/developer-guide/udf/udf-overview',
    ],
  },
  {
    id: 'obj-4-3',
    domain: 'Snowflake Objects',
    domainWeight: '15-20%',
    topic: 'Stored Procedures',
    objective: 'Create stored procedures for complex operations',
    subObjectives: [
      'SQL stored procedures',
      'JavaScript stored procedures',
      'Python stored procedures (Snowpark)',
      'Caller vs owner rights',
      'EXECUTE AS options',
      'Transaction control in procedures',
      'Error handling and debugging',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/developer-guide/stored-procedure/stored-procedures-overview',
    ],
  },
  {
    id: 'obj-4-4',
    domain: 'Snowflake Objects',
    domainWeight: '15-20%',
    topic: 'Streams and Tasks',
    objective: 'Implement CDC and automated data pipelines',
    subObjectives: [
      'Standard streams (INSERT, UPDATE, DELETE)',
      'Append-only streams',
      'Stream metadata columns (METADATA$ACTION, METADATA$ISUPDATE, METADATA$ROW_ID)',
      'SYSTEM$STREAM_HAS_DATA function',
      'Task creation and scheduling (CRON, interval)',
      'Task trees (DAGs) with AFTER clause',
      'Serverless tasks',
      'Task history and monitoring',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/user-guide/streams-intro',
      'https://docs.snowflake.com/en/user-guide/tasks-intro',
    ],
  },
  {
    id: 'obj-4-5',
    domain: 'Snowflake Objects',
    domainWeight: '15-20%',
    topic: 'Time Travel and Data Recovery',
    objective: 'Use Time Travel and Fail-safe for data protection',
    subObjectives: [
      'Time Travel concepts and retention periods (Standard: 0-1 day, Enterprise: 0-90 days)',
      'AT and BEFORE clauses for historical queries',
      'UNDROP for recovering dropped objects',
      'Cloning at a point in time',
      'Fail-safe (7 days, Snowflake-only recovery)',
      'DATA_RETENTION_TIME_IN_DAYS parameter',
      'Storage costs for Time Travel and Fail-safe',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/user-guide/data-time-travel',
    ],
  },
  {
    id: 'obj-4-6',
    domain: 'Snowflake Objects',
    domainWeight: '15-20%',
    topic: 'Cloning',
    objective: 'Use zero-copy cloning for development and testing',
    subObjectives: [
      'Zero-copy cloning concepts',
      'Cloning tables, schemas, and databases',
      'Cloning with Time Travel',
      'Clone independence from source',
      'Storage cost implications',
      'Cloning and child objects',
      'Metadata cloning vs data cloning',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/user-guide/tables-storage-considerations#label-cloning-tables',
    ],
  },

  // ============================================
  // DOMAIN 5: Performance Optimization (10-15%)
  // ============================================
  {
    id: 'obj-5-1',
    domain: 'Performance Optimization',
    domainWeight: '10-15%',
    topic: 'Virtual Warehouses',
    objective: 'Configure and optimize virtual warehouses',
    subObjectives: [
      'Warehouse sizes (XS to 6XL) and credit consumption',
      'Auto-suspend and auto-resume',
      'Multi-cluster warehouses (MIN/MAX clusters, scaling policies)',
      'Standard vs Economy scaling policy',
      'Query queuing and concurrency',
      'Warehouse monitoring and resource usage',
      'Query acceleration service',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/user-guide/warehouses-overview',
    ],
  },
  {
    id: 'obj-5-2',
    domain: 'Performance Optimization',
    domainWeight: '10-15%',
    topic: 'Micro-partitions and Clustering',
    objective: 'Understand and optimize data storage',
    subObjectives: [
      'Micro-partition concepts (50-500 MB compressed)',
      'Automatic micro-partition creation',
      'Clustering keys and when to use them',
      'SYSTEM$CLUSTERING_INFORMATION function',
      'SYSTEM$CLUSTERING_DEPTH function',
      'Automatic reclustering',
      'Clustering costs and maintenance',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions',
    ],
  },
  {
    id: 'obj-5-3',
    domain: 'Performance Optimization',
    domainWeight: '10-15%',
    topic: 'Search Optimization Service',
    objective: 'Use search optimization for point lookups',
    subObjectives: [
      'Search optimization concepts',
      'When to use search optimization vs clustering',
      'Enabling search optimization',
      'Search optimization on specific columns',
      'Cost and maintenance considerations',
      'SEARCH_OPTIMIZATION_HISTORY view',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/user-guide/search-optimization-service',
    ],
  },
  {
    id: 'obj-5-4',
    domain: 'Performance Optimization',
    domainWeight: '10-15%',
    topic: 'Query Profile Analysis',
    objective: 'Analyze and troubleshoot query performance',
    subObjectives: [
      'Reading Query Profile in Snowsight',
      'Understanding operator nodes',
      'Identifying bottlenecks (spilling, pruning, network)',
      'Partition statistics analysis',
      'Join explosion detection',
      'Query history and statistics',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/user-guide/ui-query-profile',
    ],
  },
  {
    id: 'obj-5-5',
    domain: 'Performance Optimization',
    domainWeight: '10-15%',
    topic: 'Caching',
    objective: 'Understand and leverage caching mechanisms',
    subObjectives: [
      'Result cache (24-hour validity, cross-user sharing)',
      'Metadata cache',
      'Warehouse local disk cache',
      'When caches are invalidated',
      'USE_CACHED_RESULT parameter',
      'Cache hit identification in Query Profile',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/user-guide/querying-persisted-results',
    ],
  },

  // ============================================
  // DOMAIN 6: Data Sharing and Collaboration (5-10%)
  // ============================================
  {
    id: 'obj-6-1',
    domain: 'Data Sharing and Collaboration',
    domainWeight: '5-10%',
    topic: 'Secure Data Sharing',
    objective: 'Share data securely with other accounts',
    subObjectives: [
      'Share objects (creating and managing shares)',
      'Reader accounts',
      'Shared databases and schemas',
      'Secure views for sharing',
      'Data sharing across regions and clouds',
      'Private data exchange',
      'Snowflake Marketplace',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/user-guide/data-sharing-intro',
    ],
  },
  {
    id: 'obj-6-2',
    domain: 'Data Sharing and Collaboration',
    domainWeight: '5-10%',
    topic: 'Collaboration Features',
    objective: 'Use Snowflake collaboration features',
    subObjectives: [
      'Snowflake Marketplace listings',
      'Private listings',
      'Data Clean Rooms',
      'Snowflake Native Apps',
      'Partner Connect',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/user-guide/data-marketplace',
    ],
  },

  // ============================================
  // DOMAIN 7: Security and Governance (5-10%)
  // ============================================
  {
    id: 'obj-7-1',
    domain: 'Security and Governance',
    domainWeight: '5-10%',
    topic: 'Access Control',
    objective: 'Implement role-based access control',
    subObjectives: [
      'System-defined roles (ACCOUNTADMIN, SYSADMIN, SECURITYADMIN, USERADMIN, PUBLIC)',
      'Custom roles and role hierarchies',
      'Privileges (USAGE, SELECT, INSERT, CREATE, etc.)',
      'GRANT and REVOKE statements',
      'Ownership and ownership transfer',
      'Future grants',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/user-guide/security-access-control-overview',
    ],
  },
  {
    id: 'obj-7-2',
    domain: 'Security and Governance',
    domainWeight: '5-10%',
    topic: 'Data Protection',
    objective: 'Protect sensitive data',
    subObjectives: [
      'Column-level security (masking policies)',
      'Row-level security (row access policies)',
      'Object tagging',
      'Data classification',
      'External tokenization',
      'Encryption (at rest and in transit)',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/user-guide/security-column-ddm-intro',
    ],
  },
  {
    id: 'obj-7-3',
    domain: 'Security and Governance',
    domainWeight: '5-10%',
    topic: 'Resource Monitoring',
    objective: 'Monitor and control resource usage',
    subObjectives: [
      'Resource monitors (creation and configuration)',
      'Credit quota and notification thresholds',
      'Actions (NOTIFY, SUSPEND, SUSPEND_IMMEDIATE)',
      'Account-level vs warehouse-level monitors',
      'Usage tracking views (ACCOUNT_USAGE, INFORMATION_SCHEMA)',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/user-guide/resource-monitors',
    ],
  },

  // ============================================
  // DOMAIN 8: Snowsight and Visualization (5-10%)
  // ============================================
  {
    id: 'obj-8-1',
    domain: 'Snowsight and Visualization',
    domainWeight: '5-10%',
    topic: 'Snowsight Features',
    objective: 'Use Snowsight for data analysis',
    subObjectives: [
      'Worksheets (creating, organizing, sharing)',
      'Query history and results',
      'Context functions (CURRENT_WAREHOUSE, CURRENT_DATABASE, etc.)',
      'Variables and parameters in queries',
      'Keyboard shortcuts and productivity features',
      'Worksheet folders and organization',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/user-guide/ui-snowsight',
    ],
  },
  {
    id: 'obj-8-2',
    domain: 'Snowsight and Visualization',
    domainWeight: '5-10%',
    topic: 'Dashboards',
    objective: 'Create dashboards for data visualization',
    subObjectives: [
      'Creating dashboards from worksheets',
      'Chart types (bar, line, scatter, area, heatmap, scorecard)',
      'Dashboard filters and parameters',
      'Auto-refresh settings',
      'Sharing dashboards',
      'Dashboard permissions',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/user-guide/ui-snowsight-dashboards',
    ],
  },
  {
    id: 'obj-8-3',
    domain: 'Snowsight and Visualization',
    domainWeight: '5-10%',
    topic: 'Alerts and Notifications',
    objective: 'Configure alerts for monitoring',
    subObjectives: [
      'Creating alerts on query results',
      'Alert schedules and conditions',
      'Alert actions and notifications',
      'Email notifications',
      'Alert history and monitoring',
    ],
    documentationLinks: [
      'https://docs.snowflake.com/en/user-guide/alerts',
    ],
  },
];

// Contagem de objetivos por domínio
export const domainCoverage = {
  'Snowflake SQL for Data Analysis': { objectives: 4, weight: '25-30%' },
  'Semi-Structured Data': { objectives: 4, weight: '15-20%' },
  'Data Loading and Transformation': { objectives: 4, weight: '15-20%' },
  'Snowflake Objects': { objectives: 6, weight: '15-20%' },
  'Performance Optimization': { objectives: 5, weight: '10-15%' },
  'Data Sharing and Collaboration': { objectives: 2, weight: '5-10%' },
  'Security and Governance': { objectives: 3, weight: '5-10%' },
  'Snowsight and Visualization': { objectives: 3, weight: '5-10%' },
};

// Total de sub-objetivos que precisamos cobrir
export const getTotalSubObjectives = (): number => {
  return examObjectives.reduce((sum, obj) => sum + obj.subObjectives.length, 0);
};

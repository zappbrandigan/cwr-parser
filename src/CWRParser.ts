// import { HDRRecord } from './records/HDRRecord.js';
// import { GRHRecord } from './records/GRHRecord.js';
// import { GRTRecord } from './records/GRTRecord.js';
// import { EWTRecord } from './records/EWTRecord.js';
// import { NWRRecord } from './records/NWRRecord.js';
// import { REVRecord } from './records/REVRecord.js';
// import { EXCRecord } from './records/EXCRecord.js';
// import { ISWRecord } from './records/ISWRecord.js';
// import { SPURecord } from './records/SPURecord.js';
// import { SPTRecord } from './records/SPTRecord.js';
// import { SWTRecord } from './records/SWTRecord.js';
// import { OPURecord } from './records/OPURecord.js';
// import { OPTRecord } from './records/OPTRecord.js';
// import { PWRRecord } from './records/PWRRecord.js';
// import { OWRRecord } from './records/OWRRecord.js';
// import { SWRRecord } from './records/SWRRecord.js';
// import { ALTRecord } from './records/ALTRecord.js';
// import { PERRecord } from './records/PERRecord.js';
// import { RECRecord } from './records/RECRecord.js';
// import { ORNRecord } from './records/ORNRecord.js';
// import { VERRecord } from './records/VERRecord.js';
// import { TRLRecord } from './records/TRLRecord.js';
// import { AGRRecord } from './records/AGRRecord.js';
import { CWRError } from './utils/CWRError.js';
import {
  CWRRecordOptions,
  ParsedCWRFile,
  ParseStatistics,
  RecordTypesMap,
  CWRTransaction,
  CWRGroup,
  RecordTypeKey,
  CWRParsedRecord,
  AllCWRData,
  ValidationResult,
  HDRData,
  GRHData,
  GRTData,
  SPUData,
  OPUData,
  SPTData,
  PWRData,
  SWTData,
  ORNData,
  SWRData,
  ALTData,
  TRLData,
  OWRData,
  PERData,
  RECData,
  NWRData,
  REVData,
  VERData,
  EWTData,
  OPTData,
  OWTData,
  NATData,
} from './types';
import { recordTypes } from './records/index.js';

/**
 * Main CWR Parser class for parsing CWR v21 and v22 files
 */
class CWRParser {
  options: CWRRecordOptions;
  recordTypes: RecordTypesMap;
  statistics: ParseStatistics;

  constructor(options: CWRRecordOptions = {}) {
    this.options = {
      strictMode: options.strictMode || false,
      validateFields: options.validateFields || false,
      includeRawData: options.includeRawData || false,
      convertCodes: options.convertCodes || false,
      ...options,
    };

    this.recordTypes = recordTypes;

    this.statistics = {
      totalRecords: 0,
      recordCounts: {},
      errors: [],
      warnings: [],
      hasErrors: false,
      hasWarnings: false,
    };
  }

  /**
   * Parse CWR data from string
   */
  parseString(data: string, fileName = 'unknown'): ParsedCWRFile {
    this.resetStatistics();

    const lines = data.split(/\r?\n/).filter((line) => line.trim().length > 0);
    const result: ParsedCWRFile = {
      fileName,
      version: null,
      header: null,
      groups: [],
      trailer: null,
      statistics: null,
      metadata: {
        parsedAt: new Date().toISOString(),
        parser: 'cwr-parser v1.0.2',
      },
    };

    let currentGroup: CWRGroup | null = null;
    let currentTransaction: CWRTransaction | null = null;

    try {
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lineNumber = i + 1;

        try {
          const record = this.parseLine(
            line,
            lineNumber
          ) as CWRParsedRecord<AllCWRData>;
          if (!record) continue;

          this.updateStatistics(record);

          // Process record based on type
          switch (record.recordType) {
            case 'HDR':
              result.header = record as CWRParsedRecord<HDRData>;
              break;

            case 'GRH':
              if ('versionNumber' in record.data) {
                result.version = (
                  record as CWRParsedRecord<GRHData>
                ).data.versionNumber;
              }
              currentGroup = {
                header: record as CWRParsedRecord<GRHData>,
                transactions: [],
                trailer: null,
              };
              result.groups.push(currentGroup);
              currentTransaction = null;
              break;

            case 'GRT':
              if (currentGroup) {
                currentGroup.trailer = record as CWRParsedRecord<GRTData>;
              }
              break;

            case 'NWR':
              // These are transaction records that start a new work
              if (currentGroup) {
                currentTransaction = {
                  header: record as CWRParsedRecord<NWRData>,
                  publishers: [],
                  otherPublishers: [],
                  writers: [],
                  otherWriters: [],
                  alternativeTitles: [],
                  performers: [],
                  recordings: [],
                  originators: [],
                  workTitles: [],
                  versions: [],
                };
                currentGroup.transactions.push(currentTransaction);
              }
            case 'REV':
              // These are transaction records that start a new work
              if (currentGroup) {
                currentTransaction = {
                  header: record as CWRParsedRecord<REVData>,
                  publishers: [],
                  otherPublishers: [],
                  writers: [],
                  otherWriters: [],
                  alternativeTitles: [],
                  performers: [],
                  recordings: [],
                  originators: [],
                  workTitles: [],
                  versions: [],
                };
                currentGroup.transactions.push(currentTransaction);
              }
              break;

            case 'TRL':
              result.trailer = record as CWRParsedRecord<TRLData>;
              break;

            default:
              // Add records to current transaction
              if (currentTransaction) {
                switch (record.recordType) {
                  case 'SPU':
                    currentTransaction.publishers.push(
                      record as CWRParsedRecord<SPUData>
                    );
                    break;
                  case 'OPU':
                    currentTransaction.otherPublishers.push(
                      record as CWRParsedRecord<OPUData>
                    );
                    break;
                  case 'SPT':
                    // SPT records are publisher (SPU) territory records, add to publishers
                    if (currentTransaction.publishers.length > 0) {
                      const lastPublisher =
                        currentTransaction.publishers[
                          currentTransaction.publishers.length - 1
                        ];
                      if (!lastPublisher.territories) {
                        lastPublisher.territories = [];
                      }
                      lastPublisher.territories.push(
                        record as CWRParsedRecord<SPTData>
                      );
                    }
                    break;
                  case 'OPT':
                    // OPT records are other publisher (OPU) territory records, add to otherPublishers
                    if (currentTransaction.otherPublishers.length > 0) {
                      const lastPublisher =
                        currentTransaction.otherPublishers[
                          currentTransaction.otherPublishers.length - 1
                        ];
                      if (!lastPublisher.territories) {
                        lastPublisher.territories = [];
                      }
                      lastPublisher.territories.push(
                        record as CWRParsedRecord<OPTData>
                      );
                    }
                    break;
                  case 'PWR':
                    // SPU reocrds indicate which writer the publisher belongs to
                    if (currentTransaction.writers.length > 0) {
                      const lastWriter =
                        currentTransaction.writers[
                          currentTransaction.writers.length - 1
                        ];
                      if (!lastWriter.publishers) {
                        lastWriter.publishers = [];
                      }
                      lastWriter.publishers.push(
                        record as CWRParsedRecord<PWRData>
                      );
                    }
                    break;
                  case 'SWT':
                    // SWT reocrds holds territory information for writers
                    if (currentTransaction.writers.length > 0) {
                      const lastWriter =
                        currentTransaction.writers[
                          currentTransaction.writers.length - 1
                        ];
                      if (!lastWriter.territories) {
                        lastWriter.territories = [];
                      }
                      lastWriter.territories.push(
                        record as CWRParsedRecord<SWTData>
                      );
                    }
                    break;
                  case 'OWT':
                    // OWT (optional) reocrds holds territory information for otherWriters
                    if (currentTransaction.otherWriters.length > 0) {
                      const lastWriter =
                        currentTransaction.otherWriters[
                          currentTransaction.otherWriters.length - 1
                        ];
                      if (!lastWriter.territories) {
                        lastWriter.territories = [];
                      }
                      lastWriter.territories.push(
                        record as CWRParsedRecord<OWTData>
                      );
                    }
                    break;
                  case 'SWR':
                    currentTransaction.writers.push(
                      record as CWRParsedRecord<SWRData>
                    );
                    break;
                  case 'OWR':
                    currentTransaction.otherWriters.push(
                      record as CWRParsedRecord<OWRData>
                    );
                    break;
                  case 'ALT':
                  case 'NAT': // considering adding a different category later on
                    currentTransaction.alternativeTitles.push(
                      record as CWRParsedRecord<ALTData | NATData>
                    );
                    break;
                  case 'PER':
                    currentTransaction.performers.push(
                      record as CWRParsedRecord<PERData>
                    );
                    break;
                  case 'REC':
                    currentTransaction.recordings.push(
                      record as CWRParsedRecord<RECData>
                    );
                    break;
                  case 'ORN':
                    currentTransaction.originators.push(
                      record as CWRParsedRecord<ORNData>
                    );
                    break;
                  case 'VER':
                    currentTransaction.versions.push(
                      record as CWRParsedRecord<VERData>
                    );
                    break;
                  case 'EWT':
                    currentTransaction.workTitles.push(
                      record as CWRParsedRecord<EWTData>
                    );
                    break;
                  case 'ACK':
                  case 'MSG':
                    // TODO
                    continue;
                  default:
                    const errorMsg = `Line ${lineNumber}: Invalid Transaction or Record Type ${record.recordType}`;
                    this.statistics.errors.push(errorMsg);
                    if (this.options.strictMode) {
                      throw new CWRError(errorMsg, 'ER', {
                        type: record.recordType,
                      });
                    }
                }
              }
              break;
          }
        } catch (error: any) {
          const errorMsg = `Line ${lineNumber}: ${error.message}`;
          this.statistics.errors.push(errorMsg);

          if (this.options.strictMode) {
            throw new CWRError(errorMsg, 'PARSE_ERROR');
          }
        }
      }

      result.statistics = this.getStatistics();
      return result;
    } catch (error: any) {
      throw new CWRError(`Parse failed: ${error.message}`, 'PARSE_FAILED');
    }
  }

  /**
   * Parse a single line of CWR data
   */
  parseLine(line: string, lineNumber: number): CWRParsedRecord | null {
    if (line.length < 3) {
      return null; // Skip empty or too short lines
    }

    const recordType = line.substring(0, 3) as RecordTypeKey;
    const RecordClass = this.recordTypes.get(recordType);

    if (!RecordClass) {
      const warning = `Unknown record type: ${recordType} at line ${lineNumber}`;
      this.statistics.warnings.push(warning);
      return null;
    }

    try {
      const record = new RecordClass(this.options);
      record.parse(line);
      return {
        recordType,
        lineNumber,
        data: record.toJSON(),
        ...(this.options.includeRawData && { rawData: line }),
      };
    } catch (error: any) {
      throw new CWRError(
        `Failed to parse ${recordType} record: ${error.message}`,
        'RECORD_PARSE_ERROR'
      );
    }
  }

  /**
   * Update parsing statistics
   */
  updateStatistics(record: CWRParsedRecord<AllCWRData>) {
    this.statistics.totalRecords++;
    const type = record.recordType;
    this.statistics.recordCounts[type] =
      (this.statistics.recordCounts[type] || 0) + 1;
  }

  /**
   * Reset statistics for new parsing session
   */
  resetStatistics() {
    this.statistics = {
      totalRecords: 0,
      recordCounts: {},
      errors: [],
      warnings: [],
      hasErrors: false,
      hasWarnings: false,
    };
  }

  /**
   * Get current parsing statistics
   */
  getStatistics(): ParseStatistics {
    return {
      ...this.statistics,
      hasErrors: this.statistics.errors.length > 0,
      hasWarnings: this.statistics.warnings.length > 0,
    };
  }

  /**
   * Validate parsed CWR data structure
   */
  validate(parsedData: ParsedCWRFile): ValidationResult {
    const validation: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
    };

    // Check required components
    if (!parsedData.header) {
      validation.errors.push('Missing header record (HDR)');
      validation.isValid = false;
    }

    if (!parsedData.trailer) {
      validation.errors.push('Missing trailer record (TRL)');
      validation.isValid = false;
    }

    if (parsedData.groups.length === 0) {
      validation.warnings.push('No groups found in file');
    }

    // Validate group structure
    parsedData.groups.forEach((group, index) => {
      if (!group.header) {
        validation.errors.push(`Group ${index + 1} missing header (GRH)`);
        validation.isValid = false;
      }

      if (!group.trailer) {
        validation.warnings.push(`Group ${index + 1} missing trailer (GRT)`);
      }
    });
    return validation;
  }
}

export { CWRParser };

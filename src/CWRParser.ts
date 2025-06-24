import { HDRRecord } from './records/HDRRecord';
import { GRHRecord } from './records/GRHRecord';
import { GRTRecord } from './records/GRTRecord';
import { EWTRecord } from './records/EWTRecord';
import { NWRRecord } from './records/NWRRecord';
import { REVRecord } from './records/REVRecord';
import { EXCRecord } from './records/EXCRecord';
import { ISWRecord } from './records/ISWRecord';
import { SPURecord } from './records/SPURecord';
import { SPTRecord } from './records/SPTRecord';
import { SWTRecord } from './records/SWTRecord';
import { OPURecord } from './records/OPURecord';
import { OPTRecord } from './records/OPTRecord';
import { PWRRecord } from './records/PWRRecord';
import { OWRRecord } from './records/OWRRecord';
import { SWRRecord } from './records/SWRRecord';
import { ALTRecord } from './records/ALTRecord';
import { PERRecord } from './records/PERRecord';
import { RECRecord } from './records/RECRecord';
import { ORNRecord } from './records/ORNRecord';
import { VERRecord } from './records/VERRecord';
import { TRLRecord } from './records/TRLRecord';
import { CWRError } from './utils/CWRError';
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
} from './types';

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
      includeFlatMap: options.includeFlatMap || false,
      ...options
    };
    
    this.recordTypes = new Map([
      ['HDR', HDRRecord],
      ['GRH', GRHRecord],
      ['GRT', GRTRecord],
      ['TRL', TRLRecord],
      ['NWR', NWRRecord],
      ['REV', REVRecord],
      ['EXC', EXCRecord],
      ['ISW', ISWRecord],
      ['EWT', EWTRecord],
      ['SPU', SPURecord],
      ['SPT', SPTRecord],
      ['OPU', OPURecord],
      ['OPT', OPTRecord],
      ['SWT', SWTRecord],
      ['PWR', PWRRecord],
      ['SWR', SWRRecord],
      ['OWR', OWRRecord],
      ['ALT', ALTRecord],
      ['PER', PERRecord],
      ['REC', RECRecord],
      ['ORN', ORNRecord],
      ['VER', VERRecord],
    ]);
    
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
    
    const lines = data.split(/\r?\n/).filter(line => line.trim().length > 0);
    const result: ParsedCWRFile = {
      fileName,
      version: null,
      header: null,
      groups: [],
      trailer: null,
      statistics: null,
      metadata: {
        parsedAt: new Date().toISOString(),
        parser: 'cwr-parser v1.0.2'
      }
    };

    let currentGroup: CWRGroup | null = null;
    let currentTransaction : CWRTransaction | null= null;

    try {
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lineNumber = i + 1;
        
        
        try {
          const record = this.parseLine(line, lineNumber) as CWRParsedRecord<AllCWRData>;
          if (!record) continue;

          this.updateStatistics(record);
          
          // Process record based on type
          switch (record.recordType) {
            case 'HDR':
              result.header = record as CWRParsedRecord<HDRData>;
              break;
              
            case 'GRH':
              if ('versionNumber' in record.data) {
                result.version = (record as CWRParsedRecord<GRHData>).data.versionNumber;
              }
              currentGroup = {
                header: record as CWRParsedRecord<GRHData>,
                transactions: [],
                trailer: null
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
            case 'REV':
              // These are transaction records that start a new work
              if (currentGroup) {
                currentTransaction = {
                  header: record.recordType === 'NWR'
                    ? (record as CWRParsedRecord<NWRData>)
                    : (record as CWRParsedRecord<REVData>),
                  publishers: [],
                  otherPublishers: [],
                  writers: [],
                  otherWriters: [],
                  alternativeTitles: [],
                  performers: [],
                  recordings: [],
                  originators: [],
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
                    currentTransaction.publishers.push(record as CWRParsedRecord<SPUData>);
                    break;
                  case 'OPU':
                    currentTransaction.otherPublishers.push(record as CWRParsedRecord<OPUData>);
                    break;
                  case 'SPT':
                    // SPT records are publisher territory records, add to publishers
                    if (currentTransaction.publishers.length > 0) {
                      const lastPublisher = currentTransaction.publishers[currentTransaction.publishers.length - 1];
                      if (!lastPublisher.territories) {
                        lastPublisher.territories  = [];
                      }
                      lastPublisher.territories.push(record as CWRParsedRecord<SPTData>);
                    }
                    break;
                  case 'PWR':
                    // SPU reocrds indicate which writer the publisher belongs to
                    if (currentTransaction.writers.length > 0) {
                      const lastWriter = currentTransaction.writers[currentTransaction.writers.length - 1];
                      if (!lastWriter.publishers) {
                        lastWriter.publishers = [];
                      }
                      lastWriter.publishers.push(record as CWRParsedRecord<PWRData>);
                    }
                    break;
                  case 'SWT':
                    // SWT reocrds holds territory information for writers
                    if (currentTransaction.writers.length > 0) {
                      const lastWriter = currentTransaction.writers[currentTransaction.writers.length - 1];
                      if (!lastWriter.territories) {
                        lastWriter.territories = [];
                      }
                      lastWriter.territories.push(record as CWRParsedRecord<SWTData>);
                    }
                    break;
                  case 'SWR':
                    currentTransaction.writers.push(record as CWRParsedRecord<SWRData>);
                    break;
                  case 'OWR':
                    currentTransaction.otherWriters.push(record as CWRParsedRecord<OWRData>);
                    break;
                  case 'ALT':
                    currentTransaction.alternativeTitles.push(record as CWRParsedRecord<ALTData>);
                    break;
                  case 'PER':
                    currentTransaction.performers.push(record as CWRParsedRecord<PERData>);
                    break;
                  case 'REC':
                    currentTransaction.recordings.push(record as CWRParsedRecord<RECData>);
                    break;
                  case 'ORN':
                    currentTransaction.originators.push(record as CWRParsedRecord<ORNData>);
                    break;
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
      throw new CWRError(`Failed to parse ${recordType} record: ${error.message}`, 'RECORD_PARSE_ERROR');
    }
  }

  /**
   * Update parsing statistics
   */
  updateStatistics(record: CWRParsedRecord<AllCWRData>) {
    this.statistics.totalRecords++;
    const type = record.recordType;
    this.statistics.recordCounts[type] = (this.statistics.recordCounts[type] || 0) + 1;
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
      hasWarnings: this.statistics.warnings.length > 0
    };
  }

  /**
   * Validate parsed CWR data structure
   */
  validate(parsedData: ParsedCWRFile): ValidationResult {
    const validation: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
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
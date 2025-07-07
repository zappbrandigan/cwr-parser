import { CWRError } from './utils/CWRError.js';
import {
  CWRRecordOptions,
  ParseStatistics,
  RecordTypesMap,
  RecordTypeKey,
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
  SWRData,
  TRLData,
  OWRData,
  RECData,
  NWRData,
  REVData,
  VERData,
  OPTData,
  OWTData,
  NPNData,
  ACKData,
  MSGData,
  EXCData,
  ISWData,
  ParsedCWRFile,
  NWNData,
  EWTData,
  NETData,
  NVTData,
  ParsedGroup,
  ParsedOWR,
  ParsedSPU,
  ParsedSWR,
  ParsedTransaction,
  ParsedTransmission,
  ParsedWork,
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
  parseString(data: string, fileName = 'unknown'): ParsedTransmission {
    this.resetStatistics();

    const lines = data.split(/\r?\n/).filter((line) => line.trim().length > 0);

    const result: ParsedTransmission = {
      fileName,
      version: null,
      hdr: { fields: null },
      groups: [],
      trl: { fields: null },
      statistics: null,
      metadata: {
        parsedAt: new Date().toISOString(),
        parser: 'cwr-parser',
      },
    };

    // let transactionType = '';
    let currentGroup: ParsedGroup | null = null;
    let currentTransaction: ParsedTransaction | null = null;
    let currentSequenceNumber: number | null = null;

    try {
      for (let i = 0; i < lines.length; ) {
        const line = lines[i];
        const lineNumber = i + 1;

        currentGroup = result.groups.at(-1) ?? null;

        try {
          const record = this.parseLine(line, lineNumber) as AllCWRData;
          if (!record) {
            i++;
            continue;
          }

          this.updateStatistics(record);

          if (
            'transactionSequenceNumber' in record &&
            typeof record.transactionSequenceNumber === 'number'
          ) {
            const sequence = record.transactionSequenceNumber;

            if (
              currentTransaction &&
              currentSequenceNumber !== null &&
              currentSequenceNumber !== sequence
            ) {
              // Push previous transaction
              currentGroup?.transactions?.push(currentTransaction);
              currentTransaction = null;
            }

            currentSequenceNumber = sequence;
          }

          switch (record.recordType) {
            case 'HDR':
              result.hdr.fields = record as HDRData;
              break;

            case 'GRH':
              if ('versionNumber' in record) {
                result.version = (record as GRHData).versionNumber;
              }
              result.groups.push({
                grh: { fields: record as GRHData },
                grt: { fields: null },
                transactions: [],
              });
              break;

            case 'GRT':
              // Push final transaction
              if (currentTransaction && currentGroup) {
                currentGroup.transactions?.push(currentTransaction);
                currentTransaction = null;
                currentSequenceNumber = null;
              }
              if (currentGroup) {
                currentGroup.grt = { fields: record as GRTData };
              }
              break;

            case 'TRL':
              result.trl.fields = record as TRLData;
              break;

            case 'ACK':
              if (!currentTransaction) currentTransaction = {};
              currentTransaction.ack = { fields: record as ACKData };
              break;

            case 'MSG':
              if (currentTransaction) {
                (currentTransaction.msgs ??= []).push({
                  fields: record as MSGData,
                });
              }
              break;

            case 'NWR':
            case 'REV':
            case 'EXC':
            case 'ISW': {
              const typedRecord = record as
                | NWRData
                | REVData
                | EXCData
                | ISWData;
              const workHeader = { header: { fields: typedRecord } };
              if (!currentTransaction) currentTransaction = {};
              currentTransaction.work = workHeader;
              break;
            }

            default:
              if (currentTransaction?.work) {
                this.handleTransactionRecord(
                  record,
                  currentTransaction.work,
                  lineNumber
                );
              }
              break;
          }

          i++;
        } catch (error: any) {
          const errorMsg = `Line ${lineNumber}: ${error.message}`;
          this.statistics.errors.push(errorMsg);
          if (this.options.strictMode) {
            throw new CWRError(errorMsg, 'PARSE_ERROR');
          }
          i++;
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
  parseLine(line: string, lineNumber: number): AllCWRData | null {
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
      return record.toJSON() as AllCWRData;
    } catch (error: any) {
      throw new CWRError(
        `Failed to parse ${recordType} record: ${error.message}`,
        'RECORD_PARSE_ERROR'
      );
    }
  }

  handleTransactionRecord(
    record: AllCWRData,
    currentWork: ParsedWork | undefined,
    lineNumber: number
  ) {
    if (currentWork) {
      switch (record.recordType) {
        case 'SPU':
          (currentWork.spus ??= []).push({ fields: record as SPUData });
          break;
        case 'OPU':
          (currentWork.opus ??= []).push({ fields: record as OPUData });
          break;
        case 'NPN':
          if (currentWork.spus) {
            const currentSpu = currentWork.spus.at(-1);
            if (currentSpu) {
              currentSpu.npn = { fields: record as NPNData };
            }
          }
          break;
        case 'SPT':
          if (currentWork.spus) {
            const currentSpu = currentWork.spus.at(-1);
            if (currentSpu) {
              (currentSpu.spts ??= []).push({ fields: record as SPTData });
            }
          }
          break;
        case 'OPT':
          // OPTs for SPUs come first, opus will not exist yet
          if (currentWork.opus) {
            const currentOpu = currentWork.opus.at(-1);
            if (currentOpu) {
              (currentOpu.opts ??= []).push({ fields: record as OPTData });
            }
          } else if (currentWork.spus) {
            const currentSpu = currentWork.spus.at(-1);
            if (currentSpu) {
              (currentSpu.opts ??= []).push({ fields: record as OPTData });
            }
          }
          break;
        case 'SWR':
          (currentWork.swrs ??= []).push({ fields: record as SWRData });
          break;
        case 'OWR':
          (currentWork.owrs ??= []).push({ fields: record as OWRData });
          break;
        case 'NWN':
          this.attachToMatchingWriter(
            [currentWork.swrs, currentWork.owrs],
            record.interestedPartyNumber,
            (writer) => {
              writer.nwn = { fields: record as NWNData };
            }
          );
          break;
        case 'SWT':
          this.attachToMatchingWriter(
            // SWT only belong with SWR not OWR
            [currentWork.swrs, undefined],
            record.interestedPartyNumber,
            (writer) => {
              //@ts-ignore
              (writer.swts ??= []).push({ fields: record as SWTData });
            }
          );
          break;
        case 'OWT':
          this.attachToMatchingWriter(
            // OWT only belong with OWR not SWR
            [undefined, currentWork.owrs],
            record.interestedPartyNumber,
            (writer) => {
              //@ts-ignore
              (writer.owts ??= []).push({ fields: record as OWTData });
            }
          );
          break;
        case 'PWR':
          this.attachToMatchingWriter(
            [currentWork.swrs, currentWork.owrs],
            record.writerInterestedPartyNumber,
            (writer) => {
              (writer.pwrs ??= []).push({ fields: record as PWRData });
            }
          );
          break;
        case 'VER':
          currentWork.ver = { fields: record as VERData };
          break;
        case 'REC':
          currentWork.rec = { fields: record as RECData };
          break;
        case 'EWT':
          currentWork.ewt = { fields: record as EWTData };
          break;
        case 'NET':
          currentWork.net = { fields: record as NETData };
          break;
        case 'NVT':
          currentWork.nvt = { fields: record as NVTData };
          break;
        case 'ALT':
        case 'NAT':
        case 'PER':
        case 'NPR':
        case 'ORN':
        case 'INS':
        case 'IND':
        case 'COM':
        case 'NCT':
        case 'NOW':
        case 'ARI':
        case 'XRF':
          const workArrayFields = {
            ALT: 'alts',
            NAT: 'nats',
            PER: 'pers',
            NPR: 'nprs',
            REC: 'recs',
            ORN: 'orns',
            INS: 'inss',
            IND: 'inds',
            COM: 'coms',
            NCT: 'ncts',
            NOW: 'nows',
            ARI: 'aris',
            XRF: 'xrfs',
          } as const;
          if (record.recordType in workArrayFields) {
            const key = workArrayFields[record.recordType];
            ((currentWork as any)[key] ??= []).push({ fields: record });
            break;
          }
          break;

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
  }

  attachToMatchingWriter(
    writerLists: [ParsedSWR[] | undefined, ParsedOWR[] | undefined],
    ipNumber: string,
    attach: (writer: ParsedSWR | ParsedOWR) => void
  ) {
    for (const list of writerLists) {
      if (!list) continue;
      const match = list.find(
        (w) => w.fields.interestedPartyNumber === ipNumber
      );
      if (match) {
        attach(match);
        break;
      }
    }
  }

  groupSplits(transmission: ParsedTransmission) {
    // const splits = [];

    for (const group of transmission.groups) {
      if (!group.transactions) continue;
      for (const tx of group.transactions) {
        if (tx.work?.spus) {
          // const grouped = this.groupByField(
          //   tx.work?.spus,
          //   (spu) => spu.fields.publisherSequenceNumber
          // );

          const grouped = this.collapseSPUs(tx.work?.spus);
          console.log(JSON.stringify(grouped, null, 2));
          // const grouped2 = this.groupByField(grouped, spu => spu.fields.publisherSequenceNumber)
          // splits.push(tx.work?.spus?.reduce(() => {}));
        }
      }
    }
  }

  collapseSPUs(spus: ParsedSPU[]) {
    const collapsed: Record<string, ParsedSPU> = {};
    const result: ParsedSPU[] = [];

    for (const item of spus) {
      const { publisherType, interestedPartyNumber } = item.fields;

      if (publisherType === 'E' && interestedPartyNumber) {
        const key = interestedPartyNumber;

        if (!collapsed[key]) {
          // First time seeing this "E" type + IPN combo — clone it
          collapsed[key] = { ...item, fields: { ...item.fields } };
          result.push(collapsed[key]);
        } else {
          // Merge shares
          const existing = collapsed[key].fields;
          const incoming = item.fields;

          existing.prOwnershipShare =
            (existing.prOwnershipShare ?? 0) + (incoming.prOwnershipShare ?? 0);
          existing.mrOwnershipShare =
            (existing.mrOwnershipShare ?? 0) + (incoming.mrOwnershipShare ?? 0);
          existing.srOwnershipShare =
            (existing.srOwnershipShare ?? 0) + (incoming.srOwnershipShare ?? 0);
        }
      } else {
        // Not type "E" — keep as-is
        result.push(item);
      }
    }

    return result;
  }

  groupByField<T>(
    arr: T[],
    fieldAccessor: (item: T) => string | number
  ): Record<string, T[]> {
    return arr.reduce(
      (acc, item) => {
        const key = String(fieldAccessor(item));
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      },
      {} as Record<string, T[]>
    );
  }

  /**
   * Update parsing statistics
   */
  updateStatistics(record: AllCWRData) {
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

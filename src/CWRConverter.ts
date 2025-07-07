import { CWRError } from './utils/CWRError.js';
import {
  ParseStatistics,
  RecordTypesMap,
  RecordTypeKey,
  CWRConverterRecord,
  CWRParsedRecord,
} from './types';
import { recordTypes } from './records/index.js';

/**
 * A CWR converter class for parsing CWR v21 and v22 files for enhanced raw viewing
 */
class CWRConverter {
  recordTypes: RecordTypesMap;
  statistics: ParseStatistics;

  constructor() {
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
   * Map CWR data from string
   */
  mapString(data: string, fileName = 'unknown') {
    this.resetStatistics();

    const lines = data.split(/\r?\n/).filter((line) => line.trim());
    const result: CWRConverterRecord = {
      fileName,
      version: null,
      lines: [],
      statistics: null,
      meatadata: {
        parsedAt: new Date().toISOString(),
      },
    };

    try {
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lineNumber = i + 1;

        try {
          const record = this.parseLine(line, lineNumber);
          if (!record) continue;

          this.updateStatistics(record);
          result.lines.push(record);
          if (record.recordType === 'GRH' && record.data instanceof Map) {
            result.version = record.data.get('versionNumber') ?? '';
          }
        } catch (error: any) {
          const errorMsg = `Line ${lineNumber}: ${error.message}`;
          this.statistics.errors.push(errorMsg);
        }
      }
      //@ts-ignore
      result.statistics = this.getStatistics();
      return result;
    } catch (error: any) {
      throw new CWRError(`Parse failed: ${error.message}`, 'PARSE_FAILED');
    }
  }

  /**
   * Parse a single line of CWR data
   */
  parseLine(
    line: string,
    lineNumber: number
  ): CWRParsedRecord<Map<string, string>> | null {
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
      const record = new RecordClass({});
      const mappedRecord = record.mapped(line);
      return {
        recordType: recordType as RecordTypeKey,
        lineNumber,
        data: mappedRecord,
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
  updateStatistics(record: CWRParsedRecord<Map<string, string>>) {
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
}

export { CWRConverter };

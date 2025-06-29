import { FieldDefinition } from '../types';

/**
 * Utility class for parsing CWR field values
 */
class FieldParser {
  // private options: CWRRecordOptions;

  // constructor(options: CWRRecordOptions = {}) {
  //   this.options = options;
  // }

  /**
   * Parse field value based on type
   */
  parseField(
    value: string,
    type: FieldDefinition['type'],
    fieldDef: FieldDefinition = {
      name: '',
      type: type,
      length: 0,
      required: false,
      title: '',
      description: '',
    }
  ): string | number | boolean | null {
    const trimmed = value.trim();

    if (trimmed === '' && !fieldDef.required) {
      return null;
    }

    switch (type) {
      case 'string':
        return this.parseString(trimmed);
      case 'numeric':
        return this.parseNumeric(trimmed);
      case 'date':
        return this.parseDate(trimmed);
      case 'time':
        return this.parseTime(trimmed);
      case 'flag':
        return this.parseFlag(trimmed);
      case 'percentage':
        return this.parsePercentage(trimmed);
      default:
        return trimmed;
    }
  }

  /**
   * Parse string field
   */
  parseString(value: string): string {
    return value;
  }

  /**
   * Parse numeric field
   */
  parseNumeric(value: string): number | null {
    if (value === '') return null;

    // Handle zero-padded numbers
    const num = parseInt(value, 10);

    if (isNaN(num)) {
      throw new Error(`Invalid numeric value: ${value}`);
    }

    return num;
  }

  /**
   * Parse date field (YYYYMMDD format)
   */
  parseDate(value: string): string | null {
    if (value === '' || value === '00000000') return null;

    if (!/^\d{8}$/.test(value)) {
      throw new Error(`Invalid date format: ${value}`);
    }

    const year = value.substring(0, 4);
    const month = value.substring(4, 6);
    const day = value.substring(6, 8);

    // Basic validation
    if (month < '01' || month > '12') {
      throw new Error(`Invalid month: ${month}`);
    }

    if (day < '01' || day > '31') {
      throw new Error(`Invalid day: ${day}`);
    }

    return `${year}-${month}-${day}`;
  }

  /**
   * Parse time field (HHMMSS format)
   */
  parseTime(value: string): string | null {
    if (value === '' || value === '000000') return null;

    if (!/^\d{6}$/.test(value)) {
      throw new Error(`Invalid time format: ${value}`);
    }

    const hours = value.substring(0, 2);
    const minutes = value.substring(2, 4);
    const seconds = value.substring(4, 6);

    // Basic validation
    if (hours < '00' || hours > '23') {
      throw new Error(`Invalid hours: ${hours}`);
    }

    if (minutes < '00' || minutes > '59') {
      throw new Error(`Invalid minutes: ${minutes}`);
    }

    if (seconds < '00' || seconds > '59') {
      throw new Error(`Invalid seconds: ${seconds}`);
    }

    return `${hours}:${minutes}:${seconds}`;
  }

  /**
   * Parse flag field (Y/N)
   */
  parseFlag(value: string): 'Y' | 'N' | 'U' | null {
    if (value === '' || value === ' ') return null;
    switch (value.toLowerCase()) {
      case 'y':
      case 'yes':
      case '1':
        return 'Y';
      case 'n':
      case 'no':
      case '0':
        return 'N';
      case 'u':
      case 'unknown':
        return 'U';
      default:
        throw new Error(`Invalid flag value: ${value}`);
    }
  }

  /**
   * Parse percentage field
   */
  parsePercentage(value: string): number | null {
    if (value === '' || value === '00000') return null;

    const num = parseFloat(value);

    if (isNaN(num)) {
      throw new Error(`Invalid percentage value: ${value}`);
    }

    // Convert to decimal (e.g., 10000 = 100.00%)
    return num / 100;
  }

  parseFieldRaw(value: string): string {
    return value.trim();
  }
}

export { FieldParser };

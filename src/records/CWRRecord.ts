import { CWRRecordOptions, FieldDefinition } from '../types';
import { CWRError } from '../utils/CWRError.js';
import { FieldParser } from '../utils/FieldParser.js';

/**
 * Base class for all CWR record types
 */
class CWRRecord {
  protected options: CWRRecordOptions;
  protected fieldParser: FieldParser;
  public recordType: string;
  protected fields: Record<string, any>;
  protected rawData: string;

  constructor(options: CWRRecordOptions = {}) {
    this.options = options;
    this.fieldParser = new FieldParser();
    this.recordType = '';
    this.fields = {};
    this.rawData = '';
  }

  /**
   * Define field structure for the record type.
   * Override in subclasses
   */
  getFieldDefinitions(): FieldDefinition[] {
    return [];
  }

  mapped(line: string): Map<string, string> {
    this.rawData = line;
    const definitions = this.getFieldDefinitions();
    let position = 0;
    const mappedRecord = new Map();

    for (const fieldDef of definitions) {
      const value = line.substring(position, position + fieldDef.length).trim();

      try {
        mappedRecord.set(fieldDef.name, value);
      } catch (error: any) {
        console.warn(error);
      }
      position += fieldDef.length;
    }
    return mappedRecord;
  }

  /**
   * Parse raw CWR line data
   */
  parse(line: string): void {
    this.rawData = line;
    const definitions = this.getFieldDefinitions();
    let position = 0;

    for (const fieldDef of definitions) {
      const value = line.substring(position, position + fieldDef.length);

      try {
        this.fields[fieldDef.name] = this.fieldParser.parseField(
          value,
          fieldDef.type,
          fieldDef
        );
      } catch (error: any) {
        if (this.options.strictMode) {
          throw new CWRError(
            `Field '${fieldDef.name}' parse error: ${error.message}`,
            'FIELD_PARSE_ERROR'
          );
        }
        this.fields[fieldDef.name] = fieldDef.required ? null : value.trim();
      }

      position += fieldDef.length;
    }

    if (this.options.validateFields) {
      this.validate();
    }
  }

  /**
   * Validate parsed record data
   * Override in subclasses for specific validation
   */
  validate() {
    if (!this.options.validateFields) return;

    const definitions = this.getFieldDefinitions();

    for (const fieldDef of definitions) {
      const value = this.fields[fieldDef.name];

      if (
        fieldDef.required &&
        (value === null || value === undefined || value === '')
      ) {
        throw new CWRError(
          `Required field '${fieldDef.name}' is missing or empty`,
          'VALIDATION_ERROR'
        );
      }
    }
  }

  /**
   * Convert record to JSON format
   */
  toJSON() {
    return {
      recordType: this.recordType,
      ...this.fields,
    };
  }

  /**
   * Get field value by name
   */
  getField(fieldName: string) {
    return this.fields[fieldName];
  }

  /**
   * Set field value by name
   */
  setField(fieldName: string, value: any) {
    this.fields[fieldName] = value;
  }
}

export { CWRRecord };

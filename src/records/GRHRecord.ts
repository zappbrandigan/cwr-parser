import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import { recordFields } from '../fields/recordFields.js';

/**
 * Group Header Record (GRH) - Begins a group of related records
 */
class GRHRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'GRH';
  }

  getFieldDefinitions() {
    return recordFields['GRH'];
  }
}

export { GRHRecord };
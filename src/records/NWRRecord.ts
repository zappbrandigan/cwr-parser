import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import { recordFields } from '../fields/recordFields.js';

/**
 * New Work Registration Record (NWR) - Indicates a new work registration 
 */
class NWRRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'NWR';
  }

  getFieldDefinitions() {
    return recordFields['NWR'];
  }
}

export { NWRRecord };
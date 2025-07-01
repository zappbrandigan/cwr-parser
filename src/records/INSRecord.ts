import { recordFields } from '../fields/recordFields.js';
import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';

/**
 * Instrumentation Summary (INS) - information on standard and non-standard instrumentation
 */
class INSRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'INS';
  }

  getFieldDefinitions() {
    return recordFields['INS'];
  }
}

export { INSRecord };

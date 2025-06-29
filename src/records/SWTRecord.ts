import { recordFields } from '../fields/recordFields.js';
import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';

/**
 * Writter Territory Record (SWT) - Contains writer territory information
 */
class SWTRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'SWT';
  }

  getFieldDefinitions() {
    return recordFields['SWT'];
  }
}

export { SWTRecord };

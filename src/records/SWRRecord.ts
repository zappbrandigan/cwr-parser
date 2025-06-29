import { recordFields } from '../fields/recordFields.js';
import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';

/**
 * Writer Controlled by Submitter (SWR) - Contains controlled writer information
 */
class SWRRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'SWR';
  }

  getFieldDefinitions() {
    return recordFields['SWR'];
  }
}

export { SWRRecord };

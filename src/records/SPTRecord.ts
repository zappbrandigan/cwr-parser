import { recordFields } from '../fields/recordFields.js';
import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';

/**
 * Publisher Territory Record (SPT) - Contains publisher territory information
 */
class SPTRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'SPT';
  }

  getFieldDefinitions() {
    return recordFields['SPT'];
  }
}

export { SPTRecord };

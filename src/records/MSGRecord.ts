import { recordFields } from '../fields/recordFields.js';
import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';

/**
 * Message Record (MSG) -  used to communicate the results of validation on individual transactions
 */
class MSGRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'MSG';
  }

  getFieldDefinitions() {
    return recordFields['MSG'];
  }
}

export { MSGRecord };

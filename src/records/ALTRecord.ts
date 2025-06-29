import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import { recordFields } from '../fields/index.js';

/**
 * Alternative Title Record (ALT) - Contains alternative work titles
 */
class ALTRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'ALT';
  }

  getFieldDefinitions() {
    return recordFields['ALT'];
  }
}

export { ALTRecord };
import { recordFields } from '../fields/recordFields.js';
import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';

/**
 * Non-Roman Alphabet Title (NAT) - identifies titles in other alphabets for this work
 */
class NATRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'NAT';
  }

  getFieldDefinitions() {
    return recordFields['NAT'];
  }
}

export { NATRecord };

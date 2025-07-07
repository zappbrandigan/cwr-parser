import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import { recordFields } from '../fields/index.js';

/**
 * Non-Roman Alphabet Title for Components (NCT) - record identifies titles in other alphabets for this work
 */
class NCTRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'NCT';
  }

  getFieldDefinitions() {
    return recordFields['NCT'];
  }
}

export { NCTRecord };

import { recordFields } from '../fields/recordFields.js';
import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';

/**
 * Non-Roman Alphabet Writer Name (NWN) - identifies writer names in non-roman alphabets
 */
class NWNRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'NWN';
  }

  getFieldDefinitions() {
    return recordFields['NWN'];
  }
}

export { NWNRecord };

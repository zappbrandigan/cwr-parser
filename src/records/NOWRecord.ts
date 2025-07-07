import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import { recordFields } from '../fields/index.js';

/**
 * Non-Roman Alphabet Other Writer Name (NOW) - record identifies writer names in non-roman alphabets for the work named in an EWT
 */
class NOWRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'NOW';
  }

  getFieldDefinitions() {
    return recordFields['NOW'];
  }
}

export { NOWRecord };

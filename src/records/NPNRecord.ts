import { recordFields } from '../fields/recordFields.js';
import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';

/**
 * Non-Roman Alphabet Publisher Name (NPN) - identifies publisher names in non-roman alphabets
 */
class NPNRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'NPN';
  }

  getFieldDefinitions() {
    return recordFields['NPN'];
  }
}

export { NPNRecord };

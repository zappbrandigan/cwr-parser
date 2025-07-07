import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import { recordFields } from '../fields/index.js';

/**
 * Non-Roman Alphabet Entire Work Title for Excerpts (NET) - record identifies titles in other alphabets for this work
 */
class NETRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'NET';
  }

  getFieldDefinitions() {
    return recordFields['NET'];
  }
}

export { NETRecord };

import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import { recordFields } from '../fields/index.js';

/**
 * Non-Roman Alphabet Original Title for Version (NVT) - record identifies titles in other alphabets for this work
 */
class NVTRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'NVT';
  }

  getFieldDefinitions() {
    return recordFields['NVT'];
  }
}

export { NVTRecord };

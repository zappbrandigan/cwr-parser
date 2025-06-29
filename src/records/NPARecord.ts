import { recordFields } from '../fields/recordFields.js';
import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';

/**
 * Non-Roman Alphabet Agreement Party Name (NPA) -  identifies names in a non-roman
 * alphabet for the acquiring parties
 */
class NPARecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'NPA';
  }

  getFieldDefinitions() {
    return recordFields['NPA'];
  }
}

export { NPARecord };

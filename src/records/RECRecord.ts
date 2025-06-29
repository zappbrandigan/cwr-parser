import { recordFields } from '../fields/recordFields.js';
import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';

/**
 * Recording Detail Record (REC) - Contains recording information
 */
class RECRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'REC';
  }

  getFieldDefinitions() {
    return recordFields['REC'];
  }
}

export { RECRecord };

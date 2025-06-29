import { recordFields } from '../fields/recordFields.js';
import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';

/**
 * Work Originator Record (ORN) - Contains work originator information
 */
class ORNRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'ORN';
  }

  getFieldDefinitions() {
    return recordFields['ORN'];
  }
}

export { ORNRecord };

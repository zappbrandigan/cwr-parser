import { recordFields } from '../fields/recordFields.js';
import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';

/**
 * Writer Record (PWR) - Indicate a publisher relation to a controlled writer
 */
class PWRRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'PWR';
  }

  getFieldDefinitions() {
    return recordFields['PWR'];
  }
}

export { PWRRecord };

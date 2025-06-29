import { recordFields } from '../fields/recordFields.js';
import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';

/**
 * Publisher Record (SPU) - Contains publisher information
 */
class SPURecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'SPU';
  }

  getFieldDefinitions() {
    return recordFields['SPU'];
  }
}

export { SPURecord };

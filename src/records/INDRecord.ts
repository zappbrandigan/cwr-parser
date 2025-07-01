import { recordFields } from '../fields/recordFields.js';
import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';

/**
 * Instrumentation Detail (IND) - information on standard instruments or voices
 */
class INDRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'IND';
  }

  getFieldDefinitions() {
    return recordFields['IND'];
  }
}

export { INDRecord };

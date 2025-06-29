import { recordFields } from '../fields/recordFields.js';
import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';

/**
 * Performing Artist Record (PER) - Contains performer information
 */
class PERRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'PER';
  }

  getFieldDefinitions() {
    return recordFields['PER'];
  }
}

export { PERRecord };

import { recordFields } from '../fields/recordFields.js';
import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';

/**
 * Component (COM) - identify an individual component of the composite
 */
class COMRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'COM';
  }

  getFieldDefinitions() {
    return recordFields['COM'];
  }
}

export { COMRecord };

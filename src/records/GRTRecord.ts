import { recordFields } from '../fields/recordFields.js';
import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';

/**
 * Group Trailer Record (GRT) - Ends a group of related records
 */
class GRTRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'GRT';
  }

  getFieldDefinitions() {
    return recordFields['GRT'];
  }
}

export { GRTRecord };

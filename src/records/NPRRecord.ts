import { recordFields } from '../fields/recordFields.js';
import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';

/**
 * Performance Data in non-roman alphabet (NPR) - contains either the non-roman alphabet name of a person or group performing this work
 */
class NPRRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'NPR';
  }

  getFieldDefinitions() {
    return recordFields['NPR'];
  }
}

export { NPRRecord };

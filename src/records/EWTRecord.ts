import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import { recordFields } from '../fields/recordFields.js';

/**
 * Entire Work Title for Excerpts - Indicates the work title for the work from which the excpert was derived 
 */
class EWTRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'EWT';
  }

  getFieldDefinitions() {
    return recordFields['EWT'];
  }
}

export { EWTRecord };
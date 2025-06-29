import { recordFields } from '../fields/recordFields.js';
import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';

/**
 * Interested Party of Agreement Record (IPA) -  contains information on the interested parties that concluded the agreement
 */
class IPARecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'IPA';
  }

  getFieldDefinitions() {
    return recordFields['IPA'];
  }
}

export { IPARecord };

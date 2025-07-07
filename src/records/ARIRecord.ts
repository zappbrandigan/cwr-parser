import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import { recordFields } from '../fields/index.js';

/**
 * Additional Related Information (ARI) - record may contain specific information or general information
 */
class ARIRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'ARI';
  }

  getFieldDefinitions() {
    return recordFields['ARI'];
  }
}

export { ARIRecord };

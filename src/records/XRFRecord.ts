import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import { recordFields } from '../fields/index.js';

/**
 * Work ID Cross Reference (XRF) - Record contains identifiers issued by any organisation including but not limited to the intended recipient
of the file
 */
class XRFRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'XRF';
  }

  getFieldDefinitions() {
    return recordFields['XRF'];
  }
}

export { XRFRecord };

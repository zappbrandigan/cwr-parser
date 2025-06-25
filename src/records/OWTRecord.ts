import { CWRRecordOptions } from '../types/index.js';
import { SWTRecord } from './SWTRecord.js';

/**
 * Other Writer Collection Record (OWT) - Used to record collection for non-controlled writers
 */
class OWTRecord extends SWTRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'OWT';
  }
}

export { OWTRecord };
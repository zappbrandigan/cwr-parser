import { CWRRecordOptions } from '../types/index.js';
import { SWRRecord } from './SWRRecord.js';

/**
 * Other Writer Record (OWR) - Contains non-controlled writer information
 */
class OWRRecord extends SWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'OWR';
  }
}

export { OWRRecord };
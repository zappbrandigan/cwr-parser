import { CWRRecordOptions } from '../types/index.js';
import { NWRRecord } from './NWRRecord.js';

/**
 * Existing Work Conflict (EXC) - Provides information on the details of the work that is in conflict
 */
class EXCRecord extends NWRRecord{
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'EXC';
  }
}

export { EXCRecord };
import { CWRRecordOptions } from '../types/index.js';
import { NWRRecord } from './NWRRecord.js';

/**
 * Notification of ISWC (ISW) - Informs the publisher of the ISWC that has been assigned to the musical work
 */
class ISWRecord extends NWRRecord{
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'ISW';
  }
}

export { ISWRecord };
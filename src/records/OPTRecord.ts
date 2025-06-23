import { CWRRecordOptions } from '../types/index.js';
import { SPTRecord } from './SPTRecord.js';

/**
 * Publisher Non-Controlled Territory (OPT) - Contains noncontrolled publisher territory information
 */
class OPTRecord extends SPTRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'OPT';
  }
}

export { OPTRecord };
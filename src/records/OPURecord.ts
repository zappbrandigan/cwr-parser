import { CWRRecordOptions } from '../types/index.js';
import { SPURecord } from './SPURecord.js';

/**
 * Other Publisher Record (OPU) - Contains uncontrolled publisher information
 */
class OPURecord extends SPURecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'OPU';
  }
}

export { OPURecord };
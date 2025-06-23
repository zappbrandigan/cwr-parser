import { CWRRecordOptions } from '../types/index.js';
import { NWRRecord } from './NWRRecord.js';

/**
 * Revised Registration Record (REV) - Indicates a revised work registration transaction
 */
class REVRecord extends NWRRecord{
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'REV';
  }

  validate() {
    super.validate();
    if (!this.options.validateFields) return;
    
    // ISWC validation
    const iswc = this.getField('iswc');
    if (iswc && !/^T-\d{9}-\d$/.test(iswc)) {
      throw new Error(`Invalid ISWC format: ${iswc}`);
    }
  }
}

export { REVRecord };
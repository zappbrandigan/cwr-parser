import { CWRRecord } from './CWRRecord.js';
import recordPrefix from './recordPrefix.js';

/**
 * Trailer Record (TRL) - Contains transmission summary information
 */
class TRLRecord extends CWRRecord {
  constructor(options = {}) {
    super(options);
    this.recordType = 'TRL';
  }

  getFieldDefinitions() {
    return [
      ...[recordPrefix[0]], // record type
      { name: 'groupCount', type: 'numeric', length: 5, required: true },
      { name: 'transactionCount', type: 'numeric', length: 8, required: true },
      { name: 'recordCount', type: 'numeric', length: 8, required: true }
    ];
  }
}

export { TRLRecord };
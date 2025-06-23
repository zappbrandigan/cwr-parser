import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import recordPrefix from './recordPrefix.js';

/**
 * Group Trailer Record (GRT) - Ends a group of related records
 */
class GRTRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'GRT';
  }

  getFieldDefinitions() {
    return [
      ...[recordPrefix[0]], // record type
      { name: 'groupId', type: 'string', length: 5, required: true },
      { name: 'transactionCount', type: 'numeric', length: 8, required: true },
      { name: 'recordCount', type: 'numeric', length: 8, required: true },
      { name: 'currencyIndicator', type: 'string', length: 3, required: false },
      { name: 'totalMonetaryValue', type: 'numeric', length: 10, required: false },
    ];
  }
}

export { GRTRecord };
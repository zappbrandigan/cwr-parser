import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import recordPrefix from './recordPrefix.js';

/**
 * Group Header Record (GRH) - Begins a group of related records
 */
class GRHRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'GRH';
  }

  getFieldDefinitions() {
    return [
      ...[recordPrefix[0]], // record type
      { name: 'transactionType', type: 'string', length: 3, required: true },
      { name: 'groupId', type: 'string', length: 5, required: true },
      { name: 'versionNumber', type: 'string', length: 5, required: true },
      { name: 'batchRequestId', type: 'string', length: 10, required: false },
      { name: 'distType', type: 'string', length: 2, required: false }
    ];
  }
}

export { GRHRecord };
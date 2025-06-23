import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import recordPrefix from './recordPrefix.js';

/**
 * Writter Territory Record (SWT) - Contains writer territory information
 */
class SWTRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'SWT';
  }

  getFieldDefinitions() {
    return [
      ...recordPrefix,
      { name: 'writerIpNumber', type: 'string', length: 9, required: true },
      { name: 'prCollectionShare', type: 'percentage', length: 5, required: false },
      { name: 'mrCollectionShare', type: 'percentage', length: 5, required: false },
      { name: 'srCollectionShare', type: 'percentage', length: 5, required: false },
      { name: 'inclusionExclusionIndicator', type: 'string', length: 1, required: true },
      { name: 'tisCode', type: 'string', length: 4, required: true },
      { name: 'sharesChange', type: 'flag', length: 1, required: false },
      { name: 'sequenceNumber', type: 'numeric', length: 3, required: true },
    ];
  }
}

export { SWTRecord };
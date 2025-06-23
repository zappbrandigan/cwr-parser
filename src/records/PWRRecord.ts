import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import recordPrefix from './recordPrefix.js';

/**
 * Writer Record (PWR) - Indicate a publisher relation to a controlled writer
 */
class PWRRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'PWR';
  }

  getFieldDefinitions() {
    return [
      ...recordPrefix,
      { name: 'publisherIpNumber', type: 'string', length: 9, required: true },
      { name: 'publisherName', type: 'string', length: 45, required: true },
      { name: 'submitterAgreementNumber', type: 'string', length: 14, required: false },
      { name: 'societyAssignedAgreementNumber', type: 'string', length: 14, required: false },
      { name: 'writerIpNumber', type: 'string', length: 9, required: true },
      { name: 'publisherSequenceNumber', type: 'number', length: 2, required: true },
    ];
  }
}

export { PWRRecord };
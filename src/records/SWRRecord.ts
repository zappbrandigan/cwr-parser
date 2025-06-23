import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import recordPrefix from './recordPrefix.js';

/**
 * Writer Controlled by Submitter (SWR) - Contains controlled writer information
 */
class SWRRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'SWR';
  }

  getFieldDefinitions() {
    return [
      ...recordPrefix,
      { name: 'writerIpNumber', type: 'string', length: 9, required: false },
      { name: 'writerLastName', type: 'string', length: 45, required: true },
      { name: 'writerFirstName', type: 'string', length: 30, required: false },
      { name: 'writerUnknownIndicator', type: 'flag', length: 1, required: false },
      { name: 'writerDesignationCode', type: 'string', length: 2, required: false },
      { name: 'taxIdNumber', type: 'string', length: 9, required: false },
      { name: 'writerIPINameNumber', type: 'string', length: 11, required: false },
      { name: 'prSocietyNumber', type: 'string', length: 3, required: false },
      { name: 'prOwnershipShare', type: 'percentage', length: 5, required: false },
      { name: 'mrSocietyNumber', type: 'string', length: 3, required: false },
      { name: 'mrOwnershipShare', type: 'percentage', length: 5, required: false },
      { name: 'srSocietyNumber', type: 'string', length: 3, required: false },
      { name: 'srOwnershipShare', type: 'percentage', length: 5, required: false },
      { name: 'reversionaryIndicator', type: 'flag', length: 1, required: false },
      { name: 'firstRecordingRefusalInd', type: 'string', length: 1, required: false },
      { name: 'workForHireIndicator', type: 'flag', length: 1, required: false },
      { name: 'writerTaxId', type: 'string', length: 9, required: false },
      { name: 'writerIpiBaseNumber', type: 'numeric', length: 13, required: false },
      { name: 'personalNumber', type: 'string', length: 12, required: false },
      { name: 'usaLicenseInd', type: 'string', length: 1, required: false }
    ];
  }
}

export { SWRRecord };
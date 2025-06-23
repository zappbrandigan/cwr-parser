import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import recordPrefix from './recordPrefix.js';

/**
 * Publisher Record (SPU) - Contains publisher information
 */
class SPURecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'SPU';
  }

  getFieldDefinitions() {
    return [
      ...recordPrefix,
      { name: 'publisherSequenceNumber', type: 'numeric', length: 2, required: true },
      { name: 'publisherIpNumber', type: 'string', length: 9, required: true },
      { name: 'publisherName', type: 'string', length: 45, required: true },
      { name: 'publisherUnknownIndicator', type: 'string', length: 1, required: true },
      { name: 'publisherType', type: 'string', length: 2, required: false },
      { name: 'publisherTaxId', type: 'string', length: 9, required: false },
      { name: 'publisherIpiNameNumber', type: 'string', length: 11, required: false },
      { name: 'submitterAgreementNumber', type: 'string', length: 14, required: false },
      { name: 'prAffiliationSocietyNumber', type: 'string', length: 3, required: false },
      { name: 'prOwnershipShare', type: 'percentage', length: 5, required: false },
      { name: 'mrAffiliationSocietyNumber', type: 'string', length: 3, required: false },
      { name: 'mrOwnershipShare', type: 'percentage', length: 5, required: false },
      { name: 'srAffiliationSocietyNumber', type: 'string', length: 3, required: false },
      { name: 'srOwnershipShare', type: 'percentage', length: 5, required: false },
      { name: 'specialAgreementsIndicator', type: 'flag', length: 1, required: false },
      { name: 'firstRecordingRefusalIndicator', type: 'flag', length: 1, required: false },
      { name: 'filler', type: 'string', length: 1, required: true },
      { name: 'publisherIpBase', type: 'string', length: 13, required: false },
      { name: 'isac', type: 'string', length: 14, required: false },
      { name: 'societyAssignedAgreementNumber', type: 'string', length: 14, required: false },
      { name: 'agreementType', type: 'string', length: 2, required: false },
      { name: 'usaLicenseIndicator', type: 'string', length: 1, required: false }
    ];
  }
}

export { SPURecord };
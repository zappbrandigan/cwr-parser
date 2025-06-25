import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import recordPrefix from './recordPrefix.js';

/**
 * Agreement Supporting Work Record (AGR) - Details of agreements relating to works that the publishers are registering elsewhere
 */
class AGRRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'AGR';
  }

  getFieldDefinitions() {
    return [
      ...recordPrefix,
      { name: 'submitterAgreementNumber', type: 'string', length: 14, required: true },
      { name: 'isac', type: 'string', length: 14, required: false },
      { name: 'agreementType', type: 'string', length: 2, required: true },
      { name: 'agreementStartDate', type: 'date', length: 8, required: true },
      { name: 'agreementEndDate', type: 'date', length: 8, required: false },
      { name: 'retentionEndDate', type: 'date', length: 8, required: false },
      { name: 'priorRoyaltyStatus', type: 'string', length: 1, required: false },
      { name: 'priorRoyaltyStartDate', type: 'date', length: 8, required: false },
      { name: 'postTermCollectionStatus', type: 'string', length: 1, required: false },
      { name: 'signatureAgreementDate', type: 'date', length: 8, required: false },
      { name: 'numberOfWorks', type: 'numeric', length: 5, required: true },
      { name: 'salesClause', type: 'string', length: 1, required: false },
      { name: 'sharesChange', type: 'flag', length: 1, required: false },
      { name: 'advanceGiven', type: 'flag', length: 1, required: false },
      { name: 'agreementNumber', type: 'string', length: 14, required: false },
    ];
  }
}

export { AGRRecord };
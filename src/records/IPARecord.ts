import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import recordPrefix from './recordPrefix.js';

/**
 * Interested Party of Agreement Record (IPA) -  contains information on the interested parties that concluded the agreement
 */
class IPARecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'IPA';
  }

  getFieldDefinitions() {
    return [
      ...recordPrefix,
      { name: 'includsionExclusionIndicator', type: 'string', length: 1, required: true },
      { name: 'tisCode', type: 'string', length: 4, required: true },
      { name: 'agreementRoleCode', type: 'string', length: 2, required: true },
      { name: 'ipiNameNumber', type: 'string', length: 11, required: false },
      { name: 'ipiBaseNumber', type: 'string', length: 13, required: false },
      { name: 'ipNumber', type: 'string', length: 9, required: true},
      { name: 'lastName', type: 'string', length: 45, required: true },
      { name: 'firstName',type: 'string', length: 30, required: false },
      { name: 'prSociety', type: 'string',  length: 3, required: false },
      { name: 'prShare', type: 'percentage', length: 5, required: false },
      { name: 'mrSociety', type: 'string', length: 5, required: false },
      { name: 'mrShare', type: 'percentage', length: 5, required: false },
      { name: 'srSociety', type: 'string', length: 3, required: false },
      { name: 'srShare', type: 'percentage', length: 5, required: false }
    ];
  }
}

export { IPARecord };
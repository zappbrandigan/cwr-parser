import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import recordPrefix from './recordPrefix.js';

/**
 * Performing Artist Record (PER) - Contains performer information
 */
class PERRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'PER';
  }

  getFieldDefinitions() {
    return [
      ...recordPrefix,
      { name: 'performingArtistLastName', type: 'string', length: 45, required: true },
      { name: 'performingArtistFirstName', type: 'string', length: 30, required: false },
      { name: 'performingArtistIpiNameNumber', type: 'numeric', length: 11, required: false },
      { name: 'performingArtistIpiBaseNumber', type: 'string', length: 13, required: false }
    ];
  }
}

export { PERRecord };
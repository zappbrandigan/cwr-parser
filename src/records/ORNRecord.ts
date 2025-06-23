import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import recordPrefix from './recordPrefix.js';

/**
 * Work Originator Record (ORN) - Contains work originator information
 */
class ORNRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'ORN';
  }

  getFieldDefinitions() {
    return [
      ...recordPrefix,
      { name: 'intendedPurpose', type: 'string', length: 3, required: true },
      { name: 'productionTitle', type: 'string', length: 60, required: false },
      { name: 'cdIdentifier', type: 'string', length: 15, required: false },
      { name: 'cutNumber', type: 'string', length: 4, required: false },
      { name: 'library', type: 'string', length: 60, required: false },
      { name: 'bltvr', type: 'string', length: 1, required: false },
      { name: 'vIsanVersion', type: 'string', length: 8, required: false },
      { name: 'vIsanIsan', type: 'string', length: 12, required: false },
      { name: 'vIsanEpisode', type: 'string', length: 4, required: false },
      { name: 'checkDigit', type: 'numeric', length: 1, required: false },
      { name: 'productionNumber', type: 'string', length: 12, required: false },
      { name: 'episodeTitle', type: 'string', length: 60, required: false },
      { name: 'episodeNumber', type: 'string', length: 20, required: false },
      { name: 'productinYear', type: 'date', length: 4, required: false },
      { name: 'aviSocietyCode', type: 'string', length: 3, required: false },
      { name: 'audioVisualNumber', type: 'string', length: 15, required: false },
    ];
  }
}

export { ORNRecord };
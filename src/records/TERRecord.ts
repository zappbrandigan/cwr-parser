import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import recordPrefix from './recordPrefix.js';

/**
 * Territory in Agreement Record (TER) -  specifies a territory either within the territorial 
 * scope of the preceding AGR agreement or excluded from it
 */
class TERRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'TER';
  }

  getFieldDefinitions() {
    return [
      ...recordPrefix,
      { name: 'includsionExclusionIndicator', type: 'string', length: 1, required: true },
      { name: 'tisCode', type: 'string', length: 4, required: true },
    ];
  }
}

export { TERRecord };
import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import recordPrefix from './recordPrefix.js';

/**
 * New Work Registration Record (NWR) - Indicates a new work registration 
 */
class NWRRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'NWR';
  }

  getFieldDefinitions() {
    return [
      ...recordPrefix,
      { name: 'workTitle', type: 'string', length: 60, required: true },
      { name: 'languageCode', type: 'string', length: 2, required: false },
      { name: 'submitterWorkNumber', type: 'string', length: 14, required: true },
      { name: 'iswc', type: 'string', length: 11, required: false },
      { name: 'copyrightDate', type: 'string', length: 8, required: false },
      { name: 'copyrightNumber', type: 'string', length: 12, required: false },
      { name: 'musicalWorkDistributionCategory', type: 'string', length: 3, required: true },
      { name: 'durationOfWork', type: 'time', length: 6, required: false },
      { name: 'recordedIndicator', type: 'flag', length: 1, required: true },
      { name: 'textMusicRelationship', type: 'string', length: 3, required: false },
      { name: 'compositeType', type: 'string', length: 3, required: false },
      { name: 'versionType', type: 'string', length: 3, required: true },
      { name: 'excerptType', type: 'string', length: 3, required: false },
      { name: 'musicArrangement', type: 'string', length: 3, required: false },
      { name: 'lyricAdaptation', type: 'string', length: 3, required: false },
      { name: 'contactName', type: 'string', length: 30, required: false },
      { name: 'contactId', type: 'string', length: 10, required: false },
      { name: 'cwrWorkType', type: 'string', length: 2, required: false },
      { name: 'grandRightsIndicator', type: 'string', length: 1, required: false },
      { name: 'compositeComponentType', type: 'string', length: 3, required: false },
      { name: 'publicationDate', type: 'date', length: 8, required: false },
      { name: 'exceptionalClause', type: 'string', length: 1, required: false },
      { name: 'opusNumber', type: 'string', length: 25, required: false },
      { name: 'catalogueNumber', type: 'string', length: 25, required: false },
      { name: 'priority', type: 'flag', length: 1, required: false },
    ];
  }
}

export { NWRRecord };
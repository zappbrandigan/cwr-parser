import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import recordPrefix from './recordPrefix.js';

/**
 * Recording Detail Record (REC) - Contains recording information
 */
class RECRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'REC';
  }

  getFieldDefinitions() {
    return [
      ...recordPrefix,
      { name: 'firstReleaseDate', type: 'date', length: 8, required: false },
      { name: 'constant', type: 'string', length: 60, required: false },
      { name: 'firstReleaseDuration', type: 'time', length: 6, required: false },
      { name: 'constant', type: 'string', length: 5, required: false },
      { name: 'firstAlbumTitle', type: 'string', length: 60, required: false },
      { name: 'firstAlbumLabel', type: 'string', length: 60, required: false },
      { name: 'firstReleaseCatalogNumber', type: 'string', length: 18, required: false },
      { name: 'ean', type: 'string', length: 13, required: false },
      { name: 'isrc', type: 'string', length: 12, required: false },
      { name: 'recordingFormat', type: 'string', length: 1, required: false },
      { name: 'recordingTechnique', type: 'string', length: 1, required: false },
      { name: 'mediaType', type: 'string', length: 3, required: false }
    ];
  }
}

export { RECRecord };
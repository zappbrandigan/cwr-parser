import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import recordPrefix from './recordPrefix.js';

/**
 * Original Work Title for Version(VER) - Title of original work from which the version is derived
 */
class VERRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'PER';
  }

  getFieldDefinitions() {
    return [
      ...recordPrefix,
      { name: 'originalWorkTitle', type: 'string', length: 60, required: true },
      { name: 'iswc', type: 'string', length: 11, required: false},
      { name: 'languageCode', type: 'string', length: 2, required: false },
      { name: 'writerOneLastName', type: 'string', length: 45, required: false },
      { name: 'writerOneFirstName', type: 'string', length: 30, required: false },
      { name: 'source', type: 'string', length: 60, required: false },
      { name: 'writerOneIpiNameNumber', type: 'string', length: 11, required: false },
      { name: 'writerOneIpiBaseNumber', type: 'string', length: 13, required: false },
      { name: 'writerTwoLastName', type: 'string', length: 45, required: false },
      { name: 'writerTwoFirstName', type: 'string', length: 30, required: false },
      { name: 'writerTwoIpiNameNumber', type: 'string', length: 11, required: false },
      { name: 'writerTwoIpiBaseNumber', type: 'string', length: 13, required: false },
      { name: 'submitterWorkNumber', type: 'string', length: 14, required: false }
    ];
  }
}

export { VERRecord };
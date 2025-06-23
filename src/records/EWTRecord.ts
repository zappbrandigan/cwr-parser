import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import recordPrefix from './recordPrefix.js';

/**
 * Entire Work Title for Excerpts - Indicates the work title for the work from which the excpert was derived 
 */
class EWTRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'EWT';
  }

  getFieldDefinitions() {
    return [
      ...[recordPrefix[0]], // record type
      { name: 'workTitle', type: 'string', length: 60, required: true },
      { name: 'iswc', type: 'string', length: 11, required: false },
      { name: 'languageCode', type: 'string', length: 2, required: false },
      { name: 'writerOneLastName', type: 'string', length: 45, required: false },
      { name: 'writerOneFirstName', type: 'string', length: 30, required: false },
      { name: 'source', type: 'string', length: 60, required: false },
      { name: 'writerOneIpiNameNumber', type: 'string', length: 11, required: false },
      { name: 'writerOneIpiBaseNumber', type: 'string', length: 13, required: false },
      { name: 'writerTwoLastName', type: 'string', length: 45, required: false },
      { name: 'writerTwoFirsttName', type: 'string', length: 30, required: false },
      { name: 'writerTwoIpiNameNumber', type: 'string', length: 11, required: false },
      { name: 'writerTwoIpiBaseNumber', type: 'string', length: 13, required: false },
      { name: 'submitterWorkNumber', type: 'string', length: 14, required: false }
    ];
  }
}

export { EWTRecord };
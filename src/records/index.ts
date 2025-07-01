import { RecordConstructor, RecordTypeKey } from '../types/index.js';
import { HDRRecord } from './HDRRecord.js';
import { GRHRecord } from './GRHRecord.js';
import { GRTRecord } from './GRTRecord.js';
import { NWRRecord } from './NWRRecord.js';
import { REVRecord } from './REVRecord.js';
import { SPURecord } from './SPURecord.js';
import { SPTRecord } from './SPTRecord.js';
import { PWRRecord } from './PWRRecord.js';
import { OWRRecord } from './OWRRecord.js';
import { ALTRecord } from './ALTRecord.js';
import { PERRecord } from './PERRecord.js';
import { RECRecord } from './RECRecord.js';
import { ORNRecord } from './ORNRecord.js';
import { TRLRecord } from './TRLRecord.js';
import { AGRRecord } from './AGRRecord.js';
import { EWTRecord } from './EWTRecord.js';
import { SWRRecord } from './SWRRecord.js';
import { ISWRecord } from './ISWRecord.js';
import { EXCRecord } from './EXCRecord.js';
import { OPTRecord } from './OPTRecord.js';
import { OPURecord } from './OPURecord.js';
import { SWTRecord } from './SWTRecord.js';
import { VERRecord } from './VERRecord.js';
import { ACKRecord } from './ACKRecord.js';
import { TERRecord } from './TERRecord.js';
import { IPARecord } from './IPARecord.js';
import { NPNRecord } from './NPNRecord.js';
import { NATRecord } from './NATRecord.js';
import { NWNRecord } from './NWNRecord.js';
import { OWTRecord } from './OWTRecord.js';
import { INSRecord } from './INSRecord.js';
import { INDRecord } from './INDRecord.js';
import { COMRecord } from './COMRecord.js';
import { NPARecord } from './NPARecord.js';

export const recordTypes: Map<RecordTypeKey, RecordConstructor> = new Map([
  ['HDR', HDRRecord],
  ['GRH', GRHRecord],
  ['GRT', GRTRecord],
  ['TRL', TRLRecord],
  ['AGR', AGRRecord],
  ['NWR', NWRRecord],
  ['REV', REVRecord],
  ['ISW', ISWRecord],
  ['EXC', EXCRecord],
  ['ACK', ACKRecord],
  ['TER', TERRecord],
  ['IPA', IPARecord],
  ['NPA', NPARecord],
  ['SPU', SPURecord],
  ['OPU', OPURecord],
  ['NPN', NPNRecord],
  ['SPT', SPTRecord],
  ['OPT', OPTRecord],
  ['SWR', SWRRecord],
  ['OWR', OWRRecord],
  ['NWN', NWNRecord],
  ['SWT', SWTRecord],
  ['OWT', OWTRecord],
  ['PWR', PWRRecord],
  ['ALT', ALTRecord],
  ['NAT', NATRecord],
  ['EWT', EWTRecord],
  ['VER', VERRecord],
  ['PER', PERRecord],
  ['REC', RECRecord],
  ['ORN', ORNRecord],
  ['INS', INSRecord],
  ['IND', INDRecord],
  ['COM', COMRecord],
]);

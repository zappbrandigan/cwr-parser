import { EWTRecord } from '../records/EWTRecord';
import { GRHRecord } from '../records/GRHRecord';
import { GRTRecord } from '../records/GRTRecord';
import { HDRRecord } from '../records/HDRRecord';
import { NWRRecord } from '../records/NWRRecord';
import { REVRecord } from '../records/REVRecord';
import { EXCRecord } from '../records/EXCRecord';
import { ISWRecord } from '../records/ISWRecord';
import { SPURecord } from '../records/SPURecord';
import { SPTRecord } from '../records/SPTRecord';
import { SWTRecord } from '../records/SWTRecord';
import { OPURecord } from '../records/OPURecord';
import { OPTRecord } from '../records/OPTRecord';
import { PWRRecord } from '../records/PWRRecord';
import { OWRRecord } from '../records/OWRRecord';
import { SWRRecord } from '../records/SWRRecord';
import { ALTRecord } from '../records/ALTRecord';
import { PERRecord } from '../records/PERRecord';
import { RECRecord } from '../records/RECRecord';
import { ORNRecord } from '../records/ORNRecord';
import { VERRecord } from '../records/VERRecord';
import { TRLRecord } from '../records/TRLRecord';
import { AGRRecord } from '../records/AGRRecord';
import { TERRecord } from '../records/TERRecord';
import { IPARecord } from '../records/IPARecord';
import { ACKRecord } from '../records/ACKRecord';
import { NPARecord } from '../records/NPARecord';
import { NPNRecord } from '../records/NPNRecord';
import { NWNRecord } from '../records/NWNRecord';
import { OWTRecord } from '../records/OWTRecord';
import { NATRecord } from '../records/NATRecord';
import { INSRecord } from '../records/INSRecord';
import { INDRecord } from '../records/INDRecord';
import { COMRecord } from '../records/COMRecord';
import { MSGRecord } from '../records/MSGRecord';
import { NPRRecord } from '../records/NPRRecord';

export type RecordInstance =
  | InstanceType<typeof HDRRecord>
  | InstanceType<typeof GRHRecord>
  | InstanceType<typeof GRTRecord>
  | InstanceType<typeof TRLRecord>
  | InstanceType<typeof AGRRecord>
  | InstanceType<typeof NWRRecord>
  | InstanceType<typeof REVRecord>
  | InstanceType<typeof ISWRecord>
  | InstanceType<typeof EXCRecord>
  | InstanceType<typeof ACKRecord>
  | InstanceType<typeof TERRecord>
  | InstanceType<typeof IPARecord>
  | InstanceType<typeof NPARecord>
  | InstanceType<typeof SPURecord>
  | InstanceType<typeof OPURecord>
  | InstanceType<typeof NPNRecord>
  | InstanceType<typeof SPTRecord>
  | InstanceType<typeof OPTRecord>
  | InstanceType<typeof SWRRecord>
  | InstanceType<typeof OWRRecord>
  | InstanceType<typeof NWNRecord>
  | InstanceType<typeof SWTRecord>
  | InstanceType<typeof OWTRecord>
  | InstanceType<typeof PWRRecord>
  | InstanceType<typeof ALTRecord>
  | InstanceType<typeof NATRecord>
  | InstanceType<typeof EWTRecord>
  | InstanceType<typeof VERRecord>
  | InstanceType<typeof PERRecord>
  | InstanceType<typeof NPRRecord>
  | InstanceType<typeof RECRecord>
  | InstanceType<typeof ORNRecord>
  | InstanceType<typeof INSRecord>
  | InstanceType<typeof INDRecord>
  | InstanceType<typeof COMRecord>
  | InstanceType<typeof MSGRecord>;

export type RecordTypeKey =
  | 'HDR'
  | 'GRH'
  | 'GRT'
  | 'TRL'
  | 'AGR'
  | 'NWR'
  | 'REV'
  | 'ISW'
  | 'EXC'
  | 'ACK'
  | 'TER'
  | 'IPA'
  | 'NPA'
  | 'SPU'
  | 'OPU'
  | 'NPN'
  | 'SPT'
  | 'OPT'
  | 'SWR'
  | 'OWR'
  | 'NWN'
  | 'SWT'
  | 'OWT'
  | 'PWR'
  | 'ALT'
  | 'NAT'
  | 'EWT'
  | 'VER'
  | 'PER'
  | 'NPR'
  | 'REC'
  | 'ORN'
  | 'INS'
  | 'IND'
  | 'COM'
  | 'MSG'
  | 'NET'
  | 'NCT'
  | 'NVT'
  | 'NOW'
  | 'ARI'
  | 'XRF';

export type AllCWRData =
  | HDRData
  | GRHData
  | GRTData
  | TRLData
  | AGRData
  | NWRData
  | REVData
  | ISWData
  | EXCData
  | ACKData
  | TERData
  | IPAData
  | NPAData
  | SPUData
  | OPUData
  | NPNData
  | SPTData
  | OPTData
  | SWRData
  | OWRData
  | NWNData
  | SWTData
  | OWTData
  | PWRData
  | ALTData
  | NATData
  | EWTData
  | VERData
  | PERData
  | NPRData
  | RECData
  | ORNData
  | INSData
  | INDData
  | COMData
  | MSGData
  | NETData
  | NCTData
  | NVTData
  | NOWData
  | ARIData
  | XRFData;

export type RecordConstructor = new (
  options: CWRRecordOptions
) => RecordInstance;

/** Map of record type string to record constructor */
export type RecordTypesMap = Map<RecordTypeKey, RecordConstructor>;

// Common record wrapper
export interface CWRParsedRecord<T = unknown> {
  recordType: string;
  lineNumber: number;
  data: T;
  rawData?: string;
}

// Top-level parsed file result
export interface ParsedCWRFile {
  fileName: string;
  version: string | null;
  header: CWRParsedRecord<HDRData> | null;
  groups: CWRGroup[];
  trailer: CWRParsedRecord<TRLData> | null;
  statistics: ParseStatistics | null;
  metadata: {
    parsedAt: string;
    parser: string;
  };
}

export interface ParsedTransmission {
  fileName: string;
  version: string | null;
  hdr: {
    fields: HDRData | null;
  };
  groups: ParsedGroup[];
  trl: {
    fields: TRLData | null;
  };
  statistics: ParseStatistics | null;
  metadata: {
    parsedAt: string;
    parser: string;
  };
}

export interface CWRConverterRecord {
  fileName: string;
  version: string | null;
  lines: CWRParsedRecord<Map<string, string>>[];
  statistics: ParseStatistics | null;
  meatadata: {
    parsedAt: string;
  };
}

export interface ParsedGroup {
  grh: {
    fields: GRHData | null;
  };
  transactions?: ParsedTransaction[];
  grt?: {
    fields: GRTData | null;
  };
}

// Group structure for Converter
export interface CWRGroup {
  header: CWRParsedRecord<GRHData>;
  transactions: CWRTransaction[];
  trailer: CWRParsedRecord<GRTData> | null;
}

export interface ParsedTransaction {
  ack?: {
    fields: ACKData;
  };
  msgs?: {
    fields: MSGData;
  }[];
  work?: ParsedWork;
}

export interface ParsedWork {
  header: {
    fields: NWRData | REVData | EXCData | ISWData;
  };
  spus?: ParsedSPU[];
  opus?: ParsedOPU[];
  swrs?: ParsedSWR[];
  owrs?: ParsedOWR[];
  alts?: { fields: ALTData }[];
  nats?: { fields: NATData }[];
  ewt?: { fields: EWTData };
  ver?: { fields: VERData };
  pers?: { fields: PERData }[];
  nprs?: { fields: NPRData }[];
  recs?: { fields: RECData }[];
  orns?: { fields: ORNData }[];
  inss?: { fields: INSData }[];
  inds?: { fields: INDData }[];
  coms?: { fields: COMData }[];
  net?: { fields: NETData };
  ncts?: { fields: NCTData }[];
  nvt?: { fields: NVTData };
  nows?: { fields: NOWData }[];
  aris?: { fields: ARIData }[];
  xrfs?: { fields: XRFData }[];
}

export interface ParsedSPU {
  fields: SPUData;
  npn?: { fields: NPNData };
  spts?: { fields: SPTData }[];
  opts?: { fields: OPTData }[];
}

export interface ParsedOPU {
  fields: OPUData;
  npn?: NPNData;
  opts?: { fields: OPTData }[];
}

export interface ParsedSWR {
  fields: SWRData;
  nwn?: { fields: NWNData };
  swts?: { fields: SWTData }[];
  pwrs?: { fields: PWRData }[];
}

export interface ParsedOWR {
  fields: OWRData;
  nwn?: { fields: NWNData };
  owts?: { fields: OWTData }[];
  pwrs?: { fields: PWRData }[];
}

// Transaction structure for Converter
export interface CWRTransaction {
  header: CWRParsedRecord<NWRData | REVData>;
  publishers: CWRPublisher[];
  otherPublishers: CWROtherPublisher[];
  writers: CWRWriter[];
  otherWriters: CWROtherWriter[];
  alternativeTitles: CWRParsedRecord<ALTData | NATData>[];
  performers: CWRParsedRecord<PERData>[];
  recordings: CWRParsedRecord<RECData>[];
  originators: CWRParsedRecord<ORNData>[];
  workTitles: CWRParsedRecord<EWTData>[];
  versions: CWRParsedRecord<VERData>[];
}

// --- RECORD SPECIFIC STRUCTURES ---

export interface HDRData {
  recordType: 'HDR';
  senderType: string;
  senderId: string;
  senderName: string;
  ediVersion: string;
  creationDate: string;
  creationTime: string;
  transmissionDate: string;
  characterSet: string | null;
  version: string | null;
  revision: string | null;
  softwarePackage: string | null;
  softwarePackageVersion: string | null;
}

export interface GRHData {
  recordType: 'GRH';
  transactionType: string;
  groupId: number;
  versionNumber: string;
  batchRequestId: number | null;
  distributionType: string | null;
}

export interface GRTData {
  recordType: 'GRT';
  groupId: number;
  transactionCount: number;
  recordCount: number;
  currencyIndicator: string | null;
  monetaryValue: number | null;
}

export interface TRLData {
  recordType: 'TRL';
  groupCount: number;
  transactionCount: number;
  recordCount: number;
}

export interface AGRData {
  recordType: 'AGR';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  submitterAgreementNumber: string;
  isac: string | null;
  agreementType: string;
  agreementStartDate: string | null;
  agreementEndDate: string | null;
  retentionEndDate: string | null;
  priorRoyaltyStatus: string | null;
  priorRoyaltyStartDate: string | null;
  postTermCollectionStatus: string;
  postTermCollectionEndDate: string | null;
  signatureAgreementDate: string | null;
  numberOfWorks: number;
  salesClause: string | null;
  sharesChange: string | null;
  advanceGiven: string | null;
  societyAssignedAgreementNumber: string | null;
}

interface WorkData {
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  workTitle: string;
  languageCode: string;
  submitterWorkNumber: string;
  iswc: string | null;
  copyrightDate: string;
  copyrightNumber: string | null;
  musicalWorkDistributionCategory: string;
  duration: string | null;
  recordedIndicator: string | null;
  textMusicRelationship: string;
  compositeType: string | null;
  versionType: string;
  excerptType: string | null;
  musicArrangement: string | null;
  lyricAdaptation: string | null;
  contactName: string | null;
  contactId: string | null;
  cwrWorkType: string;
  grandRightsIndicator: string;
  compositeComponentCount: number;
  printedPublicationDate: string | null;
  exceptionalClause: string;
  opusNumber: string | null;
  catalogueNumber: string | null;
  priorityFlag: string;
}

export interface NWRData extends WorkData {
  recordType: 'NWR';
}

export interface REVData extends WorkData {
  recordType: 'REV';
}

export interface ISWData extends WorkData {
  recordType: 'ISW';
}

export interface EXCData extends WorkData {
  recordType: 'EXC';
}

export interface ACKData {
  recordType: 'ACK';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  creationDate: string;
  creationTime: string;
  originalGroupId: number;
  originalTransactionSequence: number;
  originalTransactionType: string;
  creationTitle: string | null;
  submitterCreationNumber: string | null;
  recipientCreationNumber: string | null;
  processingDate: string;
  transactionStatus: string;
}

export interface TERData {
  recordType: 'TER';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  includsionExclusionIndicator: string | null;
  tisCode: string | null;
}

export interface IPAData {
  recordType: 'IPA';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  agreementRoleCode: string;
  ipiNameNumber: string | null;
  ipiBaseNumber: string | null;
  interestedPartyNumber: string | null;
  lastName: string | null;
  firstName: string | null;
  prAffiliationSociety: string | null;
  prOwnershipShare: number | null;
  mrAffiliationSociety: string | null;
  mrOwnershipShare: number | null;
  srAffiliationSociety: string | null;
  srOwnershipShare: number | null;
}

export interface NPAData {
  recordType: 'NPA';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  interestedPartyNumber: string;
  lastName: string;
  firstName: string;
  languageCode: string | null;
}

interface PublisherData {
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  publisherSequenceNumber: number;
  interestedPartyNumber: string;
  publisherName: string;
  publisherUnknownIndicator: string;
  publisherType: string;
  publisherTaxId: string | null;
  ipiNameNumber: string;
  submitterAgreementNumber: string | null;
  prAffiliationSocietyNumber: string;
  prOwnershipShare: number;
  mrAffiliationSocietyNumber: string | null;
  mrOwnershipShare: number;
  srAffiliationSocietyNumber: string | null;
  srOwnershipShare: number;
  specialAgreementsIndicator: string | null;
  firstRecordingRefusalIndicator: boolean;
  ipiBaseNumber: string | null;
  isac: string | null;
  societyAssignedAgreementNumber: string | null;
  agreementType: string | null;
  usaLicenseIndicator: string;
}

export interface SPUData extends PublisherData {
  recordType: 'SPU';
}

export interface OPUData extends PublisherData {
  recordType: 'OPU';
}

export interface NPNData {
  recordType: 'NPN';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  sequenceNumber: number;
  interestedPartyNumber: string;
  publisherName: string;
  languageCode: string | null;
}

interface TerritoryData {
  transactionSequenceNumber: string | number;
  recordSequenceNumber: string | number;
  interestedPartyNumber: string;
  prCollectionShare: number;
  mrCollectionShare: number;
  srCollectionShare: number;
  inclusionExclusionIndicator: string;
  tisCode: string;
  sharesChange: string | null;
  sequenceNumber: number;
}

export interface SPTData extends TerritoryData {
  recordType: 'SPT';
  constant: string;
}

export interface OPTData extends TerritoryData {
  recordType: 'OPT';
  constant: string;
}

export interface SWTData extends TerritoryData {
  recordType: 'SWT';
}

export interface OWTData extends TerritoryData {
  recordType: 'OWT';
}

interface WorkWriterData {
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  interestedPartyNumber: string;
  writerLastName: string;
  writerFirstName: string;
  writerUnknownIndicator: string | null;
  writerDesignationCode: string;
  taxIdNumber: string | null;
  ipiNameNumber: string;
  prAffiliationSocietyNumber: string;
  prOwnershipShare: number;
  mrAffiliationSocietyNumber: string | null;
  mrOwnershipShare: number | null;
  srAffiliationSocietyNumber: string | null;
  srOwnershipShare: number | null;
  reversionaryIndicator: string | null;
  firstRecordingRefusalInd: string;
  workForHireIndicator: string | null;
  filler: string | null;
  ipiBaseNumber: string | null;
  personalNumber: string | null;
  usaLicenseIndicator: string | null;
}

export interface SWRData extends WorkWriterData {
  recordType: 'SWR';
}

export interface OWRData extends WorkWriterData {
  recordType: 'OWR';
}

export interface NWNData {
  recordType: 'NWN';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  interestedPartyNumber: string;
  writerLastName: string;
  writerFirstName: string;
  languageCode: string | null;
}

export interface PWRData {
  recordType: 'PWR';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  publisherInterestedPartyNumber: string;
  publisherName: string;
  submitterAgreementNumber: string | null;
  societyAssignedAgreementNumber: string | null;
  writerInterestedPartyNumber: string;
  publisherSequenceNumber: string;
}

export interface ALTData {
  recordType: 'ALT';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  alternativeTitle: string;
  titleType: string | null;
  languageCode: string | null;
}

export interface NATData {
  recordType: 'NAT';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  alternativeTitle: string;
  titleType: string | null;
  languageCode: string | null;
}

interface VersionData {
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  originalWorkTitle: string;
  iswc: string | null;
  writerOneLastName: string | null;
  writerOneFirstName: string | null;
  source: string | null;
  writerOneIpiNameNumber: string | null;
  writerOneIpiBaseNumber: string | null;
  writerTwoLastName: string | null;
  writerTwoFirstName: string | null;
  writerTwoIpiNameNumber: string | null;
  submitterWorkNumber: string | null;
}

export interface EWTData extends VersionData {
  recordType: 'EWT';
}

export interface VERData extends VersionData {
  recordType: 'VER';
}

export interface PERData {
  recordType: 'PER';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  artistLastName: string;
  artistFirstName: string | null;
  ipiNameNumber: string | null;
  ipiBaseNumber: string | null;
}

export interface NPRData {
  recordType: 'NPR';
  performingArtistName: string | null;
  performingArtistFirstName: string | null;
  ipiNameNumber: string | null;
  ipiBaseNumber: string | null;
  languageCode: string | null;
  performanceLanguage: string | null;
  performanceDialect: string | null;
}

export interface RECData {
  recordType: 'REC';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  firstReleaseDate: string | null;
  constant: string | null;
  firstReleaseDuration: string | null;
  filler: string | null;
  firstAlbumTitle: string | null;
  firstAlbumLabel: string | null;
  firstReleaseCatalogNumber: string | null;
  ean: string | null;
  isrc: string | null;
  recordingFormat: string | null;
  recordingTechnique: string | null;
  mediaType: string | null;
  recordingTitle: string | null;
  versionTitle: string | null;
  displayArtist: string | null;
  recordLabel: string | null;
  irscValidity: string | null;
  submitterRecordingId: string | null;
}

export interface ORNData {
  recordType: 'ORN';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  intendedPurpose: string;
  productionTitle: string;
  cdIdentifier: string | null;
  cutNumber: number | null;
  library: string | null;
  bltvr: string | null;
  filler: string | null;
  productionNumber: string | null;
  episodeTitle: string | null;
  episodeNumber: string | null;
  productionYear: string;
  aviSocietyCode: string;
  audioVisualNumber: string | null;
  vIsan: string | null;
  vIsanEpisode: string | null;
  checkDigitOne: string | null;
  vIsanVersion: string | null;
  checkDigitTwo: string | null;
  eidr: string | null;
  eidrCheckDigit: string | null;
}

export interface INSData {
  recordType: 'INS';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  numberOfVoices: number | null;
  standardInstrumentationType: string | null;
  instrumentationDescription: string | null;
}

export interface INDData {
  recordType: 'IND';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  instrumentCode: string;
  numberOfPlayers: number | null;
}

export interface COMData {
  recordType: 'COM';
  ransactionSequenceNumber: number;
  recordSequenceNumber: number;
  title: string;
  iswcOfComponent: string | null;
  submitterWorkNumber: string | null;
  duration: number | null;
  writerOneLastName: string;
  writerOneFirstName: string | null;
  writerOneIpiNameNumber: string | null;
  writerTwoLastName: string | null;
  writerTwoFirstName: string | null;
  writerTwoIpiNameNumber: string | null;
  writerOneIpiBaseNumber: string | null;
  writerTwoIpiBaseNumber: string | null;
}

export interface MSGData {
  recordType: 'MSG';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  messageType: string;
  originalRecordSequenceNumber: number;
  originalRecordType: string;
  messageLevel: string;
  validationNumber: string;
  messageText: string;
}

interface NonRomanData {
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  title: string;
  languageCode: string | null;
}

export interface NETData extends NonRomanData {
  recordType: 'NET';
}

export interface NCTData extends NonRomanData {
  recordType: 'NCT';
}

export interface NVTData extends NonRomanData {
  recordType: 'NVT';
}

export interface NOWData {
  recordType: 'NOW';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  writerName: string;
  writerFirstName: string;
  languageCode: string | null;
  writerPosition: string | null;
}

export interface ARIData {
  recordType: 'ARI';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  societyNumber: string;
  workNumber: string | null;
  typeOfRight: string;
  subjectCode: string | null;
  note: string | null;
}
export interface XRFData {
  recordType: 'XRF';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  organisationCode: string;
  identifier: string;
  identifierType: string;
  validity: string;
}

// Wrapper types that include nested structures
export interface CWRPublisher extends CWRParsedRecord<SPUData> {
  territories?: CWRParsedRecord<SPTData>[];
}

export interface CWROtherPublisher extends CWRParsedRecord<OPUData> {
  territories?: CWRParsedRecord<OPTData>[];
}

export interface CWRWriter extends CWRParsedRecord<SWRData> {
  territories?: CWRParsedRecord<SWTData>[];
  publishers?: CWRParsedRecord<PWRData>[];
}

export interface CWROtherWriter extends CWRParsedRecord<OWRData> {
  territories?: CWRParsedRecord<OWTData>[];
  publishers?: CWRParsedRecord<OWRData>[];
}

export interface CWRRecordOptions {
  strictMode?: boolean;
  validateFields?: boolean;
  includeRawData?: boolean;
  convertCodes?: boolean;
  [key: string]: any;
}

export interface CWRErrorDetails {
  [key: string]: unknown;
}

export interface CWRErrorJSON {
  name: string;
  message: string;
  code: string;
  details: CWRErrorDetails;
  stack?: string;
}

// --- STATISTICS STRUCTURE ---

export interface ParseStatistics {
  totalRecords: number;
  recordCounts: Record<string, number>;
  errors: string[];
  warnings: string[];
  hasErrors: boolean;
  hasWarnings: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface FieldDefinition {
  name: string;
  type:
    | 'string'
    | 'numeric'
    | 'date'
    | 'time'
    | 'flag'
    | 'percentage'
    | 'table';
  length: number;
  required: boolean;
  title: string;
  description: string;
  [key: string]: any;
}

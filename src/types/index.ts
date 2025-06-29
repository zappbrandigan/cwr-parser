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

export type RecordInstance =
  | InstanceType<typeof HDRRecord>
  | InstanceType<typeof GRHRecord>
  | InstanceType<typeof GRTRecord>
  | InstanceType<typeof EWTRecord>
  | InstanceType<typeof NWRRecord>
  | InstanceType<typeof REVRecord>
  | InstanceType<typeof EXCRecord>
  | InstanceType<typeof ISWRecord>
  | InstanceType<typeof SPURecord>
  | InstanceType<typeof SPTRecord>
  | InstanceType<typeof SWTRecord>
  | InstanceType<typeof OPURecord>
  | InstanceType<typeof OPTRecord>
  | InstanceType<typeof PWRRecord>
  | InstanceType<typeof OWRRecord>
  | InstanceType<typeof SWRRecord>
  | InstanceType<typeof ALTRecord>
  | InstanceType<typeof PERRecord>
  | InstanceType<typeof RECRecord>
  | InstanceType<typeof ORNRecord>
  | InstanceType<typeof VERRecord>
  | InstanceType<typeof AGRRecord>
  | InstanceType<typeof TERRecord>
  | InstanceType<typeof IPARecord>
  | InstanceType<typeof TRLRecord>;

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
  | 'REC'
  | 'ORN';

export type AllCWRData =
  | HDRData
  | GRHData
  | GRTData
  | TRLData
  | NWRData
  | REVData
  | SPUData
  | SPTData
  | SWRData
  | SWTData
  | PWRData
  | ORNData
  | OPUData
  | OPTData
  | OWRData
  | OWTData
  | ALTData
  | PERData
  | AGRData
  | TERData
  | IPAData
  | EWTData
  | VERData
  | RECData;

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

export interface CWRConverterRecord {
  fileName: string;
  version: string | null;
  lines: CWRParsedRecord<Map<string, string>>[];
  statistics: ParseStatistics | null;
  meatadata: {
    parsedAt: string;
  };
}

// Group structure
export interface CWRGroup {
  header: CWRParsedRecord<GRHData>;
  transactions: CWRTransaction[];
  trailer: CWRParsedRecord<GRTData> | null;
}

// Transaction structure
export interface CWRTransaction {
  header: CWRParsedRecord<NWRData | REVData>;
  publishers: CWRPublisher[];
  otherPublishers: CWROtherPublisher[];
  writers: CWRWriter[];
  otherWriters: CWROtherWriter[];
  alternativeTitles: CWRParsedRecord<ALTData>[];
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
  durationOfWork: string | null;
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
  compositeComponentType: string;
  publicationDate: string | null;
  exceptionalClause: string;
  opusNumber: string | null;
  catalogueNumber: string | null;
  priority: boolean;
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

interface PublisherData {
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  publisherSequenceNumber: number;
  publisherIpNumber: string;
  publisherName: string;
  publisherUnknownIndicator: string;
  publisherType: string;
  publisherTaxId: string | null;
  publisherIpiNameNumber: string;
  submitterAgreementNumber: string | null;
  prAffiliationSocietyNumber: string;
  prOwnershipShare: number;
  mrAffiliationSocietyNumber: string | null;
  mrOwnershipShare: number;
  srAffiliationSocietyNumber: string | null;
  srOwnershipShare: number;
  specialAgreementsIndicator: string | null;
  firstRecordingRefusalIndicator: boolean;
  filler: string;
  publisherIpBase: string | null;
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

interface TerritoryData {
  transactionSequenceNumber: string | number;
  recordSequenceNumber: string | number;
  publisherIpNumber: string;
  constant: string;
  prCollectionShare: string | number;
  mrCollectionShare: string | number;
  srCollectionShare: string | number;
  inclusionExclusionIndicator: string;
  tisCode: string;
  sharesChange: string | boolean;
  sequenceNumber: string | number;
}

export interface SPTData extends TerritoryData {
  recordType: 'SPT';
}

export interface OPTData extends TerritoryData {
  recordType: 'OPT';
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
  writerIpNumber: string;
  writerLastName: string;
  writerFirstName: string;
  writerUnknownIndicator: string | null;
  writerDesignationCode: string;
  taxIdNumber: string | null;
  writerIPINameNumber: string;
  prSocietyNumber: string;
  prOwnershipShare: number;
  mrSocietyNumber: string | null;
  mrOwnershipShare: number | null;
  srSocietyNumber: string | null;
  srOwnershipShare: number | null;
  reversionaryIndicator: string | null;
  firstRecordingRefusalInd: string;
  workForHireIndicator: string | null;
  writerTaxId: string | null;
  writerIpiBaseNumber: string | null;
  personalNumber: string;
  usaLicenseInd: string | null;
}

export interface SWRData extends WorkWriterData {
  recordType: 'SWR';
}

export interface OWRData extends WorkWriterData {
  recordType: 'OWR';
}

export interface PWRData {
  recordType: 'PWR';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  publisherIpNumber: string;
  publisherName: string;
  submitterAgreementNumber: string | null;
  societyAssignedAgreementNumber: string | null;
  writerIpNumber: string;
  publisherSequenceNumber: string;
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
  vIsanVersion: string | null;
  vIsanIsan: string | null;
  vIsanEpisode: string | null;
  checkDigit: string | null;
  productionNumber: string | null;
  episodeTitle: string | null;
  episodeNumber: string | null;
  productionYear: string;
  aviSocietyCode: string;
  audioVisualNumber: string | null;
}

export interface RECData {
  recordType: 'REC';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  firstReleaseDate: string | Date | null;
  constant: string | null;
  firstReleaseDuration: string | null;
  constantTwo: string | null;
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

export interface ALTData {
  recordType: 'ALT';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  alternativeTitle: string;
  titleType: string | null;
  languageCode: string | null;
}

export interface IPAData {
  recordType: 'IPA';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  includsionExclusionIndicator: string;
  tisCode: string;
  agreementRoleCode: string | null;
  ipiNameNumber: string | null;
  ipiBaseNumber: string | null;
  ipNumber: string | null;
  lastName: string | null;
  firstName: string | null;
  prSociety: string | null;
  prShare: number | null;
  mrSociety: string | null;
  mrShare: number | null;
  srSociety: string | null;
  srShare: number | null;
}

export interface TERData {
  recordType: 'TER';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  includsionExclusionIndicator: string | null;
  tisCode: string | null;
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

export interface VERData extends VersionData {
  recordType: 'VER';
}

export interface EWTData extends VersionData {
  recordType: 'EWT';
}

export interface PERData {
  recordType: 'PER';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  artistLastName: string;
  artistFirstName: string | null;
  interestedPartyIpiNameNumber: string | null;
  interestedPartyIpiBaseNumber: string | null;
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

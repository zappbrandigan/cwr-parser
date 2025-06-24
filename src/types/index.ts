import { EWTRecord } from "../records/EWTRecord";
import { GRHRecord } from "../records/GRHRecord";
import { GRTRecord } from "../records/GRTRecord";
import { HDRRecord } from "../records/HDRRecord";
import { NWRRecord } from "../records/NWRRecord";
import { REVRecord } from "../records/REVRecord";
import { EXCRecord } from "../records/EXCRecord";
import { ISWRecord } from "../records/ISWRecord";
import { SPURecord } from "../records/SPURecord";
import { SPTRecord } from "../records/SPTRecord";
import { SWTRecord } from "../records/SWTRecord";
import { OPURecord } from "../records/OPURecord";
import { OPTRecord } from "../records/OPTRecord";
import { PWRRecord } from "../records/PWRRecord";
import { OWRRecord } from "../records/OWRRecord";
import { SWRRecord } from "../records/SWRRecord";
import { ALTRecord } from "../records/ALTRecord";
import { PERRecord } from "../records/PERRecord";
import { RECRecord } from "../records/RECRecord";
import { ORNRecord } from "../records/ORNRecord";
import { VERRecord } from "../records/VERRecord";
import { TRLRecord } from "../records/TRLRecord";

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
  | InstanceType<typeof TRLRecord>;

export type RecordTypeKey =
  | 'HDR' | 'GRH' | 'GRT' | 'EWT' | 'NWR' | 'REV' | 'EXC' | 'ISW'
  | 'SPU' | 'SPT' | 'SWT' | 'OPU' | 'OPT' | 'PWR' | 'OWR' | 'SWR'
  | 'ALT' | 'PER' | 'REC' | 'ORN' | 'VER' | 'TRL';

export type AllCWRData =
  | HDRData
  | REVData
  | GRHData
  | NWRData
  | SPUData
  | SPTData
  | SWRData
  | SWTData
  | PWRData
  | ORNData
  | TRLData
  | GRTData
  | ALTData
  | PERData
  | RECData;

export type RecordConstructor = new (options: CWRRecordOptions) => RecordInstance;

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
  otherPublishers: CWRParsedRecord<OPUData>[];
  writers: CWRWriter[];
  otherWriters: CWRParsedRecord<OWRData>[];
  alternativeTitles: CWRParsedRecord<ALTData>[];
  performers: CWRParsedRecord<PERData>[];
  recordings: CWRParsedRecord<RECData>[];
  originators: CWRParsedRecord<ORNData>[];
}

// Statistics
export interface ParseStatistics {
  totalRecords: number;
  recordCounts: Record<string, number>;
  errors: string[];
  warnings: string[];
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
  cwrVersion: string | null;
  cwrRevision: string | null;
  softwarePackage: string | null;
  softwarePackageVersion: string | null;
}

export interface GRHData {
  recordType: 'GRH';
  transactionType: string;
  groupId: string;
  versionNumber: string;
  batchRequestId: string;
  distType: string | null;
}

export interface GRTData {
  recordType: 'GRT';
  // Fill in if needed
}

// --- TRAILER RECORD ---

export interface TRLData {
  recordType: 'TRL';
  groupCount: number;
  transactionCount: number;
  recordCount: number;
}



export interface NWRData {
  recordType: 'NWR';
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

export interface REVData extends NWRData {}

export interface SPUData {
  recordType: 'SPU';
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

export interface OPUData extends SPUData {};

export interface SPTData {
  recordType: 'SPT';
  transactionSequenceNumber: string | number;
  recordSequenceNumber: string |number;
  publisherIpNumber: string;
  constant: string;
  prCollectionShare: string | number;
  mrCollectionShare: string | number;
  srCollectionShare: string |number;
  inclusionExclusionIndicator: string;
  tisCode: string;
  sharesChange: string | boolean;
  sequenceNumber: string |number;
}

export interface SWRData {
  recordType: 'SWR';
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

export interface OWRData extends SWRData {};

export interface SWTData {
  recordType: 'SWT';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  writerIpNumber: string;
  prCollectionShare: number;
  mrCollectionShare: number | null;
  srCollectionShare: number | null;
  inclusionExclusionIndicator: string;
  tisCode: string;
  sharesChange: boolean;
  sequenceNumber: number;
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
  cutNumber: string;
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
}

export interface PERData {
  recordType: 'PER';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  performingArtistLastName: string | null;
  performingArtistFirstName: string | null;
  performingArtistIpiNameNumber: string | null;
  performingArtistIpiBaseNumber: string | null;
}

export interface ALTData {
  recordType: 'PER';
  transactionSequenceNumber: number;
  recordSequenceNumber: number;
  alternativeTitle: string;
  titleType: string | null;
  languageCode: string | false;
}

// Wrapper types that include nested structures
export interface CWRPublisher extends CWRParsedRecord<SPUData> {
  territories?: CWRParsedRecord<SPTData>[];
}

export interface CWRWriter extends CWRParsedRecord<SWRData> {
  territories?: CWRParsedRecord<SWTData>[];
  publishers?: CWRParsedRecord<PWRData>[];
}


export interface FieldDefinition {
  name: string;
  type: string;
  length: number;
  required?: boolean;
  [key: string]: any; 
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
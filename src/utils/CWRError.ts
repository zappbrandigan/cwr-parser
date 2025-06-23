import { CWRErrorDetails, CWRErrorJSON } from "../types";

/**
 * Custom error class for CWR parsing errors
 */
class CWRError extends Error {
  code: string;
  details: CWRErrorDetails;
  
  constructor(message: string, code = 'CWR_ERROR', details: CWRErrorDetails = {}) {
    super(message);
    this.name = 'CWRError';
    this.code = code;
    this.details = details;
    
    // Capture stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CWRError);
    }
  }

  /**
   * Convert error to JSON
   */
  toJSON(): CWRErrorJSON {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      details: this.details,
      stack: this.stack
    };
  }
}

export { CWRError };
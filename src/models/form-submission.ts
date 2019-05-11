import mongoose, { Schema } from 'mongoose';

export interface FormSubmission {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  domain: string;
  browser: IUAParser.IBrowser;
}

export interface SubmissionFilterOptions {
  domain: string;
  from: string;
  until: string;
  skip: string;
  limit: string;
}

export interface SubmissionFindResult {
  [key: string]: FormSubmission;
}

const FormSubmissionSchema: Schema = new Schema(
  {},
  {
    strict: false,
    timestamps: { createdAt: true },
  }
);

export const FormSubmissionModel = mongoose.model('FormSubmission', FormSubmissionSchema);

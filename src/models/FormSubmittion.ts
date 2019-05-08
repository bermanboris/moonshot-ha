import mongoose, { Schema } from 'mongoose';

const FormSubmissionSchema: Schema = new Schema(
  {},
  { strict: false, timestamps: { createdAt: true } }
);

export const FormSubmission = mongoose.model('FormSubmission', FormSubmissionSchema);

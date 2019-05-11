import { injectable } from 'inversify';
import {
  FormSubmissionModel,
  FormSubmission,
  SubmissionFilterOptions,
} from '../models/form-submission';

@injectable()
export class FormSubmissionService {
  public createSubmission(submission: FormSubmission) {
    return FormSubmissionModel.create(submission);
  }

  public findSubmissions(options: SubmissionFilterOptions) {
    const { domain, from, until, skip, limit } = options;

    return FormSubmissionModel.find({
      domain: domain,
      created_at: { $lte: from, $gte: until },
    })
      .skip(+skip)
      .limit(+limit);
  }
}

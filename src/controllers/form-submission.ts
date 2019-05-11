import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import { Constants } from '../constants';
import { FormSubmissionService } from '../services/form-submission';
import { rateLimiter } from '../middleware';

@controller('/')
export class FormSubmissionController {
  public constructor(
    @inject(Constants.FormSubmission)
    private formSubmissionService: FormSubmissionService
  ) {}

  @httpPost('/', rateLimiter(1, 3))
  public async addSubmission(req: Request) {
    return this.formSubmissionService.createSubmission({
      ...req.body,
      domain: req.hostname,
      browser: req.userAgent.browser,
    });
  }

  @httpGet('/')
  public async findSubmissions(req: Request, res: Response) {
    const submissions = await this.formSubmissionService.findSubmissions(req.query);

    if (submissions.length === 0) {
      return res
        .status(500)
        .json({ error: 'No submissions found. Try changing your filters..' });
    }

    return {
      [req.query.domain]: submissions,
    };
  }
}

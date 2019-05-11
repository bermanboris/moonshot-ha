import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { applyMiddlewares } from './middleware';
import './controllers/form-submission';
import { FormSubmissionService } from './services/form-submission';
import { Constants } from './constants';

export const container = new Container();

container
  .bind(Constants.FormSubmission)
  .to(FormSubmissionService)
  .inSingletonScope();

const inversifyServer = new InversifyExpressServer(container);
inversifyServer.setConfig(applyMiddlewares);

export const server = inversifyServer.build();

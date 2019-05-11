import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Constants } from './constants';
import './controllers/form-submission';
import { applyMiddlewares } from './middleware';
import { FormSubmissionService } from './services/form-submission';

export const container = new Container();

container
  .bind(Constants.FormSubmission)
  .to(FormSubmissionService)
  .inSingletonScope();

export const inversifyServer = new InversifyExpressServer(container);
inversifyServer.setConfig(applyMiddlewares);

export const server = inversifyServer.build();

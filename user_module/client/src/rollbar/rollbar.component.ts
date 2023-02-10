import * as Rollbar from 'rollbar';
import {Inject, Injectable, ErrorHandler, InjectionToken} from "@angular/core"

const rollbarConfig = {
  accessToken: '9d9488881de94437acddd1562b0a9f5c',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

@Injectable()
export class RollbarErrorHandler implements ErrorHandler {
  constructor(@Inject(RollbarService) private rollbar: Rollbar) {}

  handleError(err:any) : void {
    this.rollbar.error(err.originalError || err);
  }
}

export function rollbarFactory() {
  return new Rollbar(rollbarConfig);
}

export const RollbarService = new InjectionToken<Rollbar>('rollbar');

/** @format */

import User from '../user';

export const nodeEnvApp: CFEnvApp = {
  getParams(): CFQueryParams {
    return User.info;
  },
  gotoStartPage(params: CFQueryParams): void {
    return;
  },
  gotoSurveyPage(params: CFQueryParams): void {
    return;
  },
};

export interface AuthParams {
  userId?: number;
  googleId?: number;
  password?: string;
  email?: string;
  newPassword?: string;
  resetCode?: string;
}

export interface Params extends AuthParams {
  userId?: number;
  id?: number;
  emailConfirmCode?: string;
  email?: string;
  keyid?: number;
  stripeToken?: string;
  role?: number;
  alertEnabled?: boolean;
  code?: string;
  domain?: string;
}

export interface UserControllerMethodsType {
  createUser(params: Params, chain: boolean): Promise<any>;
  getUser(params: Params, chain: boolean): Promise<any>;
  getUsers(chain: boolean): Promise<any>;
  getAllUsers(chain: boolean): Promise<any>;
  updateApiUsage(params: Params, chain: boolean): Promise<any>;
  verifyUser(params: AuthParams): Promise<any>;
  confirmEmail(params: Params): Promise<any>;
  addPaymentSubscription(params: Params): Promise<any>;
  cancelSubscription(params: Params): Promise<any>;
  updateUser(params: Params, chain: boolean): Promise<any>;
  forgotPassword(params: Params, chain: boolean): Promise<any>;
  toggleAlert(params: Params, chain: boolean): Promise<any>;
  resetPassword(params: Params, chain: boolean): Promise<any>;
  updateScanAttempt(params: Params, chain: boolean): Promise<any>;
  validateEmail(params: Params, chain: boolean): Promise<any>;
  unsubscribeEmails(params: Params): Promise<any>;
  sendWebsiteOffline(params: Params): Promise<any>;
}

export interface UserControllerType {
  (user?: any): UserControllerMethodsType;
}

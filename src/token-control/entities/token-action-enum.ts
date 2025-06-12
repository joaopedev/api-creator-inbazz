export enum TokenAction {
  LOGIN = 'login',
  LOGOUT = 'logout',
  TOKEN_REFRESHED = 'token_refreshed',
  TOKEN_REVOKED = 'token_revoked',
  USER_MODIFIED = 'user_modified',
  USER_RECOVERY_REQUESTED = 'user_recovery_requested',
  USER_REPEATED_SIGNUP = 'user_repeated_signup',
  USER_SIGNEDUP = 'user_signedup',
  USER_UPDATED_PASSWORD = 'user_updated_password',
}


// Definindo o Enum para os tipos de token
export enum TokenType {
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  CREATE_USER = 'CREATE_USER',
}
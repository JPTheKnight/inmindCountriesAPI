export interface RegisterResponse {
  id: string;
  createdTimestamp: number;
  username: string;
  enabled: boolean;
  totp: boolean;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  email: string;
  disableableCredentialTypes: any[];
  requiredActions: any[];
  notBefore: number;
  access: Access;
  attributes: null;
}

export interface Access {
  manageGroupMembership: boolean;
  view: boolean;
  mapRoles: boolean;
  impersonate: boolean;
  manage: boolean;
}

export interface LoginResponse {
  Login: LoginRes;
}

export interface LoginRes {
  AccessToken: string;
  ExpiresIn: number;
  RefreshExpiresIn: number;
  RefreshToken: string;
  TokenType: string;
  NotBeforePolicy: number;
  SessionState: string;
  Scope: string;
}

export interface DecodedAccessToken {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  acr: string;
  realm_access: RealmAccess;
  resource_access: ResourceAccess;
  scope: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}

export interface RealmAccess {
  roles: string[];
}

export interface ResourceAccess {
  account: RealmAccess;
}

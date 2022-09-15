export interface Registration {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  RoleName: string;
}

export interface Login {
  Username: string;
  Password: string;
}

export interface Logout {
  Token: string;
  RefreshToken: string;
}

export interface Delete {
  KeycloakId: string;
}

export interface RefreshToken {
  RefreshToken: string;
}

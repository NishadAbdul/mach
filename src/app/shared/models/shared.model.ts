export class CommonResponse {
  public applicationIdentifier: string;
}

export class ValidateUserResponse {
  isSessionValid: boolean
}

export class licenseConfig {
  lending: boolean;
  deposit: boolean;
  both: boolean;
  isLoanFirst: boolean;
}

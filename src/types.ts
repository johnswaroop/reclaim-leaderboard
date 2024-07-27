export interface GoogleUserPayload {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}

type ResponseMatch = {
  type: string;
  value: string;
};

type ResponseRedaction = {
  jsonPath: string;
  regex: string;
  xPath: string;
};

type ParamValues = {
  [label: string]: string;
};

type Parameters = {
  body: string;
  geoLocation: string;
  method: string;
  paramValues: ParamValues;
  responseMatches: ResponseMatch[];
  responseRedactions: ResponseRedaction[];
  url: string;
};

type Context = {
  contextAddress: string;
  contextMessage: string;
  extractedParameters: ParamValues;
  providerHash: string;
};

type ClaimData = {
  provider: string;
  parameters: string | Parameters;
  owner: string;
  timestampS: number;
  context: string | Context;
  identifier: string;
  epoch: number;
};

type Witness = {
  id: string;
  url: string;
};

type Signature = string;

export type Claim = {
  identifier: string;
  claimData: ClaimData;
  witnesses: Witness[];
  signatures: Signature[];
};

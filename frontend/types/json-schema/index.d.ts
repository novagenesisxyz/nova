declare module "json-schema" {
  export type JSONSchema4 = Record<string, unknown>;
  export type JSONSchema6 = Record<string, unknown>;
  export type JSONSchema7 = Record<string, unknown>;
  export interface Schema extends Record<string, unknown> {}
}

declare namespace JSONSchema {
  export type JSONSchema4 = Record<string, unknown>;
  export type JSONSchema6 = Record<string, unknown>;
  export type JSONSchema7 = Record<string, unknown>;
}

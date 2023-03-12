export interface IBaseModel {
  id?: ID;
  name?: any;

  toString(): string;
}

export type ID = number | string;

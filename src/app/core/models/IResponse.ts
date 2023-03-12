export interface StringIndexer<T> {
  [key: string]: T[];
}

export type IResponse<T> = StringIndexer<T> & {
  status?: string;
  message?: string;
  totalCount?: string | number;
  list?: any;
  children?: IResponse<any>[];
};

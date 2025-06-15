// 単一のクエリパラメータを更新するためのインターフェース
export interface QueryParam {
  name: string;
  value: string | number | boolean | null | undefined;
}

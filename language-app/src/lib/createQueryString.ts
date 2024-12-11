/**
 * 指定された検索パラメータに新しいパラメータを追加または削除して、クエリ文字列を生成します。
 *
 * @param {URLSearchParams | string} searchParams - 現在の検索パラメータ。`URLSearchParams` オブジェクトまたはクエリ文字列として渡されます。
 * @param {string} name - クエリパラメータのキー名。
 * @param {string} value - 設定するクエリパラメータの値。値が空の場合、そのパラメータが削除されます。
 * @returns {string} 更新されたクエリ文字列。
 */

export const createQueryString = (
  searchParams: URLSearchParams | string,
  name: string,
  value: string
): string => {
  const params = new URLSearchParams(searchParams.toString());
  if (value) {
    params.set(name, value);
  } else {
    params.delete(name);
  }

  return params.toString();
};

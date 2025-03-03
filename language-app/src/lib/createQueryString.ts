/**
 * 単一のクエリパラメータを更新するためのインターフェース
 */
interface QueryParam {
  name: string;
  value: string | number | boolean | null | undefined;
}

/**
 * 指定された検索パラメータに新しいパラメータを追加または削除して、クエリ文字列を生成します。
 *
 * @param {URLSearchParams | string} searchParams - 現在の検索パラメータ。`URLSearchParams` オブジェクトまたはクエリ文字列として渡されます。
 * @param {string} name - クエリパラメータのキー名。
 * @param {string | number | boolean | null | undefined} value - 設定するクエリパラメータの値。
 *    - 文字列、数値、真偽値: その値がパラメータとして設定されます。
 *    - null または undefined または空文字列: そのパラメータが削除されます。
 * @param {boolean} [resetPage=false] - trueの場合、'page'パラメータを'1'にリセットします。
 * @returns {string} 更新されたクエリ文字列。
 */
export function createQueryString(
  searchParams: URLSearchParams | string,
  name: string,
  value: string | number | boolean | null | undefined,
  resetPage: boolean = false
): string {
  const params = new URLSearchParams(searchParams.toString());

  // 値に基づいてパラメータを設定または削除
  if (value === null || value === undefined || value === "") {
    params.delete(name);
  } else {
    params.set(name, value.toString());
  }

  // ページをリセットするオプション
  if (resetPage && name !== "page") {
    params.set("page", "1");
  }

  return params.toString();
}

/**
 * 複数のクエリパラメータを一度に更新するためのバッチ処理関数
 *
 * @param {URLSearchParams | string} searchParams - 現在の検索パラメータ
 * @param {QueryParam[]} queryParams - 更新するパラメータの配列
 * @param {boolean} [resetPage=false] - trueの場合、'page'パラメータを'1'にリセットします
 * @returns {string} 更新されたクエリ文字列
 */
export function updateQueryBatch(
  searchParams: URLSearchParams | string,
  queryParams: QueryParam[],
  resetPage: boolean = false
): string {
  const params = new URLSearchParams(searchParams.toString());

  // すべてのパラメータを処理
  queryParams.forEach(({ name, value }) => {
    if (value === null || value === undefined || value === "") {
      params.delete(name);
    } else {
      params.set(name, value.toString());
    }
  });

  // ページをリセットする
  if (resetPage) {
    params.set("page", "1");
  }

  return params.toString();
}

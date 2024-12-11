/**
 * 学習ステータスに応じたテキストを取得します。
 *
 * @param {number} status - 学習ステータスを表す数値。
 *   - 1: 未学習
 *   - 2: 1回目
 *   - 3: 2回目
 *   - 4: 3回目
 *   - 99: 習得済
 * @returns {string} 対応する学習ステータスのテキスト。
 */

export const getLearningStatusText = (status: number) => {
  switch (status) {
    case 1:
      return "未学習";
    case 2:
      return "1回目";
    case 3:
      return "2回目";
    case 4:
      return "3回目";
    case 99:
      return "習得済";
    default:
      return "未学習";
  }
};

/**
 * 日付をフォーマットして文字列として返します。
 *
 * @param {Date | null} date - フォーマット対象の日付オブジェクト。nullの場合は"Not available"を返します。
 * @returns {string} フォーマット済みの日付文字列。または、データがない場合は "Not available"。
 */
export const formatDate = (date: Date | null) => {
  if (!date) return "Not available";
  return new Date(date).toLocaleDateString();
};

import { ERROR_MESSAGES } from "@/config/errorMessage";
import { createErrorResponse } from "@/lib/backend/createErrorResponse";
import { getErrorMessage } from "@/lib/getErrorMessage";
import prisma from "@/lib/prisma";
import { Word } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const data = await prisma.word.findMany({
      orderBy: {
        id: "asc",
      },
    });

    /**
     * 転置処理関数：1オブジェクトを1列として配置するCSV文字列を作成
     * @param data
     * @returns
     */
    const transposeDataToColumns = (data: Word[]) => {
      if (!data || data.length === 0) return "";

      // 最初のオブジェクトから全フィールド名を取得
      const keys = Object.keys(data[0]) as (keyof Word)[];

      // 各キーごとに、フィールド名を先頭に、そのフィールドの各レコードの値を右側に追加する
      const rows = keys.map((key: keyof Word) => {
        const row: string[] = [key];
        data.forEach((record: Word) => {
          row.push(record[key] === null ? "" : String(record[key]));
        });
        return row;
      });

      // 2次元配列をCSV文字列に変換（カンマ区切り、改行で区切る）
      return rows.map((row) => row.join(",")).join("\n");
    };

    /**
     * CSVの行列を転置する
     * @param csvString
     * @returns
     */
    const invertCSV = (csvString: string) => {
      // 改行ごとに分割して、各行をカンマで分割
      const rows = csvString.split("\n").map((row) => row.split(","));
      // 転置：rows[0].length 分の配列を作成し、各要素に各行の該当カラムを詰める
      const inverted = rows[0].map((_, colIndex) =>
        rows.map((row) => row[colIndex])
      );
      // 配列をCSV文字列に変換（各行はカンマ区切り、行同士は改行で結合）
      return inverted.map((row) => row.join(",")).join("\n");
    };

    // 転置したCSV文字列を生成
    const csv = invertCSV(transposeDataToColumns(data));

    return NextResponse.json({ data: csv });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("Error:", errorMessage);
    return createErrorResponse(ERROR_MESSAGES.BACKEND.GENERAL.UNEXPECTED, 500);
  }
}

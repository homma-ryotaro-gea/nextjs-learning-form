import { schema } from "@/schema/registrationSchema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  // リクエストデータを取得
  const data = await req.json();
  // リクエストデータをスキーマに従ってバリデーション
  const parsed = schema.safeParse(data);
  // バリデーション結果によって処理を分岐
  if (parsed.success) {
    // バリデーション成功時の処理
    return NextResponse.json({
      message: "ユーザー登録が完了しました",
      user: parsed.data,
    });
  } else {
    // バリデーション失敗時の処理
    return NextResponse.json(
      {
        message: "データが不正のため登録に失敗しました",
        error: parsed.error,
      },
      { status: 400 }
    );
  }
};

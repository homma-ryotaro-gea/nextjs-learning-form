"use server";

import { draftSchema, schema } from "@/schema/registrationSchema";
import { DraftFormType, FormType } from "@/types";

export const onDataAction = async (
  data: FormType
): Promise<{
  message: string;
  user?: FormType;
  issues?: string[];
}> => {
  console.log(data);
  // バリデーション
  const parsed = await schema.safeParseAsync(data);
  // バリデーション結果によって処理を分岐
  if (parsed.success) {
    // バリデーション成功時の処理
    return {
      message: "ユーザー登録が完了しました",
      user: parsed.data,
    };
  } else {
    // バリデーション失敗時の処理
    return {
      message: "データが不正のため登録に失敗しました",
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }
};

export const onFormAction = async (
  _prevState: {
    message: string;
    user?: FormType;
    issues?: string[];
  },
  formData: FormData
): Promise<{
  message: string;
  user?: FormType;
  issues?: string[];
}> => {
  const data = Object.fromEntries(formData);
  console.log("登録データ", data);
  // バリデーション
  const parsed = await schema.safeParseAsync(data);
  // バリデーション結果によって処理を分岐
  if (parsed.success) {
    // バリデーション成功時の処理
    return {
      message: "ユーザー登録が完了しました",
      user: parsed.data,
    };
  } else {
    // バリデーション失敗時の処理
    return {
      message: "データが不正のため登録に失敗しました",
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }
};
export const onFormDraftAction = async (
  _prevState: {
    message: string;
    user?: DraftFormType;
    issues?: string[];
  },
  formData: FormData
): Promise<{
  message: string;
  user?: DraftFormType;
  issues?: string[];
}> => {
  const data = Object.fromEntries(formData);
  console.log("下書きデータ", data);
  // バリデーション
  const parsed = await draftSchema.safeParseAsync(data);
  // バリデーション結果によって処理を分岐
  if (parsed.success) {
    // バリデーション成功時の処理
    return {
      message: "下書き保存が完了しました",
      user: parsed.data,
    };
  } else {
    // バリデーション失敗時の処理
    return {
      message: "データが不正のため下書き保存に失敗しました",
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }
};

/**
 * 郵便番号のバリデーション
 * @param zipCode
 * @returns
 */
export async function validateZipCode(zipCode: string): Promise<boolean> {
  // 空文字の場合はスキップ
  if (!zipCode) {
    return true;
  }
  return /^\d{7}/.test(zipCode) && zipCode.startsWith("9");
}

/**
 * メールアドレスの形式バリデーション
 */
export async function validateEmail(email: string): Promise<boolean> {
  // 空文字の場合はスキップ
  if (!email) {
    return true;
  }
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

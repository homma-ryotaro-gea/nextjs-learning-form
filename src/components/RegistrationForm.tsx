"use client";
import { draftSchema, schema } from "@/schema/registrationSchema";
import { DraftFormType, FormType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const RegistrationForm = ({
  onFormAction,
  onFormDraftAction,
}: {
  onFormAction: (
    prevState: {
      message: string;
      user?: FormType;
      issues?: string[];
    },
    data: FormData
  ) => Promise<{
    message: string;
    user?: FormType;
    issues?: string[];
  }>;
  onFormDraftAction: (
    prevState: {
      message: string;
      user?: DraftFormType;
      issues?: string[];
    },
    data: FormData
  ) => Promise<{
    message: string;
    user?: DraftFormType;
    issues?: string[];
  }>;
}) => {
  // フォームの状態管理
  const [state, formAction] = useFormState(onFormAction, { message: "" });
  const [draftState, draftFormAction] = useFormState(onFormDraftAction, {
    message: "",
  });

  // フォームの参照
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const [draftOpen, setDraftOpen] = useState(false);
  // 共通のフォーム
  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      first: "",
      last: "",
      email: "",
      zipcode: "",
    },
  });

  // 本登録の送信処理
  const handleFullSubmit = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      formRef.current?.requestSubmit();
      setOpen(true);
    }
  };

  // 下書き保存の送信処理
  const handleDraftSubmit = async () => {
    // 下書き保存時は現在のバリデーションをクリアして下書き用のバリデーションを実行
    form.clearErrors();

    const data = form.getValues();
    console.log(data);

    const result = await draftSchema.safeParseAsync(data);

    if (result.success) {
      const formData = new FormData(formRef.current || undefined);
      draftFormAction(formData);
      setDraftOpen(true);
      setOpen(true);
      // フォーム内容リセット
    } else if (!result.success) {
      // バリデーションエラーの処理
      const errors = result.error.errors.reduce(
        (acc: Record<string, string>, curr) => {
          if (curr.path[0]) {
            acc[curr.path[0].toString()] = curr.message;
          }
          return acc;
        },
        {}
      );

      // エラーをフォームに設定
      Object.keys(errors).forEach((key) => {
        form.setError(key as keyof FormType, {
          type: "manual",
          message: errors[key],
        });
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <div>{state.message}</div>
        <div>{draftState.message}</div>
        <form ref={formRef} action={formAction} className="space-y-8">
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="first"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>姓</FormLabel>
                  <FormControl>
                    <Input placeholder="山田" {...field} />
                  </FormControl>
                  <FormDescription>姓を入力してください</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>名</FormLabel>
                  <FormControl>
                    <Input placeholder="太朗" {...field} />
                  </FormControl>
                  <FormDescription>名を入力してください</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input placeholder="example@test.com" {...field} />
                </FormControl>
                <FormDescription>
                  メールアドレスを入力してください
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>郵便番号</FormLabel>
                <FormControl>
                  <Input placeholder="0001111" {...field} />
                </FormControl>
                <FormDescription>郵便番号を入力してください</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <Button type="button" onClick={handleFullSubmit}>
              本登録する
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleDraftSubmit}
            >
              下書き保存
            </Button>
          </div>
        </form>
      </Form>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {draftOpen ? "下書き保存が完了しました" : "登録が完了しました"}
            </DialogTitle>
            <DialogClose>
              <Button variant={"outline"} onClick={() => setOpen(false)}>
                前の画面に戻る
              </Button>
            </DialogClose>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RegistrationForm;

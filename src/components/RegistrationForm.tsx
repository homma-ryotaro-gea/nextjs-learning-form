"use client";
import { schema } from "@/schema/registrationSchema";
import { FormType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
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

const RegistrationForm = () => {
  // フォームの初期化
  const form = useForm<FormType>({
    // zodスキーマを使ってバリデーションを行う
    resolver: zodResolver(schema),
    // フォームの初期値
    defaultValues: {
      first: "",
      last: "",
      email: "",
    },
  });
  /**
   * クライアント送信処理
   * @param data
   */
  const onSubmit = async (data: FormType) => {
    // ユーザー登録処理
    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      // jsonに変換
      .then((res) => res.json())
      // 出力
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <Button type="submit">送信する</Button>
      </form>
    </Form>
  );
};

export default RegistrationForm;

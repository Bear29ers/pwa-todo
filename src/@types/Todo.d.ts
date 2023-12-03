/**
 * 他ファイルからも参照できるよう、型宣言ファイルとして書き出す
 * @see https://typescript-jp.gitbook.io/deep-dive/type-system/intro/d.ts
 *
 * declareキーワード（アンビエント宣言）で型を宣言する
 */
declare type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
};

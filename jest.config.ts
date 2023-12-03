/** @types {import('@jest/types').Config.InitialOptions} */

import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  // Typescript用プリセット
  preset: 'ts-jest',
  // テスト環境
  testEnvironment: 'jsdom',
  // カバレッジ（テストコードの網羅率）を収集
  collectCoverage: true,
  // コンソール上でのみカバレッジを報告
  coverageReporters: ['text'],
};

export default config;

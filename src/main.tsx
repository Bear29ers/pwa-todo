import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// eslint-disable-next-line import/no-unresolved
import { registerSW } from 'virtual:pwa-register';

import App from './App';

/**
 * createRootメソッドを使って、index.html内のid="root"の要素を取得し、Reactルートとする
 * @see https://ja.react.dev/reference/react-dom/client/createRoot
 *
 * document.getElementById('id')がnullである可能性もあるため、ここでは型アサーションする
 */
const root = createRoot(document.getElementById('root') as Element);

/**
 * renderメソッドでDOM内部へReact要素である<App />コンポーネントをレンダリングする
 * @see https://ja.react.dev/reference/react-dom/client/createRoot#root-render
 *
 * <StrictMode>タグは開発環境のみ動作し、バグの早期発見に役立つ
 * @see https://ja.react.dev/reference/react/StrictMode
 */
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
registerSW();

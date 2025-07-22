/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// Add this to declare the i18n types globally
import 'vue-i18n';

declare module 'vue-i18n' {
  export interface ComponentCustomProperties {
    $t: (key: string) => string;
  }

  interface DefineLocaleMessage {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

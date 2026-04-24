/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>;
  export default component;
}

// Add this to declare the i18n types globally
import 'vue-i18n';

declare module 'vue-i18n' {
  export interface ComponentCustomProperties {
    $t: (key: string) => string;
  }

  interface DefineLocaleMessage {
    
    [key: string]: unknown;
  }
}

declare global {
  const __APP_BUILD_ID__: string;

  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: unknown;
    }
  }
}

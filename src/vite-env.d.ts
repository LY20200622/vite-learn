/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MY_KEY: string;
  readonly VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

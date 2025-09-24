/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly FITORA_BASE_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

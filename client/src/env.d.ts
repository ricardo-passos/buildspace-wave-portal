interface ImportMetaEnv {
  readonly VITE_DEV_WAVE_PORTAL_SMART_CONTRACT_ADDRESS: string
  readonly VITE_PROD_WAVE_PORTAL_SMART_CONTRACT_ADDRESS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
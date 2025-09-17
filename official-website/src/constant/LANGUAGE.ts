const LANGUAGE = {
  EN: 'en',
  EN_US: 'en-us',
  CN: 'cn',
  ZH: 'zh',
  ZH_CN: 'zh-cn',
  ZH_HK: 'zh-hk',
  ZH_TW: 'zh-tw',
  ZH_HANT: 'zh-hant',
  ZH_HANS: 'zh-hans',
  AUTO: 'auto',
} as const

type LANGUAGE = typeof LANGUAGE[keyof typeof LANGUAGE]

export default LANGUAGE

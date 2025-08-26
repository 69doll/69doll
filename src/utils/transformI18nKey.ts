import { match, P } from "ts-pattern"
import LANGUAGE from "../constant/LANGUAGE";

export default function transformI18nKey(lang: string = LANGUAGE.EN_US): LANGUAGE {
  return match(lang.toLowerCase())
    // Simplified Chinese
    .with(P.union(LANGUAGE.ZH_CN, LANGUAGE.ZH_HANS), () => LANGUAGE.ZH_CN)
    .otherwise(() => LANGUAGE.EN_US)
}

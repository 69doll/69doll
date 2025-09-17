import { match } from "ts-pattern"
import LANGUAGE from "../constant/LANGUAGE";
import SUPPORTED_LANGUAGE from "../constant/SUPPORTED_LANGUAGE";

export default function transformI18nKey(lang: string = LANGUAGE.EN_US): SUPPORTED_LANGUAGE {
  return match(lang.toLowerCase())
    // Simplified Chinese
    // .with(P.union(LANGUAGE.ZH_CN, LANGUAGE.ZH_HANS), () => SUPPORTED_LANGUAGE.ZH_CN)
    .otherwise(() => SUPPORTED_LANGUAGE.EN_US)
}

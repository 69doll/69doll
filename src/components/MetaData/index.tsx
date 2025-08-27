import { useLoaderData } from "react-router-dom";
import { Head } from "vite-react-ssg";
import loaderData from "../../utils/loaderData";
import useCurrentLanguage from "../../hooks/useCurrentLanguage";
import { useMemo } from "react";
import { match, P } from "ts-pattern";
import LANGUAGE from "../../constant/LANGUAGE";

export default function MetaData() {
  const data = useLoaderData() as ReturnType<typeof loaderData>
  const currentLanguage = useCurrentLanguage()
  const lang = useMemo(
    () => match(currentLanguage)
      .with(P.union(LANGUAGE.ZH, LANGUAGE.ZH_CN, LANGUAGE.ZH_HK, LANGUAGE.ZH_TW, LANGUAGE.ZH_HANT, LANGUAGE.ZH_HANS), () => LANGUAGE.CN)
      .otherwise(() => LANGUAGE.EN),
    [currentLanguage]
  )
  return (
    <Head>
      <html lang={lang} />
      <title>{data?.getTitle?.() ?? "69Doll"}</title>
      {
        (data?.getMetaData?.() ?? []).map((meta: any) => {
          return <meta {...meta} />
        })
      }
    </Head>
  )
}

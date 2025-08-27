import { useLoaderData } from "react-router-dom";
import { Head } from "vite-react-ssg";
import loaderData from "../../utils/loaderData";
import useCurrentLanguage from "../../hooks/useCurrentLanguage";
import { useMemo } from "react";
import { match } from "ts-pattern";
import LANGUAGE from "../../constant/LANGUAGE";
import SUPPORTED_LANGUAGE from "../../constant/SUPPORTED_LANGUAGE";

export default function MetaData() {
  const data = useLoaderData() as ReturnType<typeof loaderData>
  const currentLanguage = useCurrentLanguage()
  const lang = useMemo(
    () => match(currentLanguage)
      .with(SUPPORTED_LANGUAGE.ZH_CN, () => LANGUAGE.CN)
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

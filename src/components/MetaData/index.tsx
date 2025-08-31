import { useLoaderData } from "react-router-dom";
import { Head } from "vite-react-ssg";
import loaderData from "../../utils/loaderData";
import useCurrentLanguage from "../../hooks/useCurrentLanguage";
import { useMemo } from "react";
import { match } from "ts-pattern";
import LANGUAGE from "../../constant/LANGUAGE";
import SUPPORTED_LANGUAGE from "../../constant/SUPPORTED_LANGUAGE";
import getImageUrl from "../../utils/getImageUrl";

export default function MetaData() {
  const data = useLoaderData() as ReturnType<typeof loaderData>
  const currentLanguage = useCurrentLanguage()
  const lang = useMemo(
    () => match(currentLanguage)
      .with(SUPPORTED_LANGUAGE.ZH_CN, () => LANGUAGE.CN)
      .otherwise(() => LANGUAGE.EN),
    [currentLanguage]
  )
  const defaultLinks = [
    { rel: "shortcut icon", href: getImageUrl("/favicon.ico", { cdn: true }) },
    { rel: "icon", sizes: "16x16 32x32 48x48 64x64", href: getImageUrl("/favicon.ico", { cdn: true }) },
    ...[
      { width: 192, height: 192 },
      { width: 160, height: 160 },
      { width: 96, height: 96 },
      { width: 64, height: 64 },
      { width: 48, height: 48 },
      { width: 32, height: 32 },
      { width: 16, height: 16 },
    ].map((resize) => ({ rel: "icon", type: "image/png", sizes: `${resize.width}x${resize.height}`, href: getImageUrl("/favicon.png", { cdn: true, resize: resize }) })),
    ...[
      { width: 114, height: 114 },
      { width: 72, height: 72 },
      { width: 144, height: 144 },
      { width: 60, height: 60 },
      { width: 120, height: 120 },
      { width: 76, height: 76 },
      { width: 152, height: 152 },
      { width: 180, height: 180 },
    ].map((resize) => ({ rel: "apple-touch-icon", sizes: `${resize.width}x${resize.height}`, href: getImageUrl("/favicon.png", { cdn: true, resize: resize }) })),
    { rel: "apple-touch-icon", href: "/favicon-57.png" },
  ]
  return (
    <Head>
      <html lang={lang} />
      <title>{data?.getTitle?.() ?? "69Doll"}</title>
      {
        defaultLinks.map((linkObj, index) => <link {...linkObj} key={`link-${index}`} />)
      }
      {
        (data?.getMetaData?.() ?? []).map((meta: any, index) => {
          return <meta key={`meta-${index}`} {...meta} />
        })
      }
    </Head>
  )
}

import { useLoaderData } from "react-router-dom";
import { Head } from "vite-react-ssg";
import loaderData from "../../utils/loaderData";

export default function MetaData() {
  const data = useLoaderData() as ReturnType<typeof loaderData>
  return (
    <Head>
      <title>{data?.getTitle?.() ?? "69Doll"}</title>
      {
        (data?.getMetaData?.() ?? []).map((meta: any) => {
          return <meta {...meta} />
        })
      }
    </Head>
  )
}

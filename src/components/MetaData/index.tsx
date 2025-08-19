import { useLoaderData } from "react-router-dom";
import { Head } from "vite-react-ssg";
import loaderData from "../../utils/loaderData";

export default function MetaData() {
  const data = loaderData(useLoaderData() as any)
  return (
    <Head>
      <title>{data.getTitle() ?? "69Doll"}</title>
      {
        (data.getMetaData() ?? []).map((meta: any) => {
          return <meta {...meta} />
        })
      }
    </Head>
  )
}

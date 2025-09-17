import { useParams } from "react-router-dom";

export default function useRouterLanguage () {
  const { lang } = useParams()
  return lang
}

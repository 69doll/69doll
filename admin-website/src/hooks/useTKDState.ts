import { useMemo, useState } from "react";

interface TKDState {
  title: string,
  description: string,
  keywords: string,
}
type initialTKDState = TKDState

export default function useTKDState (defaultValue?: initialTKDState) {
  const [title, setTitle] = useState(defaultValue?.title)
  const [description, setDescription] = useState(defaultValue?.description)
  const [keywords, setKeywords] = useState(defaultValue?.keywords)
  const setTKD = (key: 'title' | 'description' | 'keywords', value: string) => {
    if (key === 'title') setTitle(value)
    if (key === 'description') setDescription(value)
    if (key === 'keywords') setKeywords(value)
  }
  const initTKD = (data: Partial<TKDState>) => {
    setTitle(data.title)
    setDescription(data.description)
    setKeywords(data.keywords)
  }
  const tkd = useMemo(() => ({
    title, description, keywords
  }), [title, description, keywords])
  return [
    tkd,
    setTKD,
    initTKD,
  ] as const
}

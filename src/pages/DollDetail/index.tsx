import { useEffect, useMemo, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { cloneDeep, sum } from "es-toolkit"
import ContentLayout from "../../components/ContentLayout"
import DetailCollapse from "../../components/DetailCollapse"
import Doll69Div from "../../components/Doll69Div"
import ImageBg from "../../components/ImageBg"
import usePageData from "../../hooks/usePageData"
import { mockDollDetails } from "../../mock"
import cssDetail from '../detail.module.scss'
import GridItems from "./components/GridItems"
import Doll69Button from "../../components/Doll69Button"
import css from './style.module.scss'
import { genLoaderData } from "../../data"

export const Component: React.FC = () => {
  const { id: dollId } = useParams()
  const data = usePageData((setter) => setter(mockDollDetails.find(({ id }) => id === dollId)))
  const imageUrls = useMemo<string[]>(() => {
    return data?.imageUrls ?? []
  }, [data])
  const optionals = useMemo<any[]>(() => {
    return data?.optionals ?? []
  }, [data])
  const [imageIndex, setImageIndex] = useState(0)

  const getDefaultResults = () => {
    return optionals.reduce<Record<string, string[][]>>((o, { id, options = [], additions = [] }) => {
      o[id] ??= []
      o[id][0] = options.filter((o: any) => o.default).map((o: any) => o.id)
      ;(additions as any[]).forEach((additionObj, aIndex) => {
        o[id][aIndex + 1] = additionObj.options.filter((o: any) => o.default).map((o: any) => o.id)
      })
      return o
    }, {})
  }
  const [results, setResults] = useState(getDefaultResults())
  const primaryKey = useMemo(() => optionals.find((optionObj) => optionObj.options.find(({ id }: any) => id === 'default'))?.id, [optionals])
  const primaryIds = useMemo(() => results[primaryKey]?.[0] ?? [], [results, primaryKey])
  const refs = useRef<any[]>([])
  const allCollapse = () => refs.current.forEach(({ collapse, id }) => (primaryKey !== id) && collapse())
  const setValue = (key: string, index: number, ids: string[]) => {
    const preIds = results[key][index]
    if (key === primaryKey) {
      if (ids[0] === 'default') {
        if (preIds[0] !== 'default') {
          allCollapse()
        }
        setResults(getDefaultResults())
        return
      } else if (ids[0] !== 'default' && preIds[0] === 'default') {
        refs.current[optionals.findIndex((optionObj) => optionObj.id === primaryKey) + 1]?.expand()
      }
    }
    const originResults = cloneDeep(results)
    originResults[key][index] = ids
    setResults(originResults)
  }
  const allOptions = useMemo(() => {
    return optionals.map((optionalObj) => {
      return (optionalObj.options as any[]).concat(
        ...((optionalObj.additions ?? []) as { options: any[] }[]).map((addtionObj) => addtionObj.options ?? []).flat()
      )
    }).flat()
  }, [optionals])
  const finalAmount = useMemo(() => {
    const currentAmount = data.amount
    const ids = Object.values(results).flat(2)
    const optionAmounts = allOptions
      .filter((o: any) => typeof o.amount === 'number' && ids.includes(o.id))
      .map((o: any) => o.amount)
    return sum([currentAmount].concat(optionAmounts))
  }, [data, results])
  const isDefault = useMemo(() => primaryIds[0] === 'default', [primaryIds])
  useEffect(() => {
    allCollapse()
  }, [])
  return (
    <ContentLayout>
      <div className={cssDetail.detailPage}>
        <div className={'section'}>
          {`Home > Dolls > ${data.title}`}
        </div>
        <Doll69Div classNames={['section', cssDetail.content]}>
          <div className={cssDetail.gallery}>
            <div className={cssDetail.images}>
              <div className={cssDetail.wrapper}>
                {
                  imageUrls.map((imageUrl, index) => <ImageBg
                    classNames={['pointer', { [cssDetail.active]: index === imageIndex }]}
                    imageUrl={imageUrl}
                    key={index}
                    onClick={() => setImageIndex(index)}
                    lazy={index > 5}
                  />)
                }
              </div>
            </div>
            <ImageBg imageUrl={imageUrls[imageIndex]} className={cssDetail.preview}></ImageBg>
          </div>
          <div className={cssDetail.details}>
            <div className={css.details}>
              <div className={css.info}>
                <div className={css.name}>{ data.title }</div>
                {/* <div className={css.rate}>{ data.rate }</div> */}
                <div className={css.reviewer}>{ data.reviewers } Reviewers</div>
              </div>
              <div className={css.hand}>HANDMADE<br/>PRODUCT</div>
              <div className={css.handInfo}>Each of our products are handmade to order, ono-of-a-kind, piece of custom artwork, therefore, coloring and detailing will vary for each piece.</div>
              <div className={css.reset} onClick={() => setValue(primaryKey, 0, ['default'])}>
                Reset All Options
              </div>
            </div>
            {
              optionals.map((optionalObj, oIndex) => {
                const ids = results[optionalObj.id] ?? []
                const hint = ids.flat()
                  .map((id) => allOptions.find(({ id: optionId }) => optionId === id)?.name)
                  .filter(Boolean)
                  .join(', ')
                return <DetailCollapse
                  ref={(el) => (refs.current[oIndex] = { ...el, id: optionalObj.id }) as any}
                  title={optionalObj.title}
                  hint={hint}
                  key={oIndex}
                  disabled={isDefault && optionalObj.id !== primaryKey }
                >
                  <GridItems
                    items={optionalObj.options}
                    perRow={optionalObj.perRow}
                    min={optionalObj.min}
                    max={optionalObj.max}
                    onClick={(itemIds) => setValue(optionalObj.id, 0, itemIds)}
                    currentIds={results[optionalObj.id]?.[0] ?? []}
                  />
                  {
                    (optionalObj.additions ?? []).map((additionObj: any, aIndex: number) => <DetailCollapse
                      title={additionObj.title}
                      key={aIndex}
                    >
                      <GridItems
                        items={additionObj.options}
                        perRow={additionObj.perRow}
                        min={additionObj.min}
                        max={additionObj.max}
                        onClick={(itemIds) => setValue(optionalObj.id, aIndex + 1, itemIds)}
                        currentIds={results[optionalObj.id]?.[aIndex + 1] ?? []}
                      />
                    </DetailCollapse>)
                  }
                </DetailCollapse>
              })
            }
            <div>
              <div className={css.finalAmountLabel}>
                Final Total
              </div>
              <div className={css.finalAmount}>
                ${ finalAmount.toFixed(2) }
              </div>
            </div>
            <Doll69Button onClick={() => undefined}>Add Cart</Doll69Button>
          </div>
        </Doll69Div>
        <Doll69Div classNames={['section', css.details]}>
          <div className={css.wrapper}>
            {
              (data?.detailUrls ?? []).map((url: string, index: number) => <img src={url} key={index} />)
            }
          </div>
        </Doll69Div>
      </div>
    </ContentLayout>
  )
}

export async function loader({ params }: any) {
  const data = mockDollDetails.find(({ id }) => id === params.id)
  return genLoaderData(params.lang, {
    pageName: data?.title,
    data: data,
  })
}

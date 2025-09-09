import { useEffect, useMemo, useRef, useState } from "react"
import { cloneDeep, intersection, sum } from "es-toolkit"
import ContentLayout from "../../components/ContentLayout"
import DetailCollapse from "../../components/DetailCollapse"
import Doll69Button from "../../components/Doll69Button"
import Doll69Div from "../../components/Doll69Div"
import Doll69If from "../../components/Doll69If"
import ImageBg from "../../components/ImageBg"
import css from './style.module.scss'
import cssDetail from './detail.module.scss'
import GridItems from "./components/GridItems"

interface CommonOptionOption {
  id: string,
  name: string,
  value: string,
  imageUrl: string,
  detailImageUrl?: string,
  amount?: number,
  default?: boolean,
}
interface CommonOptions {
  id: string,
  title: string,
  perRow: [number,number,number,number,number,number],
  min: number,
  max: number,
  options: CommonOptionOption[],
}

interface CommonDetailProps {
  data: {
    id: string,
    title: string,
    category: string,
    description?: string,
    rate?: number,
    reviewers?: number,
    imageUrls: string[],
    amount: number,
    optionals: Array<CommonOptions & {
      dependency?: { [k: string]: string[][] },
      additions?: CommonOptions[],
    }>
    detailUrls?: string[]
  },
}

const CommonDetail: React.FC<CommonDetailProps> = ({ data }) => {
  const imageUrls = useMemo<string[]>(() => {
    return data?.imageUrls ?? []
  }, [data])
  const optionals = useMemo(() => {
    return data?.optionals ?? []
  }, [data])

  const getDefaultRecords = () => {
    return optionals.reduce<Record<string, string[][]>>((o, { id, options = [], additions = [] }) => {
      o[id] ??= []
      o[id][0] = options.filter((o) => o.default).map((o) => o.id)
      ;(additions).forEach((additionObj, aIndex) => {
        o[id][aIndex + 1] = additionObj.options.filter((o) => o.default).map((o) => o.id)
      })
      return o
    }, {})
  }
  const [records, setRecords] = useState(getDefaultRecords())
  const refs = useRef<any[]>([])
  const defaultCollapse = () => refs.current.forEach(({ collapse, id }) => (optionals[0].id !== id) && collapse())
  const [disabledIds, setDisabledIds] = useState<string[]>([])
  const setRecordByKey = (key: string, index: number, ids: string[]) => {
    const originRecords = cloneDeep(records)
    originRecords[key] ??= []
    originRecords[key][index] = ids

    const nextDisabledIds: string[] = []
    optionals.forEach((optionalObj) => {
      const { dependency } = optionalObj
      if (!dependency || Object.keys(dependency).length === 0) return
      for (const id in dependency) {
        dependency[id].forEach((ids, index) => {
          if (intersection(ids, originRecords[id][index]).length !== ids.length) nextDisabledIds.push(optionalObj.id)
        })
      }
    })
    nextDisabledIds.forEach((disabledId) => {
      refs.current.find(({ id }) => disabledId === id)?.collapse()
      const { options = [], additions = [] } = optionals.find(({ id }) => id === disabledId) ?? {}
      originRecords[disabledId][0] = options.filter((o) => o.default).map((o) => o.id)
      ;(additions).forEach((additionObj, aIndex) => {
        originRecords[disabledId][aIndex + 1] = additionObj.options.filter((o) => o.default).map((o) => o.id)
      })
    })
    const nextId = optionals.find((optionalObj) => {
      const { dependency } = optionalObj
      if (!dependency || Object.keys(dependency).length === 0) return false
      for (const id in dependency) {
        for (const [index, ids] of Object.entries(dependency[id])) {
          if (intersection(ids, originRecords[id][index as any]).length === ids.length) return true
        }
      }
      return false
    })?.id
    refs.current.find(({ id }) => nextId === id)?.expand()
    setRecords(originRecords)
    setDisabledIds(nextDisabledIds)
  }

  const allOptions = useMemo(() => {
    return optionals.map((optionalObj) => {
      const list = [
        ...optionalObj.options,
        ...(optionalObj.additions ?? []).map((addtionObj) => addtionObj.options ?? []).flat()
      ]
      return list
    }).flat()
  }, [optionals])
  const finalAmount = useMemo(() => {
    const currentAmount = data?.amount ?? 0
    const ids = Object.values(records).flat(2)
    const optionAmounts = allOptions
      .filter((o) => typeof o.amount === 'number' && ids.includes(o.id))
      .map((o: any) => o.amount)
    return sum([currentAmount].concat(optionAmounts))
  }, [data, records])
  useEffect(() => {
    defaultCollapse()
  }, [])
  const reset = () => {
    defaultCollapse()
    setRecords(getDefaultRecords())
  }
  const [imageIndex, setImageIndex] = useState(0)
  return (
    <ContentLayout>
      <div className={cssDetail.detailPage}>
        <div className={'section'}>
          {`Home > ${data?.category} > ${data?.title}`}
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
                <div className={css.name}>{ data?.title }</div>
                {/* <div className={css.rate}>{ data.rate }</div> */}
                <div className={css.reviewer}>{ data?.reviewers } Reviewers</div>
              </div>
              <div className={css.hand}>HANDMADE<br/>PRODUCT</div>
              <div className={css.handInfo}>Each of our products are handmade to order, ono-of-a-kind, piece of custom artwork, therefore, coloring and detailing will vary for each piece.</div>
              <Doll69If display={!!data?.description}>
                <div className={css.description}>{data?.description}</div>
              </Doll69If>
              <div className={css.reset} onClick={() => reset()}>
                Reset All Options
              </div>
            </div>
            {
              optionals.map((optionalObj, oIndex) => {
                const ids = records[optionalObj.id] ?? []
                const hint = ids.flat()
                  .map((id) => allOptions.find(({ id: optionId }) => optionId === id)?.name)
                  .filter(Boolean)
                  .join(', ')
                return <DetailCollapse
                  ref={(el) => (refs.current[oIndex] = { ...el, id: optionalObj.id }) as any}
                  title={optionalObj?.title}
                  hint={hint}
                  key={oIndex}
                  disabled={disabledIds.includes(optionalObj.id) }
                >
                  <GridItems
                    items={optionalObj.options}
                    perRow={optionalObj.perRow}
                    min={optionalObj.min}
                    max={optionalObj.max}
                    onClick={(itemIds) => setRecordByKey(optionalObj.id, 0, itemIds)}
                    currentIds={records[optionalObj.id]?.[0] ?? []}
                  />
                  {
                    (optionalObj.additions ?? []).map((additionObj: any, aIndex: number) => <DetailCollapse
                      title={additionObj?.title}
                      key={aIndex}
                    >
                      <GridItems
                        items={additionObj.options}
                        perRow={additionObj.perRow}
                        min={additionObj.min}
                        max={additionObj.max}
                        onClick={(itemIds) => setRecordByKey(optionalObj.id, aIndex + 1, itemIds)}
                        currentIds={records[optionalObj.id]?.[aIndex + 1] ?? []}
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
        <Doll69Div classNames={['section', css.detailContent]}>
          <div className={css.wrapper}>
            {
              (data?.detailUrls ?? []).map((url: string, index: number) => <img src={url} loading="lazy" key={index} />)
            }
          </div>
        </Doll69Div>
      </div>
    </ContentLayout>
  )
}

export default CommonDetail

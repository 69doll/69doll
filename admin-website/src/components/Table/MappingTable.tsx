import type React from "react";
import { useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Skeleton } from "../../components/ui/skeleton"

interface MappingTableOption<V extends Record<string, any>, I extends keyof V> {
  name: React.ReactNode,
  index: I,
  className?: string,
  skeleton?: boolean | string,
  render?: (v: V[I], index: number, raw: V) => React.ReactNode,
}

export type MappingTableOptions<V extends Record<string, any>> = {
  [K in keyof V]: MappingTableOption<V, K>
}[keyof V][]

interface MappingTableProps<V extends Record<string, any>> {
  options: MappingTableOptions<V>,
  sourceData: V[]
  isLoading?: boolean,
  pageSize?: number,
}

function MappingTable <V extends Record<string, any>>({ sourceData, options, isLoading, pageSize }: MappingTableProps<V>) {
  const hasLoadingParma = typeof isLoading === 'boolean'
  const list = useMemo<V[]>(() => {
    if (isLoading) return Array(pageSize ?? 15).fill(undefined)
    return sourceData
  }, [isLoading, sourceData, pageSize])
  return <Table>
    <TableHeader>
      <TableRow>
        {
          options.map((option, index) => {
            return <TableHead className={option.className} key={index}>{option.name}</TableHead>
          })
        }
      </TableRow>
    </TableHeader>
    <TableBody>
      {
        list.map((data, dIndex) => {
          return <TableRow key={dIndex}>
            {
              options.map((option, oIndex) => {
                return <TableCell
                  key={`${dIndex}-${oIndex}`}
                >
                  {
                    hasLoadingParma && isLoading && !(typeof option.skeleton === 'boolean' && !option.skeleton) ?
                    <Skeleton className={typeof option.skeleton === 'string' ? option.skeleton : 'h-4 w-full'} /> :
                    undefined
                  }
                  {
                    !hasLoadingParma || !isLoading ?
                    (option.render?.(data[option.index], dIndex, data) ?? data[option.index]) :
                    undefined
                  }
                </TableCell>
              })
            }
          </TableRow>
        })
      }
    </TableBody>
  </Table>
}

export default MappingTable

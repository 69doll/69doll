import parseDate from "@/utils/parseDate"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"
import parseDatetime from "@/utils/parseDatetime"

const TableDateCell = ({ date }: { date: string }) => {
  return <HoverCard>
    <HoverCardTrigger>{parseDate(date)}</HoverCardTrigger>
    <HoverCardContent>
      <div className="text-xs text-center">{parseDatetime(date)}</div>
    </HoverCardContent>
  </HoverCard>
}

export default TableDateCell

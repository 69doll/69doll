import dayjs from "dayjs";

export default function (v: string) {
  return dayjs(v).format('YYYY-MM-DD')
}

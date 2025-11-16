import dayjs from "dayjs";
import "dayjs/locale/th";

dayjs.locale("th");

export function formatThaiDate(dateString: string) {
  const date = dayjs(dateString);

  const days = [
    "อาทิตย์",
    "จันทร์",
    "อังคาร",
    "พุธ",
    "พฤหัสบดี",
    "ศุกร์",
    "เสาร์",
  ];

  const months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const dayName = days[date.day()];
  const dayOfMonth = date.date();
  const monthName = months[date.month()];
  const thaiYear = date.year() + 543;

  return `วัน${dayName}ที่ ${dayOfMonth} ${monthName} ${thaiYear}`;
}

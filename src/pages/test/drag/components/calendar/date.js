import moment from 'moment';

/**
 * 生成指定年月的天数
 *
 * @param year
 * @param month
 * @param format
 * @returns {{next: *[], current: *[], prev: *[]}}
 */
export function generateMonthDays(year, month, format = 'YYYY-MM-DD') {
  const cur = moment().year(year).month(month - 1).date(1);
  const firstDay = cur.clone().startOf('month')
  const endDay = cur.clone().endOf('month')
  const firstWeekDay = firstDay.weekday()
  const endWeekDay = endDay.weekday()
  const prevMonthDay = []
  // 上个月日期
  for (let i = firstWeekDay; i > 0; i--) {
    prevMonthDay.push(firstDay.clone().subtract(i, 'day').format(format))
  }
  const curMonthDay = []
  // 本月日期
  for (let i = 0; i < cur.daysInMonth(); i++) {
    curMonthDay.push(firstDay.clone().add(i, 'day').format(format))
  }
  const nextMonthDay = []
  // 下月日期
  for (let i = 1; i < 7 - endWeekDay; i++) {
    nextMonthDay.push(endDay.clone().add(i, 'day').format(format))
  }
  return {
    prev: prevMonthDay,
    current: curMonthDay,
    next: nextMonthDay,
  }
}

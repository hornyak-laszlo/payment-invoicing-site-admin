import { format } from 'date-fns-tz'

const convertToHungarianTime = (dateString) => {
  const date = new Date(dateString)
  const timeZone = 'Europe/Budapest'
  const hunFormat = 'yyyy.MM.dd HH:mm'

  return format(date, hunFormat, { timeZone })
}

export {
  convertToHungarianTime
}

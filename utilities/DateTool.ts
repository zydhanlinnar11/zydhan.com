function format(date: Date | number | string) {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const DateTool = { format }
export default DateTool

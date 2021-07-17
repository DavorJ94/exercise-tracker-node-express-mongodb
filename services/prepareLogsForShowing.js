module.exports = function convertDate(from, to, limit, logs) {
  let lowerDate = 0;
  let upperDate = new Date().getTime();
  if (from) lowerDate = new Date(from).getTime()
  if (to) upperDate = new Date(to).getTime()
  const logsThatPassed = logs[0].map(log => {
    const logTime = new Date(log.date).getTime()
    if (logTime > lowerDate && logTime < upperDate) {
      return log
    } else return
    })
    const processedLogs = logsThatPassed.filter((item) => {
      if (item) {
        return item
        }
      })

  return processedLogs.slice(0, limit)
}
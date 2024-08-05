export const getDoneServicesPercent = (allQty = 0, doneQty = 0): number => {
  if (allQty <= 0 || doneQty <= 0) return 0

  return Math.min(Math.floor((doneQty / allQty) * 100), 100)
}

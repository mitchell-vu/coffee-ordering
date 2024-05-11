export const humanizeNumber = (
  num?: number,
  notation: 'standard' | 'compact' = 'standard',
  maximumFractionDigits = 2,
) =>
  !Number.isNaN(num) && num !== undefined
    ? Intl.NumberFormat(undefined, {
        notation,
        maximumFractionDigits,
      }).format(num)
    : undefined;

export const formatCurrency = (num?: number, local = 'vi-VN', currency = 'VND') =>
  !Number.isNaN(num) && num !== undefined
    ? new Intl.NumberFormat(local, { style: 'currency', currency }).format(num)
    : undefined;

export const nanoToNumber = (num?: number) => (num ? num / 10 ** 9 : undefined);

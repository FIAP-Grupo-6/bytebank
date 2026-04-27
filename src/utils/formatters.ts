export type FormatCurrencyOptions = {
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  showSign?: boolean;
};

export type FormatCurrencyResult = {
  amount: string;
  formatted: string;
};

export function formatCurrency(
  value: number,
  options: FormatCurrencyOptions = {}
): FormatCurrencyResult {
  const {
    locale = 'pt-BR',
    currency = 'BRL',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    showSign = true,
  } = options;

  const absoluteValue = Math.abs(value);

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  });

  const baseFormatted = formatter.format(absoluteValue);

  let formatted = baseFormatted;

  if (showSign && value > 0) {
    formatted = `+${baseFormatted}`;
  } else if (value < 0) {
    formatted = `-${baseFormatted}`;
  }

  const parts = formatter.formatToParts(absoluteValue);

  const amount = parts
    .filter((part) => part.type !== 'currency')
    .map((part) => part.value)
    .join('')
    .trim();

  return {
    amount,
    formatted,
  };
}

type FormatDateOptions = {
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
}

export function formatDate(
  date: string | Date,
  { locale = "pt-BR", options = { day: "numeric", month: "short" } }: FormatDateOptions = {}
): string {
  const parsedDate = new Date(date);

  return parsedDate.toLocaleDateString(locale, options);
}
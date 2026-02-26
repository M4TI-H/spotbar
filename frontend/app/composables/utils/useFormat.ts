// composables/utils/useFormat.ts
export const useFormat = () => {
  const menuStore = useMenuStore();

  const getCurrencySymbol = (currency: string) => {
    const symbols: Record<string, string> = {
      PLN: "zł",
      USD: "$",
      EUR: "€",
      GBP: "£",
    };
    return symbols[currency.toUpperCase()] || currency;
  };

  const formatPrice = (price: number | string | null) => {
    const numericPrice = typeof price === "string" ? parseFloat(price) : price;
    if (numericPrice === null || isNaN(numericPrice)) return "—";

    const currency = menuStore.defaultCurrency.toUpperCase();
    const symbol = getCurrencySymbol(currency);

    const locale = currency === "USD" || currency === "GBP" ? "en-US" : "pl-PL";
    const formattedNumber = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericPrice);

    if (currency === "USD" || currency === "GBP") {
      return `${symbol}${formattedNumber}`;
    } else {
      return `${formattedNumber} ${symbol}`;
    }
  };

  return {
    formatPrice,
    getCurrencySymbol,
  };
};

export type TimeFormat = "12h" | "24h";

/** A new Date on the same day as `base` at the given time. */
export const setTime = (base: Date, hours: number, minutes: number) => {
  const next = new Date(base);
  next.setHours(hours, minutes, 0, 0);
  return next;
};

/** Rounds `date` up to the next multiple of `step` minutes — "now" for a picker default. */
export const roundToStep = (date: Date, step: number) => {
  const next = new Date(date);
  const m = Math.ceil(next.getMinutes() / step) * step;
  next.setMinutes(m, 0, 0);
  return next;
};

export const formatTime = (date: Date, format: TimeFormat = "12h") =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: format === "12h",
  }).format(date);

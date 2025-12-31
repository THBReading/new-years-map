export function getCityTime(timezone: string) {
  const now = new Date();
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).formatToParts(now);
}

export function parseTime(parts: Intl.DateTimeFormatPart[]): { [key: string]: number } {
  const map: { [key: string]: number } = {};
  parts.forEach(p => {
    if (p.type !== "literal") map[p.type] = Number(p.value);
  });
  return map; // { hour, minute, second }
}

export function isFireworksTime(timezone: string): boolean {
  const now = new Date();

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });

  const parts = parseTime(formatter.formatToParts(now));
  const { hour, minute } = parts;

  // Midnight → 00:00 to 00:15
  return hour === 0 && minute < 15;
}

export function timeTillMidnight(timezone: string): { minutes: number; seconds: number } {
  const now = new Date();

  // Get the time parts in the given timezone
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const { hour, minute, second } = parseTime(formatter.formatToParts(now));

  // Total seconds left until midnight
  const totalSecondsLeft = (23 - hour) * 3600 + (59 - minute) * 60 + (60 - second);

  const minutes = Math.floor(totalSecondsLeft / 60);
  const seconds = totalSecondsLeft % 60;

  return { minutes, seconds };
}



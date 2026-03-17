const singaporeTimeFormatter = new Intl.DateTimeFormat("en-SG", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Singapore",
});

export function formatClockTime(timestamp: string) {
  return singaporeTimeFormatter.format(new Date(timestamp));
}

// Param `dateString` - date in ISO 8601 format
export function formatDate(dateString: string, timeZone = "") {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const d = new Date(dateString);
  const tz = timeZone || userTimeZone;

  const date = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: tz
  }).format(d);

  const timeZoneFormat = new Intl.DateTimeFormat("en", {
    timeZoneName: "short",
    timeZone: tz
  });

  const timeZoneFormatted = timeZoneFormat
    .formatToParts(d)
    .find(x => x.type === "timeZoneName")?.value;

  // Print the time zone when it's explicitly provided (i.e. on the server side) and omit it
  // otherwise (i.e. on the client side), so that it's clear to users without JavaScript enabled
  return timeZone && timeZoneFormatted ? `${date} (${timeZoneFormatted})` : date;
}

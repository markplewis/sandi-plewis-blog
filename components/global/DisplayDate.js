import { useEffect, useState } from "react";

const formatDate = (dateString, timeZone) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const d = new Date(dateString);

  const date = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: timeZone || userTimeZone
  }).format(d);

  const timeZoneFormat = new Intl.DateTimeFormat("en", {
    timeZoneName: "short",
    timeZone: timeZone || userTimeZone
  });
  const timeZoneFormatted = timeZoneFormat
    .formatToParts(d)
    .find(x => x.type === "timeZoneName").value;

  // Print the UTC time zone server-side, so that it's clear to users without JavaScript enabled
  return timeZone ? `${date} (${timeZoneFormatted})` : date;
};

// Param `dateString` - date in ISO 8601 format
export default function DisplayDate({ className = "", dateString = "" }) {
  // In order to avoid "Text content does not match server-rendered HTML" React hydration errors,
  // we must render the UTC date on the server side, then replace it with the user's local time
  // zone on the client side. See: https://github.com/vercel/next.js/discussions/37877
  // We know that most of our users will be in Ontario so we're using EST/EDT on the server.
  const [formattedDate, setFormattedDate] = useState(formatDate(dateString, "America/New_York"));

  useEffect(() => {
    setFormattedDate(formatDate(dateString));
  }, [dateString]);

  // console.log(formattedDate);

  return (
    <time className={className} dateTime={dateString}>
      {formattedDate}
    </time>
  );
}

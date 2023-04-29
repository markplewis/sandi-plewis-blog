import { useEffect, useState } from "react";
import { formatDate } from "~/utils/dates";

// Param `dateString` - date in ISO 8601 format
export default function DisplayDate({ className = "", dateString = "" }) {
  // In order to avoid "Text content does not match server-rendered HTML" React hydration errors,
  // we must render the date with a predefined time zone on the server side, then replace it with
  // the user's local time zone on the client side.
  // See: https://github.com/vercel/next.js/discussions/37877
  // Since we know that most of our users will be in Ontario, we're using EST/EDT instead of UTC.
  const [formattedDate, setFormattedDate] = useState(formatDate(dateString, "America/New_York"));

  useEffect(() => {
    setFormattedDate(formatDate(dateString));
  }, [dateString]);

  return (
    <time className={className} dateTime={dateString}>
      {formattedDate}
    </time>
  );
}

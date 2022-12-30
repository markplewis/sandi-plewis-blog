// import { isValid, parseISO, format } from "date-fns";
import { useEffect, useState } from "react";

// Param `dateString` - date in ISO 8601 format
export default function DisplayDate({ className = "", dateString = "" }) {
  const [formattedDate, setFormattedDate] = useState(dateString);

  useEffect(() => {
    const date = new Date(dateString);
    const formatted = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(date);
    setFormattedDate(formatted);
  }, [dateString]);

  // TODO: why is a `useEffect` required here, in order to avoid "Text content does
  // not match server-rendered HTML" React errors? Why can't we do the following?
  //
  // const date = new Date(dateString);
  // const formattedDate = new Intl.DateTimeFormat("en-US", {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric"
  // }).format(date);

  return (
    <time className={className} dateTime={dateString}>
      {formattedDate}
    </time>
  );
  // const date = parseISO(dateString);
  // return isValid(date) ? (
  //   <time className={className} dateTime={dateString}>
  //     {format(date, "LLLL d, yyyy")}
  //   </time>
  // ) : null;
}

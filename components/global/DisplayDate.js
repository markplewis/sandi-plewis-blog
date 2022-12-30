// import { isValid, parseISO, format } from "date-fns";

// Param `dateString` - date in ISO 8601 format
export default function DisplayDate({ className = "", dateString = "" }) {
  const date = new Date(dateString);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);

  console.log("formattedDate", formattedDate);

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

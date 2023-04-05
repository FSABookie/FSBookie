export default function convertUTCtoEST(utcTimestamp) {
  const options = {
    timeZone: "America/New_York",
    hour12: true,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const estDateTime = new Date(utcTimestamp).toLocaleString("en-US", options);
  return estDateTime;
}

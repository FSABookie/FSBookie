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
  return timeAgo(estDateTime);
}

export function timeAgo(datetimeString) {
  const now = new Date();
  const dtObject = new Date(datetimeString);
  const timeDiff = now - dtObject;

  if (timeDiff >= 31536000000) {
    // 1 year in milliseconds
    return `${Math.floor(timeDiff / 31536000000)} year(s) ago`;
  } else if (timeDiff >= 2592000000) {
    // 30 days in milliseconds
    return `${Math.floor(timeDiff / 2592000000)} month(s) ago`;
  } else if (timeDiff >= 86400000) {
    // 1 day in milliseconds
    return `${Math.floor(timeDiff / 86400000)} day(s) ago`;
  } else if (timeDiff >= 3600000) {
    // 1 hour in milliseconds
    return `${Math.floor(timeDiff / 3600000)} hour(s) ago`;
  } else if (timeDiff >= 60000) {
    // 1 minute in milliseconds
    return `${Math.floor(timeDiff / 60000)} minute(s) ago`;
  } else {
    // less than 1 minute
    return `${Math.floor(timeDiff / 1000)} second(s) ago`;
  }
}

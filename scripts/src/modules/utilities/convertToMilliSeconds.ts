
const convertToMilliSeconds = (obj: any): number => {
  if (obj["seconds"]) return obj["seconds"] * 1000;
  if (obj["minutes"]) return obj["minutes"] * 60 * 1000;
  if (obj["hours"]) return obj["hours"] * 60 * 60 * 1000;
  if (obj["days"]) return obj["days"] * 24 * 60 * 60 * 1000;
  console.error("The time unit entered is not valid.");
  console.error("convertToMilliSeconds function.");
  return 0;
};

export default convertToMilliSeconds;
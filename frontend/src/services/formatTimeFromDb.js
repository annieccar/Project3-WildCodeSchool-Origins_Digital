export default function formatTimeFromDb(duration) {
  const time = duration.split(":");
  if (time[0] === "00") {
    return time.toSpliced(0, 1).join(":");
  }
  return duration;
}

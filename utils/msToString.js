const helperTime = (ms) => {
  const HOURS_CONSTANT = 1000 * 60 * 60;
  const MINUTES_CONSTANT = 1000 * 60;
  const SECONDS_CONSTANT = 1000;
  let totalMs = ms;
  let msg = '';

  let hours = totalMs / HOURS_CONSTANT;
  if (hours > 1) {
    hours = Math.floor(hours);
    totalMs -= hours * HOURS_CONSTANT;
    msg += ` ${hours}h`;
  }
  let minutes = totalMs / MINUTES_CONSTANT;
  if (minutes > 1) {
    minutes = Math.floor(minutes);
    totalMs -= minutes * MINUTES_CONSTANT;
    msg += ` ${minutes}m`;
  }

  let seconds = totalMs / SECONDS_CONSTANT;
  if (seconds > 1) {
    seconds = Math.floor(seconds);
    totalMs -= seconds * SECONDS_CONSTANT;
    msg += ` ${seconds}s`;
  }
  return msg;
};

module.exports = helperTime;

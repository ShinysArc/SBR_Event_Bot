const helper = (timeString) => {
  const durationCharacter = timeString.slice(timeString.length - 1).toLowerCase();
  let duration = timeString.slice(0, timeString.length - 1);

  if (!isNaN(duration)) {
    duration = parseInt(duration, 10);
  } else {
    return -1;
  }

  switch (durationCharacter) {
    case 's': {
      duration *= 1000;
      break;
    }
    case 'm': {
      duration *= 1000 * 60;
      break;
    }
    case 'h': {
      duration *= 1000 * 60 * 60;
      break;
    }
    case 'd': {
      duration *= 1000 * 60 * 60 * 24;
      break;
    }
    case 'w': {
      duration *= 1000 * 60 * 60 * 24 * 7;
      break;
    }
    default: {
      duration = -1;
    }
  }
  return duration;
};

module.exports = helper;

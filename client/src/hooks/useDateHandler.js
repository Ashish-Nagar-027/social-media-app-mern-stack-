

const useDateHandler = (timestamp) => {

    function formatTimestamp(timestamp) {
    const now = new Date();
    const dateObj = new Date(timestamp);

    const timeDifference = now - dateObj;
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

    if (minutesDifference < 1) {
      return "just now";
    } else if (hoursDifference < 1) {
      return `${minutesDifference} minutes ago`;
    } else if (hoursDifference < 24) {
      if (hoursDifference === 1) {
        return "1 hour ago";
      } else {
        return `${hoursDifference} hours ago`;
      }
    } else {
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(dateObj);

      const formattedTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }).format(dateObj);

      return `${formattedDate}, ${formattedTime}`;
    }
  }


  return {
    formatTimestamp
  }

}

export default useDateHandler
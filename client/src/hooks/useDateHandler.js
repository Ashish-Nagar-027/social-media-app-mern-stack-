

const useDateHandler = (timestamp) => {

 



function formatTimestamp(timestamp) {
  const now = new Date();
  const dateObj = new Date(timestamp);
  
  const timeDifference = now - dateObj;
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const weeksDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
  const monthsDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));

  if (minutesDifference < 1) {
    return "just now";
  } else if (hoursDifference < 1) {
    return `${minutesDifference} minutes ago`;
  } else if (daysDifference < 1) {
    return `${hoursDifference} hours ago`;
  } else if (weeksDifference < 1) {
    return `${daysDifference} days ago`;
  } else if (monthsDifference < 1) {
    if (now.getMonth() === dateObj.getMonth() && now.getFullYear() === dateObj.getFullYear()) {
      return dateObj.toLocaleString("en-US", { month: "short", day: "numeric" });
    } else {
      return `${dateObj.toLocaleString("en-US", { hour: "numeric", minute: "numeric" })} · ${dateObj.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
    }
  } else {
    return `${dateObj.toLocaleString("en-US", { hour: "numeric", minute: "numeric" })} · ${dateObj.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
  }
}




  return {
    formatTimestamp
  }

}

export default useDateHandler
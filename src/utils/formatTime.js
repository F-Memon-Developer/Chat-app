export const formatTime = (timestamp) => {
  if (!timestamp || !timestamp.seconds) return "";

  const date = new Date(timestamp.seconds * 1000);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  // Less than 60 sec ago
  if (diffInSeconds < 60) return "Just now";

  // Less than 1 hour ago
  if (diffInSeconds < 3600) {
    const mins = Math.floor(diffInSeconds / 60);
    return `${mins} min${mins > 1 ? "s" : ""} ago`;
  }

  // For all cases (same day or old), only return time
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

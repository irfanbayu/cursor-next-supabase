export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatApiKey = (key: string, isVisible: boolean) => {
  if (isVisible) {
    return key;
  }
  return "byw-" + "*".repeat(28);
};

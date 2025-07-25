export const getEventData = async () => {
  try {
    const response = await fetch("/api/form/events");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("API error:", err);
    return null;
  }
};


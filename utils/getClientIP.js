export async function getClientIP() {
  try {
    const response = await fetch("/api/get-ip");
    const data = await response.json();
    return data?.ip || "";
  } catch (err) {
    console.error("Failed to fetch IP:", err);
    return null;
  }
}

import { GOOGLE_MAPS_API_KEY } from "~/config";


export const fetchCityAndState = async (pinCode) => {
    const apiKey = GOOGLE_MAPS_API_KEY;

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${pinCode}|country:IN&key=${apiKey}`
      );
      const { results } = await response.json();
      if (results.length > 0) {
        const { address_components } = results[0];
        const city = address_components.find(
          (component) =>
            component.types.includes("locality") ||
            component.types.includes("administrative_area_level_2")
        )?.long_name;
        const state = address_components.find((component) =>
          component.types.includes("administrative_area_level_1")
        )?.short_name;
        return { city: city || "", state: state || "" };
      }
    } catch (error) {
      console.error("Error fetching city and state:", error);
    }
  };
  
import { Logger } from "aws-amplify";

import { GOOGLE_MAPS_API_KEY } from "~/config";
import { GEOCODING_API_URL } from "~/constant";

const logger = new Logger("Geocoding API");

export const fetchCityAndState = async (pinCode) => {
    try {
      const response = await fetch(
        `${GEOCODING_API_URL}?components=postal_code:${pinCode}|country:IN&key=${GOOGLE_MAPS_API_KEY}`
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
      logger.error("Error fetching city and state:", error);
    }
  };
  

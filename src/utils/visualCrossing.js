import axios from "axios";
import moment from "moment";

const BASE_URL = "https://weather.visualcrossing.com/";

export const getForecastForDate = async (city, date) => {
  if (+new Date(date) > +new Date()) {
    return;
  }
  try {
    const params = new URLSearchParams({
      aggregateHours: 24,
      startDateTime: moment(date).format("YYYY-MM-DD[T][00:00:00]"),
      endDateTime: moment(date).format("YYYY-MM-DD[T][00:00:00]"),
      unitGroup: "uk",
      contentType: "json",
      location: city,
      key: process.env.REACT_APP_VISUAL_CROSSING_APIKEY,
    });
    const res = await axios.get(
      `${BASE_URL}/VisualCrossingWebServices/rest/services/weatherdata/history?${params.toString()}`
    );
    if (Object.keys(res.data.locations).length > 0) {
      return res.data.locations[Object.keys(res.data.locations)[0]].values[0]
        .conditions;
    }
  } catch (error) {
    return "No Weather data available";
  }
};

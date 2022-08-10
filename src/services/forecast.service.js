import axios from "axios";
import moment from "moment";

const BASE_URL = "https://weather.visualcrossing.com/";

export const getForecastForDate = async (city, date) => {
  const isDateInTheFuture = +new Date(date) > +new Date();
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
      `${BASE_URL}/VisualCrossingWebServices/rest/services/weatherdata/${
        isDateInTheFuture ? "forecast" : "history"
      }?${params.toString()}`
    );
    if (!Object.keys(res.data.locations).length > 0) {
      return;
    }
    const dateForecast = res.data.locations[
      Object.keys(res.data.locations)[0]
    ].values.find((forecast) => {
      return (
        moment(new Date(forecast.datetimeStr)).format(
          "YYYY-MM-DD[T][00:00:00]"
        ) === moment(date).format("YYYY-MM-DD[T][00:00:00]")
      );
    });
    if (!dateForecast) {
      return;
    }
    return dateForecast.conditions;
  } catch (error) {
    throw new Error("No Weather data available");
  }
};

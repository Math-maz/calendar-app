import axios from "axios";

const BASE_URL = "http://dataservice.accuweather.com";
const apiKey = "xV7qbmHjRIpoLLSE3a9GGaRjUeczADGq";
export const getLocationCode = async (cityName) => {
  try {
    const requestUrl = `${BASE_URL}/locations/v1/cities/search?apikey=${apiKey}&q=${cityName}`;
    const res = await axios.get(requestUrl);
    console.log(res);
    return res.data[0].Key;
  } catch (error) {
    console.log({ error });
  }
};

export const getDailyForecastWithLocationCode = async (code) => {
  try {
    const requestUrl = `${BASE_URL}/forecasts/v1/daily/1day/${code}?apikey=${apiKey}`;
    const res = await axios.get(requestUrl);
    return res.data.DailyForecasts[0];
  } catch (e) {
    console.log(e);
  }
};

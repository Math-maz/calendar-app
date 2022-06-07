<div align="center">
    <img src="https://raw.githubusercontent.com/Jobsity/ReactChallenge/main/src/assets/jobsity_logo_small.png"/>
</div>

# React Challenge


## How to deploy
 - Create a .env file in the root directory on the application.
 - Paste the following snippet:
  ```code
    REACT_APP_GOOGLE_APIKEY=AIzaSyDzehZryzqHYGsAnvRq3sVB7MCxNsoig5g
    REACT_APP_VISUAL_CROSSING_APIKEY=G7NLAZAG8EAM28XJ4YTJ64TLM
  ```
 - Run `npm install` | `yarn install` to install all dependencies.
 - Run `npm start`   | `yarn run` to run the app locally.
 - You can find the project running on `localhost:3000`.


## Final Considerations

 I ended up busy in the weekend, so I tried to work on most of the core features as possible. I couldn't find a working Weathe Api that would let me grab the forecast for a given date in the future, so what I did was implement the Visual Crossing API, with historical data, so any Reminder set in the past has the forecast for that day (I realize that realistically no one would set reminders in the past, but that was the most I could do in the time I was given).

## Some features i would like to implement at a later date:
  1. Responsiveness (as of now, the app only looks good on a Desktop screen, and I couldn't implement a reponsive layout in time)
  2. Data persistence on localStorage
  3. Integration with Google Calendar, to persist and display reminders to and from the google account

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# NOTE: App language in finnish, documentation in english
## About dot-env

In order to use this app, login to [https://openweathermap.org/] and generate a key.
Add this key to .env:

```REACT_APP_WEATHER_API={YOU_API_KEY}```

... and place it to /weatherapp/

----

Now let's start the app from the root folder:

## `npm start`

Application starts at default port 3000 in localhost.

Note: No database is used. All data stored for the user is saved in localstorage of the browser.

User can search weather data by typing to search bar a name of specific location.
API request is sent and from the response data a city card is created. Cards are gathered below
the searchbar. 

### NOTE: Cards do not update them selves. Data they represent is bind to the moment the search was executed.

Cards have 2 functions: Delete and Show more info. 

Deleting removes the card from the gathered collection and also from local storage.

Info opens a react modal which represents 24h and 5 day forecasts as well as 24h history. 
This data is always requested when the modal opens so this data can vary from the data in 
cards front.
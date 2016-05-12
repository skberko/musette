# Musette

[https://musette.herokuapp.com](https://musette.herokuapp.com).

## Basics

Musette is a simple proof of concept web app for cyclists that retrieves bicycle [routes](https://www.strava.com/routes) from a user's [Strava](https://www.strava.com) account and determines lists of mid-ride food and cafe stops. It is still very much a work in progress.

Musette is named after a type of traditional cotton bag filled with water bottles, sandwiches, and other treats handed to cyclists in specially-designated feed zones during road races.

You can try the live version of the app at [here](https://musette.herokuapp.com).

Don't use Strava, or don't have your own routes in Strava?
Try Musette with this Strava demo account:

- email: jimmy@tester.com
- password: jimmytester

Here is a basic view of the search functionality of the app:

![Route View Screenshot](http://res.cloudinary.com/dz5btfj9w/image/upload/c_scale,w_600/v1463030235/musette_place_tabs_screenshot_g3oxnj.png)

## Technologies Used

Musette integrates with the following APIs:

- [Strava V3 API](https://strava.github.io/api/)
- [Google Maps API](https://developers.google.com/maps/)
- [Google Places API](https://developers.google.com/places/)

Musette is a full stack web app built with the following technologies:

- Ruby and Ruby on Rails
- OAuth 2.0
- JavaScript, React.js, and Flux
- PostgreSQL
- React-Bootstrap

## Resources Consulted

I consulted the following resources while making this project:

- [Strava's V3 API Documentation](https://strava.github.io/api/v3/)
- [strava-api-v3: A Ruby gem to provide a wrapper around the Strava V3 API](https://github.com/jaredholdcroft/strava-api-v3) (I also wound up contributing code to this project)
- [omniauth-strava: An Omniauth Rubygem for authenticating users with Strava](https://github.com/thogg4/omniauth-strava)
- [Rails Authentication with OAuth 2.0 and OmniAuth](http://www.sitepoint.com/rails-authentication-oauth-2-0-omniauth/)
- [Rails Environment Variables](http://railsapps.github.io/rails-environment-variables.html)
- [Heroku: Configuration and Config Vars](https://devcenter.heroku.com/articles/config-vars)
- [Stack Exchange thread on Google Maps & Strava polylines](http://gis.stackexchange.com/questions/83550/google-maps-decoded-polylines-showing-up-incorrectly)

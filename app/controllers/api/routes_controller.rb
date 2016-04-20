class Api::RoutesController < ApplicationController

  def index
    token = current_user.token
    client = Strava::Api::V3::Client.new(:access_token => token)
    @routes = client.list_athlete_routes

    render json: @routes
  end

  def show
    token = current_user.token
    client = Strava::Api::V3::Client.new(:access_token => token)

    @route = client.retrieve_a_route(params[:id])
    @route_stream = client.retrieve_route_streams(params[:id])

    render json: { route: @route, route_stream: @route_stream }
  end

end

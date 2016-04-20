class Api::RoutesController < ApplicationController

  def index
    token = current_user.token
    client = Strava::Api::V3::Client.new(:access_token => token)
    @routes = client.list_athlete_routes

    # SKB: consider rendering a slimmed-down version of this (with
    # only info that will be displayed to the user) in a jbuilder view
    # instead of directly to json here
    render json: @routes
  end

  def show
    token = current_user.token
    client = Strava::Api::V3::Client.new(:access_token => token)


    # streams = 'distance,altitude,latlng' # 'types' arg string
    # hard-coded temporarily for testing:
    @route_stream = client.retrieve_route_streams(4634590)

    render json: @route_stream
  end

end

class Api::ActivitiesController < ApplicationController

  def index
    token = current_user.token
    client = Strava::Api::V3::Client.new(:access_token => token)
    @activities = client.list_athlete_activities

    # SKB: consider rendering a slimmed-down version of this (with
    # only info that will be displayed to the user) in a jbuilder view
    # instead of directly to json here
    render json: @activities
  end

end

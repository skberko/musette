class Api::ActivitiesController < ApplicationController

  def index
    token = current_user.token
    client = Strava::Api::V3::Client.new(:access_token => token)
    @activities = client.list_athlete_activities

    render json: @activities
  end

end

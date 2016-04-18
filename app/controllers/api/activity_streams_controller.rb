class Api::ActivityStreamsController < ApplicationController

  def show
    token = current_user.token
    client = Strava::Api::V3::Client.new(:access_token => token)
    # SKB: activity stream id (which is the same as its associated activity's
    # id) is to be passed in from client side after the user
    # selects which of his/her activities to use for cafe maps

    streams = 'distance,altitude,latlng' # 'types' arg string
    # hard-coded temporarily for testing:
    @activity_stream = client.retrieve_activity_streams(545845389, streams)
    # perhaps something like this?:
    # @activity_stream = retrieve_activity_streams(params[:activity_stream_id], streams)

    render json: @activity_stream
  end

end

class User < ActiveRecord::Base

  # SKB: request.env['omniauth'] gets passed into this method as 'auth_hash'
  # from the sessions controller
  class << self

  def from_omniauth(auth_hash)
    user = find_or_create_by(uid: auth_hash['uid'].to_i,
      provider: auth_hash['provider'],
      name: auth_hash['info']['name'],
      # SKB: Strava's API only exposes a single auth token; does not expose secret
      token: auth_hash['credentials']['token'] # this is the OAuth access token
      )
    user.first_name = auth_hash['info']['first_name']
    user.last_name = auth_hash['info']['last_name']
    user.location = auth_hash['info']['location']
    user.photo_url = auth_hash['extra']['raw_info']['profile']
    user.strava_username = auth_hash['extra']['raw_info']['username']
    user.city = auth_hash['extra']['raw_info']['city']
    user.state = auth_hash['extra']['raw_info']['state']
    user.country = auth_hash['extra']['raw_info']['country']
    user.sex = auth_hash['extra']['raw_info']['sex']
    user.strava_premium_status = auth_hash['extra']['raw_info']['premium']
    user.measurement_preference = auth_hash['extra']['raw_info']['measurement_preference']
    user.email = auth_hash['extra']['raw_info']['email']

    user.save!
    user
  end

  end

end

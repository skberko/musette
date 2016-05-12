Rails.application.config.middleware.use OmniAuth::Builder do
# SKB: changed scope below to 'view_private', but defaults
# is 'public'
  provider :strava, ENV['STRAVA_CLIENT_ID'], ENV['STRAVA_CLIENT_SECRET'], scope: 'public'
end

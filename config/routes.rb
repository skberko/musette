Rails.application.routes.draw do

  root to: 'pages#index'
  get '/auth/:provider/callback', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  namespace :api, defaults: {format: :json} do
    resources :activities, only: [:index]
    resources :activity_streams, only: [:show]
  end

end

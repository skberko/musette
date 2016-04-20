Rails.application.routes.draw do

  root to: 'static_pages#root'
  get '/auth/:provider/callback', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  namespace :api, defaults: {format: :json} do
    resources :activities, only: [:index]
    resources :activity_streams, only: [:show]
    resources :routes, only: [:index, :show]
  end

end

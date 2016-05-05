Rails.application.routes.draw do

  root to: 'static_pages#root'
  get '/auth/:provider/callback', to: 'sessions#create'
  # delete '/logout', to: 'sessions#destroy'

  resource :session, only: [:new, :create, :destroy]


  namespace :api, defaults: {format: :json} do
    resources :routes, only: [:index, :show]
  end

end

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/register' => 'users#new'
  post '/users' => 'users#create'

  resources :posts, only: [:index]

  namespace :admin do
    root to: 'dashboard#shows'
    resources :topics, except: [:destroy, :show]
  end

end

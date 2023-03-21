Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  resources :users, only: [:index, :show, :create]

  post '/login' => 'sessions#create'
  post '/logout' => 'sessions#destroy'
  get '/logged_in' => 'sessions#is_logged_in?'

  get '/admin' => 'admin/topics#index'
  
  resources :posts, only: [:index, :create]

  resources :post_likes, only: [:create]
  post '/post_likes/delete' => 'post_likes#destroy'

  namespace :admin do
    root to: 'dashboard#shows'
    resources :topics, except: [:destroy, :show]
    get 'login' => 'sessions#new'
    get 'dashboard' => 'dashboard#index'
  end

end

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  mount ActionCable.server => '/cable'
  
  resources :users, only: [:index, :show, :create]

  post '/login' => 'sessions#create'
  post '/logout' => 'sessions#destroy'
  get '/logged_in' => 'sessions#is_logged_in?'

  get '/admin' => 'admin/topics#index'
  
  resources :posts, only: [:index, :create]
  resources :images_gallery, only: [:index]

  resources :post_likes, only: [:create]
  post '/post_likes/delete' => 'post_likes#destroy'

  post '/conversations' => 'users#conversations'
  post '/meet_people' => 'users#meet_people'

  post '/create_message' => 'chats#create_message'
  post '/chat_history' => 'chats#chat_history'
  
  resources :comments, only: [:create]

  namespace :admin do
    root to: 'dashboard#shows'
    resources :topics, except: [:destroy, :show]
    get 'login' => 'sessions#new'
    get 'dashboard' => 'dashboard#index'
  end

end

Rails.application.routes.draw do
  get 'rooms/show'

  mount_devise_token_auth_for 'User', at: 'auth'
  get '/secret', to: 'rooms#show'
  root 'statics#home'

  mount ActionCable.server => '/cable'

end

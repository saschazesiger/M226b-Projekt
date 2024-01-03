Rails.application.routes.draw do
  post '/user/login', to: 'users#login'
  post '/user/hash', to: 'users#hash'
  post '/user/unhash', to: 'users#unhash'
  post '/api/set', to: 'time_records#set'
  get '/api/view', to: 'time_records#view'
end

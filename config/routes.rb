Rails.application.routes.draw do
  post '/user/login', to: 'users#login'
  post '/api/set', to: 'time_records#set'
  get '/api/view', to: 'time_records#view'
end

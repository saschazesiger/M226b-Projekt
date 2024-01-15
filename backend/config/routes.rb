Rails.application.routes.draw do
  post '/login', to: 'login#login'
  post '/hash', to: 'login#hash'
  get '/user/list', to: 'users#list'
  post '/user/edit', to: 'users#edit'
  post '/user/unhash', to: 'users#unhash'
  post '/api/set', to: 'time_records#set'
  get '/api/view', to: 'time_records#view'
  get '/api/logview', to: 'time_records#logview'
  post '/api/edit', to: 'time_records#edit'
  post '/absence/set', to: 'absence_records#set'
  get '/absence/view', to: 'absence_records#view'
end

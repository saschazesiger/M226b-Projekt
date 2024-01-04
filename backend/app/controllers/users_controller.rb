class UsersController < ApplicationController
  before_action :authenticate_user


  # Just for testing
  def hash
    password = params[:password]
    user = User.new(password: password)
    hashed_password = user.password_digest
    render json: { hash: hashed_password }
  end

  def list
    own_user = @current_user
    supervisor_users = User.where(supervisor_id: own_user.id)
    render json: { user: supervisor_users, own: own_user }
  end



  def edit
    username = params[:username]
    user = User.find_by(username: username)
    if user
      if user.supervisor_id == @current_user.id
        user.update(user_params)
        render json: { success: 'true' }
      else
        render json: { success: 'false', message: 'You are not authorized to edit this user' }
      end
    else
      render json: { success: 'true' }
    end
  end
  private
  def user_params
    params.permit(:username, :password, :firstname, :surname, :email)
  end

end


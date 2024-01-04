class LoginController < ApplicationController
  def login
    user = User.find_by(username: params[:username])

    if user && user.authenticate(params[:password])
      user.update!(lastlogin: Time.current, password: params[:password])
      expiration_time = 1.day.from_now.to_i
      jwt_token = encode_token(user_id: user.id, timestamp: Time.current.to_i, exp: expiration_time)
      render json: { success: true, jwt: jwt_token }
    else
      render json: { success: false, error: 'Invalid username or password' }, status: :unauthorized
    end

    rescue ActiveRecord::RecordInvalid => e
      validation_errors = e.record.errors.full_messages.join(', ')
      render json: { success: false, error: validation_errors }, status: :unprocessable_entity

    rescue => e
      render json: { success: false, error: e.message }, status: :internal_server_error
  end

  # Just for testing
  def hash
    password = params[:password]
    user = User.new(password: password)
    hashed_password = user.password_digest
    render json: { hash: hashed_password }
  end
end


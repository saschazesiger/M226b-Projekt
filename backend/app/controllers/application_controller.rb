class ApplicationController < ActionController::API

	def encode_token(payload)
    JWT.encode(payload, "supersecuresecret")
  end

  def authenticate_user
    token = request.headers['Authorization']
    decoded_token = decode_token(token)

    if decoded_token
      @current_user = User.find(decoded_token['user_id'])
    else
      render json: { success: false, error: 'Unauthorized. Please log in.' }, status: :unauthorized
    end
  end

  def decode_token(token)
    begin
      JWT.decode(token, "supersecuresecret")[0]
    rescue JWT::DecodeError
      nil
    end
  end
end

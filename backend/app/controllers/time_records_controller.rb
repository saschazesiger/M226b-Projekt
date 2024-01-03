class TimeRecordsController < ApplicationController
  before_action :authenticate_user

  def set
    action = params[:action]
    datetime = params[:datetime]
    success = false

    # Validate User
    user = User.find_by(id: params[:user_id])

    # Check if the user is editing an entry
    if datetime.present?
      # Write to Database
      @current_user.time_entries.create(action: action, time: datetime, edited: true)
      success = true
    else
      # Generate a new entry with current timeTime
      @current_user.time_entries.create(action: action, time: Time.now, edited: false)
      success = true
    end

    render json: { success: success }
  end


  def view
    start_time = params[:start]
    end_time = params[:end]
    username = params[:username]

    success = true

    entries = if username.present?
                user = User.find_by(username: username)
                if user.supervisor_id == @current_user.id
                  user.time_entries
                else
                  success = false
                end
              else
                @current_user.time_entries
              end

    if start_time && end_time
      entries = entries.where("time >= ? AND time <= ?", start_time, end_time)
    elsif start_time
      entries = entries.where("time >= ?", start_time)
    elsif end_time
      entries = entries.where("time <= ?", end_time)
    end

    if success == false
      render json: { success: false }
    else
      entries = entries.order(:time)
      render json: { success: true, entries: entries }
    end
  end
end
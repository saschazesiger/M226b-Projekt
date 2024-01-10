class TimeRecordsController < ApplicationController
  before_action :authenticate_user

  def set
    action = params[:action]
    datetime = params[:datetime]
    success = false

    # Validate User
    user = User.find_by(id: params[:user_id])

    # Check if the user is editing an entry
    if action.present?
      @current_user.time_entries.create(action: 1, time: Time.now, edited: false)
    else
      @current_user.time_entries.create(action: 0, time: Time.now, edited: false)
    end
    success = true

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
      entries = entries.order(time: :desc)
      render json: { success: true, entries: entries }
    end
  end

  def edit
    entry_id = params[:entry]
    entry = TimeEntry.find_by(id: entry_id)
    if entry
      if entry.user_id == @current_user.id
        old_datetime = entry.time
        old_edited = entry.edited
        entry.update(time: params[:time])
        changeAt = Time.now
        TimeLog.create(time_entry_id: entry.id, oldDatetime: old_datetime, oldEdited: old_edited, changeAt: changeAt)
        render json: { success: 'true', changeAt: changeAt }
      else
        render json: { success: 'false', message: 'You are not authorized to edit this entry' }
      end
    else
      render json: { success: 'false', message: 'Entry not found' }
    end
  end

  def logview
    entry = TimeEntry.find_by(id: params[:entry])
    if entry
      user = User.find_by(id: entry.user_id)
      if entry.user_id == @current_user.id || user.supervisor_id == @current_user.id
        logs = TimeLog.where("time_entry_id = ?", params[:entry])
        render json: { success: 'true', logs: logs }
      else
        render json: { success: 'false', message: 'You are not authorized to view this entry' }
      end
    else
      render json: { success: 'false', message: 'Entry not found' }
    end
  end
end
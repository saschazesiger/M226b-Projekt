class TimeRecordsController < ApplicationController
  before_action :authenticate_user

  def set
    @current_user.time_entries.create(time: Time.now)
    render json: { success: true }
  end

  def view
    times = @current_user.time_entries.pluck(:time)
    render json: { success: true, times: times }
  end
end
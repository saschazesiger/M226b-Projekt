class AbsenceRecordsController < ApplicationController
  before_action :authenticate_user

  def set
    type = params[:type]
    from = params[:from]
    to = params[:to]
    success = false

    if from.present? && to.present? && type.present?
      @current_user.absences.create(from: from, to: to, absence_type: type, approved: false)
      success = true
    else
      render json: { success: success, message: 'Missing parameters' }
      return
    end

    render json: { success: success }
  end



  def view
    start_time = params[:start]
    end_time = params[:end]
    username = params[:username]
    success = true
    absences = if username.present?
                 user = User.find_by(username: username)
                 if user.supervisor_id == @current_user.id
                   user.absences
                 else
                   success = false
                 end
               else
                 @current_user.absences
               end
    if start_time && end_time
      absences = absences.where("from >= ? AND to <= ?", start_time, end_time)
    elsif start_time
      absences = absences.where("from >= ?", start_time)
    elsif end_time
      absences = absences.where("to <= ?", end_time)
    end

    if success == false
      render json: { success: false }
    else
      absences = absences.order(id: :desc)
      render json: { success: true, absences: absences }
    end
  end


  def approve
    absence = Absence.find(params[:id])
    if absence.user.supervisor_id == @current_user.id
      absence.update(approved: 1)
      render json: { success: true }
    else
      render json: { success: false, message: 'Unauthorized' }
    end
  end



end
class AttendancedetailsController < ApplicationController

    skip_before_filter  :verify_authenticity_token

    def index
        @attendance_records = AttendanceRecord.all.where( :attendance_check_id => params[:check_id] )
    end

    def create_new_attendance_check
        _target_number = params[:target_number]
        _course_id = params[:course_id]

        _new_check = AttendanceCheck.new
        _new_check.target_number = _target_number
        _new_check.course_id = _course_id
        _new_check.status = 1

        c = CourseClassUnit.all.where( :course_id => _course_id )
        c.each do |cs|
            puts "the name of the class unit -- " + cs.class_unit.name
        end

        if _new_check.save
            res = '{"result":"ok", "new_check_id":' + _new_check.id.to_s + '}'
        else
            res = '{"result":"error"}'
        end

        respond_to do |format|
            format.json { render json: res, status: "200" }
        end
    end

    def terminate_attendance_check

        _check_id = params[:check_id]
        _check = AttendanceCheck.find( _check_id )
        _check.status = 0


        if _check.save
            res = '{"result":"ok"}'
        else
            res = '{"result":"error"}'
        end

        respond_to do |format|
            format.json { render json: res, status: "200" }
        end
    end
end

class AttendancedetailsController < ApplicationController

    skip_before_filter  :verify_authenticity_token

    def index
        @attendance_records = AttendanceRecord.all.where( :attendance_check_id => params[:check_id] )
        @class_units = ClassUnit.all
        @courses = Course.all
    end

    def create_new_attendance_check
        _target_number = params[:target_number]
        _course_id = params[:course_id]

        _new_check = AttendanceCheck.new
        _new_check.target_number = _target_number
        _new_check.course_id = _course_id
        _new_check.status = 1

        if _new_check.save

            c = CourseClassUnit.all.where( :course_id => _course_id )
            c.each do |cs|
                clz = ClassUnit.find( cs.class_unit_id )
                clz.students.each do |stu|
                    _new_attendance_record = AttendanceRecord.new
                    _new_attendance_record.target_number = _target_number
                    _new_attendance_record.status = 1
                    _new_attendance_record.student = stu
                    _new_attendance_record.course_id = _course_id
                    _new_attendance_record.class_unit = cs.class_unit
                    _new_attendance_record.attendance_check = _new_check
                    _new_attendance_record.save
                end
            end

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
            res = '{"result":"ok", "check_id":' + _check_id + '}'
        else
            res = '{"result":"error"}'
        end

        respond_to do |format|
            format.json { render json: res, status: "200" }
        end
    end

    def update_attendance_record

        if AttendanceRecord.all.where( :student_id => params[:student_id], :attendance_check_id => params[:check_id] ) == nil
            res = '{"result":"error"}'
        else
            AttendanceRecord.all.where( :student_id => params[:student_id], :attendance_check_id => params[:check_id] ).update_all( status: params[:new_status] )
            res = '{"result":"ok"}'
        end

        respond_to do |format|
            format.json { render json: res, status: "200" }
        end

    end
end

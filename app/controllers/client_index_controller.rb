class ClientIndexController < ApplicationController
    
    skip_before_filter  :verify_authenticity_token

    def course_browser
        student_id = session[:student_id]
        class_unit_id = Student.find( student_id ).class_unit_id
        @courses = CourseClassUnit.where( :class_unit_id => class_unit_id )
    end

    def client_homepage
        all_courses = Course.all
        course_id = params[:course_id]
        session[:course_id] = params[:course_id]
        if course_id == nil
            course_id = all_courses.first.id
        end
        @course = Course.find( course_id )
        @unfinished_homeworks = @course.homeworks.where( :status => false ).order('created_at DESC')
        @finished_homeworks = @course.homeworks.where( :status => true ).order('created_at DESC')

        @documents = @course.documents
        class_unit_id = Student.find( session[:student_id] ).class_unit_id
        @class_mates = ClassUnit.find( class_unit_id ).students
    end

    def everyday_grade

        @attendance_checks = AttendanceCheck.all.where( :course_id => session[:course_id] ).order("created_at DESC")
        @attendance_records = AttendanceRecord.all.where( :student_id => session[:student_id], :course_id => session[:course_id] )

        @homework_records = nil
        Homework.all.where( :course_id => session[:course_id] ).each do |hw|
            hr = HomeworkRecord.all.where( :homework_id => hw.id, :student_id => session[:student_id] )
            if @homework_records == nil
                @homework_records = hr
            else
                @homework_records.concat( hr )
            end
        end

        @course_records = CourseRecord.all.where( :student_id => session[:student_id], :course_id => session[:course_id] ).order("created_at DESC")

    end

    def course_signin
        session[:attendance_check_id] = params[:id]
    end

    def client_signin

        @students = Student.find_by( id: params[:client_id], password: params[:client_password] )

        if @students == nil
            res = '{"result":"not_found"}'
        else
            res = '{"result":"ok"}'
            session[:student_id] = params[:client_id]
        end

        respond_to do |format|
            format.json { render json: res, status: "200" }
        end
    end

    def change_password
    end

    def edit_password

        student = Student.find_by( id: params[:student_id], password: params[:student_password] )

        if student == nil
            res = '{"result":"not_found"}'
        else
            student.password = params[:new_password]
            if student.save
                res = '{"result":"ok"}'
            else
                res = '{"result":"error"}'
            end
        end

        respond_to do |format|
            format.json { render json: res, status: "200" }
        end

    end

    def verify_signin

        @ac = AttendanceCheck.where( status: 1 ).order("created_at DESC")

        if @ac == nil
            res = '{"result":"check_not_start"}'
        else
            @ac = @ac.first

            puts @ac.target_number
            puts params[:input_number].to_i

            if params[:input_number].to_i == @ac.target_number
                puts @ac.id.to_s + " -- " + session[:student_id].to_s
                aa = AttendanceRecord.where( :attendance_check_id => @ac.id, :student_id => session[:student_id] ).first
                aa.status = 4
                aa.save
                res = '{"result":"ok"}'
            else
                res = '{"result":"error"}'
            end
        end

        respond_to do |format|
            format.json { render json: res, status: "200" }
        end

    end
    
end

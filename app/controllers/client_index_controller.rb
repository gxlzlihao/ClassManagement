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
        if course_id == nil
            course_id = all_courses.first.id
        end
    end

    def everyday_grade
    end

    def course_signin
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

    def verify_signin

        @correct_number = AttendanceCheck.where( status: 0 )

        if @correct_number == nil
            res = '{"result":"check_not_start"}'
        else
            @correct_number = @correct_number.sort_by &:created_at
            @correct_number = @correct_number.first

            puts @correct_number.target_number
            puts params[:input_number].to_i

            if params[:input_number].to_i == @correct_number.target_number
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

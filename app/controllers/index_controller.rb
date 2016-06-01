class IndexController < ApplicationController

    skip_before_filter  :verify_authenticity_token

    def index
        @class_units = ClassUnit.all
    end

    def homework
    end

    def document
    end

    def everyday_grade
    end

    def attendance
    end

    def create_student

        @student = Student.new
        @student.id = params[:student_id]
        @student.name = params[:student_name]
        @student.password = params[:student_password]

        student_class_unit = ClassUnit.find_by_name(params[:student_class_unit])
        @student.class_unit = student_class_unit

        if @student.save
            res = '{"result":"ok"}'
        else
            res = '{"result":"error"}'
        end

        respond_to do |format|
            format.json { render json: res, status: "200" }
        end

    end

    def create_course

        @course = Course.new
        @course.name = params[:course_name]

        @teacher = Teacher.all.first
        @course.teacher = @teacher

        if @course.save

            params[:course_class_units].each do | clz_id |
                @course_class_unit = CourseClassUnit.new
                @course_class_unit.class_unit_id = clz_id
                @course_class_unit.course_id = @course.id
                @course_class_unit.save
            end

            res = '{"result":"ok"}'
        else
            res = '{"result":"error"}'
        end

        respond_to do |format|
            format.json { render json: res, status: "200" }
        end

    end

end

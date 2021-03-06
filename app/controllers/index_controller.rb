class IndexController < ApplicationController

    skip_before_filter  :verify_authenticity_token

    def index
    end

    def teacher_signin
        _rs = Teacher.where( :name => params[:teacher_name], :password => params[:teacher_password] )

        if _rs != nil
            session[:teacher_id] = _rs.first.id
            res = '{"result":"ok"}'
        else
            res = '{"result":"error"}'
        end

        respond_to do |format|
            format.json { render json: res, status: "200" }
        end
    end

    def homepage
        @class_units = ClassUnit.all
        @students = Student.all
        @courses = Course.all
    end

    def homework
        @class_units = ClassUnit.all
        @students = Student.all
        @courses = Course.all
        @homeworks = Homework.all
    end

    def document
        @class_units = ClassUnit.all
        @students = Student.all
        @courses = Course.all
        @documents = Document.all
    end

    def everyday_grade
        @class_units = ClassUnit.all
        @students = Student.all
        @courses = Course.all
        @attendance_records = AttendanceRecord.all

        if params[:course_id] != nil
            @target_course_id = params[:course_id]
            @target_course_name = Course.find( params[:course_id] ).name
        else
            @target_course_id = @courses.first.id
            @target_course_name = @courses.first.name
        end

        if params[:class_unit_id] != nil
            target_class_unit_id = params[:class_unit_id]
        else
            target_class_unit_id = @class_units.first.id
        end

        @startup_everyday_grades = EverydayGrade.all.where( :course_id => @target_course_id, :class_unit_id => target_class_unit_id )
        @startup_attendance_records = nil
        @startup_course_records = nil

        @startup_everyday_grades.each do |eg|
            temp1 = @students.find_by_id( eg.student_id ).attendance_records.where( :course_id => @target_course_id, :class_unit_id => target_class_unit_id )
            if @startup_attendance_records != nil 
                @startup_attendance_records.concat( temp1 )
            else 
                @startup_attendance_records = temp1
            end

            temp2 = @students.find_by_id( eg.student_id ).course_records.where( :course_id => eg.class_unit_id )
            if @startup_course_records != nil
                @startup_course_records.concat( temp2 )
            else 
                @startup_course_records = temp2
            end
        end

        if @startup_course_records != nil
            puts "the total length of the array: " + @startup_course_records.count.to_s
        end

    end

    def attendance
        @courses = Course.all
        @class_units = ClassUnit.all
        @attendance_checks = AttendanceCheck.all
        @attendance_records = AttendanceRecord.all
    end

    def clear_user_data

        @attendance_checks = AttendanceCheck.all
        @attendance_records = AttendanceRecord.all
        @course_records = CourseRecord.all
        @homework_records = HomeworkRecord.all
        @homeworks = Homework.all

        @attendance_records.destroy_all
        @attendance_checks.destroy_all
        @course_records.destroy_all 
        @homework_records.destroy_all 
        @homeworks.destroy_all

        res = '{"result":"ok"}'

        respond_to do |format|
            format.json { render json: res, status: "200" }
        end
    end

    def create_student

        if ( Student.find_by id: params[:student_id] ) == nil

            @student = Student.new
            @student.id = params[:student_id]
            @student.name = params[:student_name]
            @student.password = params[:student_password]

            student_class_unit = ClassUnit.find( params[:student_class_unit] )
            @student.class_unit = student_class_unit

            if @student.save

                CourseClassUnit.all.where( :class_unit_id => params[:student_class_unit] ).each do |ccu|

                    EverydayGrade.create( :student => @student, :course => Course.find( ccu.course_id ), :class_unit => student_class_unit, :grade => nil )
                    (1..7).each do |i|
                        # each student in each course has seven course records by default. 
                        CourseRecord.create( :grade => "-1", :course => Course.find( ccu.course_id ), :student => @student, :index => i )
                    end

                end

                res = '{"result":"ok"}'
            else
                res = '{"result":"error"}'
            end

        else

            res = '{"result":"duplicated_id"}'

        end

        respond_to do |format|
            format.json { render json: res, status: "200" }
        end

    end

    def update_student
        target_student = Student.find_by( id: params[:student_id] )
        target_student.class_unit_id = params[:class_unit_id]

        everyday_grades = EverydayGrade.all.where( :student_id => params[:student_id] )
        everyday_grades.update_all( class_unit_id: params[:class_unit_id] )

        homework_records = HomeworkRecord.all.where( :student_id => params[:student_id] )
        homework_records.update_all( class_unit_id: params[:class_unit_id] )

        attendance_records = AttendanceRecord.all.where( :student_id => params[:student_id] )
        attendance_records.update_all( class_unit_id: params[:class_unit_id] )
        
        if target_student.save
            res = '{"result":"ok"}'
        else
            res = '{"result":"error"}'
        end

        respond_to do |format|
            format.json { render json: res, status: "200" }
        end
    end

    def update_course_records

        if params[:array] == nil or params[:course_id] == nil
            res = '{"result":"error"}'
        else
            _course_id = params[:course_id]
            params[:array].each do |i, iter|
                if iter[:everyday_grade] != nil
                    EverydayGrade.all.where( :student_id => iter[:student_id], :course_id => _course_id ).update_all( grade: iter[:everyday_grade] )
                end
                if iter[:values] != nil
                    iter[:values].each do |j, item|
                        CourseRecord.all.where( :student_id => iter[:student_id], :course_id => _course_id, :index => ( item[:index].to_i + 1 ) ).update_all( grade: item[:value] )
                    end
                end
            end
            res = '{"result":"ok"}'
        end

        respond_to do |format|
            format.json { render json: res, status: "200" }
        end
    end

    def delete_student

        student = Student.find( params[:student_id] )
        homework_records = HomeworkRecord.all.where( :student_id => params[:student_id] )
        attendance_records = AttendanceRecord.all.where( :student_id => params[:student_id] )
        course_records = CourseRecord.all.where( :student_id => params[:student_id] )
        everyday_grades = EverydayGrade.all.where( :student_id => params[:student_id] )

        if homework_records.destroy_all and attendance_records.destroy_all and course_records.destroy_all and everyday_grades.destroy_all and student.destroy
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

        @course.teacher = Teacher.find( session[:teacher_id] )

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

    def create_homework

        puts "lihao is testing -- "

        homework = Homework.new
        homework.name = homework_params['homework_name']
        homework.description = homework_params['homework_description']
        homework.course = Course.find( homework_params['course_id'] )
        homework.deadline = DateTime.parse( homework_params['deadline_datetime'] )
        homework.status = false

        if homework_params['attachment_url'] != nil
            unless request.get?
                filename = uploadfile( homework_params['attachment_url'], 'homework_attachments' )           
                address = '/public/upload/homework_attachments/' + filename
                
                puts "Saving one new uploaded homework attachment"
                puts address

                homework.attachment_address = address
            end
        end

        if homework.save

            CourseClassUnit.all.where(course_id:params[:course_id]).each do |ccu|
                ClassUnit.find( ccu.class_unit_id ).students.each do |stu|
                    homework_record = HomeworkRecord.new
                    homework_record.status = false
                    homework_record.grade = 0
                    homework_record.student = stu
                    homework_record.homework = homework
                    homework_record.class_unit = ClassUnit.find( ccu.class_unit_id )
                    homework_record.address = nil
                    homework_record.save
                end
            end

            # res = '{"result":"ok"}'
        else
            # res = '{"result":"error"}'
        end

        # respond_to do |format|
        #     format.json { render json: res, status: "200" }
        # end
        redirect_to '/index/homework'

    end

    def upload_document
        puts document_params['document_url']
        puts document_params['course_id']
        unless request.get?
            filename = uploadfile( document_params['document_url'], 'documents' )           
            puts "Saving one new uploaded document"
            puts filename
            new_document = Document.new
            new_document.address = '/public/upload/documents/' + filename
            new_document.course_id = document_params['course_id']
            new_document.name = filename
            new_document.save
        end
        redirect_to '/index/document'
    end

    def download_document

        address = "#{Rails.root}" + params[:address];
        if File.exist?( address )
            puts "begin downloading" + address
            send_file address 
        end

    end

    protected
      def uploadfile(file, fileType)
        if !file.original_filename.empty?
          @filename = file.original_filename
          #设置目录路径，如果目录不存在，生成新目录
          FileUtils.mkdir("#{Rails.root}/public/upload/") unless File.exist?("#{Rails.root}/public/upload/")
          FileUtils.mkdir("#{Rails.root}/public/upload/" + fileType) unless File.exist?("#{Rails.root}/public/upload/" + fileType)
          #写入文件      
          ##wb 表示通过二进制方式写，可以保证文件不损坏
          File.open("#{Rails.root}/public/upload/" + fileType + "/#{@filename}", "wb") do |f|
            f.write(file.read)
          end
          return @filename
        end
      end

    private 
        def document_params
            params.require(:document).permit( :document_url, :course_id )
        end

    private 
        def homework_params
            params.require(:homework).permit( :attachment_url, :course_id, :homework_name, :homework_description, :deadline_datetime )
        end

end

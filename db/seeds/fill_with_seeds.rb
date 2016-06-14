# ruby encoding: utf-8

tec = Teacher.create( :name => "admin", :password => "admin")

Course.transaction do
    (1..5).each do |i|
        cos = Course.create( :name => "课程#{i}", :teacher => tec)
        (1..3).each do |j|
            Document.create( :name => "辅助资料#{j}", :address => "address_#{j}", :course => cos, :description => "文件描述_#{j}" )
            Homework.create( :name => "课程作业#{j}", :deadline => DateTime.tomorrow, :course => cos, :status => true, :description => "课程描述——#{j}" )
        end
        Homework.create( :name => "课程作业4", :deadline => DateTime.tomorrow, :course => cos, :status => false, :description => "课程描述——4" )
    end
end

ClassUnit.transaction do
    (1..5).each do |i|
        clz = ClassUnit.create(name:"信管#{i}班")
        (1..10).each do |j|
            Student.create( :name => "student_#{j}", :password => "password_#{j}", :class_unit => clz )
        end
    end
end

Course.transaction do
    Course.all.each do |coz|
        (1..3).each do |x|
            AttendanceCheck.create( :target_number => (1000+x), :status => 0, :course => coz )
        end

        ClassUnit.all.each do |clz|

            CourseClassUnit.create( :course => coz, :class_unit => clz )

            clz.students.each do |stu|
                EverydayGrade.create( :student => stu, :course => coz, :class_unit => clz, :grade => 131 )
                (1..7).each do |i|
                    # each student in each course has seven course records by default. 
                    CourseRecord.create( :grade => "-1", :course => coz, :student => stu, :index => i )
                end

                AttendanceCheck.all.where( :course => coz ).each do |ac|
                    AttendanceRecord.create( :status => 1, :target_number => "0000", :course => coz, :class_unit => clz, :student => stu, :attendance_check => ac)
                end
                coz.homeworks.each do |hw|
                    HomeworkRecord.create( :grade => "70", :status => "1", :address => "homework_address", :student => stu, :homework => hw, :class_unit => clz )
                end
            end
        end

    end
end

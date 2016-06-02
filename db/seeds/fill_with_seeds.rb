# ruby encoding: utf-8

tec = Teacher.create( :name => "admin", :password => "admin")

Course.transaction do
    (1..5).each do |i|
        cos = Course.create( :name => "课程#{i}", :teacher => tec)
        (1..4).each do |j|
            Document.create( :name => "辅助资料#{j}", :address => "address_#{j}", :course => cos )
            Homework.create( :name => "课程作业#{j}", :deadline => DateTime.tomorrow, :course => cos )
        end
    end
end

ClassUnit.transaction do
    (1..5).each do |i|
        clz = ClassUnit.create(name:"信管#{i}班")
        (1..10).each do |j|
            Student.create( :name => "student_#{j}", :password => "password_#{j}",
                :everyday_grade => "#{j}", :class_unit => clz )
        end
    end
end

Course.transaction do
    Course.all.each do |coz|
        ClassUnit.all.each do |clz|
            clz.students.each do |stu|
                CourseRecord.create( :grade => "93", :course => coz, :student => stu)
                AttendanceRecord.create( :status => "0", :target_number => "0000", :course => coz, :class_unit => clz, :student => stu)
                coz.homeworks.each do |hw|
                    HomeworkRecord.create( :grade => "70", :status => "1", :address => "homework_address", :student => stu, :homework => hw, :class_unit => clz )
                end
            end
        end
    end
end

(1..3).each do |x|
    AttendanceCheck.create( :target_number => (1000+x), :status => 0 )
end
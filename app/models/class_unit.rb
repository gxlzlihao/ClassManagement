class ClassUnit < ActiveRecord::Base
    has_many :students
    has_many :courses, through: :course_class_units
    has_many :attendance_records
    has_many :homework_records
    has_many :everyday_grades
end

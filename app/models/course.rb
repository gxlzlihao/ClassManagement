class Course < ActiveRecord::Base
    has_many :class_units, through: :course_class_units
    has_many :documents
    has_many :attendance_records
    has_many :attendance_checks
    has_many :course_records
    has_many :homeworks
    has_many :everyday_grades
    belongs_to :teacher
end

class Student < ActiveRecord::Base
    belongs_to :class_unit
    has_many :homework_records
    has_many :attendance_records
    has_many :course_records
end

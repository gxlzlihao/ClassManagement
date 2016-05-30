class Course < ActiveRecord::Base
    has_and_belongs_to_many :class_units
    has_many :documents
    has_many :attendance_records
    has_many :course_records
    has_many :homeworks
    belongs_to :teacher
end

class ClassUnit < ActiveRecord::Base
    has_many :students
    has_and_belongs_to_many :courses
    has_many :attendance_records
    has_many :homework_records
end

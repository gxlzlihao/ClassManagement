class AttendanceRecord < ActiveRecord::Base
    belongs_to :student
    belongs_to :course
    belongs_to :class_unit
    belongs_to :attendance_check
end

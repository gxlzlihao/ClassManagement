class AttendanceCheck < ActiveRecord::Base
    has_many :attendance_checks
    belongs_to :course
end

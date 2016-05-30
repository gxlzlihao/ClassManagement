class CourseRecord < ActiveRecord::Base
    belongs_to :course
    belongs_to :student
end

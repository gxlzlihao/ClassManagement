class CourseClassUnit < ActiveRecord::Base
    belongs_to :class_unit
    belongs_to :course
end

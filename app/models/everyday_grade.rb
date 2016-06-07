class EverydayGrade < ActiveRecord::Base
    belongs_to :student
    belongs_to :course
    belongs_to :class_unit
end

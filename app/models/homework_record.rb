class HomeworkRecord < ActiveRecord::Base
    belongs_to :homework
    belongs_to :student
    belongs_to :class_unit
end

class Homework < ActiveRecord::Base
    has_many :homework_records
    belongs_to :course
end

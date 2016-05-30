class CreateStudents < ActiveRecord::Migration
  def change
    create_table :students do |t|

        t.string :name
        t.integer :everyday_grade

        t.belongs_to :class_unit, foreign_key: true
        t.timestamps null: false
    end

  end
end

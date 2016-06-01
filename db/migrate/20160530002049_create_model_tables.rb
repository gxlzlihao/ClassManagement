class CreateModelTables < ActiveRecord::Migration
  def change

    create_table :class_units do |t|
        t.string :name
        t.timestamps null: false
    end
    
    create_table :students do |t|

        t.string :name
        t.string :password
        t.integer :everyday_grade

        t.belongs_to :class_unit, foreign_key: true
        t.timestamps null: false
    end

    create_table :teachers do |t|
        t.string :name
        t.string :password
        t.timestamps null: false
    end

    create_table :courses do |t|
        t.string :name
        t.belongs_to :teacher, index: true
        t.timestamps null: false
    end

    create_table :course_class_units, id: false do |t|
      t.belongs_to :class_unit, index: true
      t.belongs_to :course, index: true
    end

    create_table :homeworks do |t|
        t.string :name
        t.datetime :deadline
        t.timestamps null: false
        t.belongs_to :course, index: true
    end

    create_table :documents do |t|
        t.string :name
        t.string :address
        t.belongs_to :course, foreign_key: true
        t.timestamps null: false
    end

    create_table :attendance_records do |t|
        t.integer :status
        t.integer :target_number

        t.belongs_to :student, foreign_key: true
        t.belongs_to :course, foreign_key: true
        t.belongs_to :class_unit, foreign_key: true

        t.timestamps null: false
    end

    create_table :homework_records do |t|

        t.integer :grade
        t.boolean :status, default: 0
        t.string :address, default: nil

        t.belongs_to :student, foreign_key: true
        t.belongs_to :homework, foreign_key: true
        t.belongs_to :class_unit, foreign_key: true

        t.timestamps null: false
    end

    create_table :course_records do |t|

        t.integer :grade
        t.belongs_to :student, foreign_key: true
        t.belongs_to :course, foreign_key: true
        t.timestamps null: false
    end

  end
end

class CreateModelTables < ActiveRecord::Migration
  def change

    create_table :class_units do |t|
        t.string :name
        t.timestamps null: false
    end
    
    create_table :students do |t|

        t.string :name
        t.string :password

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
        t.string :description
        t.string :attachment_address, default: nil
        t.boolean :status, default: false
        t.datetime :deadline
        t.timestamps null: false
        t.belongs_to :course, index: true
    end

    create_table :documents do |t|
        t.string :name
        t.string :address
        t.string :description
        t.belongs_to :course, foreign_key: true
        t.timestamps null: false
    end

    create_table :homework_records do |t|

        t.integer :grade
        t.boolean :status, default: false
        t.string :address, default: nil

        t.belongs_to :student, foreign_key: true
        t.belongs_to :homework, foreign_key: true
        t.belongs_to :class_unit, foreign_key: true

        t.timestamps null: false
    end

    create_table :course_records do |t|

        t.integer :grade
        t.integer :index
        t.belongs_to :student, foreign_key: true
        t.belongs_to :course, foreign_key: true
        t.timestamps null: false
    end

    create_table :attendance_checks do |t|
        t.integer :target_number
        t.boolean :status
        t.belongs_to :course, foreign_key: true
        t.timestamps null: false
    end

    create_table :everyday_grades do |t|
        t.integer :grade
        t.belongs_to :student, foreign_key: true
        t.belongs_to :course, foreign_key: true
        t.belongs_to :class_unit, foreign_key: true
        t.timestamps null: false
    end

    create_table :attendance_records do |t|
        t.integer :status
        t.integer :target_number

        t.belongs_to :student, foreign_key: true
        t.belongs_to :course, foreign_key: true
        t.belongs_to :class_unit, foreign_key: true
        t.belongs_to :attendance_check, foreign_key: true

        t.timestamps null: false
    end

  end
end

class CreateHomeworkRecords < ActiveRecord::Migration
  def change
    create_table :homework_records do |t|

        t.integer :grade
        t.boolean :status

        t.timestamps null: false
    end

  end
end

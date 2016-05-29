class CreateAttendanceRecords < ActiveRecord::Migration
  def change
    create_table :attendance_records do |t|

      t.timestamps null: false
    end
  end
end

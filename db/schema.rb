# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160530002049) do

  create_table "attendance_checks", force: :cascade do |t|
    t.integer  "target_number", limit: 4
    t.boolean  "status"
    t.integer  "course_id",     limit: 4
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "attendance_checks", ["course_id"], name: "fk_rails_77d3a3b7a3", using: :btree

  create_table "attendance_records", force: :cascade do |t|
    t.integer  "status",              limit: 4
    t.integer  "target_number",       limit: 4
    t.integer  "student_id",          limit: 4
    t.integer  "course_id",           limit: 4
    t.integer  "class_unit_id",       limit: 4
    t.integer  "attendance_check_id", limit: 4
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  add_index "attendance_records", ["attendance_check_id"], name: "fk_rails_656fdab600", using: :btree
  add_index "attendance_records", ["class_unit_id"], name: "fk_rails_9fef6ec814", using: :btree
  add_index "attendance_records", ["course_id"], name: "fk_rails_f76ac226c4", using: :btree
  add_index "attendance_records", ["student_id"], name: "fk_rails_828d16c97c", using: :btree

  create_table "class_units", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "course_class_units", id: false, force: :cascade do |t|
    t.integer "class_unit_id", limit: 4
    t.integer "course_id",     limit: 4
  end

  add_index "course_class_units", ["class_unit_id"], name: "index_course_class_units_on_class_unit_id", using: :btree
  add_index "course_class_units", ["course_id"], name: "index_course_class_units_on_course_id", using: :btree

  create_table "course_records", force: :cascade do |t|
    t.integer  "grade",      limit: 4
    t.integer  "index",      limit: 4
    t.integer  "student_id", limit: 4
    t.integer  "course_id",  limit: 4
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  add_index "course_records", ["course_id"], name: "fk_rails_9278eab0a9", using: :btree
  add_index "course_records", ["student_id"], name: "fk_rails_1b81ee94c6", using: :btree

  create_table "courses", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.integer  "teacher_id", limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "courses", ["teacher_id"], name: "index_courses_on_teacher_id", using: :btree

  create_table "documents", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.string   "address",     limit: 255
    t.string   "description", limit: 255
    t.integer  "course_id",   limit: 4
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "documents", ["course_id"], name: "fk_rails_4248d91278", using: :btree

  create_table "everyday_grades", force: :cascade do |t|
    t.integer  "grade",         limit: 4
    t.integer  "student_id",    limit: 4
    t.integer  "course_id",     limit: 4
    t.integer  "class_unit_id", limit: 4
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "everyday_grades", ["class_unit_id"], name: "fk_rails_0d50ca14ee", using: :btree
  add_index "everyday_grades", ["course_id"], name: "fk_rails_d424037190", using: :btree
  add_index "everyday_grades", ["student_id"], name: "fk_rails_5d07ea2431", using: :btree

  create_table "homework_records", force: :cascade do |t|
    t.integer  "grade",         limit: 4
    t.boolean  "status",                    default: false
    t.string   "address",       limit: 255
    t.integer  "student_id",    limit: 4
    t.integer  "homework_id",   limit: 4
    t.integer  "class_unit_id", limit: 4
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
  end

  add_index "homework_records", ["class_unit_id"], name: "fk_rails_c2adc6b3cd", using: :btree
  add_index "homework_records", ["homework_id"], name: "fk_rails_e10d295295", using: :btree
  add_index "homework_records", ["student_id"], name: "fk_rails_68dbdc2de3", using: :btree

  create_table "homeworks", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.string   "description", limit: 255
    t.boolean  "status",                  default: false
    t.datetime "deadline"
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.integer  "course_id",   limit: 4
  end

  add_index "homeworks", ["course_id"], name: "index_homeworks_on_course_id", using: :btree

  create_table "students", force: :cascade do |t|
    t.string   "name",          limit: 255
    t.string   "password",      limit: 255
    t.integer  "class_unit_id", limit: 4
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  add_index "students", ["class_unit_id"], name: "fk_rails_e0b6de603b", using: :btree

  create_table "teachers", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.string   "password",   limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_foreign_key "attendance_checks", "courses"
  add_foreign_key "attendance_records", "attendance_checks"
  add_foreign_key "attendance_records", "class_units"
  add_foreign_key "attendance_records", "courses"
  add_foreign_key "attendance_records", "students"
  add_foreign_key "course_records", "courses"
  add_foreign_key "course_records", "students"
  add_foreign_key "documents", "courses"
  add_foreign_key "everyday_grades", "class_units"
  add_foreign_key "everyday_grades", "courses"
  add_foreign_key "everyday_grades", "students"
  add_foreign_key "homework_records", "class_units"
  add_foreign_key "homework_records", "homeworks"
  add_foreign_key "homework_records", "students"
  add_foreign_key "students", "class_units"
end

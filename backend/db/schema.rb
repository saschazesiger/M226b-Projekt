# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_01_03_194256) do
  create_table "time_entries", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.datetime "time"
    t.boolean "action"
    t.boolean "edited"
    t.index ["user_id"], name: "index_time_entries_on_user_id"
  end

  create_table "time_logs", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "time_entry_id"
    t.datetime "changeAt"
    t.string "oldDatetime"
    t.boolean "oldEdited"
    t.index ["time_entry_id"], name: "index_time_logs_on_time_entry_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "firstname"
    t.string "surname"
    t.string "email"
    t.bigint "supervisor_id"
    t.datetime "lastlogin"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["supervisor_id"], name: "fk_users_supervisor"
  end

  add_foreign_key "time_entries", "users"
  add_foreign_key "time_logs", "time_entries"
  add_foreign_key "users", "users", column: "supervisor_id", name: "fk_users_supervisor"
end
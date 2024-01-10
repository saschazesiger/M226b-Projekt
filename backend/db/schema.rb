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

  create_table "absence", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.references :user, foreign_key: true
    t.datetime :from
    t.datetime :to
    t.string :type
    t.boolean :approved
  end

  add_foreign_key "time_entries", "users"
  add_foreign_key "time_logs", "time_entries"
  add_foreign_key "users", "users", column: "supervisor_id", name: "fk_users_supervisor"
end
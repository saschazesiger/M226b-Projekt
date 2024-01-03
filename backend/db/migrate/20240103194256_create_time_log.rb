class CreateTimeLog < ActiveRecord::Migration[7.1]
  def change
    create_table :time_logs do |t|
      t.references :time_entry, foreign_key: true
      t.datetime :changeAt
      t.string :oldDatetime, limit: 255
      t.boolean :oldEdited
    end
  end
end

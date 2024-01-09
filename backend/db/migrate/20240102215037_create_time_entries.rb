class CreateTimeEntries < ActiveRecord::Migration[7.1]
  def change
    create_table :time_entries do |t|
      t.references :user, foreign_key: true
      t.datetime :time
      t.boolean :action, default: false
      t.boolean :edited, default: false
    end
  end
end

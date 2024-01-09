class CreateTimeEntries < ActiveRecord::Migration[7.1]
  def change
    create_table :time_entries do |t|
      t.references :user, foreign_key: true
      t.datetime :time
      t.number :action, default: 0
      t.number :edited, default: 0
    end
  end
end

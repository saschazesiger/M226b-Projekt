class CreateTimeEntries < ActiveRecord::Migration[7.1]
  def change
    create_table :time_entries do |t|
      t.references :user, foreign_key: true
      t.datetime :time
      t.boolean :action # 0 = in, 1 = out
      t.boolean :edited # 0 = no, 1 = yes
    end
  end
end

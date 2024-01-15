class CreateAbsences < ActiveRecord::Migration[7.1]
  def change
    create_table :absence do |t|
      t.references :user, foreign_key: true
      t.datetime :from
      t.datetime :to
      t.string :type
      t.boolean :approved # 0 = in, 1 = out
    end
  end
end

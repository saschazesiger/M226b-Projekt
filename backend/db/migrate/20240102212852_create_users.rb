class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :firstname
      t.string :surname
      t.string :email
      t.bigint :supervisor_id
      t.datetime :lastlogin
      t.timestamps
    end
    add_foreign_key :users, :users, column: :supervisor_id, primary_key: :id, name: 'fk_users_supervisor'
  end
end

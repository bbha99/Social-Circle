class CreateBlockedUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :blocked_users, primary_key: [:user_id, :blocked_user_id] do |t|
      t.references :user
      t.references :blocked_user

      t.timestamps
    end

    add_foreign_key :blocked_users, :users, column: :user_id, primary_key: :id
    add_foreign_key :blocked_users, :users, column: :blocked_user_id, primary_key: :id
  end
end

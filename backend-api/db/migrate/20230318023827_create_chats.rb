class CreateChats < ActiveRecord::Migration[6.1]
  def change
    create_table :chats do |t|
      t.text :message
      t.boolean :deleted # false
      t.references :sender
      t.references :receiver

      t.timestamps
    end

    add_foreign_key :chats, :users, column: :sender_id, primary_key: :id
    add_foreign_key :chats, :users, column: :receiver_id, primary_key: :id
  end
end

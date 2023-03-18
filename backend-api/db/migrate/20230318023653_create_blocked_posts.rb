class CreateBlockedPosts < ActiveRecord::Migration[6.1]
  def change
    create_table :blocked_posts, primary_key: [:post_id, :user_id] do |t|
      t.references :post, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

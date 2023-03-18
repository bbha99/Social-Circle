class CreateCommentLikes < ActiveRecord::Migration[6.1]
  def change
    create_table :comment_likes, primary_key: [:comment_id, :user_id] do |t|
      t.references :comment, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

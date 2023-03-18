class CommentLike < ApplicationRecord
  self.primary_keys = :comment_id, :user_id
  belongs_to :comment
  belongs_to :user
end

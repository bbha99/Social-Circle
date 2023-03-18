class PostLike < ApplicationRecord
  self.primary_keys = :post_id, :user_id
  belongs_to :post
  belongs_to :user
end

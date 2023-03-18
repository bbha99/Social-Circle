class BlockedUser < ApplicationRecord
  self.primary_keys = :user_id, :blocked_user_id
  belongs_to :user, :class_name => 'User'
  belongs_to :blocked_user, :class_name => 'User'
end

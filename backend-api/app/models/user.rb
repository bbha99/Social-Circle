class User < ApplicationRecord
  
  has_secure_password

  validates :username, :email, :password, :password_confirmation, presence: true
  validates :username, :email, uniqueness: true
  validates :username, length: { minimum: 4 }
  validates :password, :password_confirmation, length: { minimum: 8 }

  has_many :post
  has_many :comment

end

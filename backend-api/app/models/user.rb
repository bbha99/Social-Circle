class User < ApplicationRecord
  
  has_secure_password

  validates :username, :email, presence: true
  validates :username, :email, uniqueness: true
  validates :username, length: { minimum: 4 }
  validates :password, :password_confirmation, presence: true, if: :password_required?
  validates :password, :password_confirmation, length: { minimum: 8 }, if: :password_required?

  has_many :post
  has_many :comment

  def password_required?
    new_record? || !password.nil?
  end
  
  def self.find_conversations(params)
    ids = [];

    senders = Chat.select(:sender_id).distinct.where(receiver_id: params[:id])
    receivers = Chat.select(:receiver_id).distinct.where(sender_id: params[:id])
    # senders = Chat.select("sender_id, max(created_at)").where(receiver_id: params[:id]).group("sender_id, receiver_id").order("max(created_at) DESC")
    # receivers = Chat.select("receiver_id, max(created_at)").where(sender_id: params[:id]).group("sender_id, receiver_id").order("max(created_at) DESC")



    senders.each do |user|
      ids.push(user.sender_id)
    end

    receivers.each do |user|
      ids.push(user.receiver_id)
    end

    users = User.where(id: ids.uniq)
  end

end

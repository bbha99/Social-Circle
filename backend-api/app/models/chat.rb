class Chat < ApplicationRecord

  belongs_to :sender, :class_name => 'User'
  belongs_to :receiver, :class_name => 'User'

  validates :message, presence: true

  def self.new_message(params)
    browsed_user = User.find(params[:receiver_id])
    message = Chat.create!(sender_id: params[:sender_id], receiver_id: params[:receiver_id], message: params[:message])

    ActionCable.server.broadcast("chat_#{params[:receiver_id]}_#{params[:sender_id]}", message)

    return message
  end

  def self.history(params)
    Chat.where(sender_id: [params[:sender_id], params[:receiver_id]], receiver_id: [params[:sender_id], params[:receiver_id]]).order(:created_at)
  end
end

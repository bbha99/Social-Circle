class ChatsChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    stream_from "chat_#{params[:user_id]}_#{params[:receiver_id]}" 
  end

  def unsubscribed
    stop_all_streams
  end
end

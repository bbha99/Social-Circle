class ChatsController < ApplicationController

  def create_message
    message = Chat.new_message(params)
    render json: message, status: :created
  end

  def chat_history
    history = Chat.history(params)
    render json: history, status: :ok
  end
end

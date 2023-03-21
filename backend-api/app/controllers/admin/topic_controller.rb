class Admin::TopicController < ApplicationController


  def index
    @topics = Topic.all
    render json: @topics
  end
  
  

  def create
    @topic = Topic.new(topic_params)

    if @topic.save
      render json: @topic
    end
  end

  private

  def topic_params
    params.require(:topic).permit(:name)
  end
  def show
  end
end

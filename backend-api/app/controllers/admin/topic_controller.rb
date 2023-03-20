class Admin::TopicController < ApplicationController
  before_action :authenticate_admin_credentials

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

  def authenticate_admin_credentials
    authenticate_or_request_with_http_basic do |username, password|
      username == 'spoon' && password == '1113'
    end
  end
  
  def topic_params
    params.require(:topic).permit(:name)
  end
  def show
  end
end

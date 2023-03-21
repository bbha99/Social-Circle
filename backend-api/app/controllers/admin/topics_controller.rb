class Admin::TopicsController < ApplicationController
  def index
    @topics = Topic.all
    render json: @topics
  end
  
  def create
  end
end

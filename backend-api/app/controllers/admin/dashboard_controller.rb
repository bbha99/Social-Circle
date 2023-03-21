class Admin::DashboardController < ApplicationController
  
  def index
   @topics = Topic.all
   render json: @topics
  end

 def index
  @topics = Topic.all
  render json: @topics
 end

  def show
  end
end


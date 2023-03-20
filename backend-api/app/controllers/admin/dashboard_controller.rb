class Admin::DashboardController < ApplicationController
  def index
   @topics = Topic.all
   render json: @topics
  end
end

  def show
  end
end


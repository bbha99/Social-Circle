class Admin::DashboardController < ApplicationController
  http_basic_authenticate_with name: "spoon", password: "1113"

  def index
   @topics = Topic.all
   render json: @topics
  end

  def show
  end
end


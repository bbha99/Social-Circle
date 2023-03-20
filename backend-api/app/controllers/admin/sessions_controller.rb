class Admin::SessionsController < ApplicationController
  def new
  end

  def create
    if params[:username] == 'spoon' && params[:password] == '1113'
      session[:admin] = true
      redirect_to admin_dashboard_path
    else
      flash[:error] = "Invalid username or password"
      render :new
    end
  end
end

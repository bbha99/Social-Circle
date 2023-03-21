class SessionsController < ApplicationController

  def create
    @user = User.find_by(email: session_params[:email].downcase.strip)

    if @user && @user.authenticate(session_params[:password])
      login!
      render json: {
        logged_in: true,
        user: @user
      }, status: 200
    else
      render json: {
        errors: ['Incorrect email or password']
      }, status: 401
    end
  end

  def is_logged_in?
    if logged_in? && current_user
      render json: {
        logged_in: true,
        user: current_user
      }, status: 200
    else
      render json: {
        logged_in: false,
        message: 'no such user'
      }, status: 200
    end
  end

  def destroy
    logout!
    render json: {
      logged_out: true
    }, status: 200
  end

  private

  def session_params
    params.require(:user).permit(
      :email,
      :password
    )
  end

end
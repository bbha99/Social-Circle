class UsersController < ApplicationController

  def index
    @users = User.all 

    if @users
      render json: {
        users: @users
      }, status: 200
    else
      render json: {
        errors: ['no users found']
      }, status: 500
    end
  end
  
  def create
    @user = User.new(user_params)
    @user.email = @user.email.downcase.strip

    if @user.save
      login!
      render json: {
        status: :created,
        user: @user
      }, status: 201
    else
      render json: {
        errors: @user.errors.full_messages
      }, status: 500
    end
  end

  def show
    @user = User.find(params[:id])

    if @user
      render json: {
        user: @user,
        post: @user.post
      }, status: 200
    else
      render json: {
        errors: ['user not found']
      }, status: 500
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :username,
      :email,
      :password,
      :password_confirmation
    )
  end

end

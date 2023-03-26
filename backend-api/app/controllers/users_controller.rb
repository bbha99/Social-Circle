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
  
  def update
    @user = User.find(params[:id])
  
    if @user.update(user_params)
      render json: @user, status: 200
    else
      render json: { error: @user.errors.full_messages }, status: 500
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
  
    keys = [:id, :username, :image, :email, :password_digest]
    info = @user.slice(*keys)
  
    if @user
      render json: {
        user: info,
        post: @user.post
      }, status: 200
    else
      render json: {
        errors: ['user not found']
      }, status: 500
    end
  end
  
  def conversations
    @users = User.find_conversations(params)
    
    keys = [:id, :username, :image]
    info = @users.map { |user| user.slice(*keys) }

    render json: {
      users: info
    }, status: 200
  end

  def meet_people
    @users = User.meet_new_people(params)
    
    keys = [:id, :username, :image]
    info = @users.map { |user| user.slice(*keys) }

    render json: {
      users: info
    }, status: 200
  end

  private

  def user_params
    params.require(:user).permit(
      :username,
      :email,
      :password,
      :password_confirmation,
    )
  end

end

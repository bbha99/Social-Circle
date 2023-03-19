class PostsController < ApplicationController
  def index
    @posts = Post.all
    posts = User.find(params[:id])
    puts @posts
    render json: {posts: @posts}
  end

  def show
  end

end

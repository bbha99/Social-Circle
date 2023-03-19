class PostsController < ApplicationController
  def index
    @posts = Post.all
    # @likes = PostLike.all

    postsDetails = []
    for post in @posts do
      postsDetails.push({postsDetails: post, totalLikes: post.post_likes.count})
    end
    # puts postsDetails

    # posts = User.find(params[:id])
    render json: {postDetails: postsDetails}
  end

  def show
  end

end

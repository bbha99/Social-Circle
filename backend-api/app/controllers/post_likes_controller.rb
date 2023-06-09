class PostLikesController < ApplicationController

  def create
    newPostLikes = PostLike.new(user_id: params[:id], post_id: params[:post_id])
    
    postLikesCreated = false
    if newPostLikes.save
      postLikesCreated = true
    end
    puts newPostLikes
    render json: {userLikedPost: postLikesCreated}
  end

  def destroy
    @likedItem = PostLike.find_by(user_id: params[:id], post_id: params[:post_id])
    @likedItem.destroy

    render json: {status: "successfully deleted like"}

  end

end

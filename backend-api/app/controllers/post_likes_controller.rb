class PostLikesController < ApplicationController

  def create
    newPostLikes = PostLike.new(user_id: params[:id], post_id: params[:post_id])
    
    postLikesCreated = false
    if newPostLikes.save
      postLikesCreated = true
    end
    puts newPostLikes
    render json: {postLikeId: newPostLikes, postLikesCreated: postLikesCreated}
  end

  def destroy
  
  end

end

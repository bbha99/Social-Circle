class CommentsController < ApplicationController
  def create
    newComment = Comment.new(user_id: params[:id], post_id: params[:post_id])
    
    postCommentCreated = false
    if newComment.save
      postCommentCreated = true
    end
    puts newComment
    render json: {userCommentOnPost: postCommentCreated}
  end
end

class CommentsController < ApplicationController
  def create
    commentDetails = params[:newCommentDetails]

    newComment = Comment.new(user_id: commentDetails[:user_id], post_id: commentDetails[:post_id], description: commentDetails[:description], deleted: commentDetails[:deleted], parent_comment_id: commentDetails[:parent_comment_id])

    postCommentCreated = false
    if newComment.save
      postCommentCreated = true
    end
    
    render json: {userCommentOnPost: newComment.as_json(include: :user), postCommentCreated: postCommentCreated}
  end
end

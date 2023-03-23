class PostsController < ApplicationController
  def index

    # Check if user is logged in or not
    if params[:id].to_i != -1
      sessionUser = User.find(params[:id])
    end
    @posts = Post.all
    postsDetails = []

    # Create a list of posts
    for post in @posts do
      userLikedPost = false
      
      # https://guides.rubyonrails.org/active_record_querying.html#existence-of-objects
      #  Query if user liked the post
      if params[:id].to_i != -1 && PostLike.where(user_id: sessionUser.id, post_id: post.id).exists?
        userLikedPost = true
      end

      # User.includes(:post).where("id = #{post.user_id}")
  
      postComments = post.comment.order(created_at: :desc)

      postsDetails.push({postsDetails: post.as_json(include: :user), totalLikes: post.post_likes.count, userLikedPost: userLikedPost, postComments: postComments.as_json(include: :user)})
    end

    render json: {postDetails: postsDetails}
  end

  def create

    postDetails = params[:newPostDetails]

    newPost = Post.new(title: postDetails["title"], description: postDetails["description"], image: postDetails["image"], deleted: nil, topic_id: postDetails["topic_id"].to_i, user_id:postDetails["user_id"].to_i )
    
    if newPost.save
      render json: {postsDetails: newPost.as_json(include: :user), totalLikes: 0, userLikedPost: false}
    end

  end
  

end

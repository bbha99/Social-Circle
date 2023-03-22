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

      postsDetails.push({postsDetails: post, totalLikes: post.post_likes.count, userLikedPost: userLikedPost})
    end

    render json: {postDetails: postsDetails}
  end

  def create

    postDetails = params[:newPostDetails]

    newPost = Post.new(title: postDetails["title"], description: postDetails["description"], image: postDetails["image"], deleted: false, topic_id: postDetails["topic_id"].to_i, user_id:postDetails["user_id"].to_i )
    
    if newPost.save
      render json: newPost
    end

  end
  

end

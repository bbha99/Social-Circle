# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

puts "Seeding Data ..."

# Helper functions
def open_asset(file_name)
  File.open(Rails.root.join('db', 'seed_assets', file_name))
end

# Only run on development (local) instances not on production, etc.
unless Rails.env.development?
  puts "Development seeds only (for now)!"
  exit 0
end


# Create Users

puts "Creating Users"

15.times do 
  User.create!({
    username: Faker::Name.unique.name,
    email: Faker::Internet.email,
    password: Faker::Internet.password(min_length: 5, max_length: 8),
    image: Faker::LoremFlickr.colorized_image
})
end

puts "Done seeding users"

# Create Topics

puts "Creating Topics"

Topic.create!({
  name: 'Music'
})
Topic.create!({
  name: 'Sports'
})
Topic.create!({
  name: 'Gaming'
})

puts "Done creating Topics"

# Create Posts

puts "Creating Posts..."

2.times do 
  Post.create!({
  title: Faker::Quote.singular_siegler,
  description: Faker::Quote.matz,
  image: Faker::LoremFlickr.colorized_image,
  user_id: 1,
  topic_id: rand(1..3)
})
end

3.times do 
  Post.create!({
  title: Faker::Quote.singular_siegler,
  description: Faker::Quote.matz,
  image: Faker::LoremFlickr.colorized_image,
  user_id: 2,
  topic_id: rand(1..3)
})
end

10.times do 
  Post.create!({
  title: Faker::Quote.singular_siegler,
  description: Faker::Quote.matz,
  image: Faker::LoremFlickr.colorized_image,
  user_id: rand(1..15),
  topic_id: rand(1..3)
})
end

puts "Done creating posts"

# Create post_likes

puts "creating post_likes"

5.times do |n|
  PostLike.create!({
    post_id: 1,
    user_id: n + 1
  })
end

3.times do |n|
  PostLike.create!({
    post_id: 2,
    user_id: n + 1 + 1
  })
end

puts "done creating post_likes"

# Create comments

puts "Creating Comments"

10.times do 
  Comment.create!({
    description: Faker::Quotes::Shakespeare.hamlet_quote,
    user_id: rand(1..15),
    post_id: rand(1..10) 
  })
end

puts "Done creating comments"

#Create Comment_Likes

puts "Creating comment_likes"

10.times do |n|
  CommentLike.create!({
    comment_id: 1,
    user_id: n + 1
  })
end

puts "Done creating comment_likes"

# Create Chats

puts "Creating chats"

10.times do 
  Chat.create!({
    message: Faker::Quote.yoda,
    sender_id: rand(1..8),
    receiver_id: rand(8..15)
  })
end

puts "Done creating Chats"

# Create blocked_users

puts "Creating blocked_users"

10.times do |n|
  BlockedUser.create!({
    user_id: 15,
    blocked_user_id: n + 1
  })
end

puts "Done creating blocked_users"

#Create blocked_posts

puts "Creating blocked_posts"

10.times do |n|
  BlockedPost.create!({
    post_id: n + 1,
    user_id: 15
  })
end

puts "Done creating blocked_posts"
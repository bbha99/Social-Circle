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

5.times do 
  User.create!({
    username: Faker::Name.unique.name,
    email: Faker::Internet.email,
    password: 'password',
    password_confirmation: 'password',
  })
end

User.create!({
  username: 'john',
  email: 'ngoxd97@gmail.com',
  password: '1234567890',
  password_confirmation: '1234567890',
})

User.create!({
  username: 'euna',
  email: 'euna@howe.org',
  password: '1234567890',
  password_confirmation: '1234567890',
})

User.create!({
  username: 'bbha',
  email: 'bran@gmail.com',
  password: 'password',
  password_confirmation: 'password',
})

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
Topic.create!({
  name: 'Pets'
})
Topic.create!({
  name: 'Movies'
})

# SELECT "posts".* FROM "posts" INNER JOIN "users" ON "users"."id
# " = "posts"."user_id"
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
    deleted: false,
    user_id: 2,
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
    post_id: 3,
    user_id: n + 1 + 1
  })
end

1.times do |n|
  PostLike.create!({
    post_id: 2,
    user_id: n + 1 + 1
  })
end

puts "done creating post_likes"

# Create comments

puts "Creating Comments"

5.times do |n|
  Comment.create!({
    description: Faker::Quotes::Shakespeare.hamlet_quote,
    user_id: 1,
    post_id: n + 1
  })
end

3.times do |n|
  Comment.create!({
    description: Faker::Quotes::Shakespeare.hamlet_quote,
    user_id: 2,
    post_id: n + 1
  })
end

1.times do |n|
  Comment.create!({
    description: "Testing this nested comment.",
    parent_comment_id: 1,
    user_id: 1,
    post_id: 1
  })
end

1.times do |n|
  Comment.create!({
    description: "Testing this nested comment2.",
    parent_comment_id: 1,
    user_id: 3,
    post_id: 1
  })
end

1.times do |n|
  Comment.create!({
    description: "Testing this nested nested comment.",
    parent_comment_id: 9,
    user_id: 2,
    post_id: 1
  })
end

puts "Done creating comments"

#Create Comment_Likes

puts "Creating comment_likes"

3.times do |n|
  CommentLike.create!({
    comment_id: 1,
    user_id: n + 1
  })
end

puts "Done creating comment_likes"

# Create Chats

puts "Creating chats"

1.times do 
  Chat.create!({
    message: Faker::Quote.yoda,
    sender_id: 6,
    receiver_id: 7
  })
end

3.times do 
  Chat.create!({
    message: Faker::Quote.yoda,
    sender_id: 6,
    receiver_id: 8
  })
end

2.times do |n|
  Chat.create!({
    message: Faker::Quote.yoda,
    sender_id: n + 1,
    receiver_id: 8
  })
end

puts "Done creating Chats"

# Create blocked_users

puts "Creating blocked_users"

3.times do |n|
  BlockedUser.create!({
    user_id: 5,
    blocked_user_id: n + 1
  })
end

puts "Done creating blocked_users"

#Create blocked_posts

puts "Creating blocked_posts"

3.times do |n|
  BlockedPost.create!({
    post_id: n + 1,
    user_id: 4
  })
end

puts "Done creating blocked_posts"

1.times do |n|
  ImageGallery.create!({
    user_id: 8,
    image: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
  })
end

1.times do |n|
  ImageGallery.create!({
    user_id: 6,
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d"
  })
end

1.times do |n|
  ImageGallery.create!({
    user_id: 3,
    image: "https://images.unsplash.com/photo-1522770179533-24471fcdba45"
  })
end

1.times do |n|
  ImageGallery.create!({
    user_id: 1,
    image: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
  })
end

1.times do |n|
  ImageGallery.create!({
    user_id: 2,
    image: "https://images.unsplash.com/photo-1533827432537-70133748f5c8"
  })
end
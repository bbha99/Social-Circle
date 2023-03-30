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
  username: Faker::Name.unique.name,
  email: 'test@gmail.com',
  password: 'password',
  password_confirmation: 'password',
})

User.create!({
  username: 'Peter Lan',
  email: 'Peterl@howe.org',
  password: 'password',
  password_confirmation: 'password',
})

User.create!({
  username: 'bbha',
  email: 'bran@gmail.com',
  password: 'password',
  password_confirmation: 'password',
})

User.create!({
  username: Faker::Name.unique.name,
  email: Faker::Internet.email,
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

1.times do 
  Post.create!({
    title: Faker::Quote.singular_siegler,
    description: Faker::Quote.yoda,
    image: "/images/movies/theatre.jpg",
    user_id: 1,
    topic_id: 5
  })
end

1.times do 
  Post.create!({
    title: Faker::Quote.singular_siegler,
    description: Faker::Quote.yoda,
    image: "/images/movies/starwars.jpg",
    user_id: 3,
    topic_id: 5
  })
end

1.times do 
  Post.create!({
    title: Faker::Quote.singular_siegler,
    description: Faker::Quote.yoda,
    image: "/images/movies/yoda.jpg",
    user_id: 2,
    topic_id: 5
  })
end

1.times do 
  Post.create!({
    title: Faker::Movies::StarWars.call_sign,
    description: Faker::Movies::StarWars.quote,
    image: "/images/gaming/smiling.jpg",
    user_id: 3,
    topic_id: 3
  })
end

1.times do 
  Post.create!({
    title: Faker::Movies::StarWars.call_sign,
    description: Faker::Movies::StarWars.quote,
    image: "/images/gaming/controller.jpg",
    user_id: 3,
    topic_id: 3
  })
end

1.times do 
  Post.create!({
    title: Faker::Movies::StarWars.call_sign,
    description: Faker::Movies::StarWars.quote,
    image: "/images/gaming/arcade.jpg",
    user_id: 5,
    topic_id: 3
  })
end

1.times do 
  Post.create!({
    title: Faker::Quote.singular_siegler,
    description: Faker::Quotes::Shakespeare.hamlet_quote,
    image: "/images/pets/dog.jpg",
    user_id: 5,
    topic_id: 4
  })
end

1.times do 
  Post.create!({
    title: Faker::Quote.singular_siegler,
    description: Faker::Quotes::Shakespeare.hamlet_quote,
    image: "/images/pets/pug2.jpg",
    user_id: 4,
    topic_id: 4
  })
end

1.times do 
  Post.create!({
    title: Faker::Quote.singular_siegler,
    description: Faker::Quote.matz,
    image: "/images/music/dj.jpg",
    user_id: 4,
    topic_id: 1
  })
end

1.times do 
  Post.create!({
    title: Faker::Quote.singular_siegler,
    description: Faker::Quotes::Shakespeare.hamlet_quote,
    image: "/images/pets/pug.jpg",
    user_id: 1,
    topic_id: 4
  })
end

1.times do 
  Post.create!({
    title: Faker::Quote.singular_siegler,
    description: Faker::Quote.matz,
    image: "/images/music/night.jpg",
    user_id: 8,
    topic_id: 1
  })
end

1.times do 
  Post.create!({
    title: Faker::Quote.singular_siegler,
    description: Faker::Quote.matz,
    image: "/images/sports/gym.jpg",
    user_id: 2,
    topic_id: 2
  })
end

1.times do 
  Post.create!({
    title: Faker::Quote.singular_siegler,
    description: Faker::Quotes::Shakespeare.hamlet_quote,
    image: "/images/pets/hamster.jpg",
    user_id: 8,
    topic_id: 4
  })
end

1.times do 
  Post.create!({
    title: Faker::Quote.singular_siegler,
    description: Faker::Quote.matz,
    image: "/images/sports/football.jpg",
    user_id: 8,
    topic_id: 2
  })
end

1.times do 
  Post.create!({
    title: Faker::Quote.singular_siegler,
    description: Faker::Quote.matz,
    image: "/images/sports/volleyball.jpg",
    user_id: 6,
    topic_id: 2
  })
end

1.times do 
  Post.create!({
    title: Faker::Quote.singular_siegler,
    description: Faker::Quote.matz,
    image: "/images/music/studio.jpg",
    user_id: 8,
    topic_id: 1
  })
end


puts "Done creating posts"

# Create post_likes

puts "creating post_likes"

5.times do |n|
  PostLike.create!({
    post_id: 3,
    user_id: n + 1
  })
end

4.times do |n|
  PostLike.create!({
    post_id: 13,
    user_id: n + 1
  })
end

3.times do |n|
  PostLike.create!({
    post_id: 11,
    user_id: n + 1
  })
end

3.times do |n|
  PostLike.create!({
    post_id: 2,
    user_id: n + 1 + 1
  })
end

2.times do |n|
  PostLike.create!({
    post_id: 10,
    user_id: n + 1
  })
end

4.times do |n|
  PostLike.create!({
    post_id: 14,
    user_id: n + 1
  })
end

1.times do |n|
  PostLike.create!({
    post_id: 1,
    user_id: 8
  })
end

1.times do |n|
  PostLike.create!({
    post_id: 2,
    user_id: 8
  })
end

1.times do |n|
  PostLike.create!({
    post_id: 3,
    user_id: 8
  })
end

1.times do |n|
  PostLike.create!({
    post_id: 4,
    user_id: 8
  })
end

1.times do |n|
  PostLike.create!({
    post_id: 5,
    user_id: 8
  })
end

1.times do |n|
  PostLike.create!({
    post_id: 6,
    user_id: 8
  })
end

1.times do |n|
  PostLike.create!({
    post_id: 6,
    user_id: 7
  })
end

1.times do |n|
  PostLike.create!({
    post_id: 8,
    user_id: 8
  })
end

1.times do |n|
  PostLike.create!({
    post_id: 9,
    user_id: 8
  })
end

1.times do |n|
  PostLike.create!({
    post_id: 10,
    user_id: 8
  })
end

1.times do |n|
  PostLike.create!({
    post_id: 13,
    user_id: 8
  })
end

1.times do |n|
  PostLike.create!({
    post_id: 16,
    user_id: 8
  })
end

puts "done creating post_likes"

# Create comments

puts "Creating Comments"

1.times do |n|
  Comment.create!({
    description: Faker::Quotes::Shakespeare.hamlet_quote,
    user_id: 1,
    post_id: 13
  })
end

1.times do |n|
  Comment.create!({
    description: Faker::Quotes::Shakespeare.hamlet_quote,
    user_id: 5,
    post_id: 13
  })
end

1.times do |n|
  Comment.create!({
    description: Faker::Quotes::Shakespeare.hamlet_quote,
    user_id: 4,
    post_id: 13
  })
end

1.times do |n|
  Comment.create!({
    description: Faker::Quotes::Shakespeare.hamlet_quote,
    parent_comment_id: 2,
    user_id: 1,
    post_id: 13
  })
end

1.times do |n|
  Comment.create!({
    description: Faker::Quotes::Shakespeare.hamlet_quote,
    parent_comment_id: 3,
    user_id: 3,
    post_id: 13
  })
end

3.times do |n|
  Comment.create!({
    description: Faker::Quotes::Shakespeare.hamlet_quote,
    user_id: 2,
    post_id: n + 1
  })
end

5.times do |n|
  Comment.create!({
    description: Faker::Quotes::Shakespeare.hamlet_quote,
    user_id: 1,
    post_id: n + 1
  })
end

1.times do |n|
  Comment.create!({
    description: Faker::Quotes::Shakespeare.hamlet_quote,
    user_id: 5,
    post_id: 10
  })
end

1.times do |n|
  Comment.create!({
    description: Faker::Quotes::Shakespeare.hamlet_quote,
    user_id: 7,
    post_id: 10
  })
end

1.times do |n|
  Comment.create!({
    description: Faker::Quotes::Shakespeare.hamlet_quote,
    user_id: 5,
    post_id: 8
  })
end

1.times do |n|
  Comment.create!({
    description: Faker::Quotes::Shakespeare.hamlet_quote,
    user_id: 5,
    post_id: 14
  })
end

1.times do |n|
  Comment.create!({
    description: Faker::Quotes::Shakespeare.hamlet_quote,
    user_id: 3,
    post_id: 15
  })
end

1.times do |n|
  Comment.create!({
    description: Faker::Quotes::Shakespeare.hamlet_quote,
    user_id: 6,
    post_id: 16
  })
end

1.times do |n|
  Comment.create!({
    description: Faker::Quotes::Shakespeare.hamlet_quote,
    user_id: 3,
    post_id: 16
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

2.times do |n|
  Chat.create!({
    message: Faker::Quote.yoda,
    sender_id: 8,
    receiver_id: 6
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
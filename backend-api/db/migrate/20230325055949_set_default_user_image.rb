class SetDefaultUserImage < ActiveRecord::Migration[6.1]
  def change
    change_column_default :users, :image, 'https://p7.hiclipart.com/preview/518/320/1007/computer-icons-mobile-app-development-android-my-account-icon.jpg'
  end
end

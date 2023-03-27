class CreateImageGalleries < ActiveRecord::Migration[6.1]
  def change
    create_table :image_galleries do |t|
      t.string :image
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

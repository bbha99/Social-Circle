class ImagesGalleryController < ApplicationController

  def index
    @images = ImageGallery.all

    render json: {imageGallery: @images}
  end
end

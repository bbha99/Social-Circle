class GalleriesController < ApplicationController
  before_action :set_gallery, only: [:show, :update, :destroy]

  # GET /galleries
  def index
    @galleries = Gallery.all
    puts "hello"
    puts @galleries[0]
    render json: GallerySerializer.new(@galleries).as_json
  end

  # GET /galleries/1
  def show
    render json: @gallery
  end

  # POST /galleries
  def create
    @gallery = Gallery.new(gallery_params)

    if @gallery.save
      render json: GallerySerializer.new(Gallery.last).as_json_single
    else
      render json: @gallery.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /galleries/1
  def update
    if @gallery.update(gallery_params)
      render json: @gallery
    else
      render json: @gallery.errors, status: :unprocessable_entity
    end
  end

  # DELETE /galleries/1
  def destroy
    @gallery.destroy
  end

  def latest
    @gallery = Gallery.last
    render json: GallerySerializer.new(@gallery).serializable_hash[:data][:attributes]
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_gallery
      @gallery = Gallery.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def gallery_params
      params.require(:gallery).permit(:image)
    end
end

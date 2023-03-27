class GallerySerializer
  def initialize(galleries)
    @galleries = galleries
  end

  def as_json
    galleries.map do |gallery|
      {
        id: gallery.id,
        image: gallery.image_url,
        created_at: gallery.created_at
      }
    end
  end

  def as_json_single
    return {
      id: galleries.id,
      image: galleries.image_url,
      created_at: galleries.created_at
    }
  end

  private

  attr_reader :galleries
end

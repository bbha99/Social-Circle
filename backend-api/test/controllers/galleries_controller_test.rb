require "test_helper"

class GalleriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @gallery = galleries(:one)
  end

  test "should get index" do
    get galleries_url, as: :json
    assert_response :success
  end

  test "should create gallery" do
    assert_difference('Gallery.count') do
      post galleries_url, params: { gallery: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show gallery" do
    get gallery_url(@gallery), as: :json
    assert_response :success
  end

  test "should update gallery" do
    patch gallery_url(@gallery), params: { gallery: {  } }, as: :json
    assert_response 200
  end

  test "should destroy gallery" do
    assert_difference('Gallery.count', -1) do
      delete gallery_url(@gallery), as: :json
    end

    assert_response 204
  end
end

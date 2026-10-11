require "test_helper"

class AppsControllerTest < ActionDispatch::IntegrationTest
  test "GET /api/apps returns a successful response with an empty list" do
    get "/api/apps"

    assert_response :success
    assert_equal [], response.parsed_body
  end
end

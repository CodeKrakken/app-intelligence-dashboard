require "test_helper"

class AppsControllerTest < ActionDispatch::IntegrationTest
  test "GET /api/apps returns stored apps" do
    App.delete_all

    app = App.create!(
      name: "Example App",
      category: "Productivity",
      publisher: "Example Publisher"
    )

    get "/api/apps"

    assert_response :success
    assert_equal(
      [
        {
          "id" => app.id,
          "name" => "Example App",
          "category" => "Productivity",
          "publisher" => "Example Publisher"
        }
      ],
      response.parsed_body.map do |record|
        record.slice("id", "name", "category", "publisher")
      end
    )
  end
end
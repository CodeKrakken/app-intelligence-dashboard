require "test_helper"

class AppTest < ActiveSupport::TestCase

  require "test_helper"

  class AppTest < ActiveSupport::TestCase
    test "is invalid without a name" do
      app = App.new(
        category: "Productivity",
        publisher: "Example Publisher"
      )

      assert_not app.valid?
      assert_includes app.errors[:name], "can't be blank"
    end
  end
end

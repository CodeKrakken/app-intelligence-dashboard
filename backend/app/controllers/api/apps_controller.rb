module Api
  class AppsController < ApplicationController
    def index
      render json: App.all
    end
  end
end
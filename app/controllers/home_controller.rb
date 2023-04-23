class HomeController < ApplicationController
  def index
    @todos = ["Arrumar Casa", "Aprender CSS", "Fazer marmitas"]
  end
end
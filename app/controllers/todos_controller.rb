class TodosController < ApplicationController
  def index
    @todos = Todo.all
  end

  def destroy
    @todo = Todo.find(params[:id])
    @todo.destroy

    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: turbo_stream.remove("todo_#{@todo.id}")
      end
    end
  end
end
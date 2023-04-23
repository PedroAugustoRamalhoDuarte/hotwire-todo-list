class TodosController < ApplicationController
  def index
    @todos = Todo.all
  end

  def new
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: turbo_stream.update("new_todo", partial: "todos/form", locals: { todo: Todo.new })
      end
    end
  end

  def edit
    @todo = Todo.find(params[:id])

    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: turbo_stream.update("todo_#{@todo.id}", partial: "todos/form", locals: { todo: @todo })
      end
    end
  end

  def update
    @todo = Todo.find(params[:id])

    @todo.update!(name: params[:todo][:name])

    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: turbo_stream.update("todo_#{@todo.id}", partial: "todos/todo", locals: { todo: @todo })
      end
    end
  end

  def create
    @todo = Todo.create!(name: params[:todo][:name])

    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: turbo_stream.append("todos", partial: "todos/todo", locals: { todo: @todo })
      end
    end
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
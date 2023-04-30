class Inertia::TodosController < ApplicationController
  skip_before_action :verify_authenticity_token, if: -> { request.inertia? }

  def index
    render inertia: 'todos', props: {
      todosData: Todo.all,
    }
  end

  def create
    todo = Todo.find(params[:id])
    todo.update!(name: params[:name])
    redirect_to inertia_todos_path
  end

  def update
    todo = Todo.find(params[:id])
    todo.update!(name: params[:name])
    redirect_to inertia_todos_path
  end

  def destroy
    todo = Todo.find(params[:id])
    todo.destroy!
    redirect_to inertia_todos_path
  end
end
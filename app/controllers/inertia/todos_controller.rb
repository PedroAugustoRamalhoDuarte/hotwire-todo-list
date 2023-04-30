class Inertia::TodosController < ApplicationController
  def index
    render inertia: 'todos', props: {
      todosData: Todo.all,
    }
  end
end
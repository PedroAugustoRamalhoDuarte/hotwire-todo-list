class Inertia::TodosController < ApplicationController
  def index
    render inertia: 'todos', props: {
      todos: Todo.all,
    }
  end
end
Rails.application.routes.draw do
  root "todos#index"

  resources :todos

  scope "/inertia" do
    resources :todos, controller: "inertia/todos", as: "inertia_todos"
  end
end

Rails.application.routes.draw do

    get '/' => 'index#index'
    get '/index' => 'index#index'
    get '/index/homepage' => 'index#homepage'
    get '/index/homework' => 'index#homework' 
    get '/index/document' => 'index#document'
    get '/index/everyday_grade' => 'index#everyday_grade'
    get '/index/attendance' => 'index#attendance' 

    post '/index/teacher_signin' => 'index#teacher_signin'
    post '/index/create_course' => 'index#create_course'
    post '/index/create_student' => 'index#create_student'
    post '/index/update_student' => 'index#update_student'
    post '/index/delete_student' => 'index#delete_student'
    post '/index/upload_document' => 'index#upload_document'
    get '/index/download_document' => 'index#download_document'
    post '/index/clear_user_data' => 'index#clear_user_data'

    get '/homework/details' => 'homeworkdetails#index'

    post '/homework/update_details' => 'homeworkdetails#update_details'

    get '/attendance/details' => 'attendancedetails#index'

    post '/attendance/create_new_attendance_check' => 'attendancedetails#create_new_attendance_check'
    post '/attendance/terminate_attendance_check' => 'attendancedetails#terminate_attendance_check'

    get '/client/index' => 'client_index#index'
    get '/client/course_browser' => 'client_index#course_browser'
    get '/client/client_homepage' => 'client_index#client_homepage'
    get '/client/everyday_grade' => 'client_index#everyday_grade'
    get '/client/course_signin' => 'client_index#course_signin'

    post '/client/signin' => 'client_index#client_signin'
    post '/client/verify_signin' => 'client_index#verify_signin'
    post '/client/edit_password' => 'client_index#edit_password'


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end

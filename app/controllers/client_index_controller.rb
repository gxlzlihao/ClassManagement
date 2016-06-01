class ClientIndexController < ApplicationController
    
    skip_before_filter  :verify_authenticity_token

    def course_browser
    end

    def client_homepage
    end

    def everyday_grade
    end

    def course_signin
    end

    def client_signin

        puts params[:client_password]

        @students = Student.find_by( id: params[:client_id], password: params[:client_password] )

        if @students == nil
            res = '{"result":"not_found"}'
        else
            res = '{"result":"ok"}'
        end

        respond_to do |format|
            format.json { render json: res, status: "200" }
        end
    end
    
end

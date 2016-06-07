class HomeworkdetailsController < ApplicationController

    skip_before_filter  :verify_authenticity_token

    def index
        puts params[:homework_id]
        @courses = Course.all
        @class_units = ClassUnit.all
        @ori_hw = Homework.find_by_id( params[:homework_id] );
        @homeworks = HomeworkRecord.where( :homework_id => params[:homework_id] )
    end

    def update_details
        _list =  params[:data]
        
        res = '{"result":"ok"}'

        if ( _list == nil ) 
            respond_to do |format|
                format.json { render json: res, status: "200" }
            end
        else 

            _list.each do | _index, _item |
                puts "update " + _index + " with new value: " + _item['grade']
                _homework_record = HomeworkRecord.find_by_id( _item['record_id'] )
                _homework_record.grade = _item['grade'].to_i
                _homework_record.save
            end

            respond_to do |format|
                format.json { render json: res, status: "200" }
            end
        end
    end

end

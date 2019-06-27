class TrainersController < ApplicationController

    def index
        data = Trainer.all
        render json: data
    end
end

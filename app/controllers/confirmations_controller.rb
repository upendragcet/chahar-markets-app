# Overriding devise registration controller
class ConfirmationsController < Devise::ConfirmationsController
  respond_to :json
end

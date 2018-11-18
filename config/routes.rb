Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: "registrations", sessions: "sessions",
                                    passwords: "passwords", confirmations: "confirmations" }
  devise_scope :user do
    authenticated :user do
      root to: 'home#index', as: :authenticated_root
    end

    unauthenticated do
      root 'devise/sessions#new', as: :unauthenticated_root
    end
  end
end

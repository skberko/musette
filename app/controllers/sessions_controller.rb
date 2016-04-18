class SessionsController < ApplicationController

  def create
    # request.env['omniauth.auth'] contains the Authentication Hash
    # with all the data about a user.

    # render text: request.env['omniauth.auth'].to_json
    begin
      @user = User.from_omniauth(request.env['omniauth.auth'])
      session[:user_id] = @user.id
      flash[:success] = "Welcome, #{@user.name}!"
    rescue
      flash[:warning] = "We couldn't connect to your account!"
    end
    redirect_to root_path
  end

  def destroy
    if current_user
      session.delete(:user_id)
      flash[:success] = "Sign out successful. See ya later!"
    end
    redirect_to root_path
  end

end

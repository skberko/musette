class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :provider, null: false
      t.integer :uid, null: false
      t.string :name, null: false
      t.string :first_name
      t.string :last_name
      t.string :location
      t.string :token, null: false
      t.string :photo_url
      t.string :strava_username
      t.string :city
      t.string :state
      t.string :country
      t.string :sex
      t.boolean :strava_premium_status
      t.string :measurement_preference
      t.string :email

      t.timestamps null: false
    end
    add_index :users, :provider
    add_index :users, :uid
    add_index :users, [:provider, :uid], unique: true
  end
end

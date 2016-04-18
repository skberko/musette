# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160415044519) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "users", force: :cascade do |t|
    t.string   "provider",               null: false
    t.integer  "uid",                    null: false
    t.string   "name",                   null: false
    t.string   "first_name"
    t.string   "last_name"
    t.string   "location"
    t.string   "token",                  null: false
    t.string   "photo_url"
    t.string   "strava_username"
    t.string   "city"
    t.string   "state"
    t.string   "country"
    t.string   "sex"
    t.boolean  "strava_premium_status"
    t.string   "measurement_preference"
    t.string   "email"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "users", ["provider", "uid"], name: "index_users_on_provider_and_uid", unique: true, using: :btree
  add_index "users", ["provider"], name: "index_users_on_provider", using: :btree
  add_index "users", ["uid"], name: "index_users_on_uid", using: :btree

end

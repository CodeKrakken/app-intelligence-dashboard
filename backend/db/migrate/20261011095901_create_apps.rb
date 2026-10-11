class CreateApps < ActiveRecord::Migration[8.1]
  def change
    create_table :apps do |t|
      t.string :name
      t.string :category
      t.string :publisher

      t.timestamps
    end
  end
end

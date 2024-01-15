class Absence < ApplicationRecord
	self.table_name = "absence"
	belongs_to :user
end

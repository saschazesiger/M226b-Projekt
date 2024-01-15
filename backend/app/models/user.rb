class User < ApplicationRecord
  has_secure_password
  has_many :time_entries
  has_many :absences

  validates :username, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 } # Adjust the minimum length as needed

  before_save :downcase_username

  private

  def downcase_username
    self.username = username.downcase
  end
end

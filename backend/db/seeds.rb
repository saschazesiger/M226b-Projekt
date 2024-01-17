# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

User.create!([
  { 
    username: 'heinrich', 
    password: '123Heinrich', 
    firstname: 'Heinrich', 
    surname: 'Meier', 
    email: 'heinrich.meier@byom.de', 
    supervisor_id: nil, 
    lastlogin: Time.now 
  },
  { 
    username: 'willhelm', 
    password: '123Willhelm',
    firstname: 'Willhelm', 
    surname: 'Unteregger', 
    email: 'willhelm.unteregger@byom.de', 
    supervisor_id: 1, 
    lastlogin: Time.now 
  },
  { 
    username: 'manfred', 
    password: '123Manfred',
    firstname: 'Manfred', 
    surname: 'Guntherus', 
    email: 'manfred.guntherus@byom.de', 
    supervisor_id: 1, 
    lastlogin: Time.now 
  },
  { 
    username: 'gandolph', 
    password: '123Gandolph',
    firstname: 'Gandolph', 
    surname: 'Kircher', 
    email: 'gandolph.kircher@byom.de', 
    supervisor_id: 1, 
    lastlogin: Time.now 
  }
])

TimeEntry.create!([
  {user: User.find(3), time: DateTime.now, action: 0, edited: 0},
  {user: User.find(3), time: DateTime.now - 1.hour, action: 1, edited: 0},
  {user: User.find(2), time: DateTime.now - 2.hours, action: 1, edited: 0},
  {user: User.find(2), time: DateTime.now - 3.hours, action: 0, edited: 1},
  {user: User.find(3), time: DateTime.now - 4.hours, action: 0, edited: 0}
])

TimeLog.create([
    {time_entry: TimeEntry.find(4), changeAt: Time.now, oldDatetime: (Time.now - 5.hours).to_s, oldEdited: true},
    {time_entry: TimeEntry.find(4), changeAt: Time.now - 1.hour, oldDatetime: (Time.now - 6.hours).to_s, oldEdited: true},
    {time_entry: TimeEntry.find(4), changeAt: Time.now - 2.hours, oldDatetime: (Time.now - 7.hours).to_s, oldEdited: true},
    {time_entry: TimeEntry.find(3), changeAt: Time.now, oldDatetime: (Time.now - 1.hours).to_s, oldEdited: false},
    {time_entry: TimeEntry.find(3), changeAt: Time.now, oldDatetime: (Time.now - 2.hours).to_s, oldEdited: true}
])


Absence.create!([
  {
    user: User.find(2),
    from: DateTime.now,
    to: DateTime.now + 1.day,
    absence_type: 'Ferien',
    approved: true
  },
  {
    user: User.find(2),
    from: DateTime.now - 2.days,
    to: DateTime.now - 1.day,
    absence_type: 'Schule',
    approved: false
  },
  {
    user: User.find(3),
    from: DateTime.now + 1.day,
    to: DateTime.now + 2.days,
    absence_type: 'Ferien',
    approved: true
  }
])


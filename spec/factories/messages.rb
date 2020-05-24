FactoryBot.define do

  factory :message do
    body                  {Faker::Lorem.sentence}
    image                 {File.open("#{Rails.root}/public/test_images/test_image1.jpeg")}
    user
    group
  end

end
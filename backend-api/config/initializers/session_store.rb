if Rails.env === 'production' 
  Rails.application.config.session_store :cookie_store, key: '_discussit', domain: 'discussit-json-api'
else
  Rails.application.config.session_store :cookie_store, key: '_discussit'
end
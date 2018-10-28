# frozen_string_literal: true
ActionMailer::Base.smtp_settings = {
  address: MAIL_SETTINGS[:smtp][:address],
  port: MAIL_SETTINGS[:smtp][:port],
  domain: MAIL_SETTINGS[:smtp][:domain],
  user_name: MAIL_SETTINGS[:smtp][:user_name],
  password: MAIL_SETTINGS[:smtp][:password],
  authentication: MAIL_SETTINGS[:smtp][:authentication],
  enable_starttls_auto: MAIL_SETTINGS[:smtp][:enable_starttls_auto],
  openssl_verify_mode: MAIL_SETTINGS[:smtp][:openssl_verify_mode]
}

ActionMailer::Base.default_url_options[:host] = MAIL_SETTINGS[:external_url]
ActionMailer::Base.default from: MAIL_SETTINGS[:from]

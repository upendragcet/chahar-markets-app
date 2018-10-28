info = YAML.load(
  ERB.new(
    IO.read(
      File.join(
        Rails.root,
        'config',
        'app_config.yml'
      )
    )
  ).result
).deep_symbolize_keys!
app_env = info[Rails.env.to_sym]
APP_URL = app_env[:url]
# load mail settings
mail_info = YAML.load(
  ERB.new(
    IO.read(
      File.join(
        Rails.root,
        'config',
        'mail_settings.yml'
      )
    )
  ).result
).deep_symbolize_keys!
MAIL_SETTINGS = mail_info[Rails.env.to_sym]

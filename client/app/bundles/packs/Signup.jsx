import React from 'react';
import ReactOnRails from 'react-on-rails';
import FlashMessage from '../src/components/common/FlashMessage';
import CustomTextField from '../src/components/common/CustomTextField';
import Spinner from '../src/components/common/spinner';
import {IntlProvider} from 'react-intl';
import translations from '../i18n/translations.json'
import { MuiThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import theme from '../helpers/theme';
import Button from '@material-ui/core/Button';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      phone: '',
      password: '',
      email: '',
      password_confirmation:'',
      error_message: null,
      success_message: null,
      locale: 'en',
      show_spinner: false,
    }
  }

  getValidateFormFields = () => {
    const { first_name, last_name, phone, password, password_confirmation, email } = this.state;
    return !(first_name && last_name && password && password_confirmation && email && phone);
  }

  /* sets error_message, success_message to null */
  cleanAlerts = () => {
    this.setState({
      error_message: null, success_message: null
    })
  }

  /* updates the values of error_message, flash_message */
  showFlashMessage = (error_message, success_message) => {
    this.setState({
      error_message: error_message,
      success_message: success_message,
      show_spinner: false
    })
  }

  showSpinner = () => {
    if (this.state.show_spinner) {
      return(
        <Spinner />
      );
    } else {
      return null;
    }
  }

  // updates views on clicking category
  handleChange = (e) => {
    let name = e.target.name;
    let obj = {};
    obj[name] = e.target.value;
    this.setState(obj);
  }

  // API for User Signup
  handleSubmit = () => {
    this.setState({show_spinner: true})
    var user_data = {
      first_name: this.state.first_name,
      last_name:  this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
      mobile: this.state.phone,
    }
    $.ajax({
      method: 'POST',
      beforeSend: function(xhr){xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      url: '/users',
      dataType: 'JSON',
      data: { user: user_data }
    })
    .then((data)=>{
      this.setState({show_spinner: false})
    })
    .catch((err)=>{
      let errors = []
      debugger
      this.setState({show_spinner: false})
      $.each(err.responseJSON.errors, function(key, value){
        errors.push(key + ' ' + value)
      });
      this.showFlashMessage(errors.toString(), null)
    })
  }

  hasNumbers(t){
    let regex = /\d/g;
    return regex.test(t);
  }

  // Checks email format using RegEx
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  handleNumChange = (e) => {
    let numeric_value = new RegExp('^[0-9]*$')
    if(numeric_value.test(e.target.value)) {
      this.handleChange(e)
    }
  }

  renderSignupForm = () => {
    var opacity = this.getValidateFormFields() ? "0.5" : "1"
    return(
      <div className='row'>
        <div className="col-sm-offset-1 col-md-offset-1 col-lg-offset-1 col-sm-10 col-md-10 col-lg-10">
          <div className='row' style={{textAlign:'center'}}>
            <h3 className='card-title'>Signup</h3>
          </div>
          <form onSubmit={this.handleSubmit} style={{textAlign:'center'}}>
            <div className='row' style={{marginTop: '3%'}}>
              <CustomTextField
                required={true} fullWidth={true} type='text' margin="normal"
                label={translations[this.state.locale]["signup.first_name_label"]}
                value={this.state.first_name} name="first_name"
                placeholder={translations[this.state.locale]["signup.first_name_label"]}
                handleChange={this.handleChange}
              />
            </div>
            <div className='row' style={{marginTop: '3%'}}>
              <CustomTextField
                required={true} fullWidth={true} type='text' margin="normal"
                label={translations[this.state.locale]["signup.last_name_label"]}
                value={this.state.last_name} name="last_name"
                placeholder={translations[this.state.locale]["signup.last_name_label"]}
                handleChange={this.handleChange}
              />
            </div>
            <div className='row' style={{marginTop: '3%'}}>
              <CustomTextField
                required={true} fullWidth={true} type='text' margin="normal"
                label={translations[this.state.locale]["signup.phone_number_label"]}
                value={this.state.phone} name="phone" maxLength={10}
                placeholder={translations[this.state.locale]["signup.mobile_help_text"]}
                handleChange={this.handleChange}
              />
            </div>
            <div className='row' style={{marginTop: '3%'}}>
              <CustomTextField
                required={true} fullWidth={true} type='email' margin="normal"
                label={translations[this.state.locale]["email"]}
                value={this.state.email} name="email"
                placeholder={translations[this.state.locale]["email"]}
                handleChange={this.handleChange}
              />
            </div>
            <div className='row' style={{marginTop: '3%'}}>
              <CustomTextField
                required={true} fullWidth={true} type='password' margin="normal"
                label={translations[this.state.locale]["signup.password_label"]}
                value={this.state.password} name="password"
                placeholder={translations[this.state.locale]["signup.password_label"]}
                handleChange={this.handleChange}
              />
            </div>
            <div className='row' style={{marginTop: '3%'}}>
              <CustomTextField
                required={true} fullWidth={true} type='password' margin="normal"
                label={translations[this.state.locale]["signup.password_confirmation"]}
                value={this.state.password_confirmation} name="password_confirmation"
                placeholder={translations[this.state.locale]["signup.password_confirmation"]}
                handleChange={this.handleChange}
              />
            </div>
            <div className='row' style={{marginTop: '10%'}}>
              <Button onClick={this.handleSubmit} style={{width: '100%', opacity: opacity}} disabled={this.getValidateFormFields()}>
                Save
              </Button>
            </div>
          </form>
        </div>
        <br/>
        <br/>
      </div>
    );
  }

  // Renders Main component
  renderSignUpFormData = () => {
    return (
      <div className='row' style={Object.assign({}, {padding: '125px 60px 60px', backgroundColor: 'transparent'})}>
        <Card style={{padding: '35px 30px', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0 6px 15px rgba(0, 0, 0, 0.16)', maxWidth: '440px', height: 'auto', margin: '0 auto'}}>
          {this.renderSignupForm()}
        </Card>
        <br />
      </div>
    )
  }

  render() {
    return(
      <MuiThemeProvider theme={theme}>
        <IntlProvider locale={this.state.locale} messages={translations[this.state.locale]}>
          <div className="col-sm-offset-1 col-md-offset-1 col-lg-offset-1 col-sm-10 col-md-10 col-lg-10">
            {this.showSpinner()}
            <FlashMessage success_message={this.state.success_message} error_message={this.state.error_message}
                        clean_alerts={this.cleanAlerts} />
            {this.renderSignUpFormData()}
          </div>
        </IntlProvider>
      </MuiThemeProvider>
    )
  }
}

ReactOnRails.register({ Signup });

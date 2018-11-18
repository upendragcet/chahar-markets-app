import React from 'react';
import PropTypes from 'prop-types';

export default class FlashMessage extends React.Component {
  componentWillReceiveProps(props) {
    if (props.success_message) {
      window.setTimeout(() => {
        this.props.clean_alerts();
      }, 5000);
    }
  }

  /* returns messages in new lines */
  renderMessages = (flash_message) => {
    let messages = flash_message.split("\n").map(function(message, index){
      return <div key={index}>{message}</div>
    })
    return messages
  }

  renderFlashMessage = () => {
    const { success_message, error_message, clean_alerts } = this.props;
    let flash_message = success_message || error_message
    if (flash_message) {
      let alert_class = 'alert alert-dismissible'
      alert_class += success_message ? ' alert-success' : ' alert-danger'
      let icon_name = success_message ? 'fa fa-check-circle flash-icon' : 'fa fa-exclamation-circle flash-icon';
      let icon_color = success_message ? '#3c763d' : '#a94442';
      return(
        <div id="flash_container">
          <div className={alert_class}>
            <i className={icon_name} style={{color: icon_color}}></i>
            <button type="button" className="close" aria-hidden="true" onClick={() => clean_alerts()}>&times;</button>
              {this.renderMessages(flash_message)}
          </div>
        </div>
      );
    }
    else {
      return null
    }
  }

  render() {
    return this.renderFlashMessage();
  }
}

FlashMessage.propTypes = {
  success_message: PropTypes.string,
  error_message: PropTypes.string,
  clean_alerts: PropTypes.func
};

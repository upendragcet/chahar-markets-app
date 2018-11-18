import React from 'react';
import FlashMessage from '../src/components/common/FlashMessage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Spinner from '../src/components/common/Spinner';
import {IntlProvider} from 'react-intl';
import translations from '../i18n/translations.json'
import theme from '../helpers/theme';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class AppTheme extends React.Component {

  showSpinner = () => {
    if (this.props.show_spinner) {
      return(
        <Spinner />
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <IntlProvider locale='en' messages={ translations['en'] }>
          <div style={{ backgroundColor: 'white' }}>
            <FlashMessage success_message={ this.props.success_message } error_message={ this.props.error_message }
              clean_alerts={ this.props.cleanAlerts }
            />
            { this.showSpinner() }
            <div>
              <div className="content">
                <div className="col-md-12 col-sm-12 col-xs-12"> { this.props.children } </div>
              </div>
            </div>
          </div>
        </IntlProvider>
      </MuiThemeProvider>
    )
  }
}

AppTheme.propTypes = {
  locale: PropTypes.string,
};

export default withRouter(connect(null, null)(AppTheme));

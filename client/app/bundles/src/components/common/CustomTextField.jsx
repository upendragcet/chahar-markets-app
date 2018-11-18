import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import purple from "@material-ui/core/colors/purple";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: theme.spacing.unit * 0,
  },
  cssLabel: {
    fontSize: 20,
    "&$cssFocused": {
      color: purple[500],
      fontSize: 20
    }
  },
  cssFocused: {},
  cssUnderline: {
    "&:after": {
      borderBottomColor: purple[500]
    }
  },
  cssInputProps: {
    "label + &": {
			marginTop: theme.spacing.unit * 3,
			fontSize: 20
    },
    "&$cssFocused $notchedOutline": {
      borderColor: purple[500]
    }
  }
});

class CustomTextField extends React.Component {
	constructor(props) {
    super(props);
		this.state = {
			name: props.value || '',
		};
	}

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
		});
		this.props.handleChange(event);
  };

  render() {
    const { classes, label, fullWidth, required, placeholder, name, type } = this.props;
    return (
			<TextField
				id={label || ''} required={required || false}
				fullWidth={fullWidth || false}
				label={label} name={name || ''} type={type || 'text'}
				placeholder={placeholder || ''}
				className={classNames(classes.textField, classes.container)}
				InputLabelProps={{
					classes: {
						root: classes.cssLabel,
						focused: classes.cssFocused
					}
				}}
				InputProps={{
					classes: {
						root: classes.cssInputProps,
						focused: classes.cssFocused
					}
				}}
				value={this.state.name}
				onChange={this.handleChange('name')}
				margin="normal"
			/>
    );
  }
}

CustomTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomTextField);

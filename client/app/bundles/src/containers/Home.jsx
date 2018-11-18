import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  render() {
    return(
			<div className='row'>
				<div className="col-sm-offset-1 col-md-offset-1 col-lg-offset-1 col-sm-10 col-md-10 col-lg-10">
					<h1>Hi i am upendra. Welcome</h1>
					<p>This is a home page for a new Rails App on Google Cloud Platform!</p>
				</div>
			</div>
    )
  }
}  
  
Home.propTypes = {
	locale: PropTypes.string,
};
  
export default connect(null, null)(Home);

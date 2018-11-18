import CircularProgress from '@material-ui/core/CircularProgress';

export default class Spinner extends React.Component {
  render() {
    return (
      <div style={{height: '100%', width: '100%', position: 'fixed', zIndex: 2, top: 0,left: 0}}>
        <div style={{position: 'absolute', top: '50%', left: '48%'}}>
          <CircularProgress disableShrink />
        </div>
      </div>
    );
  }
}

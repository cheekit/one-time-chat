import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { channelActions } from '../../redux/channels';
import './Root.css';
import { ChannelList } from '../../components';

const propTypes = {
  dispatch: PropTypes.func,
  channels: PropTypes.object,
  loadChannels: PropTypes.func,
  unloadChannels: PropTypes.func,
  joinUser: PropTypes.func,
};

class Root extends Component {
  componentWillMount() {
    this.props.loadChannels();
    // this.props.filterChannels(this.props.location.query.filter);
  }

  // componentWillReceiveProps(nextProps) {
    // if (nextProps.location.query.filter !== this.props.location.query.filter) {
    //   this.props.filterChannels(nextProps.location.query.filter);
    // }
  // }

  componentWillUnmount() {
    this.props.unloadChannels();
  }

  renderChannels(channels) {
    const { joinUser } = this.props;

    return (
      <ChannelList
        channels={channels}
        onMouseClick={joinUser}
      />
    );
  }

  render() {
    const { channels } = this.props;

    return (
      <div className='rootContents'>
        <h1 style={{padding: '10px'}}>Channels</h1>
        {this.renderChannels(channels)}
      </div>
    );
  }
}

Root.propTypes = propTypes;

function mapStateToProps(state) {
  const { channels } = state;

  return { channels: channels.list };
}

const mapDispatchToProps = Object.assign(
  {},
  channelActions
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);

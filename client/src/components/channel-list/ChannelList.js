import React, { PropTypes, Component } from 'react';
import { List } from 'immutable';
import { FlatButton } from 'material-ui';
import { Link } from 'react-router';


import './ChannelList.css';

const propTypes = {
  channels: PropTypes.instanceOf(List).isRequired,
  onMouseClick: PropTypes.func,
  // deleteChannel: PropTypes.func.isRequired,
  // updateChannel: PropTypes.func.isRequired
};

const defaultProps = {
  onMouseClick: () => {},
};

class ChannelList extends Component{
  state = {
    lineClassName: '',
    selectIndex: null,
    showJoinRoom: false,
  }

  handleMouseOut() {
    this.setState({
      lineClassName: 'channel-overlay-line',
      selectIndex: null,
      showJoinRoom: false,
    });
  }

  handleMouseOver(e, index) {
    this.setState({
      lineClassName: 'channel-overlay-line',
      selectIndex: index,
      showJoinRoom: false,
    });

    setTimeout(() => {
      this.setState({
        lineClassName: 'after-channel-overlay-line',
        showJoinRoom: true,
      });
    }, 160);
  }

  renderChannel(channel, index, onMouseClick) {
    const { selectIndex, lineClassName, showJoinRoom } = this.state;
    const { name, purpose, key } = channel;

    const pattern = `/chat/${key}`;

    return (
      <div key={index} className="channel">
        <div className="border-box" onMouseOver={(e) => this.handleMouseOver(e, index)}>
          <h1>{name}</h1>
          <h4>{purpose}</h4>
          <div className="buttom">
            <div className="circle">
              <span>{9}</span>
              <span>menber</span>
            </div>
          </div>
        </div>
        {
          selectIndex === index &&
            <div className='channel-overlay'>
              <hr className={lineClassName} />
              {showJoinRoom &&
                <Link to={pattern}>
                  <FlatButton
                    style={{color: "white", position: 'absolute', left: '33%', top: '40%', border: '1px solid', backgroundColor: '#222'}}
                    label={'Join Room'}
                    primary={true}
                    onClick={() => onMouseClick(channel)}
                  />
                </Link>
              }
            </div>
        }
      </div>
    );
  }

  render() {
    const { channels, onMouseClick } = this.props;

    return (
      <div className="channel-list">
        {channels.map((channel, index) => this.renderChannel(channel, index, onMouseClick))}
      </div>
    );
  }
}

ChannelList.propTypes = propTypes;
ChannelList.defaultProps = defaultProps;

export default ChannelList;

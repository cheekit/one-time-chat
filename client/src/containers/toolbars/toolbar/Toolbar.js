import React, {Component} from 'react';
import {
  AppBar,
  MenuItem,
  FlatButton,
  Toggle,
  IconMenu,
  IconButton
} from 'material-ui';

import {
  ActionQuestionAnswer,
  NavigationMoreVert
} from 'material-ui/svg-icons';
import ActionAndroid from 'material-ui/svg-icons/action/android';

class Login extends Component {

  render() {
    return (
      <FlatButton {...this.props} label="Login" />
    );
  }
}

class CustomButton extends Component{
  render() {
    const { name, onTouchTap, onKeyboardFocus } = this.props;
    return (
      <FlatButton
        style={{color: "white"}}
        label={name}
        labelPosition="before"
        primary={true}
        icon={<ActionAndroid />}
        onClick={onTouchTap}
        onKeyboardFocus={onKeyboardFocus}
      />
    );
  }
}


function Logged(props) {
  return (
    <IconMenu
      iconButtonElement={<CustomButton name={props.name}/>}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem primaryText="Help" />
      <MenuItem primaryText="Sign Out" />
    </IconMenu>
  );
}

class Toolbar extends Component {
  state = {
    logged: true,
  }

  handleChange = (event, logged) => {
    this.setState({logged: logged});
  };

  render() {
    const iconStyle = {
      color: '#7cb342',
      paddingTop: '10px',
      width: '36px',
      height: '36px',
    };

    const name = 'takayuki';

    return (
      <AppBar
        title="OneTimeChat"
        titleStyle={{fontWeight: 300}}
        iconElementLeft={<ActionQuestionAnswer style={iconStyle}/>}
        iconElementRight={this.state.logged ? <Logged name={name}/> : <Login />}
        iconStyleRight={{marginTop: "0px", lineHeight: "64px"}}
      />
    );
  }
}

export default Toolbar;

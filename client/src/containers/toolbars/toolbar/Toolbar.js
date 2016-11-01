import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import {
  AppBar,
  MenuItem,
  FlatButton,
  Toggle,
  IconMenu,
  IconButton,
  Avatar
} from 'material-ui';

import {
  ActionQuestionAnswer,
  NavigationMoreVert
} from 'material-ui/svg-icons';
import ActionAndroid from 'material-ui/svg-icons/action/android';

class Login extends Component {
  render() {
    return (
      <Link to="/sign-in">
        <FlatButton
          {...this.props}
          label={"Sign In"}
          style={{color: '#fff'}}
        />
      </Link>
    );
  }
}

class CustomButton extends Component{
  render() {
    const { src, name, onTouchTap, onKeyboardFocus } = this.props;

    return (
      <FlatButton
        style={{color: "white"}}
        label={name}
        labelPosition="before"
        primary={true}
        icon={<Avatar src={src} size={30} />}
        onClick={onTouchTap}
        onKeyboardFocus={onKeyboardFocus}
      />
    );
  }
}


function Logged(props) {
  const { name, src, signOut } = props;
  console.log(Link);

  return (
    <IconMenu
      iconButtonElement={<CustomButton name={name} src={src}/>}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem primaryText="Help" />
      <MenuItem primaryText="Sign Out" onClick={signOut} />
    </IconMenu>
  );
}

const propTypes = {
  auth: PropTypes.object,
  signOut: PropTypes.func,

};

class Toolbar extends Component {
  state = {
    logged: true,
  }

  render() {
    const { auth, signOut } = this.props;
    const isAuth = auth.authenticated;
    const rightElement = isAuth ? <Logged name={auth.name} src={auth.photoUrl} signOut={signOut} /> : <Login />;

    const iconStyle = {
      color: '#7cb342',
      paddingTop: '10px',
      width: '36px',
      height: '36px',
    };

    return (
      <AppBar
        title="OneTimeChat"
        titleStyle={{fontWeight: 300}}
        iconElementLeft={<ActionQuestionAnswer style={iconStyle}/>}
        iconElementRight={rightElement}
        iconStyleRight={{marginTop: "0px", lineHeight: "64px"}}
      />
    );
  }
}

export default Toolbar;

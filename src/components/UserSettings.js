import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router';



class UserSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          icon:"",
          iconcolor:"",
          message:""
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
        	icon:nextProps.icon,
        	iconcolor:nextProps.iconcolor,
        	message:nextProps.message
        })
    }

	changeIcon = (e) => {
        this.setState({
            icon: e.target.value
        });
    }

    changeIconcolor = (e) => {
        this.setState({
            iconcolor: e.target.value
        });
    }

    changeMessage = (e) => {
        this.setState({
            message: e.target.value
        });
    }

    updateSettings = (e) => {
    	e.preventDefault()
        var self = this
        fetch(this.props.remote+'/auth/savesettings',{
            method: 'POST',
            body: JSON.stringify({
                owner: self.props.user,
                icon: self.state.icon,
                iconcolor: self.state.iconcolor,
                message: self.state.message
            }),
            mode: 'cors',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(function(r) { return r.json() })
        .then(function(j) {  
        	self.props.updateSettings(self.state.icon, self.state.iconcolor, self.state.message)
        })
        .catch (function (error) {
            console.log('Request failed', error);
        });
    }

	render() {
		return (
			<form className="user-settings" onSubmit={this.updateSettings}>
			    <div>Change how your name will be displayed on the Members page:</div>
			    <div className="user-settings-section horizontal layout center">
			        <span className="user-settings-bullet">▸</span>
			        <TextField value={this.state.icon} onChange={this.changeIcon} name="icon" floatingLabelText="icon" underlineStyle={{borderBottom:"2px solid rgb(224, 224, 224)"}} floatingLabelStyle={{color:"grey"}} floatingLabelFocusStyle={{color:"rgb(0, 188, 212)"}}/>
                    <span className="user-settings-bullet">See all icons at <a href="http://fontawesome.io/icons/"><strong>Font Awesome Icons</strong></a></span>
                </div>
			    <div className="user-settings-section horizontal layout center">
			        <span className="user-settings-bullet">▸</span>
			        <TextField value={this.state.iconcolor} onChange={this.changeIconcolor} name="iconcolor" floatingLabelText="icon color" underlineStyle={{borderBottom:"2px solid rgb(224, 224, 224)"}} floatingLabelStyle={{color:"grey"}} floatingLabelFocusStyle={{color:"rgb(0, 188, 212)"}}/>
                    <span className="user-settings-bullet">Enter a color name, a hex color: <strong>#FF00FF</strong>, or an RGB color: <strong>rgb(0, 255, 0)</strong></span>
                </div>
			    <div className="user-settings-section horizontal layout center">
			        <span className="user-settings-bullet">▸</span>
			        <TextField value={this.state.message} onChange={this.changeMessage} name="message" floatingLabelText="message" underlineStyle={{borderBottom:"2px solid rgb(224, 224, 224)"}} floatingLabelStyle={{color:"grey"}} floatingLabelFocusStyle={{color:"rgb(0, 188, 212)"}}/>
			    </div>
			    <RaisedButton className="user-settings-section" type="submit" label="save" primary={true} onClick={this.updateSettings}/>
                <Link to={{pathname: '/pix'}}>
                    <div style={{position:"absolute",height:"40px",width:"40px",right:"0px",bottom:"0px",background:"white"}}></div>
                </Link>
			</form>
		)
	}
}

export default UserSettings
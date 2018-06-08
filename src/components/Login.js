import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'


class Login extends React.Component{

	get styles(){
		return{
			create:{
				fontSize:"11px",
				textDecoration:"underline"
			},
		}
	}

	constructor(props) {
        super(props);
        this.state = {
          create: false,
          error: false,
          disableSubmit: false,
          errorMessage:"",
          username: "",
          password: "",
          password2: ""
        };
    }

    usernameChange = (e) => {
    	this.setState({username: e.target.value})
    }
    passwordChange = (e) => {
    	this.setState({password: e.target.value})
    }
    password2Change = (e) => {
    	this.setState({password2: e.target.value})
    }

    toggleCreate = () => {
    	this.setState({create: !this.state.create})
    }

    submitForm = (e) => {
    	e.preventDefault()
    	this.setState({disableSubmit: true})
    	if(this.props.user){
			this.formGET('/logout')
		} else {
	    	if(this.state.username&&this.state.password){
	    		if(this.state.create){
	    			if(this.state.password !== this.state.password2){
	    				this.fireError("Passwords do not match")
	    			} else {
	    				this.formPOST('/register')
	    			}
	    		} else {
    				this.formPOST('/login')
    			}
    		}
    	}
    }

    formPOST = (url) => {
    	var self = this
    	var username = this.state.username
    	var password = this.state.password
    	fetch(this.props.remote+'/auth'+url,{
    		method: 'POST',
    		body: JSON.stringify({
    			username: username,
    			password: password
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
    		self.setState({disableSubmit: false})  			
    		if(!j.Error){
    			self.setState({username:"",password:"",password2:""})
    			self.props.userChange(j.Username, url==='/register')
    			if(j.Username){
    				self.props.goMemberPage()
    			}
    		} else {
    			self.fireError(j.Username)
    		}
    	})
    	.catch (function (error) {
    		self.fireError('Request failed')
    	    console.log('Request failed', error);
    	});
    }

    formGET = (url) => {
    	var self = this
    	fetch(this.props.remote+'/auth'+url,{
    		mode: "cors",
    		credentials:"include"
    	})
    	.then(function(r) { return r.json() })
    	.then(function(j) {
    		self.setState({disableSubmit: false}) 
    		if(!j.Error){
    			self.props.userChange("")
    		} else {
    			self.fireError(j.Username)
    		}
    	})
    	.catch (function (error) {
    		self.fireError('Request failed')
    	    console.log('Request failed', error);
    	});
    }

    fireError = (message) => {
    	this.setState({error: true, errorMessage: message})
    	window.setTimeout(()=>{
    		this.setState({error: false, errorMessage: ""})
    	},3000)
    }

	render(){

		var mainLabel = this.state.create ? "register" : "login"
		var createLabel = this.state.create ? "sign in" : "create account"
		var disableSubmit = false
		if(!this.props.user){
			if(this.state.disableSubmit){
				disableSubmit = true
			} else {
				if(this.state.create){
					disableSubmit = !(this.state.username.length>0 && this.state.password.length>0 && this.state.password2.length>0)
				} else {
					disableSubmit = !(this.state.username.length>0 && this.state.password.length>0)
				}
			}
		}

		return(
			<form encType="application/x-www-form-urlencoded" ref={(ref)=>{this.form=ref}} className="vertical layout start login-form" onSubmit={this.submitForm}>
				{ !this.props.user ? <TextField maxLength="18" name="username" value={this.state.username} onChange={this.usernameChange} floatingLabelText="User Name" underlineStyle={{borderBottom:"2px solid rgb(224, 224, 224)"}} floatingLabelStyle={{color:"grey"}} floatingLabelFocusStyle={{color:"rgb(0, 188, 212)"}} /> : null }
				{ !this.props.user ? <TextField name="password" value={this.state.password} onChange={this.passwordChange} floatingLabelText="Password" type="password" underlineStyle={{borderBottom:"2px solid rgb(224, 224, 224)"}} floatingLabelStyle={{color:"grey"}} floatingLabelFocusStyle={{color:"rgb(0, 188, 212)"}} /> : null }
				{ this.state.create && !this.props.user ? <TextField name="password2" value={this.state.password2} onChange={this.password2Change} floatingLabelText="Password again" type="password" underlineStyle={{borderBottom:"2px solid rgb(224, 224, 224)"}} floatingLabelStyle={{color:"grey"}} floatingLabelFocusStyle={{color:"rgb(0, 188, 212)"}} /> : null }
				<div className="horizontal layout center justified" style={{width:"260px",marginTop:"20px"}}>
					<RaisedButton disabled={disableSubmit} type="submit" label={ !this.props.user ? mainLabel : "logout"} className="login-submit" primary={true} onClick={this.submitForm}/>
					{ !this.props.user ? <FlatButton label={createLabel} labelStyle={this.styles.create} onClick={this.toggleCreate} style={{width:"135px"}}/> : null }
				</div>
				{ this.state.error ? <div className="login-error">{this.state.errorMessage}</div> : null }
			</form>
		)
	}	
}

export default Login
import React from 'react'
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab'
import FlatButton from 'material-ui/FlatButton'
import Login from './Login'
import CSSTransitionGroup from 'react-addons-css-transition-group'

class Header extends React.Component {

	get styles() {
        return {
            root: {
                flex: '1 1 100%',
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                height:'80%',
                margin: '0 2% 0 3%'
            },

            tabContainer: {
            	height: '100%'
            },
            tab:{
            	border: '1px solid black',
            	borderBottom: 'none',
            	height: '100%'
            },
            inkBar:{
            	height: '16px',
            	bottom: '14px',
            	backgroundColor: '#ffff8d'
            },
            signIn:{
            	position:'absolute',
  				color: '#FFFFFF',
            },
            signInLabel:{
            	textDecoration:'underline',
            	textTransform:'none',
            	fontSize: '16px'
            }
        };
    }

    constructor(props) {
        super(props);
        this.state = {
          selected: "",
          loginDropped: false
        };
    }

    tabTap = (value) => {
        this.context.router.transitionTo('/'+value)
	    this.setState({
	      selected: value,
	    });
	}

    membersTap = () => {
        if(this.context.location.pathname!=='/members'){
            this.context.router.transitionTo('/members')
        } 
    }

    goMemberPage = () => {
        this.context.router.transitionTo('/members/'+this.props.user)
        this.setState({selected:"members"})
    }

    goMembers = () => {
        this.context.router.transitionTo('/members')
        this.setState({selected:"members"})
    }

	componentDidMount() {
		this.setState({selected:this.context.location.pathname.split('/')[1]})
	}

	static contextTypes = {
	    router: React.PropTypes.object.isRequired,
	    location: React.PropTypes.object.isRequired
	}

    userChange = (name, justRegistered) => {
        this.props.userChange(name, justRegistered)
        if(name){
            this.setState({loginDropped:false})
        }
    }

    signIn = () => {
        this.setState({loginDropped: !this.state.loginDropped})
    }

	render(){

        var signInLabel = this.props.user ? this.props.user + " ▾" : "Sign In ▾"

		return (
			<header className="layout horizontal end">
				<div id="login" className="">
					<FlatButton label={signInLabel} className="login-button" onClick={this.signIn}
					style={this.styles.signIn} labelStyle={this.styles.signInLabel}></FlatButton>
				</div>
				<Tabs value={this.state.selected} onChange={this.tabTap} style={this.styles.root} 
				tabItemContainerStyle={this.styles.tabContainer} inkBarStyle={this.styles.inkBar}>
					<Tab label="Home" value="" style={this.styles.tab}></Tab>
					<Tab onClick={this.membersTap} label="Members" value="members" style={this.styles.tab}></Tab>
					<Tab label="Learn" value="learn" style={this.styles.tab}></Tab>
				</Tabs>
                <CSSTransitionGroup className="dropdown" transitionName="dropdown" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
                    { this.state.loginDropped ? <Login userChange={this.userChange} user={this.props.user} goMemberPage={this.goMemberPage} remote={this.props.remote} /> : null}
                </CSSTransitionGroup>
			</header>
		)
	}
}

export default Header
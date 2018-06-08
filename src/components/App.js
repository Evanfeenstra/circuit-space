import React from 'react'
import { BrowserRouter, Match, Miss } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Header from './Header'
import Members from './Members'
import Learn from './Learn'
import Home from './Home'
import User from './User'
import Pix from './Pix'


const NotFound = () => (
	<h1 style={{textAlign: 'center', width: '100%'}}>Page Not Found</h1>
)

class App extends React.Component {

	constructor(props) {
		super(props)
		this.state={
			user:'',
			members:[]
		}
	}

	componentDidMount() {
		var self = this

		//get all members
		fetch(this.props.remote+'/members')
		.then(function(r) { return r.json() })
		.then(function(j) {
			//here!
			self.putMeOnTop(j)
		})
		.catch (function (error) {
		    console.log('Request failed', error);
		});

		//check if logged in session
		fetch(this.props.remote+'/auth',{
			credentials:"include",
			mode: "cors"
		})
		.then(function(r) { return r.json() })
		.then(function(j) {
			//here!
			if(!j.Error) {
				self.setState({user: j.Username})
			}
		})
		.catch (function (error) {
		    console.log('Request failed', error);
		});
	}

	putMeOnTop = (j) => {
		var self = this
		if(this.state.user){
			j.map(function(item, index){
				if(item.owner===self.state.user){
					j.unshift(j.splice(index,1)[0])
				}
				return item
			})
		} else {
			j.map(function(item, index){
				if(item.owner==="fractal"){
					j.unshift(j.splice(index,1)[0])
				}
				return item
			})
		}
		this.setState({members: j})
	}

	userChange = (name, justRegistered) => {
		if(justRegistered){
			const members = [...this.state.members]
			members.push({
				owner: name,
				icon: "code",
				iconcolor: "black",
				message: "I love to code!",
				html:"",
				css:"",
				js:""
			})
			this.setState({members})
		}
		this.setState({user:name})
		if(name){
			this.putMeOnTop(this.state.members)
		}
	}

	updateSettings = (icon, iconcolor, message) => {
		const members = [...this.state.members]
		members[0].icon = icon
		members[0].iconcolor = iconcolor
		members[0].message = message
		this.setState({members})
		this.header.goMembers()
	}

	render(){
		return(
			<MuiThemeProvider>
				<BrowserRouter>
					<div className="main-container">
						<Header ref={(ref)=>{this.header=ref}} userChange={this.userChange} user={this.state.user} remote={this.props.remote} />
						<Match exactly pattern="/" component={Home} />
						<Match exactly pattern="/members" render={(matchProps)=><Members members={this.state.members} />} />
						<Match exactly pattern="/members/:user" render={(matchProps)=><User {...matchProps} user={this.state.user} updateSettings={this.updateSettings} remote={this.props.remote} />} />
						<Match exactly pattern="/learn" component={Learn} />
						<Match exactly pattern="/pix" component={Pix} />
						<Miss component={NotFound} />
					</div>
				</BrowserRouter>
			</MuiThemeProvider>
		)
	}
}



export default App
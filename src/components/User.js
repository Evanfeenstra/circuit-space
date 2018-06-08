import React from 'react'
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import ActionSettings from 'material-ui/svg-icons/action/settings';

import Frame from './Frame'
import UserSettings from './UserSettings'

import AceEditor from 'react-ace';

import 'brace/mode/html';
import 'brace/mode/css';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

class User extends React.Component {

	get styles() {
        return {
            root: {
                width:'100%',
                border: '1px solid black',
                height:'45px'
         	},
            tab:{
            	border: '1px solid black',
            	borderBottom: 'none',
            	background: 'rgba(25,25,25,0.8)',
            	height:'100%'
            },
            tabContainer:{
            	height:'100%',
            	background:'transparent'
            },
            inkBar:{
            	backgroundColor: '#ffff8d'
            },
            fab:{
                marginRight:"10px",
                marginBottom:"10px"
            }
        };
    }

    get options() {
    	return {
    		js:{
	    		lineNumbers:true,
	    		theme:'blackboard',
	    		mode:'javascript'
	    	},
	    	css:{
	    		lineNumbers:true,
	    		theme:'blackboard',
	    		mode:'css'
	    	},
	    	html:{
	    		lineNumbers:true,
	    		theme:'blackboard',
	    		mode:'htmlmixed'
	    	}
    	}
    }

    constructor(props) {
        super(props);
        this.state = {
	      html:'',
	      css:'',
	      js:'',
          icon:'',
          iconcolor:'',
          message:'',
          selected: 'web'
        };
    }

    componentDidMount(){
    	this.fetchCode(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.params.user !== nextProps.params.user){
            this.fetchCode(nextProps)
            this.frame.emptyIframe()
        }  
    }

    fetchCode = (props) => {
        var self = this
        fetch(this.props.remote+'/code/load',{
            method: 'POST',
            body: JSON.stringify({
                owner: props.params.user
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
            if(!j.Error){
                self.setState({
                    html: j.Html,
                    css: j.Css,
                    js: j.Js,
                    icon: j.Icon,
                    iconcolor: j.Iconcolor,
                    message: j.Message
                })
                self.frame.frameRender(j.Html, j.Css, j.Js)
            }
        })
        .catch (function (error) {
            console.log('Request failed', error);
        });
    }

    save = () => {
        var self = this
        fetch(this.props.remote+'/code/save',{
            method: 'POST',
            body: JSON.stringify({
                owner: self.props.user,
                html: self.state.html,
                css: self.state.css,
                js: self.state.js
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
        })
        .catch (function (error) {
            console.log('Request failed', error);
        });
    }

    settings = () => {
        this.setState({selected:'settings'})
    }

	switchTab = (value) => {
		this.setState({selected:value})
		if(value==='web'){
			this.frame.frameRender(this.state.html, this.state.css, this.state.js)
		}
	}

	updateHtml = (newCode) => {
        this.setState({
            html: newCode
        });
    }

    updateCss = (newCode) => {
        this.setState({
            css: newCode
        });
    }

    updateJs = (newCode) => {
        this.setState({
            js: newCode
        });
    }

    updateSettings = (icon, iconcolor, message) => {
        this.props.updateSettings(icon, iconcolor, message)
    }

	render(){

		const webZ = this.state.selected === 'web' ? 1 : 0
		const htmlZ = this.state.selected === 'html' ? 1 : 0
		const cssZ = this.state.selected === 'css' ? 1 : 0
		const jsZ = this.state.selected === 'js' ? 1 : 0
        const settingsZ = this.state.selected === 'settings' ? 1 : 0


		return(
			<div className="user-page">
				<div className="horizontal layout center justified user-page-header">
					<div className="username-display">{this.props.params.user}</div>
					<div className="user-page-tabs-container horizontal layout end">
                        { this.props.params.user === this.props.user ?
                        <FloatingActionButton onClick={this.settings} mini={true} style={this.styles.fab} backgroundColor="green">
                          <ActionSettings />
                        </FloatingActionButton> : null }
                        { this.props.params.user === this.props.user ?
                        <FloatingActionButton onClick={this.save} mini={true} style={this.styles.fab} backgroundColor="#d23f31">
                          <ContentSave />
                        </FloatingActionButton> : null }
						<Tabs value={this.state.selected} onChange={this.switchTab} style={this.styles.root} inkBarStyle={this.styles.inkBar} tabItemContainerStyle={this.styles.tabContainer}>
							<Tab label="web" value="web" style={this.styles.tab}></Tab>
							<Tab label="html" value="html" style={this.styles.tab}></Tab>
							<Tab label="css" value="css" style={this.styles.tab}></Tab>
							<Tab label="js" value="js" style={this.styles.tab}></Tab>
						</Tabs>
					</div>
				</div>

				<div className="user-page-output" style={{zIndex: webZ, backgroundColor:'white'}}>
					<Frame ref={(ref)=>{this.frame=ref}} width="888px" height="600px" remote={this.props.remote} ></Frame>
				</div>

				<div className="user-page-output" style={{zIndex: htmlZ}}>
                    <AceEditor mode="html" theme="monokai" name="htmlace" value={this.state.html} onChange={this.updateHtml} height="600px" width="888px" showPrintMargin={false}/>
				</div>

				<div className="user-page-output" style={{zIndex: cssZ}}>
					<AceEditor mode="css" theme="monokai" name="cssace" value={this.state.css} onChange={this.updateCss} height="600px" width="888px" showPrintMargin={false}/>
				</div>

				<div className="user-page-output" style={{zIndex: jsZ}}>
					<AceEditor mode="javascript" theme="monokai" name="jsace" value={this.state.js} onChange={this.updateJs} height="600px" width="888px" showPrintMargin={false}/>
				</div>

                <div className="user-page-output" style={{zIndex: settingsZ, backgroundColor:'white'}}>
                    <UserSettings icon={this.state.icon} iconcolor={this.state.iconcolor} message={this.state.message} updateSettings={this.updateSettings} remote={this.props.remote} user={this.props.user} />
                </div>

				
			</div>
		)
	}
}
export default User
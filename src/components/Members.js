import React from 'react'
import { shuffler } from '../helpers'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router';

const UserListItem = (props) => (
	<Link to={{pathname: '/members/'+props.name}} className="user-list-item horizontal layout center">
		<FontAwesome name={props.icon} className="user-list-item-icon" size="3x" style={{color: props.color}}/>
		<div className="user-list-item-name">{props.name}</div>
		<div className="user-list-item-blurb">{props.blurb}</div>
	</Link>
)

class Members extends React.Component{

	render() {
		return(
			<div className="vertical layout" style={{background: 'white'}}>
				
				{shuffler(this.props.members).map( user =>
					<UserListItem name={user.owner} blurb={user.message} icon={user.icon} color={user.iconcolor} key={user.owner} />
				)}
			</div>
		)
	}
}

export default Members
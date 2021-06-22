import React, {Component} from "react";
import {HashRouter, Route, Switch} from "react-router-dom";
import {onUserStateChange} from '../../firebase/auth';
import Welcome from './welcome/Welcome';
import Home from './home/Home';
import Posts from './posts/Posts'

export default class Default extends Component {
	constructor(props) {
		super(props);
		this.state = {user: null};
	}
	componentDidMount() {
		onUserStateChange(user => this.setState({user: user}));
	}
	render() {
		console.log(this.state.user);
		if (this.state.user === null) {
			return <Welcome />;
		}
		else {
			return (
				<HashRouter>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route path='/posts' component={Posts} />
					</Switch>
				</HashRouter>);
		}
	}
}

import React, {Component} from "react";
import {Carousel} from 'antd';

export default class Welcome extends Component {
	constructor(props) {
		super(props);
		console.log(this.props)
	}
	render() {
		const contentStyle = {
			height: '160px',
			color: '#fff',
			lineHeight: '160px',
			textAlign: 'center',
			background: '#364d79',
		};
		return (
			<Carousel autoplay>
				<div>
					<h3 style={contentStyle}>1</h3>
				</div>
				<div>
					<h3 style={contentStyle}>2</h3>
				</div>
				<div>
					<h3 style={contentStyle}>3</h3>
				</div>
				<div>
					<h3 style={contentStyle}>4</h3>
				</div>
			</Carousel>);
	}
}

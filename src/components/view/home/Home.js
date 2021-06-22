import React, {Component} from "react";
import {Comment, Avatar, Row, Col, List, Input, Card} from 'antd';
import {SettingOutlined, DeleteOutlined} from "@ant-design/icons";

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {comments: [], comment: ''}
	}
	submit = () => {
		this.setState({
			comments: [
				...this.state.comments,
				{
					key: Math.random(),
					author: 'MacKeNo',
					avatar: '/img/monk.png',
					content: <p>{this.state.comment}</p>,
					datetime: [<DeleteOutlined />]
				}
			], comment: ''
		});
	}
	handleChange = (event) => {
		this.setState({comment: event.target.value})
	}
	render() {
		return (
			<Row justify="center">
				<Col xl={16} lg={18} md={20} sm={22} xs={24}>
					<Card>
						<Row>
							<Col span={24}>
								<Comment author='MacKeNo' avatar='/img/buddhist.png' content={<p>Some thing</p>} datetime={<SettingOutlined />} />
							</Col>
						</Row>
						<Row>
							<Col span={22} offset={1}>
								{
									this, this.state.comments.length > 0 &&
									<List
										dataSource={this.state.comments}
										itemLayout="horizontal"
										renderItem={props => <List.Item key={props.key}><Comment {...props} /></List.Item>}
									/>
								}
							</Col>
						</Row>
						<Row justify="center">
							<Col span={22}>
								<Comment
									avatar={<Avatar src="/img/monk.png" alt="user" />}
									content={<Input onPressEnter={this.submit} onChange={this.handleChange} value={this.state.comment} />}
								/>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>
		);
	}
}

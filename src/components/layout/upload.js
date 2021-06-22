import React, {Component} from "react";
import {Button, Upload} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import {connect} from "react-redux";

class TodoList extends Component {
	constructor(props) {
		super(props);
	}
	upLoadFile = (file) => {
		let stogare = this.props.app.stogare.ref(`/image/${file.name}`)
		stogare.put(file).then((snapshot) => {
			let path = snapshot._delegate.metadata.fullPath
			this.props.app.stogare.ref(path).getDownloadURL().then((rs) => {
				console.log(rs);
			})
		});
	}

	render() {
		return (
			<Upload
				fileList={[]}
				beforeUpload={(file) => {
					this.upLoadFile(file)
					return false;
				}}>
				<Button icon={<UploadOutlined />}>Upload file</Button>
			</Upload>);
	}
}

const mapStateToProps = (store) => {
	return {
		app: store.app,
	};
};

export default connect(mapStateToProps)(TodoList);

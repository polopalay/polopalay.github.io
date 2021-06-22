import './App.css';
import 'antd/dist/antd.css';
import React, {Component} from "react";
import {Provider} from "react-redux";
import {Layout} from 'antd';
import Header from './components/header/Header';
import Footer from './components/footer/Footer'
import Default from './components/view/Default'
import store from './store';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Layout className="app">
					<Layout.Header style={{backgroundColor: "white"}}>
						<Header />
					</Layout.Header>
					<Layout.Content className="p-3">
						<Default />
					</Layout.Content>
					<Layout.Footer style={{textAlign: 'center'}}>
						<Footer />
					</Layout.Footer>
				</Layout>
			</Provider>);
	}
}

export default App;

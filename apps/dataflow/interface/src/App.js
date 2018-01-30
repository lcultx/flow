import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon, Avatar, Badge } from 'antd';
import 'antd/dist/antd.less'
import './app.less'
import { Router, Switch, Route } from 'react-router';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;



import store from './store'
import history from './history';
import { ConnectedRouter, push } from 'react-router-redux';

import { connect } from 'react-redux';
import { Redirect } from 'react-router';


import { Link } from 'react-router-dom';
import route from './common/route';
import containers from './containers'



// track pages on route change

export default class App extends Component {

	state = {
		collapsed: false,
	};
	onCollapse = (collapsed) => {
		console.log(collapsed);
		this.setState({ collapsed });
	}

	render() {
		return (
			<Layout>
				<Header className="header">
					<div className="logo">
						<img src="/GKE_color.png" alt="" /> DataFlow
					   </div>
					<div className="avatar">
						<span style={{ marginRight: 24 }}>
							<Badge count={1}><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></Badge>
						</span>
					</div>
				</Header>
				<Layout>
					<Sider width={200} style={{ background: '#fff' }}
					// collapsible
					// collapsed={this.state.collapsed}
					// onCollapse={this.onCollapse}
					>
						<Menu
							// theme="dark" 
							mode="inline"
							defaultSelectedKeys={[window.location.pathname]}
							defaultOpenKeys={['top']}
							style={{ height: 9999, borderRight: 0 }}

						>
							<SubMenu key="top" title={<span><Icon type="code" />数据定义</span>}>
								<Menu.Item key="/define/enum/">
									<Link to="/define/enum/">枚举定义</Link>
								</Menu.Item>
								<Menu.Item key="/define/struct/">
									<Link to="/define/struct/">结构定义</Link>
								</Menu.Item>
								<Menu.Item key="/define/const/">
									<Link to="/define/const/">常量定义</Link>
								</Menu.Item>
							</SubMenu>
							<SubMenu key="ui" title={<span><Icon type="laptop" />界面定义</span>}>
							</SubMenu>
							<SubMenu key="chart" title={<span><Icon type="area-chart" />数据看板</span>}>
							</SubMenu>
							<SubMenu key="api" title={<span><Icon type="api" />API Mock&Testing</span>}>
								<Menu.Item key="9">option9</Menu.Item>
								<Menu.Item key="10">option10</Menu.Item>
								<Menu.Item key="11">option11</Menu.Item>
								<Menu.Item key="12">option12</Menu.Item>
							</SubMenu>
						</Menu>
					</Sider>

					<Layout style={{ padding: '0 24px 24px' }}>
						<Switch>

							{
								route.getRouteConfig().map((routeConfig)=>{
									var View = containers[routeConfig.component]
									return <Route exact path={routeConfig.path} component={View} key={routeConfig.path}/>
								})
							}
						</Switch>
					</Layout> 
				</Layout>
			</Layout>

		)
	}
}


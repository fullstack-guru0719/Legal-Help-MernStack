/**
 * App Routes
 */
import React from 'react';
import { Route, withRouter } from 'react-router-dom';

// router service
import chatService from "../../router_service/chatservice";

import Header from './header';
import SidebarContent from './chatsidebar';


const EmailLayout = (props) => {

	const { match } = props;


	return (
		<div className="main-wrapper">
			<Header />
			<div>
				{chatService && chatService.map((route, key) =>
					<Route key={key} path={`${match.url}/${route.path}`} component={route.component} />
				)}
			</div>
			<SidebarContent />
		</div>
	);
}
export default withRouter(EmailLayout);
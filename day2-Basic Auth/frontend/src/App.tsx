import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/index";

function App() {
	return (
		<div className='App'>
			<Router>
				<Route path='/' exact component={Home} />
				<Route path='/signup' exact component={Signup} />
				<Route path='/login' exact component={Login} />
			</Router>
		</div>
	);
}

export default App;

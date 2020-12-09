import React from "react";
import "./Header.css";
import logo from "../Octocat.png";
const Header = () => {
	return (
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<p>My Github Portfolio</p>
			<a
				className="App-link"
				href="https://reactjs.org"
				target="_blank"
				rel="noopener noreferrer"></a>
		</header>
	);
};

export default Header;

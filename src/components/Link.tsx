import React from "react";
import "./Link.css";
type LinkProps = {
	url: string;
	title: string;
};

const Link = ({ url, title }: LinkProps) => {
	return (
		<a
			className="app-link"
			href={url}
			target="_blank"
			rel="noopener noreferrer">
			{title}
		</a>
	);
};
export default Link;

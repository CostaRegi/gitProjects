import React from "react";
import { ProfileItems } from "../containers/Profile";
import "./List.css";

type ListProps = {
	items: ProfileItems[];
	title: string;
};

const List = ({ items, title }: ListProps) => {
	return (
		<>
			<h2 className="item-title">{title}</h2>
			<ul>
				{items.map((item, index) => (
					<li key={index}>
						<strong>{item.label}</strong>
						{item.value}
					</li>
				))}
			</ul>
		</>
	);
};

export default List;

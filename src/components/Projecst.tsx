import React, { useEffect, useRef, useState } from "react";
import { ProfileItems } from "../containers/Profile";
import { useFetch } from "../hooks/useFetch";
import Link from "./Link";
import List from "./List";

type ProjectProps = {
	reposUrl: string | undefined;
};

type RepoItem = {
	html_url: string;
	name: string;
};

const Projects = ({ reposUrl }: ProjectProps) => {
	const repos = useFetch<RepoItem[]>(reposUrl);
	const repositories = useRef<ProfileItems[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (repos) {
			setLoading(false);
			repositories.current = repos.map((repo: RepoItem) => ({
				label: repo.name,
				value: <Link url={repo.html_url} title="GitHub Url" />,
			}));
		}
	}, [reposUrl, repos]);

	return (
		<>
			{loading ? (
				<div>Loading...</div>
			) : (
				<List title="Projects" items={repositories.current} />
			)}
		</>
	);
};

export default Projects;

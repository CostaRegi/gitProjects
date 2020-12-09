import React, { useEffect, useRef, useState } from "react";
import Link from "../components/Link";
import List from "../components/List";
import "./Profile.css";

type RepoItem = {
	html_url: string;
	name: string;
};

type ProfileState = {
	loading: boolean;
	data: {
		avatar_url?: string;
		html_url?: string;
		repos_url?: string;
		name?: string;
		company?: string;
		location?: string;
		email?: string;
		bio?: string;
	};
};

export type ProfileItems = {
	label: string;
	value?: string | JSX.Element;
};

const Profile = () => {
	const [profile, setProfile] = useState<ProfileState>({
		data: {},
		loading: true,
	});

	const items = useRef<ProfileItems[]>([]);
	const repositories = useRef<ProfileItems[]>([]);

	const { loading, data } = profile;

	useEffect(() => {
		const collectData = async () => {
			const profile = await fetch("https://api.github.com/users/CostaRegi");
			const profileJson = await profile.json();
			if (profileJson) {
				setProfile({
					data: { ...profileJson },
					loading: false,
				});

				items.current = [
					{
						label: "html_url",
						value: <Link url={data.html_url!} title="GitHub Url" />,
					},
					{ label: "repos_url", value: data.repos_url },
					{ label: "name", value: data.name },
					{ label: "company", value: data.company },
					{ label: "location", value: data.location },
					{ label: "email", value: data.email },
					{ label: "bio", value: data.bio },
				];

				const repos = await fetch(profileJson.repos_url);
				const reposJson = await repos.json();
				repositories.current = reposJson.map((repo: RepoItem) => ({
					label: repo.name,
					value: <Link url={repo.html_url} title="GitHub Url" />,
				}));
			}
		};

		collectData();
	});

	return (
		<div>
			{loading ? (
				<div>...Loading </div>
			) : (
				<div>
					<div className="profile-container">
						<img
							className="profile-avatar"
							src={data.avatar_url}
							alt="Avatar"
						/>

						<List title="Profile" items={items.current} />
						<List title="Projects" items={repositories.current} />
					</div>
				</div>
			)}
		</div>
	);
};

export default Profile;

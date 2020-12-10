import React, { useEffect, useRef, useState } from "react";
import Link from "../components/Link";
import List from "../components/List";
import Projects from "../components/Projecst";
import { useFetch } from "../hooks/useFetch";
import "./Profile.css";

type ProfileType = {
	avatar_url: string;
	html_url: string;
	repos_url: string;
	name: string;
	company: string;
	location: string;
	email: string;
	bio: string;
};

export type ProfileItems = {
	label: string;
	value?: string | JSX.Element;
};

const Profile = () => {
	const profile = useFetch<ProfileType>(
		"https://api.github.com/users/CostaRegi"
	);
	const [reposUrl, setReposUrl] = useState<string>("");
	const [loading, setLoading] = useState(true);
	const items = useRef<ProfileItems[]>([]);

	useEffect(() => {
		setLoading(false);
		if (profile) {
			setReposUrl(profile.repos_url);
			console.log(profile.repos_url);
			items.current = [
				{
					label: "html_url",
					value: <Link url={profile.html_url!} title="GitHub Url" />,
				},
				{ label: "repos_url", value: profile.repos_url },
				{ label: "name", value: profile.name },
				{ label: "company", value: profile.company },
				{ label: "location", value: profile.location },
				{ label: "email", value: profile.email },
				{ label: "bio", value: profile.bio },
			];
		}
	}, [profile]);

	return (
		<div>
			{loading ? (
				<div>...Loading </div>
			) : (
				<div>
					<div className="profile-container">
						<img
							className="profile-avatar"
							src={profile?.avatar_url}
							alt="Avatar"
						/>

						<List title="Profile" items={items.current} />
						<Projects reposUrl={reposUrl} />
					</div>
				</div>
			)}
		</div>
	);
};

export default Profile;

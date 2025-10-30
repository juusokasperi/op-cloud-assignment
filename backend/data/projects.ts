export type Language = 'C' | 'CPP' | 'REACT' | 'TS' | 'NODE';

export interface Project {
	id: number;
	title: string;
	description?: string;
	languages: Language[];
	technologies?: string[];
	githubUrl?: string;
	liveUrl?: string;
	image?: string;
};

export const projects: Project[] = [
	{
		id: 7,
		title: "1176 Compressor Audio Plugin",
		description: "A compressor plugin that emulates the behavior of the classic 1176 compressor.",
		languages: ["CPP"],
		technologies: ["JUCE framework", "Digital Signal Processing", "FET modeling"],
		image: "imgs/compressor.png",
		githubUrl: "https://github.com/juusokasperi/1176-compressor/"
	},
	{
		id: 6,
		title: "IRC Server",
		description: "An IRC server implementation compliant with IRC clients, featuring a basic bot.",
		languages: ["CPP"],
		image: "imgs/ircserv.png",
		githubUrl: "https://github.com/juusokasperi/42/tree/main/ft_irc"
	},
	{
		id: 5,
		title: "Ray Tracer",
		description: "A compact ray tracing engine built in C, supporting multithreading and bounding volume hierarchy (BVH) acceleration.",
		languages: ["C"],
		technologies: ["Multithreading", "Bounding Volume Hierarchy", "MLX42 Graphics Library"],
		image: "imgs/miniRT.png",
		githubUrl: "https://github.com/juusokasperi/42/tree/main/miniRT"
	},
	{
		id: 4,
		title: "Shell",
		description: "A lightweight BASH-like shell written in C, supporting common shell features and command parsing.",
		languages: ["C"],
		image: "imgs/minishell.png",
		githubUrl: "https://github.com/juusokasperi/42/tree/main/minishell"
	},
	{
		id: 3,
		title: "Wireframe model",
		description: "A graphics application that converts elevation maps into interactive 3D wireframe visualizations.",
		languages: ["C"],
		technologies: ["MLX42 Graphics Library"],
		image: "imgs/fdf.png",
		githubUrl: "https://github.com/juusokasperi/42/tree/main/FdF"
	},
	{
		id: 2,
		title: "Jazz in Helsinki -calendar application",
		description:
			"A full-stack web application for browsing jazz events \
			in the Helsinki area. Built with a React frontend and a \
			RESTful Express/Node.js backend with a PostgreSQL database.",
		languages: ["REACT", "TS", "NODE"],
		technologies: ["Vite", "Styled Components", "Express/Node.js", "PostGresQL"],
		image: "imgs/jazzcalendar.gif",
		githubUrl: "https://github.com/juusokasperi/fs-gigcalendar-app",
	},
	{
		id: 1,
		title: "Portfolio Website",
		description: "The site you're currently viewing – built with React and styled using Styled Components.",
		languages: ["REACT", "TS", "NODE"],
		technologies: ["Vite", "Styled Components"],
		githubUrl: "https://github.com/juusokasperi/42/tree/main/inception/srcs/requirements/portfolio/site",
		liveUrl: "/"
	},
]

import { Dispatch } from 'react';

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

export const LANGUAGE_OPTIONS = [
	{ value: 'ALL', label: 'All languages' },
	{ value: 'C', label: 'C' },
	{ value: 'CPP', label: 'C++' },
	{ value: 'REACT', label: 'React' },
	{ value: 'TS', label: 'TypeScript' },
	{ value: 'NODE', label: 'Node.js' },
] as const;

export type FilterValue = (typeof LANGUAGE_OPTIONS)[number]['value'];

export type FilterState = {
	filter: FilterValue;
	allProjects: Project[];
	filteredProjects: Project[];
	isLoading: boolean;
};

type SetFilterAction = {
	type: 'SET_FILTER';
	payload: FilterValue;
};

type SetProjectsAction = {
	type: 'SET_PROJECTS';
	payload: Project[];
};

export type FilterAction = SetFilterAction | SetProjectsAction;

export type DropDownProps = {
	dispatch: Dispatch<FilterAction>;
};

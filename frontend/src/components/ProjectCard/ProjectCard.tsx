import { Project } from '../../types'
import { ProjectImg, ProjectDiv, Title, Element, Link } from './styled'

interface ProjectCardProps {
	project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
	return (
		<ProjectDiv>
			<Title>
				{project.title}
			</Title>
			{project.image &&
					<ProjectImg src={`/${project.image}`} alt={project.title} />}
			{project.description &&
					<Element $padbottom="0.75em">{project.description}</Element>}
			<Element>
				<b>Languages:</b> {project.languages.join(', ')}
			</Element>
			{project.technologies && (
				<Element>
				<b>Technologies: </b>
				{project.technologies.join(', ')}
				</Element>
			)}
			{(project.githubUrl || project.liveUrl) && (
				<Element $padtop="0.5em" $padbottom="0.5em">
					{project.githubUrl &&
		 			<Link href={project.githubUrl} target="_blank">
						GitHub
					</Link>
					}
				{project.githubUrl && project.liveUrl && <>{" | "}</>}
				{project.liveUrl &&
					<>
					Deployed{" "}
					<Link href={project.liveUrl} target="_blank">
						here
					</Link></>}
					</Element>
				)}
		</ProjectDiv>
	);
};

export default ProjectCard;

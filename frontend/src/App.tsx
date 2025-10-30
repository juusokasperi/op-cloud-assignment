import { useReducer, useEffect } from 'react';
import { FilterState, FilterAction, Project, Language } from './types';

import { ContainerDiv, Link, Footer } from './styled'

import Header from './components/Header'
import DropDown from './components/DropDown'
import ProjectCard from './components/ProjectCard'

const initialState: FilterState = {
  filter: 'ALL',
  allProjects: [],
  filteredProjects: [],
  isLoading: true,
};

const filterReducer = (state: FilterState, action: FilterAction): FilterState => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return { ...state, allProjects: action.payload, filteredProjects: action.payload, isLoading: false };
    case 'SET_FILTER':
      const filteredProjects = action.payload === 'ALL'
        ? state.allProjects
        : state.allProjects.filter((project: Project) => project.languages.includes(action.payload as Language)
          );
      return { ...state, filter: action.payload, filteredProjects };
    default:
      return state;
  }
};

const useProjectFilter = () => {
  const [state, dispatch] = useReducer(filterReducer, initialState);
  return { ...state, dispatch };
};

const App = () => {
  const { filteredProjects, isLoading, dispatch } = useProjectFilter();

  useEffect(() => {
    const apiUrl = window.APP_CONFIG.apiUrl;
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/projects/`, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Project[] = await response.json();
        dispatch({ type: 'SET_PROJECTS', payload: data });
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, [dispatch]);

  return (
    <ContainerDiv>
      <Header />
      <DropDown dispatch={dispatch}/>
      {isLoading ? (
        <div className="projects-grid">
          Loading...
        </div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
      <Footer>
        © JR 2025{" | "}
        <Link href="https://www.github.com/juusokasperi" target="_blank">Git</Link>
      </Footer>
    </ContainerDiv>
  );
};

export default App

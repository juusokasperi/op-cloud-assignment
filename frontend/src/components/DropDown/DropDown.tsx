import { DropDownProps } from '../../types';
import { Dropdown, Select } from './styled';
import { LANGUAGE_OPTIONS } from '../../types';

const DropDown: React.FC<DropDownProps> = ({ dispatch }) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
	  dispatch({ type: 'SET_FILTER', payload: event.target.value as any });
	};

	return (
	  <Dropdown>
		<Select onChange={handleChange}>
	  	  {LANGUAGE_OPTIONS.map(option => (
			<option key={option.value} value={option.value}>
				{option.label}
			</option>
		  ))}
		</Select>
	  </Dropdown>
	);
  };

export default DropDown;

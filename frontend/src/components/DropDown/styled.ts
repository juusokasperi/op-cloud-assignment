import styled from 'styled-components';

export const Dropdown = styled.div`
  margin: 0px;
  position: relative;
`

export const Select = styled.select`
  background-color: ${({ theme }) => theme.colors.buttonBg};
  margin: 5px;
  border: 1px solid ${({ theme}) => theme.colors.secondary};
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.font };
  font-size: ${({ theme }) => theme.fontSize };
  color: ${({ theme }) => theme.colors.accent };
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  option {
    text-transform: none;
  }
`

import styled from 'styled-components';

export const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: rgb(17, 17, 17);
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  margin-right: 10px;
  padding: 10px;
  border-radius: 4px;
  border: none;
  outline: none;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
`;

export const SearchButton = styled.button`
  padding: 10px 20px;
  background: #1E90FF;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  outline: none;
`;
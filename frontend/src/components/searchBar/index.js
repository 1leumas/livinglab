import React, { useState } from "react";
import { SearchBarContainer, SearchInput, SearchButton } from "./styles";

function SearchBar({ setSearchDate, fetchData }) {
  const [localDate, setLocalDate] = useState(null);

  const onDateChange = (e) => {
    const date = e.target.value;
    setLocalDate(date);
  };

  //fetch data quando clicar no botao buscar
  const onSearchClick = () => {
    setSearchDate(localDate);
    fetchData(localDate);
  };

  return (
    <SearchBarContainer>
      <SearchInput type="date" onChange={onDateChange} />
      <SearchButton onClick={onSearchClick}>Buscar</SearchButton>
    </SearchBarContainer>
  );
}

export default SearchBar;

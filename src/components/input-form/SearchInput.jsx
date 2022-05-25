import React, { useContext } from "react";
import { DataContext } from "../../context/dataContext";
import SearchIcon from "@mui/icons-material/Search";
import "./searchInput.css";

const SearchInput = () => {
  const { q, setQ } = useContext(DataContext);
  return (
    <div className="search">
      <input
        type="search"
        name="q"
        placeholder="Search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <SearchIcon className="icon" />
    </div>
  );
};

export default SearchInput;

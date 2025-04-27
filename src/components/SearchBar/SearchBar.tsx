import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoSearchSharp } from "react-icons/io5";
import React from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
import { forwardRef } from "react";
import { ImageDataType } from "../../commonTypes";

interface SearchBarProps {
  onSubmit: (value: string) => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ onSubmit, value, onChange }, ref) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (value === "") {
        toast("Please enter your request", {
          duration: 3000,
          icon: <AiOutlineInfoCircle size={24} />,
        });
      } else {
        onSubmit(value);
        if (ref && typeof ref !== "function" && ref.current) {
          ref.current.blur();
        }
      }
    };

    return (
      <header className={css.header}>
        <form className={css.searchForm} onSubmit={handleSubmit}>
          <input
            className={css.inputField}
            type="text"
            autoComplete="off"
            placeholder="Search.."
            name="query"
            value={value}
            onChange={onChange}
            ref={ref}
          />
          <button className={css.searchBtn} type="submit">
            <IoSearchSharp size={24} />
          </button>
        </form>
      </header>
    );
  }
);

export default SearchBar;

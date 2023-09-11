import { Component } from 'react';
import { toast } from 'react-toastify';
import {
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
  SearchbarHeader,
} from './Searchbar.styled';

export const Searchbar = ({ onAdd }) => {
  const helperSubmit = evt => {
    evt.preventDefault();
    const serchItem = evt.target.elements.query.value.trim();
    if (!serchItem) {
      toast.error('Enter a search term ');
    }
    onAdd(serchItem);
    evt.target.reset();
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={helperSubmit} autocomplete="off">
        <SearchFormButton>
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          name="query"
          type="search"
          autofocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

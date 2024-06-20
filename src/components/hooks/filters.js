import { useState, useEffect } from 'react';

// custom hook to manage filters in toolbars
const useFilters = (defaultFilterValues, storedFiltersKey) => {
  const storedFilters = storedFiltersKey && localStorage.getItem(storedFiltersKey);
  const filters = storedFilters ? {
    ...defaultFilterValues,
    ...JSON.parse(storedFilters),
  } : defaultFilterValues;
  const [filterValues, setFilterValues] = useState(filters);

  // const onFilterChange = (event) => {
  //   setFilterValues({
  //     ...filterValues,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  const onFilterChange = (event) => {
    const value = event.target.name === "timeSpan" ? parseInt(event.target.value) : event.target.value;
    setFilterValues({
      ...filterValues,
      [event.target.name]: value,
    });
  };

  useEffect(() => {
    localStorage.setItem(storedFiltersKey, JSON.stringify(filterValues));
  }, [filterValues, storedFiltersKey]);

  return [filterValues, onFilterChange, setFilterValues];
};

export default useFilters;

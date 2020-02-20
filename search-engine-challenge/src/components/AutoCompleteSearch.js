import React, { useState, useEffect, useRef } from "react";
import useDebounce from "../utilities/debounce.js";
import getSummaries from "../utilities/getSummaries.js";
import DisplayBooks from "./DisplayBooks.js";
import data from "../assets/data.js";

/**
 * Functional component to show when no books are selected
 */
const NoDataComponent = () => (
  <div className="noDataText">No Books Selected</div>
);

/**
 * Main component for searching and selecting the books based on search key words
 */
const AutoCompleteSearch = () => {
  // state to hold flag for showing and hiding the suggestion dropdown
  const [display, setDisplay] = useState(false);

  // state to hold options shown in the suggestions dropdown while searching
  const [options, setOptions] = useState([]);

  // state to hold the search string
  const [search, setSearch] = useState("");

  // state to hold whether the dropdown is just selected or user is still searching
  const [selectedState, setSelectedState] = useState(false);

  // state to hold the currently selected title
  const [selectedBook, setSelectedBook] = useState({});

  //state to hold teh current set of selected books
  const [selectedBooks, setSelectedBooks] = useState([]);

  // ref used for closing the dropdown on clicking away anywhere
  const containerRef = useRef(null);

  // debounce the changes to search string to stop
  // invoking the getSummaries function for every key press
  const debouncedSearchQuery = useDebounce(search, 1000);

  // get summaries list on change of the search string input
  useEffect(() => {
    if (debouncedSearchQuery && !selectedState) {
      setDisplay(true);
      const summaries = getSummaries(debouncedSearchQuery, 3);
      const SummaryIDs = summaries.map(summary => summary.id);
      const summariesWithTitlesAndAuthors = SummaryIDs.map((val, i) => ({
        title: data.titles[val],
        summary: summaries[i].summary,
        author: data.authors[val]
      }));
      setOptions(summariesWithTitlesAndAuthors);
    } else {
      setOptions([]);
    }
  }, [debouncedSearchQuery]); // invoke this useEffect only when there is change to debounced search string

  // add event listener to check for click aways
  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  // set dispaly to false on click aways
  const handleClickOutside = event => {
    const { current: wrap } = containerRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  // on click of submit, concat the currently selected book to
  // selected list of books. This will update the book shelf
  // with newly selected book details
  const updateSelectedBooks = () => {
    setSelectedBooks(prevBooks => [...prevBooks, selectedBook]);
    setSearch("");
  };

  // on selecting an option from the suggestions,
  // 1. Fill the input with selected option
  // 2. Close the dropdown
  // 3. set current state to "selected from dropdown" using setSelectedState updater
  // 4. Save state of the currently selected book using setSelectedBook updater
  const updateList = book => {
    setSearch(book.title);
    setDisplay(false);
    setSelectedState(true);
    setSelectedBook(book);
  };

  // Save current search string to get relevant books
  const onInputChange = e => {
    setSearch(e.target.value);
    setSelectedState(false);
  };

  return (
    <div
      ref={containerRef}
      data-testid="main-container"
      className="mainContainer"
    >
      <div className="wrapperContainer">
        <div className="inputContainer">
          <input
            id="autoComplete"
            onClick={() => setDisplay(!display)}
            placeholder="Search for a book here..."
            value={search}
            onChange={onInputChange}
            autoComplete="off"
            data-testid="input-box"
          />
          {display && (
            <div data-testid="auto-container" className="autoContainer">
              {options.map((value, i) => {
                return (
                  <div
                    onClick={() => updateList(value)}
                    className="option"
                    key={i}
                    tabIndex="0"
                  >
                    <span>{value.title}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <button onClick={() => updateSelectedBooks()} className="submitButton">
          Submit
        </button>
      </div>
      {selectedBooks.length > 0 ? (
        <DisplayBooks books={selectedBooks} />
      ) : (
        <NoDataComponent />
      )}
    </div>
  );
};

export default AutoCompleteSearch;

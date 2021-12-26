import React from "react";
import { Form, Button } from "react-bootstrap";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [searchResult, changeSearchResult] = useState({});

  async function OMDBApiCall(event) {
    event.preventDefault();
    const searchData = `/omdb/${search}`;
    changeSearchResult(searchData);
  }

  return (
    <div>
      <Form onSubmit={OMDBApiCall}>
        <Form.Group className="mb-3" controlId="formBasicSearch">
          <Form.Label>Search Bar</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter movie name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Form.Text className="text-muted">
            Search the title of movie here.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>

      <SearchedMovie searchResult={searchResult} />
    </div>
  );
}

export default SearchBar;

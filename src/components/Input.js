import React from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const Input = (props) => {
  return (
    <div className="Search">
      <InputGroup size="lg">
        <FormControl
          placeholder="Enter a show name"
          value={props.query}
          onChange={props.handleSearchInput}
          onKeyPress={props.handleKeyPress}
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
        />
        <Button variant="primary" onClick={props.onSubmitQuery} type="submit">
          Search
        </Button>
      </InputGroup>
    </div>
  );
};

export default Input;

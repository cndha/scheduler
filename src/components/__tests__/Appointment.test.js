import React from "react"; // b/c rendering a React component 
import { render, cleanup } from "@testing-library/react"; //helper functions from react-testing-library
import Application from "components/Application"; //component thats being tested

afterEach(cleanup);

describe("Appointment", () => {

  it("renders without crashing", () => {
    render(<Application />);
  });
  
})

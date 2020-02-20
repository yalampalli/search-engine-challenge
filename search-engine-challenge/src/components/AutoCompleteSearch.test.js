import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AutoCompleteSearch from "./AutoCompleteSearch.js";

describe("Auto Complete Search Component", () => {
  it("should render the auto complete search container", () => {
    const { getByTestId, container } = render(<AutoCompleteSearch />);
    const elem = getByTestId("main-container");

    expect(container.children.length).toBe(1);
    expect(elem.children.length).toBe(2);
  });

  it("Should show suggestions on entering text in the input", async () => {
    const utils = render(<AutoCompleteSearch />);
    const input = utils.getByTestId("input-box");

    input.value = "make profit";
    fireEvent.click(input);
    fireEvent.change(input, { target: { value: "make profit" } });

    const dropdown = utils.getByTestId("auto-container");

    expect(dropdown.classList.contains("autoContainer")).toBe(true);
  });
});

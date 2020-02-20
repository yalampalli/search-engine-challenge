import React from "react";
import { render } from "@testing-library/react";
import DisplayBooks, { Book } from "./DisplayBooks.js";

const books = [
  {
    title: "Title 1",
    summary: "Summary 1",
    author: { author: "Author 1" }
  },
  {
    title: "Title 2",
    summary: "Summary 2",
    author: { author: "Author 2" }
  }
];

describe("Display books Component", () => {
  it("should render correct number of books", async () => {
    const { getByTestId } = render(<DisplayBooks books={books} />);
    const elem = getByTestId("book-container");

    expect(elem.children.length).toBe(2);
  });

  it("should match the snapshot of the book for same input", () => {
    const { container } = render(<Book book={books[0]} />);
    expect(container).toMatchSnapshot();
  });

  it("should render title, summary and author in the book component", () => {
    const { getByTestId } = render(<Book book={books[0]} />);

    const title = getByTestId("book-title");
    expect(title.textContent).toBe("Title 1");

    const summary = getByTestId("book-summary");
    expect(summary.textContent).toBe("Summary 1");

    const author = getByTestId("book-author");
    expect(author.textContent).toBe("Author 1");
  });
});

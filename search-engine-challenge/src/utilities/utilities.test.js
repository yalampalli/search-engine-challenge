import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-test-renderer";

import useDebounce from "../utilities/debounce.js";
import getSummaries from "../utilities/getSummaries.js";

describe("Get Summaries utilities function", () => {
  it("should return empty array for empty string input", () => {
    expect(getSummaries("", 3)).toStrictEqual([]);
  });

  it("should return array with size less than or equal to K size", () => {
    expect(getSummaries("make profit", 3).length).toBeLessThanOrEqual(3);
  });

  it("should accept input string as case insensitive", () => {
    expect(getSummaries("make profit", 3)).toStrictEqual(
      getSummaries("MAKE PROFIT", 3)
    );
  });

  it("should return empty array when only skip words are given as inputs", () => {
    expect(getSummaries("a an the ", 3)).toStrictEqual([]);
  });
});

describe("Debounce hook utility function", () => {
  it("should return updated value after specified delay", async () => {
    const { result } = await renderHook(() => useDebounce("test", 300));
    expect(result.current).toBe("test");
  });
});

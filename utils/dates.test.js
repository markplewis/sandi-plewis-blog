import { formatDate } from "utils/dates";

describe("formatDate", () => {
  it("should format a date", () => {
    const actual = formatDate("2017-02-12T09:15:00Z", "UTC");
    expect(actual).toEqual("February 12, 2017 (UTC)");
  });
});

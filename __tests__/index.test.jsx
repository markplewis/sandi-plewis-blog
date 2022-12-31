import { render, screen } from "@testing-library/react";
import HomePage from "components/pages/HomePage";

describe("Home", () => {
  it("renders a heading", () => {
    // TODO: how to mock Sanity client, etc.?
    render(<HomePage data={{}} />);

    const heading = screen.getByRole("heading", {
      name: /Home page/i
    });

    expect(heading).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import Footer from "components/Footer";

describe("Footer", () => {
  it("renders a heading", () => {
    // TODO: how to mock Sanity client, etc.?
    render(<Footer />);
    const link = screen.getByText(/Privacy policy/i);
    expect(link).toBeInTheDocument();
  });
});

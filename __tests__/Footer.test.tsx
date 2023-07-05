import { cleanup, render, screen } from "@testing-library/react";
import Footer from "~/components/Footer";

describe("Footer", () => {
  it("renders a heading", () => {
    // TODO: how to mock Sanity client, etc.?
    render(<Footer />);
    const link = screen.getByText(/Privacy policy/i);
    expect(link).toBeInTheDocument();
    // Temporary bug fix. See:
    // https://github.com/testing-library/react-testing-library/issues/1216#issuecomment-1595684566
    cleanup();
  });
});

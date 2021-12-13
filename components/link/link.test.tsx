import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import router from "next/router";
import { routes } from "@/routes.config";
import { Link, NavLink } from "./link";

describe("<Link>", () => {
  it("should navigate to home page", () => {
    render(<Link to="home">About</Link>);

    userEvent.click(screen.getByRole("link"));
    expect(router).toMatchObject({
      asPath: routes.home(),
      pathname: routes.home(),
      query: {},
    });
  });

  it("should add props to the underlying <a> tag", () => {
    render(
      <Link to="home" aria-label="About us">
        About
      </Link>
    );

    expect(screen.getByRole("link")).toHaveAttribute("aria-label", "About us");
  });
});

describe("<NavLink>", () => {
  it("should navigate to post page", () => {
    render(
      <NavLink
        to="post"
        params={{ category: "Frontpage", slug: "hello-world" }}
      >
        About
      </NavLink>
    );

    userEvent.click(screen.getByRole("link"));
    expect(router).toMatchObject({
      asPath: routes.post({ category: "Frontpage", slug: "hello-world" }),
      pathname: routes.post({ category: "Frontpage", slug: "hello-world" }),
      query: {},
    });
  });

  it("should toggle aria-current attribute when active/inactive", () => {
    render(
      <NavLink
        to="post"
        params={{ category: "Frontpage", slug: "hello-world" }}
      >
        About
      </NavLink>
    );

    expect(screen.getByRole("link")).not.toHaveAttribute("aria-current");
    userEvent.click(screen.getByRole("link"));
    expect(screen.getByRole("link")).toHaveAttribute("aria-current", "page");
  });

  it("should match 'isActive' prop with regex", () => {
    render(
      <NavLink
        to="post"
        params={{ category: "Frontpage", slug: "hello-world" }}
        isActive={/posts\/frontpage\/hello-world/}
      >
        About
      </NavLink>
    );

    expect(screen.getByRole("link")).not.toHaveAttribute("aria-current");
    userEvent.click(screen.getByRole("link"));
    expect(screen.getByRole("link")).toHaveAttribute("aria-current", "page");
  });

  it("should match 'isActive' prop with callback", () => {
    render(
      <NavLink
        to="post"
        params={{ category: "Frontpage", slug: "hello-world" }}
        isActive={({ router, href }) => href === router.asPath}
      >
        About
      </NavLink>
    );

    expect(screen.getByRole("link")).not.toHaveAttribute("aria-current");
    userEvent.click(screen.getByRole("link"));
    expect(screen.getByRole("link")).toHaveAttribute("aria-current", "page");
  });

  it("should add props to the underlying <a> tag", () => {
    render(
      <NavLink
        to="post"
        params={{ category: "Frontpage", slug: "hello-world" }}
        aria-label="About us"
      >
        About
      </NavLink>
    );

    expect(screen.getByRole("link")).toHaveAttribute("aria-label", "About us");
  });
});

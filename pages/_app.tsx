import transition from "@dash-ui/transition";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import clsx from "clsx";
import { Provider as JotaiProvider, useAtom } from "jotai";
import type { AppProps } from "next/app";
import Image from "next/image";
import * as React from "react";
import { Avatar } from "@/components/avatar";
import { Icon } from "@/components/icon";
import { IconButton, iconButton } from "@/components/icon-button";
import { NavLink, useNavLink } from "@/components/link";
import { styles, themeAtom } from "@/dash.config";
import { GlobalStyles } from "@/styles/global";
import { box, grid, hstack, inline, vstack } from "@/styles/layout";
import { tabs } from "@/styles/tabs";
import { text } from "@/styles/text";

export default App;

function App({ Component, pageProps }: AppProps) {
  return (
    <JotaiProvider>
      <GlobalStyles />
      <SkipNav />

      <div
        className={grid({
          minHeight: styles.tokens.vh,
          rows: ["min-content", "min-content", "auto"],
        })}
      >
        <Header />

        <main id="main-content">
          <Component {...pageProps} />
        </main>
      </div>
    </JotaiProvider>
  );
}

function Header() {
  const { active: resumeActive } = useNavLink({ href: "/resume" });
  const { active: homeActive } = useNavLink({ href: "/" });
  const [theme, setTheme] = useAtom(themeAtom);
  const [didMount, setDidMount] = React.useState("light");

  React.useEffect(() => {
    setDidMount(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <section
        className={hstack({
          width: { min: "100%", sm: "72ch" },
          distribute: "between",
          align: "center",
          position: "sticky",
          inset: [0, "auto", "auto"],
          z: "max",
          bg: "bodyBg",
          border: [["none", 50, 50], "border"],
          pad: [400, 500],
        })}
        style={{ margin: "0 auto" }}
      >
        <nav
          className={clsx(tabs.tabList(), text({ size: 100 }))}
          aria-label="Main navigation"
        >
          <NavLink
            to="home"
            rel="home"
            isActive={/\/$|\/posts\/.*$/}
            className={tabs.tab()}
          >
            <span className={tabs.tabText()}>Blog</span>
          </NavLink>

          <NavLink to="resume" className={tabs.tab()}>
            <span className={tabs.tabText()}>Resume</span>
          </NavLink>
        </nav>

        <div className={hstack({ gap: 500, align: "center" })}>
          <IconButton
            key={didMount}
            aria-label="Toggle dark theme"
            aria-pressed={theme === "dark"}
            title="Toggle dark theme"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            icon={
              theme === "light" ? "Weather/sun-fill" : "Weather/moon-clear-fill"
            }
          />

          <ul
            role="navigation"
            className={hstack({ gap: 500, align: "center" })}
            aria-label="Links to my social media accounts"
          >
            <li>
              <a
                href="https://github.com/jaredLunde"
                rel="external"
                title="@jaredLunde on GitHub"
                className={iconButton({ color: "primary", size: "sm" })}
              >
                <Icon name="Logos/github-fill" />
              </a>
            </li>

            <li>
              <a
                href="https://twitter.com/jaredLunde"
                rel="external"
                title="@jaredLunde on Twitter"
                className={iconButton({ color: "primary", size: "sm" })}
              >
                <Icon name="Logos/twitter-fill" />
              </a>
            </li>

            <li>
              <a
                href="https://instagram.com/jaredlunde/"
                rel="external"
                title="@jaredlunde on Instagram"
                className={iconButton({ color: "primary", size: "sm" })}
              >
                <Icon name="Logos/instagram-fill" />
              </a>
            </li>

            <li>
              <a
                href="https://www.linkedin.com/in/jared-lunde"
                rel="external"
                title="Jared Lunde on LinkedIn"
                className={iconButton({ color: "primary", size: "sm" })}
              >
                <Icon name="Logos/linkedin-fill" />
              </a>
            </li>
          </ul>
        </div>
      </section>

      <header
        className={vstack({
          width: { min: "100%", sm: "72ch" },
          border: [["none", 50, 50], "border"],
        })}
        style={{ margin: "0 auto" }}
      >
        <div
          className={clsx(
            box({ width: "100%", height: 224 }),
            scale(homeActive ? "in" : "out")
          )}
          aria-hidden={!homeActive}
        >
          <Image
            src="/dunes.jpeg"
            alt="An image of the Great Sand Dunes in Southwest Colorado"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>

        <div
          className={vstack({
            pad: { min: 500, sm: 600 },
            gap: 500,
          })}
        >
          <div className={hstack({ gap: "em400", align: "center" })}>
            {!homeActive && (
              <Avatar
                src="/avatar.jpeg"
                alt="A picture of Jared Lunde"
                size="44px"
              />
            )}

            <div>
              {React.createElement(
                homeActive || resumeActive ? "h1" : "div",
                {
                  className: text({
                    size: homeActive ? 600 : 300,
                    weight: 600,
                    tracking: -200,
                    leading: 400,
                    color: "text",
                    smoothing: true,
                  }),
                },
                "Jared Lunde"
              )}

              {React.createElement(
                homeActive || resumeActive ? "h2" : "div",
                {
                  className: text({
                    size: homeActive ? 500 : 300,
                    weight: 400,
                    tracking: -200,
                    leading: 200,
                    smoothing: true,
                  }),
                },
                resumeActive
                  ? "UI Engineer & Manager"
                  : "UI Engineer & Creative"
              )}
            </div>
          </div>

          {(homeActive || resumeActive) && (
            <p className={text({ leading: 400 })}>
              {resumeActive ? (
                <React.Fragment>
                  Pragmatic engineer and manager with a deep affinity for the
                  modern web. Passionate about creating DX-focused software.
                  Aiming to leverage great communication skills to work and grow
                  with an exciting, talented product team.
                </React.Fragment>
              ) : (
                <React.Fragment>
                  I write code, read things, design, eat, think, and
                  work on{" "}
                  <a href="https://flexstack.com/">FlexStack</a>. I sometimes
                  write words here.
                </React.Fragment>
              )}
            </p>
          )}

          {(homeActive || resumeActive) && (
            <div
              className={clsx(
                inline({ gap: 500, align: "center" }),
                text({ size: 100, color: "text500" })
              )}
            >
              <div className={hstack({ gap: 300, align: "center" })}>
                <Icon name="Map/map-pin-2-fill" /> <span>Denver, CO</span>
              </div>

              {!resumeActive && (
                <div className={hstack({ gap: 300, align: "center" })}>
                  <Icon name="Business/calendar-2-fill" />{" "}
                  <span>Joined March 17, 1987</span>
                </div>
              )}

              {resumeActive && (
                <a
                  className={clsx(
                    hstack({ gap: 300, align: "center" }),
                    text({ size: 100, color: "text500" })
                  )}
                  href="mailto:jared.lunde@gmail.com"
                  style={{ textDecoration: "none" }}
                >
                  <Icon name="Business/mail-fill" />{" "}
                  <span>jared.lunde@gmail.com</span>
                </a>
              )}
            </div>
          )}
        </div>
      </header>
    </React.Fragment>
  );
}

function SkipNav() {
  return (
    <VisuallyHidden>
      <a href="#main-content" className={skipNav()}>
        Skip to main content
      </a>
    </VisuallyHidden>
  );
}

const skipNav = styles.one(({ pad }) => ({
  ".using-keyboard &:focus": {
    clip: "inherit",
    height: "auto",
    width: "auto",
    margin: 0,
    padding: pad[400],
    overflow: "inherit",
    position: "relative",
  },
}));

const scale = transition(styles, {
  default: ({ transition }) => ({
    duration: transition.duration.slow,
    timing: transition.timing.decelerated,
  }),
  in: {
    scale: 1,
    height: 224,
    opacity: 1,
  },
  out: {
    height: 0,
  },
});

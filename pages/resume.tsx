import type { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { Icon } from "@/components/icon";
import { pipeStyles, styles } from "@/dash.config";
import { routes } from "@/routes.config";
import { grid, gridItem, vstack } from "@/styles/layout";
import { text } from "@/styles/text";

const Resume: NextPage = function () {
  return (
    <div
      className={vstack({
        gap: 600,
        width: { min: "100%", sm: "72ch" },
        minHeight: "100%",
        pad: { min: 500, sm: 600 },
        border: [["none", 50], "border"],
      })}
      style={{ marginLeft: "auto", marginRight: "auto" }}
    >
      <NextSeo
        title="Resume / UI Engineer / Jared Lunde"
        description={`Want to know more about my professional experience? Check out my resume here.`}
        canonical={routes.resume()}
      />

      <section className={section()}>
        <h2 className={section.heading()}>
          <span role="img" aria-hidden>
            🔆{" "}
          </span>
          About me
        </h2>

        <section className={aboutMeCard()}>
          <h3>Grit</h3>
          <ul>
            <li>Self-employed majority of professional career</li>
            <li>
              Engineered, grew, exited two self-funded, high traffic web apps
            </li>
            <li>Self-taught, focused on design patterns and data structures</li>
          </ul>
        </section>

        <section className={aboutMeCard()}>
          <h3>Library &amp; app code</h3>
          <ul>
            <li>
              <b>14 years</b> shipping web applications
            </li>
            <li>
              <b>6 years</b> programming in React
            </li>
            <li>
              <b>120+</b> public repositories
            </li>
            <li>
              <b>500,000+</b> weekly NPM downloads
            </li>
          </ul>
        </section>

        <section className={aboutMeCard()}>
          <h3>UI/UX</h3>
          <ul>
            <li>
              <b>3 years</b> creating design systems
            </li>
            <li>
              <b>14 years</b> creating user experiences
            </li>
            <li>Laser-focused on WAI-ARIA accessibility patterns</li>
          </ul>
        </section>
      </section>

      <section className={section()}>
        <h2 className={section.heading()}>Professional experience</h2>

        <ul className={professionalExperience()}>
          {" "}
          <li className={professionalExperience.card()}>
            <div>
              <h3>
                Software Engineering Manager{" "}
                <span className="date-range">Aug 2021 &ndash; Now</span>
              </h3>
              <h4>
                <a href="https://hotelengine.com">
                  <Icon name="System/external-link-fill" /> Hotel Engine — A
                  better way to manage business travel lodging
                </a>
              </h4>
            </div>
          </li>
          <li className={professionalExperience.card()}>
            <div>
              <h3>
                Senior Front-end Engineer{" "}
                <span className="date-range">Oct 2020 &ndash; Apr 2021</span>
              </h3>
              <h4>
                <a href="https://paperspace.com">
                  <Icon name="System/external-link-fill" /> Paperspace — The
                  cloud platform built for the future
                </a>
              </h4>
            </div>

            <ul>
              <li>
                Designed and engineered the frontend for the company’s Google
                Colab competitor resulting in a 10% increase in notebook user
                retention
              </li>

              <li>
                Introduced company&apos;s first design and layout system while
                leading the team implementing it across products, drastically
                shortening and improving product release cycles
              </li>
              <li>
                Improved customer success rate, a metric that measured how often
                users interacted with the product without encountering errors,
                from 93% to 99% as leader of the customer experience team
              </li>
              <li>
                Mentored and paired regularly with junior engineers on my team
              </li>
            </ul>
          </li>
          <li className={professionalExperience.card()}>
            <div>
              <h3>
                Senior Front-end Engineer{" "}
                <span className="date-range">Sep 2019 &ndash; Oct 2020</span>
              </h3>
              <h4>
                <a href="https://getadmiral.com">
                  <Icon name="System/external-link-fill" /> Admiral — The
                  visitor relationship management company
                </a>
              </h4>
            </div>

            <ul>
              <li>
                Modernized build tooling, positively impacting developer
                productivity, product reliability and bundle size
              </li>

              <li>
                Introduced accessibility features, protecting the company from
                liability issues while championing inclusivity
              </li>
              <li>
                Implemented the company&apos;s first token-driven design system
                and component library, providing products a cohesive brand story
              </li>
            </ul>
          </li>
          <li className={professionalExperience.card()}>
            <div>
              <h3>
                Founder, Fullstack Software Engineer{" "}
                <span className="date-range">Jan 2017 &ndash; Aug 2019</span>
              </h3>
              <h4>Stellar</h4>
            </div>

            <ul>
              <li>
                Designed frontend libraries for rapidly launching serverless
                landing pages for ad campaigns
              </li>

              <li>
                Engineered design systems, components, and build tooling around
                launching serverless landing pages for ad campaigns
              </li>
              <li>Generated up to 100 quality leads for clients each month</li>
            </ul>
          </li>
          <li className={professionalExperience.card()}>
            <div>
              <h3>
                Founder, Full Stack Software Engineer{" "}
                <span className="date-range">Jun 2010 &ndash; Dec 2016</span>
              </h3>
              <h4>
                <a href="https://makeagif.com">
                  <Icon name="System/external-link-fill" /> Cool Story —
                  MakeAGIF.com, MakeADare.com, et. al.
                </a>
              </h4>
            </div>

            <ul>
              <li>
                Consistently delivered as many as 12 million page views to 1.8
                million visitors per day with 99.99% uptime
              </li>

              <li>
                Reliably served content which generated up to $1M in revenue per
                year at a 75% margin on infrastructure and bandwidth costs
              </li>
              <li>
                Implemented service for transcoding as many as 5,000 videos and
                GIFs each day targeting mobile and desktop viewing devices
              </li>
            </ul>
          </li>
        </ul>
      </section>

      <section className={section()}>
        <h2 className={section.heading()}>Technical competencies</h2>

        <section className={aboutMeCard()}>
          <h3>Languages</h3>
          <p className={text({ size: 100 })}>
            TypeScript, Node.js, GraphQL, Python, SQL, HTML, CSS
          </p>
        </section>

        <section className={aboutMeCard()}>
          <h3>Libraries</h3>
          <p className={text({ size: 100 })}>
            React, Next.js, Styled Components, React Query, SWR, Urql, Apollo,
            Redux, Jest, Webpack, Rollup, Babel, Serverless,{" "}
            <em>and many more</em>
          </p>
        </section>

        <section className={aboutMeCard()}>
          <h3>AWS</h3>
          <p className={text({ size: 100 })}>
            Lambda, API Gateway, RDS, VPC, CloudFormation, Route 53, S3,
            CloudFront, ElastiCache, SNS, SQS, Parameter Store
          </p>
        </section>
      </section>

      <section className={section()}>
        <h2 className={section.heading()}>Open source</h2>

        <ul
          className={grid({
            cols: 2,
            gap: 500,
            alignY: "stretch",
          })}
        >
          <li>
            <a className={openSourceCard()} href="https://github.com/dash-ui">
              <h3>dash-ui</h3>
              <p className={text({ size: 100 })}>
                A tiny, powerful, framework-agnostic CSS-in-JS ecosystem
              </p>
              <span>TypeScript, CSS, React, Babel</span>
            </a>
          </li>

          <li>
            <a
              className={openSourceCard()}
              href="https://github.com/accessible-ui"
            >
              <h3>accessible-ui</h3>
              <p className={text({ size: 100 })}>
                Headless React components and hooks enacting WAI-ARIA best
                practices
              </p>
              <span>React, TypeScript</span>
            </a>
          </li>

          <li>
            <a
              className={openSourceCard()}
              href="https://github.com/jaredLunde/react-hook"
            >
              <h3>react-hook</h3>
              <p className={text({ size: 100 })}>
                Strongly typed React hooks for function components
              </p>
              <span>React, TypeScript</span>
            </a>
          </li>

          <li>
            <a
              className={openSourceCard()}
              href="https://github.com/jaredLunde/masonic"
            >
              <h3>masonic</h3>
              <p className={text({ size: 100 })}>
                High performance virtual masonry layouts for React
              </p>
              <span>React, TypeScript, Algorithms</span>
            </a>
          </li>

          <li className={gridItem({ colStart: 1, colEnd: 3 })}>
            <a
              className={openSourceCard()}
              href="https://github.com/jaredLunde/blog"
            >
              <h3>blog</h3>
              <p className={text({ size: 100 })}>
                <span aria-hidden>👋</span> See the code that went into making
                this website
              </p>
              <span>React, TypeScript, Next.js, CSS</span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

const section = Object.assign(() => vstack({ gap: 500 }), {
  heading: () => text({ size: 400, weight: 400, color: "text" }),
});

const aboutMeCard = styles.one(
  pipeStyles(
    grid.css({
      gap: 400,
      cols: { min: 1, xs: [120, "auto"] },
      alignY: "center",
      pad: { min: 500, xs: [500, 600] },
    }),
    (t) => ({
      lineHeight: t.font.leading[400],
      backgroundColor: t.color.accent,
      borderRadius: t.radius.primary,
      color: t.color.text400,

      b: {
        fontWeight: 500,
      },

      h3: {
        color: t.color.text,
        fontWeight: 500,
        fontSize: t.font.size[200],
      },

      "> ul > li": {
        paddingLeft: "1em",
        fontSize: t.font.size[100],
      },

      "> ul > li::before": {
        content: '""',
        position: "absolute",
        backgroundColor: t.color.text400,
        top: 8,
        borderRadius: "50%",
        width: 4,
        height: 4,
        left: 0,
        color: t.color.text400,
      },
    })
  )
);

const professionalExperience = Object.assign(
  styles.one((t) => ({
    "> li": {
      listStyle: "none",
      paddingLeft: t.pad.em700,
    },

    "> li:not(:last-child)": {
      paddingBottom: t.pad[500],
    },

    "> li:first-child::before": {
      backgroundColor: t.color.text,
    },

    "> li::before": {
      content: '""',
      position: "absolute",
      borderWidth: t.borderWidth[200],
      borderStyle: "solid",
      borderColor: t.color.text,
      top: 6,
      borderRadius: "50%",
      width: 9,
      height: 9,
      left: 0,
      color: t.color.text400,
    },

    "> li:not(:last-child)::after": {
      content: '""',
      position: "absolute",
      height: "calc(100% - 6px)",
      top: 13,
      left: 4,
      backgroundColor: t.color.text,
      width: t.borderWidth[100],
    },
  })),
  {
    card: styles.one(
      pipeStyles(vstack.css({ gap: 400 }), (t) => ({
        h3: {
          color: t.color.text,
          fontSize: t.font.size[200],
          fontWeight: 500,

          ".date-range": {
            fontSize: t.font.size[100],
            color: t.color.text400,
          },
        },

        h4: {
          fontSize: t.font.size[100],
          color: t.color.secondary,
          fontWeight: 500,
        },

        "> ul > li": {
          paddingLeft: t.pad.em600,
          fontSize: t.font.size[100],
          lineHeight: t.font.leading[400],
          color: t.color.text400,

          "&::before": {
            content: '""',
            position: "absolute",
            backgroundColor: t.color.current,
            top: 8,
            borderRadius: "50%",
            width: 4,
            height: 4,
            left: 0,
            color: t.color.text400,
          },
        },
      }))
    ),
  }
);

const openSourceCard = styles.one(
  pipeStyles(
    vstack.css({
      gap: 400,
      pad: { min: 500, xs: 600 },
    }),
    (t) => ({
      textDecoration: "none",
      lineHeight: t.font.leading[400],
      backgroundColor: t.color.accent,
      borderRadius: t.radius.primary,
      color: t.color.text400,

      b: {
        fontWeight: 500,
      },

      h3: {
        fontWeight: 500,
        fontSize: t.font.size[300],
        color: t.color.text,
      },

      "> *:last-child": {
        fontSize: t.font.size[50],
      },
    })
  )
);

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default Resume;

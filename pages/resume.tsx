import { useId } from "@radix-ui/react-id";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import * as React from "react";
import { Icon } from "@/components/icon";
import { mq, pipeStyles, styles } from "@/dash.config";
import { absRoutes } from "@/routes.config";
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
        canonical={absRoutes.resume()}
        openGraph={{
          images: [{ url: "/avatar.jpeg" }],
        }}
        twitter={{
          cardType: "summary",
        }}
      />

      <Section
        title={
          <React.Fragment>
            <span role="img" aria-hidden>
              🔆{" "}
            </span>
            About me
          </React.Fragment>
        }
      >
        <ul className={vstack({ gap: 400 })}>
          <AboutMeCard
            title="Grit"
            examples={[
              "Self-employed majority of professional career",
              "Engineered, grew, exited two self-funded, high traffic web apps",
              "Self-taught, focused on design patterns and data structures",
            ]}
          />

          <AboutMeCard
            title="Library & app code"
            examples={[
              <React.Fragment key={0}>
                <strong>14 years</strong> shipping web applications
              </React.Fragment>,
              <React.Fragment key={1}>
                <strong>6 years</strong> programming in React
              </React.Fragment>,
              <React.Fragment key={2}>
                <strong>120+</strong> public repositories
              </React.Fragment>,
              <React.Fragment key={3}>
                <strong>500,000+</strong> weekly NPM downloads
              </React.Fragment>,
            ]}
          />

          <AboutMeCard
            title="UI/UX"
            examples={[
              <React.Fragment key={0}>
                <strong>3 years</strong> creating design systems
              </React.Fragment>,
              <React.Fragment key={1}>
                <strong>14 years</strong> creating user experiences
              </React.Fragment>,
              "Laser-focused on WAI-ARIA accessibility patterns",
            ]}
          />
        </ul>
      </Section>

      <Section title="Professional experience">
        <ul className={professionalExperience()}>
          <ProfessionalExperienceCard
            title="Software Engineering Manager"
            startDate="Aug 2021"
            companyName="Hotel Engine"
            companyDescription="A better way to manage business travel lodging"
            companyWebsite="https://hotelengine.com"
          />

          <ProfessionalExperienceCard
            title="Senior Front-end Engineer"
            startDate="Oct 2020"
            endDate="Apr 2021"
            companyName="Paperspace"
            companyDescription="The cloud platform built for the future"
            companyWebsite="https://paperspace.com"
          >
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
          </ProfessionalExperienceCard>

          <ProfessionalExperienceCard
            title="Senior Front-end Engineer"
            startDate="Sep 2019"
            endDate="Oct 2020"
            companyName="Admiral"
            companyDescription="The visitor relationship management company"
            companyWebsite="https://getadmiral.com"
          >
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
          </ProfessionalExperienceCard>

          <ProfessionalExperienceCard
            title="Founder, Fullstack Software Engineer"
            startDate="Jan 2017"
            endDate="Aug 2019"
            companyName="Stellar"
          >
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
          </ProfessionalExperienceCard>

          <ProfessionalExperienceCard
            title="Founder, Fullstack Software Engineer"
            startDate="Jun 2010"
            endDate="Dec 2016"
            companyName="Cool Story"
            companyDescription="MakeAGIF.com, MakeADare.com, et. al."
            companyWebsite="https://makeagif.com"
          >
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
          </ProfessionalExperienceCard>
        </ul>
      </Section>

      <Section title="Technical competencies">
        <ul className={vstack({ gap: 400 })}>
          <TechnicalCompetencyCard
            title="Languages"
            examples={[
              "TypeScript",
              "Node.js",
              "GraphQL",
              "Python",
              "SQL",
              "HTML",
              "CSS",
            ]}
          />

          <TechnicalCompetencyCard
            title="Libraries"
            examples={[
              "React",
              "Next.js",
              "Styled Components",
              "React Query",
              "SWR",
              "Urql",
              "Apollo",
              "Redux",
              "Jest",
              "Webpack",
              "Rollup",
              "Babel",
              "Serverless",
              "and more",
            ]}
          />

          <TechnicalCompetencyCard
            title="AWS"
            examples={[
              "Lambda",
              "API Gateway",
              "RDS",
              "VPC",
              "CloudFormation",
              "Route 53",
              "S3",
              "CloudFront",
              "ElastiCache",
              "SNS",
              "SQS",
              "Parameter Store",
            ]}
          />
        </ul>
      </Section>

      <Section title="Open source projects">
        <ul
          className={grid({
            cols: 2,
            gap: 400,
            alignY: "stretch",
          })}
        >
          <OpenSourceCard
            repo="dash-ui"
            name="dash-ui"
            description="A tiny, powerful, framework-agnostic CSS-in-JS ecosystem."
            techStack={["TypeScript", "CSS", "React", "Babel"]}
          />

          <OpenSourceCard
            repo="accessible-ui"
            name="accessible-ui"
            description="Headless React components and hooks enacting WAI-ARIA best practices."
            techStack={["React", "TypeScript", "Accessibility"]}
          />

          <OpenSourceCard
            repo="jaredLunde/react-hook"
            name="react-hook"
            description="Strongly typed React hooks for function components."
            techStack={["React", "TypeScript"]}
          />

          <OpenSourceCard
            repo="jaredLunde/masonic"
            name="masonic"
            description="High performance virtual masonry layouts for React."
            techStack={["React", "TypeScript", "Algorithms"]}
          />

          <OpenSourceCard
            repo="jaredLunde/blog"
            name="blog"
            description={
              <React.Fragment>
                <span aria-hidden>👋</span> See the code that went into making
                this website.
              </React.Fragment>
            }
            techStack={["React", "TypeScript", "Next.js", "CSS"]}
            className={gridItem({ colStart: 1, colEnd: 3 })}
          />
        </ul>
      </Section>
    </div>
  );
};

function Section({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactElement;
}) {
  const id = useId();

  return (
    <section className={section()}>
      <h2 className={section.heading()} id={id} aria-hidden>
        {title}
      </h2>

      {React.cloneElement(children, { "aria-labelledby": id })}
    </section>
  );
}

function AboutMeCard({
  title,
  examples,
}: {
  title: string;
  examples: React.ReactNode[];
}) {
  const id = useId();
  return (
    <li className={aboutMeCard()}>
      <h3 id={id} aria-hidden>
        {title}
      </h3>

      <ul aria-labelledby={id}>
        {examples.map((example, i) => (
          <li key={i}>{example}</li>
        ))}
      </ul>
    </li>
  );
}

function ProfessionalExperienceCard({
  title,
  startDate,
  endDate,
  companyName,
  companyDescription,
  companyWebsite,
  children,
}: {
  title: string;
  startDate: string;
  endDate?: string;
  companyName: string;
  companyDescription?: string;
  companyWebsite?: string;
  children?: React.ReactElement;
}) {
  return (
    <li className={professionalExperience.card()}>
      <div
        role="heading"
        aria-level={3}
        aria-label={`${title} at "${companyName}" from ${startDate} to ${
          endDate ?? "now"
        }`}
      >
        <h3>
          {title}{" "}
          <span className="date-range">
            {startDate} &ndash; {endDate ?? "Now"}
          </span>
        </h3>

        <h4>
          {companyWebsite ? (
            <a href={companyWebsite}>
              <Icon name="System/external-link-fill" /> {companyName}{" "}
              {companyDescription && (
                <React.Fragment>— {companyDescription}</React.Fragment>
              )}
            </a>
          ) : (
            <React.Fragment>
              {companyName}{" "}
              {companyDescription && (
                <React.Fragment>— {companyDescription}</React.Fragment>
              )}
            </React.Fragment>
          )}
        </h4>
      </div>

      {children &&
        React.cloneElement(children, {
          "aria-label": `Achievements at ${companyName}`,
        })}
    </li>
  );
}

function TechnicalCompetencyCard({
  title,
  examples,
}: {
  title: string;
  examples: React.ReactNode[];
}) {
  const id = useId();
  return (
    <li className={technicalCompetencyCard()}>
      <h3 id={id} aria-hidden>
        {title}
      </h3>

      <ul aria-labelledby={id}>
        {examples.map((example, i) => (
          <li key={i}>{example}</li>
        ))}
      </ul>
    </li>
  );
}

function OpenSourceCard({
  repo,
  name,
  description,
  techStack,
  className,
}: {
  repo: string;
  name: React.ReactNode;
  description: React.ReactNode;
  techStack: string[];
  className?: string;
}) {
  const id = useId();

  return (
    <li className={className}>
      <a
        className={openSourceCard()}
        href={"https://github.com/" + repo}
        aria-labelledby={id + "-title"}
        aria-describedby={id + "-desc " + id + "-tech"}
      >
        <h3 id={id + "-title"}>{name}</h3>
        <p className={text({ size: 100 })} id={id + "-desc"}>
          {description}
        </p>
        <span
          aria-label={"Tech stack: " + techStack.join(", ")}
          id={id + "-tech"}
        >
          {techStack.join(", ")}
        </span>
      </a>
    </li>
  );
}

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

      strong: {
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

const technicalCompetencyCard = styles.one(
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

      strong: {
        fontWeight: 500,
      },

      h3: {
        color: t.color.text,
        fontWeight: 500,
        fontSize: t.font.size[200],
      },

      "> ul > li": {
        display: "inline",
        fontSize: t.font.size[100],
      },

      "> ul > li:not(:last-child)::after": {
        content: '", "',
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
      height: "100%",
      gap: 400,
      pad: { min: 500, xs: 600 },
    }),
    mq({
      default: (t) => ({
        textDecoration: "none",
        lineHeight: t.font.leading[400],
        borderRadius: t.radius.primary,
        border: `${t.borderWidth[50]} solid ${t.color.secondary}`,
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
          color: t.color.secondary,
        },

        ":focus-visible": {
          backgroundColor: t.color.accent,
        },
      }),
      hover: (t) => ({
        ":hover": {
          backgroundColor: t.color.accent,
        },
      }),
    })
  )
);

export default Resume;

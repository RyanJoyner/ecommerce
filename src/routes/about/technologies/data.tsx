import {
  JavaScriptIcon,
  ReactIcon,
  NodeJsIcon,
  TypeScriptIcon,
  GraphQLIcon,
  PythonIcon,
  QwikIcon,
  D3Icon,
} from "~/components/icons";

const years = (dateFromString: string) => {
  const dateFrom = new Date(dateFromString);
  const current = new Date();

  return (
    (current.getMonth() -
      dateFrom.getMonth() +
      12 * (current.getFullYear() - dateFrom.getFullYear())) /
    12
  ).toFixed(1);
};

export default [
  {
    id: "Javascript",
    Icon: JavaScriptIcon,
    description:
      "My first language, probably not the first language I would recommend a new software engineer pick up.",
    aside: "We have a love hate relationship, most days it's love!",
    value: parseFloat(years("January, 2015")),
    group: "FE",
  },
  {
    id: "React",
    Icon: ReactIcon,
    description:
      "Component architecture is my bread and butter, I enjoy coding and thinking from a functional paradigm.",
    aside: "Intuitive and fun really.",
    value: parseFloat(years("September, 2017")),
    group: "FE",
  },
  {
    id: "Qwik",
    Icon: QwikIcon,
    description:
      "The new goodness, hopefully resumeability is all it's chalked up to be! Thank you for feeling like react. I'm hopeful you solve all of my PWA problems.",
    aside: "My experience is this portfolio site!",
    value: parseFloat(years("September, 2022")),
    group: "FE",
  },
  {
    id: "Typescript",
    Icon: TypeScriptIcon,
    description:
      "I wish I didn't need something to remind me of Javascripts shortcomings but I do, and Typescript is very effective at that job.",
    aside: "Sometimes I wish it would just shut up!",
    value: parseFloat(years("October, 2020")),
    group: "FE",
  },
  {
    id: "D3",
    Icon: D3Icon,
    description:
      "Flexible but clunky, fun but a little tricky inside of React Projects.",
    aside: " My favorite projects to work on use d3.js!",
    value: parseFloat(years("January, 2020")),
    group: "FE",
  },
  {
    id: "Node",
    Icon: NodeJsIcon,
    description:
      "I don't recommend Node.js for math intensive projects. I appreciate it because I'm a javascript guy!",
    aside:
      "If you want to get in the weeds it's single threaded which has serious cons for specific use cases.",
    value: 1,
    group: "BE",
  },
  {
    id: "GraphQL",
    Icon: GraphQLIcon,
    description:
      "Great if you need robust flexibile data contracts for various front end applications.",
    aside:
      "Makes your front end developers happy and your back end a bit more of a headache.",
    value: 2,
    group: "BE",
  },
  {
    id: "Python",
    Icon: PythonIcon,
    description:
      "My current studies include python and finance. With a goal of building python web servers proficiently this year!",
    aside:
      "Thank you for being dynamicly typed and having awesome math and data visualization libraries.",
    value: parseFloat(years("September, 2022")),
    group: "BE",
  },
];

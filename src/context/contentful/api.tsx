import contentful from "contentful";

export default () => {
  // TODO why don't env vars work here? 
  const { VITE_SPACE, VITE_CONTENTFUL_ACCESS_TOKEN } = import.meta.env;
  // console.log(VITE_SPACE, VITE_CONTENTFUL_ACCESS_TOKEN);
  const client = contentful.createClient({
    space: "wgi0b9s92wh1",
    // defaults to 'master' if not set
    environment: "master",
    // How do I set this as an env variable ???
    accessToken: "jAg20O0nc1R__suBcbSSBr7e0MVX21vY-5uzh6wJJrU",
  });

  return client;
};

import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const useGetContentfulEntries: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const { VITE_SPACE, VITE_CONTENTFUL_ACCESS_TOKEN } = process.env;
  const url = `https://cdn.contentful.com/spaces/${VITE_SPACE}/environments/${"master"}/entries?access_token=${VITE_CONTENTFUL_ACCESS_TOKEN}`;
  const response = await fetch(url);
  const data = await response.json();

  return { statusCode: 200, body: JSON.stringify({ items: data.items }) };
};

export { useGetContentfulEntries };

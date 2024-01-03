/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
import express from "express";
// import { renderToNodeStream } from "react-dom/server";
// import { StaticRouter } from "react-router-dom";
import { matchRoutes } from "react-router-config";
import { SitemapStream, streamToPromise } from "sitemap";
import routes from "./src/routes.js";

const app = express();

app.get("/sitemap.xml", (req, res) => {
  // Determine the hostname dynamically based on the incoming request's 'Host' header
  const hostname = req.get("Host");
  const sitemap = new SitemapStream({ hostname: `https://${hostname}` });

  // Map React app routes to sitemap entries
  matchRoutes(routes, req.path).map(({ route }) => {
    sitemap.write({ url: route.path, changefreq: "monthly", priority: 0.7 });
  });

  sitemap.end();

  // Send the generated sitemap as the response
  streamToPromise(sitemap).then((sm) => {
    res.header("Content-Type", "application/xml");
    res.send(sm);
  });
});

// Add other routes and configurations as needed

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

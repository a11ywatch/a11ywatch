import { crawlWebsite } from "@app/core/controllers";

const crawl = async (req, res, next) => {
  try {
    const data = await crawlWebsite({
      url: decodeURIComponent(req.body.url + ""),
      userId: req.body.userId,
      pageHeaders: req.body.pageHeaders,
      authed: req.body.authed,
    });

    res.send(JSON.stringify(data));
  } catch (e) {
    console.error(e);
    next();
  }
};

export { crawl };

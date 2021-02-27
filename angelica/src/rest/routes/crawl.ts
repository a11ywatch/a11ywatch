import { crawlWebsite } from "@app/core/controllers";
import { log } from "@a11ywatch/log";

const crawl = async (req, res, next) => {
  try {
    const data = await crawlWebsite({
      url: decodeURIComponent(req.body.url + ""),
      userId: req.body.userId,
      pageHeaders: req.body.pageHeaders,
    });

    res.json(data);
  } catch (e) {
    log(e?.message, { type: "error" });
    next();
  }
};

export { crawl };

import { adjustScript, editScript } from "@app/core/controllers";
import { log } from "@a11ywatch/log";

const setScripts = async (req, res, next) => {
  const { editScript: edit, url, userId, script, newScript } = req.body;

  try {
    const data = await (edit ? editScript : adjustScript)(
      Object.assign(
        {},
        {
          url: decodeURIComponent(url + ""),
          userId,
          script,
          newScript,
        }
      )
    );

    res.json(data);
  } catch (e) {
    log(e, { type: "error" });
    next();
  }
};

export { setScripts };

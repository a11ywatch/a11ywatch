import { adjustScript, editScript } from "@app/core/controllers";

const setScripts = async (req, res, next) => {
  try {
    const { editScript: edit, url, userId, script, newScript } = req.body;

    const data = await (edit ? editScript : adjustScript)(
      Object.assign(
        {},
        {
          url: decodeURIComponent(url + ""),
          userId,
          script,
          newScript,
        },
        edit ? {} : { newScript }
      )
    );

    res.send(JSON.stringify(data));
  } catch (e) {
    console.error(e);
    next();
  }
};

export { setScripts };

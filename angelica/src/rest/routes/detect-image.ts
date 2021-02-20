import { detectImageModel } from "@app/core/ai";
import { log } from "@a11ywatch/log";

const detectImage = async (req, res, next) => {
  try {
    const data = await detectImageModel({
      img: req.body.img,
    });

    res.json(data);
  } catch (e) {
    log(e, { type: "error" });
    next();
  }
};

export { detectImage };

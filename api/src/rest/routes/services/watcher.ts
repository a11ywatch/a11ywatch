import { UsersController } from "@app/core/controllers";
import { getUser, usageExceededThreshold } from "@app/core/utils";
import { imageDetect } from "@app/core/external";
import { TOKEN_EXPIRED_ERROR, RATE_EXCEEDED_ERROR } from "@app/core/strings";

const detectImage = async (req, res) => {
  const img = req.body?.imageBase64;

  if (!img) {
    res.json({
      data: null,
      status: 400,
      message: "IMAGE NOT FOUND",
      success: false,
    });
    return;
  }

  const user = getUser(req.headers?.authorization);

  if (!user) {
    res.json({
      data: null,
      status: 400,
      message: req.headers?.authorization
        ? TOKEN_EXPIRED_ERROR
        : "USER NOT FOUND",
      success: false,
    });
    return;
  }

  const { keyid, audience } = user?.payload;
  const [userData] = await UsersController({
    user,
  }).updateApiUsage({ id: keyid }, true);

  if (
    usageExceededThreshold({ audience, usage: userData?.apiUsage?.usage || 0 })
  ) {
    res.json({
      data: null,
      status: 17,
      message: RATE_EXCEEDED_ERROR,
      success: false,
    });
    return;
  }

  let data = { status: false };

  try {
    data = await imageDetect({ img });
  } catch (e) {
    console.error(e);
  }

  res.json(data);
};

export { detectImage };

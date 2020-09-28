/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { connect } from "@app/database";

export const FeaturesController = ({ user } = { user: null }) => ({
  getFeature: async ({ userId, feature }: any, chain: boolean) => {
    const target = feature ? { feature } : { userId };
    const [collection] = await connect("Features");
    const issue = await collection.findOne(target);

    return chain ? [issue, collection] : feature;
  },
  getFeatures: async (): Promise<any[]> => {
    const [collection] = await connect("Features");
    return await collection.find().limit(20).toArray();
  },
  initFeatures: async (features: any[] = []): Promise<boolean> => {
    const [collection] = await connect("Features");

    if (features?.length) {
      await collection.deleteMany();
      await collection.insertMany(features);
      return true;
    }
    return false;
  },
});

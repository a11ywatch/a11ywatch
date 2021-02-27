export const getLastItemInCollection = async (
  collection: any,
  searchBy: any
) => {
  return await collection
    .find({ [searchBy]: searchBy })
    .sort({ _id: -1 })
    .limit(1)
    .toArray();
};

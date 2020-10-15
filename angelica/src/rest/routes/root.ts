const root = (req, res) => {
  res.json({
    server_status: "online",
  });
};
export { root };

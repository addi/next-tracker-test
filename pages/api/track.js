export default (req, res) => {
  console.log(req.body.path);

  res.status(200).end();
};

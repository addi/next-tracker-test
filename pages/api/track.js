import ua from "universal-analytics";

export default (req, res) => {
  const visitor = ua("UA-8852949-7");

  var ip =
    (req.headers["x-forwarded-for"] || "").split(",").pop().trim() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  visitor.pageview(
    {
      documentPath: req.body.path,
      ipOverride: ip,
    },
    function (err) {
      res.status(200).send({ done: true });
    }
  );
};

import ua from "universal-analytics";

const anonymizeIp = (ip) => {
  const ipSplitter = ip.includes(":") ? ":" : ".";

  const ipBits = ip.split(ipSplitter);

  ipBits[ipBits.lenth - 1] = "1";

  return ipBits.join(ipSplitter);
};

export default (req, res) => {
  const visitor = ua("UA-8852949-7", req.body.sID);

  const ip =
    (req.headers["x-forwarded-for"] || "").split(",").pop().trim() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  const anonymizedIp = anonymizeIp(ip);

  visitor.pageview(
    {
      documentPath: req.body.path,
      ipOverride: anonymizedIp,
      userAgentOverride: req.headers["user-agent"],
    },
    function (err) {
      res.status(200).send({});
    }
  );
};

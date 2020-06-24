import ua from "universal-analytics";

const settings = {
  googleAnalyticsAccountId: "UA-8852949-7",
  sendSessionId: true,
  sendIp: true,
  anonymizeIp: true,
  sendUserAgent: true,
  sendScreenResolution: false,
};

export default (req, res) => {
  const anonymizeIp = (ip) => {
    const ipSplitter = ip.includes(":") ? ":" : ".";

    const ipBits = ip.split(ipSplitter);

    ipBits[ipBits.length - 1] = "1";

    return ipBits.join(ipSplitter);
  };

  const sID = settings.sendSessionId ? req.body.sessionId : undefined;

  const visitor = ua(settings.googleAnalyticsAccountId, sID);

  const clientIp =
    (req.headers["x-forwarded-for"] || "").split(",").pop().trim() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  var params = {
    documentPath: req.body.path,
    documentReferrer: req.body.referrer,
  };

  if (settings.sendIp) {
    params["ipOverride"] = settings.anonymizeIp
      ? anonymizeIp(clientIp)
      : clientIp;
  }

  if (settings.sendUserAgent) {
    params["userAgentOverride"] = req.headers["user-agent"];
  }

  if (settings.sendScreenResolution) {
    params["screenResolution"] = req.body.screenResolution;
  }

  visitor.pageview(params, function (err) {
    res.status(200).send({});
  });
};

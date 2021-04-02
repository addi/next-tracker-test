import serverSideTracking from "next-backend-analytics/serverSideTracking";

export default (req, res) => {
  serverSideTracking(req, res, "UA-8852949-7");
};

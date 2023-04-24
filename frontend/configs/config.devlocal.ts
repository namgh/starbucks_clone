import getConfigs from "./config.common";

// backend 서버 URL
const baseUrl = "https://10.10.10.205:8080";
const mode = "devlocal";

const configDev = getConfigs({
  baseUrl,
  mode,
});

export default configDev;

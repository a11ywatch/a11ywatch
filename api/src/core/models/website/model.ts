// TODO: ADD TYPES
const WebsiteModel = {
  userId: -1,
  id: 0,
  url: "",
  domain: "",
  adaScore: null,
  cdnConnected: false,
  html: "",
  htmlIncluded: false,
  pageLoadTime: {
    duration: 0,
    durationFormated: "",
    color: "",
  },
  issuesInfo: {
    issuesFixedByCdn: 0,
    possibleIssuesFixedByCdn: 0,
    totalIssues: 0,
  },
  issues: [],
  lastScanDate: new Date().toUTCString(),
  pageHeaders: null,
  online: null,
};

interface Params {
  url: string;
  domain: string;
}

const makeWebsite = (
  { url, domain }: Params = { url: "", domain: "" }
): any => {
  return Object.assign({}, WebsiteModel, {
    url,
    domain,
    lastScanDate: new Date().toUTCString(),
  });
};

export { WebsiteModel, makeWebsite };

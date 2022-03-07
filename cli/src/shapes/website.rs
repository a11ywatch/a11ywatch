use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Issue {
    pub code: String,
    pub typeCode: u32,
    pub context: String,
    pub message: String,
    pub selector: String,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct IssuesInfo {
    pub totalIssues: u32,
    pub possibleIssuesFixedByCdn: u32,
    pub issuesFixedByCdn: u32,
    pub errorCount: u32,
    pub warningCount: u32,
    pub limitedCount: u32,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Website {
    pub url: String,
    pub domain: String,
    pub issuesInfo: IssuesInfo,
    pub adaScore: u32,
    pub issue: Vec<Issue>,
    pub screenshot: String,
    pub screenshotStill: String
}
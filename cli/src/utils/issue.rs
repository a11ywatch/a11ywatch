use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone, Default)]
pub struct RunnerExtras {
    pub description: String,
    pub impact: String,
    #[serde(rename = "helpUrl")]
    pub help_url: String
}

#[derive(Serialize, Deserialize, Debug, Clone, Default)]
pub struct Issue {
    pub code: String,
    pub context: String,
    #[serde(rename = "type")]
    pub issue_type: String,
    #[serde(rename = "typeCode")]
    pub type_code: i32,
    pub message: String,
    pub selector: String,
    pub runner: String,
    pub recurrence: i32,
    #[serde(rename = "runnerExtras")]
    pub runner_extras: Option<RunnerExtras>
}

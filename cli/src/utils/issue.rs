use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone, Default)]
pub struct RunnerExtras {
    pub description: String,
    pub impact: String,
    #[serde(rename = "helpUrl")]
    pub help_url: String,
}

#[derive(Serialize, Deserialize, Debug, Clone, Default)]
/// the cordinates of the element
pub struct Clip {
  /// the x cordinate on screen
  x: Option<i32>,
  /// the y cordinate on screen
  y: Option<i32>,
  /// the width of the element
  width: Option<i32>,
  /// the height of the element
  height: Option<i32>,
}

#[derive(Serialize, Deserialize, Debug, Clone, Default)]
/// the web accessibility issue
pub struct Issue {
    /// the issue code guideline
    pub code: String,
    /// the context of the issue of code
    pub context: String,
    /// the type of issue error, warning, notice
    #[serde(rename = "type")]
    pub issue_type: String,
    #[serde(rename = "typeCode")]
    pub type_code: i32,
    /// the human readable message
    pub message: String,
    /// the CSS selector of the element
    pub selector: String,
    /// the accessibility runner used
    pub runner: String,
    /// the amount of times the issue happened
    pub recurrence: u32,
    #[serde(rename = "runnerExtras")]
    pub runner_extras: Option<RunnerExtras>,
    #[cfg(not(feature = "litemode"))]
    #[serde(rename = "clipBase64")]
    /// the image of the element on the website as base64 unage
    pub clip_base_64: Option<String>,
    #[cfg(not(feature = "litemode"))]
    /// the position of the element
    pub clip: Option<Clip>,
}

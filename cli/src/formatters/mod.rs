pub mod body;

pub(crate) use self::body::{
    format_body, results_issues_count, results_issues_errors_count, results_issues_warnings_count,
    results_to_string, results_to_string_github,
};

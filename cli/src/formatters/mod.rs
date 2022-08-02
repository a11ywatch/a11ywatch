pub mod body;

pub(crate) use self::body::{
    format_body, format_github_body, results_issues_count, results_issues_errors_count,
    results_issues_warnings_count, results_list_to_string, results_to_string,
    results_to_string_github,
};

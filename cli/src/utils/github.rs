use std::env;

/// a small function to get the projects github api url across CircleCI or Github Actions
pub fn get_api() -> String {
    let mut github_repo_name = String::new();
    let mut circleci_repo_name = String::new();
    let mut project_user_name = String::new();
    let mut project_branch_name = String::new();

    for (n, v) in env::vars() {
        if n == "CIRCLE_PROJECT_USERNAME" || n == "GITHUB_REPOSITORY_OWNER" {
            project_user_name = v.to_string();
        }
        if n == "CIRCLE_BRANCH" || n == "GITHUB_HEAD_REF" {
            project_branch_name = v.to_string();
        }
        if n == "CIRCLE_PROJECT_REPONAME" {
            circleci_repo_name = v.to_string();
        }
        if n == "GITHUB_REPOSITORY" {
            github_repo_name = v.to_string();
        }
    }

    let project_repo_name = if !github_repo_name.is_empty() {
        github_repo_name
    } else {
        format!("{}/{}", project_user_name, circleci_repo_name)
    }
    .to_string();

    format!(
        "https://api.github.com/repos/{}/pulls?head={}:{}&state=open",
        project_repo_name, project_user_name, project_branch_name
    )
}

// format results to send a basic message on github
pub fn format_results(results: String) -> String {
    let mut report_message =
        String::from("<details><summary>A11yWatch testing results</summary><br>");

    report_message.push_str(&format!(
        r#"

```
{}
```

"#,
        &results
    ));
    report_message.push_str("</details>");

    report_message
}

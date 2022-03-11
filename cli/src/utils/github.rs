use std::env;

pub fn get_api() -> String {
    // determine which ci by default
    let mut github_repo_name: String = "".to_string();
    let mut circleci_repo_name: String = String::from("");

    let mut project_user_name: String = String::from("");
    let mut project_branch_name: String = String::from("");

    for (n,v) in env::vars() {
        // CIRCLE CI
        if n == "CIRCLE_PROJECT_USERNAME" {
            project_user_name = v.to_string();
        }
        if n == "CIRCLE_PROJECT_REPONAME" {
            circleci_repo_name = v.to_string();
        }
        if n == "CIRCLE_BRANCH" {
            project_branch_name = v.to_string();
        }
        // GITHUB
        if n == "GITHUB_REPOSITORY_OWNER" {
            project_user_name = v.to_string();
        }
        if n == "GITHUB_HEAD_REF" {
            project_branch_name = v.to_string();
        }
        if n == "GITHUB_REPOSITORY" {
            github_repo_name = v.to_string();
        }
    }
    
    let project_repo_name: String = if !github_repo_name.is_empty() {
        github_repo_name
    } else {
        format!("{}/{}", project_user_name, circleci_repo_name)
    }.to_string();

    format!("https://api.github.com/repos/{}/pulls?head={}:{}&state=open", 
        project_repo_name,
        project_user_name, 
        project_branch_name)
}
use std::env;

pub fn get_api() -> String {
    let mut project_user_name: String = String::from("");
    let mut project_repo_name: String = String::from("");
    let mut project_branch_name: String = String::from("");

    for (n,v) in env::vars() {
        if n == "CIRCLE_PROJECT_USERNAME" || n == "GITHUB_REPOSITORY_OWNER" {
            project_user_name = v.to_string();
        }
        if n == "CIRCLE_PROJECT_REPONAME" || n == "GITHUB_REPOSITORY" {
            project_repo_name = v.to_string();
        }
        if n == "CIRCLE_BRANCH" || n == "GITHUB_REF_NAME"{
            project_branch_name = v.to_string();
        }
    }

    let api_endpoints = format!("https://api.github.com/repos/{}/{}/pulls?head={}:{}&state=open", 
        &project_user_name, &project_repo_name, project_user_name, &project_branch_name);

    api_endpoints
}
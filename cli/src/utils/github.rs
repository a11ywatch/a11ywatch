use std::env;

pub fn get_api() -> String {
    // determine which ci by default
    let mut github_repo_name: String = String::from("");
    let mut circleci_repo_name: String = String::from("");

    let mut project_user_name: String = String::from("");
    let mut project_branch_name: String = String::from("");

    for (n,v) in env::vars() {
        if n == "CIRCLE_PROJECT_USERNAME" || n == "GITHUB_REPOSITORY_OWNER" {
            project_user_name = v.to_string();
        }
        if n == "CIRCLE_PROJECT_REPONAME" {
            circleci_repo_name = v.to_string();
        }
        if n == "CIRCLE_BRANCH" {
            project_branch_name = v.to_string();
        }
        if n == "GITHUB_REF_NAME" {
            project_branch_name = v.to_string().replace("refs/heads/", "");
        }
        if n == "GITHUB_REPOSITORY" {
            github_repo_name = v.to_string();
        }
    }
    
    let project_repo_name: String;

    if !github_repo_name.is_empty() {
        project_repo_name = github_repo_name.to_string();
    } else {
        project_repo_name = format!("{}/{}", &project_user_name, &circleci_repo_name);
    }

    String::from(format!("https://api.github.com/repos/{}/pulls?head={}:{}&state=open", 
        &project_repo_name,
        &project_user_name, 
        &project_branch_name))
}
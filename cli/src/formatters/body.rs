use crate::fs::temp::TempFs;
use crate::utils::Website;
use serde_json::{from_str, from_value, json, Value};
use std::io::Write;
use std::str;

/// read json results to string
pub(crate) fn results_to_string(file_manager: &TempFs) -> String {
    let file_results: String = file_manager.read_results();

    if !file_results.is_empty() {
        let v: Value = from_str(&file_results).unwrap();
    
        v.to_string()
    } else {
        file_results
    }
}

/// read github html format message
pub(crate) fn results_to_string_github(file_manager: &TempFs) -> String {
    let file_results: String = file_manager.read_results_github();

    if !file_results.is_empty() {
        let v: Value = from_str(&file_results).unwrap();
    
        v.to_string()
    } else {
        file_results
    }
}

pub(crate) fn results_to_value(file_manager: &TempFs) -> Value {
    let file_results: String = file_manager.read_results();
    let v: Value = from_str(&file_results).unwrap();

    v
}

// the amount of total errors and warnings for the page from prev scan
pub(crate) fn results_issues_count(file_manager: &TempFs) -> usize {
    let (total, _errors, _warnings): (usize, usize, usize) = extract_issues_count(&file_manager);

    total
}

// the amount of total errors and warnings for the page from prev scan
pub(crate) fn results_issues_errors_count(file_manager: &TempFs) -> usize {
    let (_total, errors, _warnings): (usize, usize, usize) = extract_issues_count(&file_manager);

    errors
}

// the amount of total warnings and warnings for the page from prev scan
pub(crate) fn results_issues_warnings_count(file_manager: &TempFs) -> usize {
    let (_total, _errors, warnings): (usize, usize, usize) = extract_issues_count(&file_manager);

    warnings
}

/// returns the total errors,warnings combined and seperate as a tuple (total,errors,warnings). [notices type not current used]
pub(crate) fn extract_issues_count(file_manager: &TempFs) -> (usize, usize, usize) {
    let json_data = results_to_value(&file_manager);
    let data = &json_data["data"];
    let mut error_count: usize = 0;
    let mut warning_count: usize = 0;

    // loop through stream until and extract all valid content.
    if data.is_array() {
        let pages = data.as_array().unwrap();

        for page in pages {
            let errors = &page["issuesInfo"]["errorCount"];
            let errors: usize = format!("{}", errors).parse().unwrap();
            let warnings = &page["issuesInfo"]["warningCount"];
            let warnings: usize = format!("{}", warnings).parse().unwrap();

            error_count += errors;
            warning_count += warnings;
        }
    }

    if data.is_object() {
        let errors = &data["issuesInfo"]["errorCount"];
        let errors: usize = format!("{}", errors).parse().unwrap();
        let warnings = &data["issuesInfo"]["warningCount"];
        let warnings: usize = format!("{}", warnings).parse().unwrap();

        error_count += errors;
        warning_count += warnings;
    }

    (error_count + warning_count, error_count, warning_count)
}


/// Get urls total urls with errors for each url
pub(crate) fn get_report_url_errors(file_manager: &TempFs) -> String {
    let json_data = results_to_value(&file_manager);
    let data = &json_data["data"];
    
    // let mut error_count: usize = 0;
    let mut url_count: usize = 0; // amount of urls
    let mut pages_passed: usize = 0; // pages passed the scan

    let mut url_list = String::from(""); // list of reports

    // loop through stream until and extract all valid content.
    if data.is_array() {
        let pages = data.as_array().unwrap();

        url_count = pages.len();

        for page in pages {
            let errors = &page["issuesInfo"]["errorCount"];
            let errors: usize = format!("{}", errors).parse().unwrap();
            let s = if errors == 1 {
                ""
            } else {
                "s"
            };
            url_list.push_str(&format!("{} - {} error{s}\n", &page["url"].as_str().unwrap_or_default(), &errors));

            if errors == 0 {
                pages_passed += 1;
            }
            // error_count += errors;
        }
    }

    let fail_pass = if pages_passed == url_count {
        "✔"
    } else {
        "x"
    };

    format!("Ran A11yWatch on {url_count} URLs:\n\n{url_list}\n{fail_pass} {pages_passed}/{url_count} URLs passed")
}

// format the body for sending to github. Handles multi page and single page reports.
pub(crate) fn format_body(file_manager: &TempFs, save: bool) -> Value {
    let v: Value = results_to_value(file_manager);
    let data = &v["data"];
    let title: String;
    let (count, errors, warnings) = extract_issues_count(file_manager);

    let seperator = |v| if v == 1 { "" } else { "s" }.to_string();

    if data.is_array() {
        let pages = data.as_array().unwrap();
        let mut w = Vec::new();

        let first_page: Website = from_value(pages[0].clone()).unwrap();

        // get the top level domain for the pages
        let domain = &first_page.domain;
        title = format!(
            "# {} total issue{}, {} error{}, and {} warning{} found for {}",
            &count,
            seperator(count),
            &errors,
            seperator(errors),
            &warnings,
            seperator(warnings),
            &domain
        );

        writeln!(&mut w).unwrap();
        writeln!(&mut w, "{}", title).unwrap();
        writeln!(&mut w, "<details>").unwrap();
        writeln!(&mut w, "<summary>").unwrap();
        writeln!(&mut w, "Details").unwrap();
        writeln!(&mut w, "</summary>").unwrap();
        writeln!(&mut w, "<br>").unwrap();

        for page in pages {
            let website: Website = from_value(page.to_owned()).unwrap();
            let website_url = &website.url;
            let issues = website.issues.unwrap_or_default();

            let issues_length = issues.len();

            let seperator = if issues_length == 1 { "" } else { "s" }.to_string();

            writeln!(&mut w).unwrap();
            writeln!(&mut w, "<details>").unwrap();
            writeln!(&mut w, "<summary>").unwrap();
            writeln!(
                &mut w,
                "{} - {} issue{}",
                &website_url, &issues_length, seperator
            )
            .unwrap();
            writeln!(&mut w, "</summary>").unwrap();
            writeln!(&mut w, "<br>").unwrap();

            for issue in issues {
                writeln!(
                    &mut w,
                    "<strong>{}</strong> <em>{}</em>",
                    issue.issue_type.to_uppercase(),
                    issue.code
                )
                .unwrap();
                writeln!(&mut w, "").unwrap();
                writeln!(&mut w, "```html").unwrap();
                writeln!(&mut w, "{}", issue.context.trim_end()).unwrap();
                writeln!(&mut w, "```").unwrap();
                writeln!(&mut w, "").unwrap();
                writeln!(&mut w, "{}", issue.message).unwrap();
                writeln!(&mut w).unwrap();
                writeln!(&mut w, "---").unwrap();
                writeln!(&mut w).unwrap();
            }

            writeln!(&mut w, "</details>").unwrap();
            writeln!(&mut w, "").unwrap();
            writeln!(&mut w, "---").unwrap();
            writeln!(&mut w, "").unwrap();
        }

        writeln!(&mut w, "</details>").unwrap();
        writeln!(&mut w, "").unwrap();

        write!(&mut w, "[📝 docs](https://docs.a11ywatch.com) | ").unwrap();
        write!(
            &mut w,
            "[:octocat: repo](https://github.com/A11yWatch/a11ywatch) | "
        )
        .unwrap();
        write!(
            &mut w,
            "[🙋🏽‍♀️ issues](https://github.com/A11yWatch/a11ywatch/issues) | "
        )
        .unwrap();
        write!(&mut w, "[🏪 marketplace](https://github.com/marketplace/actions/a11ywatch-the-accessibility-suite) | ").unwrap();
        write!(&mut w, "[A11yWatch](https://a11ywatch.com)").unwrap();

        writeln!(&mut w, "").unwrap();
        writeln!(&mut w, "").unwrap();

        let body = str::from_utf8(&w).unwrap();

        // truncate the message
        let json = if body.chars().count() > 65536 {
            let mut b = body.to_owned();
            b.insert_str(
                title.chars().count() + 1,
                "\n<p>This list exceeds 65536 chars and is truncated...</p>\n",
            );
            b.truncate(65520);

            json!({
                "body": b,
            })
        } else {
            json!({
                "body": body,
            })
        };

        if save {
            file_manager.save_github_results(&json).unwrap_or_default();
        }

        json
    } else {
        let website: Website = from_value(data.to_owned()).unwrap();
        let domain = &website.domain;
        let issues = website.issues.unwrap_or_default();

        title = format!(
            "# {} total issue{}, {} error{}, and {} warning{} found for {}",
            &count,
            seperator(count),
            &errors,
            seperator(errors),
            &warnings,
            seperator(warnings),
            &domain
        );

        let mut w = Vec::new();
        writeln!(&mut w).unwrap();
        writeln!(&mut w, "{}", title).unwrap();
        writeln!(&mut w, "<details>").unwrap();
        writeln!(&mut w, "<summary>").unwrap();
        writeln!(&mut w, "Details").unwrap();
        writeln!(&mut w, "</summary>").unwrap();
        writeln!(&mut w, "<br>").unwrap();

        for issue in issues {
            writeln!(&mut w, "<br>").unwrap();
            writeln!(
                &mut w,
                "<strong>{}</strong> <em>{}</em>",
                issue.issue_type.to_uppercase(),
                issue.code
            )
            .unwrap();
            writeln!(&mut w, "").unwrap();
            writeln!(&mut w, "```html").unwrap();
            writeln!(&mut w, "{}", issue.context.trim_end()).unwrap();
            writeln!(&mut w, "```").unwrap();
            writeln!(&mut w, "").unwrap();
            writeln!(&mut w, "{}", issue.message).unwrap();
            writeln!(&mut w).unwrap();
            writeln!(&mut w, "---").unwrap();
            writeln!(&mut w).unwrap();
        }

        writeln!(&mut w, "</details>").unwrap();
        writeln!(&mut w, "").unwrap();
        writeln!(&mut w, "---").unwrap();
        writeln!(&mut w, "").unwrap();

        write!(&mut w, "[📝 docs](https://docs.a11ywatch.com) | ").unwrap();
        write!(
            &mut w,
            "[:octocat: repo](https://github.com/A11yWatch/a11ywatch) | "
        )
        .unwrap();
        write!(
            &mut w,
            "[🙋🏽‍♀️ issues](https://github.com/A11yWatch/a11ywatch/issues) | "
        )
        .unwrap();
        write!(&mut w, "[🏪 marketplace](https://github.com/marketplace/actions/a11ywatch-the-accessibility-suite) | ").unwrap();
        write!(&mut w, "[A11yWatch](https://a11ywatch.com)").unwrap();

        writeln!(&mut w, "").unwrap();
        writeln!(&mut w, "").unwrap();

        let body = str::from_utf8(&w).unwrap();

        // truncate the message
        let json = if body.chars().count() > 65536 {
            let mut b = body.to_owned();
            b.insert_str(
                title.chars().count() + 1,
                "\n<p>This list exceeds 65536 chars and is truncated...</p>\n",
            );
            b.truncate(65520);

            json!({
                "body": b,
            })
        } else {
            json!({
                "body": body,
            })
        };

        if save {
            file_manager.save_github_results(&json).unwrap_or_default();
        }

        json
    }
}

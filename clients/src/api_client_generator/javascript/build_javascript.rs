use std::fs::{File, create_dir};
use std::io::Write;
use std::path::Path;

/// generate fetch wrapper
pub fn generate_fetch() -> &'static str {
    &"
    /**
     * fetch wrapper that handles authorization returning json
     * @param {string} path The API endpoint pathname without a starting slash.
     * @returns {Promise<{data: any, status: number, message: string}>} Returns a standard REST API response.
     */
    export const request = async (path: string) => {
        // @ts-ignore
        const token = typeof process !== 'undefined' ? process.env.A11YWATCH_TOKEN : window.A11YWATCH_TOKEN
        let data
        
        try {
            data = await fetch(`https://api.a11ywatch.com/${path}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            if (data && data.ok) {
                data = await data.json()
            }
         } catch(e) {
             console.error(e)
         }

         return data
    }
"
}

/// build the javascript src files and distrubition
pub fn build_javascript() {
    println!("building js client...");
    let dist_dir = "./src/api_client_generator/javascript/dist";

    if !Path::new(&dist_dir).exists() {
        create_dir(dist_dir).unwrap();
    }

    let mut file = File::create(format!("{}/fetcher.ts", dist_dir)).unwrap();
    file.write_all(&generate_fetch().as_bytes()).unwrap();
}
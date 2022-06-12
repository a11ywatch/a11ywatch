/// generate fetch wrapper
pub fn generate_request() -> &'static str {
    &r#"
/**
 * fetch wrapper that handles authorization returning json
 * @param {string} path The API endpoint pathname without a starting slash.
 * @param {Record<string, any>} params on the body.
 * @param {any} options for the config fetch like method: POST.
 * @returns {Promise<{data: any, status: number, message: string}>} Returns a standard REST API response.
 */
export const request = async (path: string, params?: Record<string, any>, options?: RequestInit, token?: string) => {
    let data
    
    try {
        data = await fetch(`https://api.a11ywatch.com/${path}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: params && typeof params === "object" ? JSON.stringify(params) : null
        })
        if (data && data.ok) {
            data = await data.json()
        }
    } catch(e) {
        console.error(e)
    }

    return data
}
"#.trim_start()
}

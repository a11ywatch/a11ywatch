use super::install::assure_module_exist;
use crate::Issue;
use serde_json::Value;
use std::fs::File;
use std::io::Read;
use std::io::Write;
use std::path::Path;
use std::process::Command;
use std::collections::HashMap;

const RECCOMENDATION: &str = "Recommendation:";
const MATCH_ALT: &str = "Recommendation: change alt to ";
const MATCH_BACKGROUND: &str = "Recommendation: change background to ";
const MATCH_TEXT_COLOR: &str = "Recommendation: change text colour to ";

const PROPERTY_MATCHERS: [(&'static str, &'static str); 3] = [
    (MATCH_BACKGROUND, "background"),
    (MATCH_TEXT_COLOR, "color"),
    (MATCH_ALT, "alt")
];

/// determine if project is react
pub fn determine_react_project() -> bool{
    let rg_command = Command::new("rg")
        .args([r#""react":"#, "package.json"])
        .output()
        .expect("Failed to execute ripgrep replace");
    let stdout = String::from_utf8(rg_command.stdout).unwrap();

    !stdout.is_empty()
}

/// determine actual fix for code. Returns empty string if no matchers found.
pub fn establish_context(context: String, rec: &str, react_project: bool) -> String {
    let replace_context: String;

    match PROPERTY_MATCHERS {
        [.., (des, value)] if rec.starts_with(&(*des)) => {
            let v = &rec.replace(des, "");
            let val = format!(r#"{value}="#);
            let value_index = context.find(&val).unwrap_or(0);
            let mut exact_value: String = String::from("");

            if value_index != 0 {
                for (i, c) in context[value_index..].chars().enumerate() {
                    exact_value.push(c);
                    let mut string_index = if value == "alt" {
                        0
                    } else {
                        1
                    };
                    let mut first_str = exact_value.get(..string_index).unwrap_or_default();
                    while first_str.is_empty() {
                        string_index = string_index + 1;
                        first_str = exact_value.get(..string_index).unwrap_or_default();
                    };
                    if i != 0 && c.to_string() == first_str {
                        break;
                    }
                }
            }

            replace_context = if !exact_value.is_empty() {
                let q = exact_value.chars().last().unwrap();
                let target_value = if value == "alt" {
                    format!(r#"{value}={q}{v}{q}"#)
                } else {
                    if react_project {
                        format!(r#"{value}:{q}{v}{q}"#)
                    } else {
                        format!(r#"{value}:{q}{v}{q};"#)
                    }
                };
                context.replace(&format!("{exact_value}"), &target_value)
            } else {
                let target_value = if value == "alt" {
                    format!(r#"{context} {value}="{v}""#)
                } else {
                    if react_project {
                        format!(r#"{context} style={{ "{value}": "{v}" }}"#)
                    } else {
                        // TODO: check if style in context to append.
                        format!(r#"{context} style="{value}: {v};""#)
                    }
                };

                target_value
            };
        }
        _ => {
            replace_context = String::from("");
        }
    };
    
    replace_context
}

/// convert props to react
pub fn convert_props_react(ctx: String) -> String {    
    let mut context = ctx.clone();

    lazy_static! {
        /// html static list of properties that convert to camel case
        static ref HTML_PROPS: HashMap<&'static str, &'static str> = HashMap::from([
            // special attributes
            ("for", "htmlFor"),
            ("class", "className"),
            // end of special
            ("acceptcharset", "acceptCharset"),
            ("accesskey", "accessKey"),
            ("allowfullscreen", "allowFullScreen"),
            ("allowtransparency", "allowTransparency"),
            ("autocomplete", "autoComplete"),
            ("autofocus", "autoFocus"),
            ("autoplay", "autoPlay"),
            ("cellpadding", "cellPadding"),
            ("cellspacing", "cellSpacing"),
            ("charset", "charSet"),
            ("classid", "classID"),
            ("classname", "className"),
            ("colspan", "colSpan"),
            ("contenteditable", "contentEditable"),
            ("contextmenu", "contextMenu"),
            ("crossorigin", "crossOrigin"),
            ("datetime", "dateTime"),
            ("enctype", "encType"),
            ("formaction", "formAction"),
            ("formenctype", "formEncType"),
            ("formmethod", "formMethod"),
            ("formnovalidate", "formNoValidate"),
            ("formtarget", "formTarget"),
            ("frameborder", "frameBorder"),
            ("hreflang", "hrefLang"),
            ("htmlfor", "htmlFor"),
            ("httpequiv", "httpEquiv"),
            ("inputmode", "inputMode"),
            ("keyparams", "keyParams"),
            ("keytype", "keyType"),
            ("marginheight", "marginHeight"),
            ("marginwidth", "marginWidth"),
            ("maxlength", "maxLength"),
            ("mediagroup", "mediaGroup"),
            ("minlength", "minLength"),
            ("novalidate", "noValidate"),
            ("radiogroup", "radioGroup"),
            ("readonly", "readOnly"),
            ("rowspan", "rowSpan"),
            ("spellcheck", "spellCheck"),
            ("srcdoc", "srcDoc"),
            ("srclang", "srcLang"),
            ("srcset", "srcSet"),
            ("tabindex", "tabIndex"),
            ("usemap", "useMap"),
            // "accentheight",
            // "alignmentbaseline",
            // "allowreorder",
            // "arabicform",
            // "attributename",
            // "attributetype",
            // "autoreverse",
            // "azimuth",
            // "basefrequency",
            // "baseprofile",
            // "baselineshift",
            // "calcmode",
            // "capheight",
            // "clippath",
            // "clippathunits",
            // "cliprule",
            // "colorinterpolation",
            // "colorinterpolationfilters",
            // "colorprofile",
            // "colorrendering",
            // "contentscripttype",
            // "contentstyletype",
            // "diffuseconstant",
            // "dominantbaseline",
            // "edgemode",
            // "enablebackground",
            // "externalresourcesrequired",
            // "fillopacity",
            // "fillrule",
            // "filterres",
            // "filterunits",
            // "floodcolor",
            // "floodopacity",
            // "focusable",
            // "fontfamily",
            // "fontsize",
            // "fontsizeadjust",
            // "fontstretch",
            // "fontstyle",
            // "fontvariant",
            // "fontweight",
            // "glyphname",
            // "glyphorientationhorizontal",
            // "glyphorientationvertical",
            // "glyphref",
            // "gradienttransform",
            // "gradientunits",
            // "horizadvx",
            // "horizoriginx",
            // "ideographic",
            // "imagerendering",
            // "kernelmatrix",
            // "kernelunitlength",
            // "keypoints",
            // "keysplines",
            // "keytimes",
            // "lengthadjust",
            // "letterspacing",
            // "lightingcolor",
            // "limitingconeangle",
            // "markerend",
            // "markerheight",
            // "markermid",
            // "markerstart",
            // "markerunits",
            // "markerwidth",
            // "maskcontentunits",
            // "maskunits",
            // "mathematical",
            // "numoctaves",
            // "overlineposition",
            // "overlinethickness",
            // "paintorder",
            // "panose1",
            // "pathlength",
            // "patterncontentunits",
            // "patterntransform",
            // "patternunits",
            // "pointerevents",
            // "pointsatx",
            // "pointsaty",
            // "pointsatz",
            // "preservealpha",
            // "preserveaspectratio",
            // "primitiveunits",
            // "refx",
            // "refy",
            // "renderingintent",
            // "repeatcount",
            // "repeatdur",
            // "requiredextensions",
            // "requiredfeatures",
            // "shaperendering",
            // "specularconstant",
            // "specularexponent",
            // "spreadmethod",
            // "startoffset",
            // "stddeviation",
            // "stitchtiles",
            // "stopcolor",
            // "stopopacity",
            // "strikethroughposition",
            // "strikethroughthickness",
            // "strokedasharray",
            // "strokedashoffset",
            // "strokelinecap",
            // "strokelinejoin",
            // "strokemiterlimit",
            // "strokeopacity",
            // "strokewidth",
            // "surfacescale",
            // "systemlanguage",
            // "tablevalues",
            // "targetx",
            // "targety",
            // "textanchor",
            // "textdecoration",
            // "textlength",
            // "textrendering",
            // "underlineposition",
            // "underlinethickness",
            // "unicodebidi",
            // "unicoderange",
            // "unitsperem",
            // "valphabetic",
            // "vhanging",
            // "videographic",
            // "vmathematical",
            // "vectoreffect",
            // "vertadvy",
            // "vertoriginx",
            // "vertoriginy",
            // "viewbox",
            // "viewtarget",
            // "wordspacing",
            // "writingmode",
            // "xchannelselector",
            // "xheight",
            // "xlinkactuate",
            // "xlinkarcrole",
            // "xlinkhref",
            // "xlinkrole",
            // "xlinkshow",
            // "xlinktitle",
            // "xlinktype",
            // "xmlnsxlink",
            // "xmlbase",
            // "xmllang",
            // "xmlspace",
            // "ychannelselector",
            // "zoomandpan",
            // "onabort",
            // "onanimationend",
            // "onanimationiteration",
            // "onanimationstart",
           ( "onblur", "onBlur"),
            // "oncanplay",
            // "oncanplaythrough",
            ("onchange", "onChange"),
            ("onclick", "onClick"),
            // "oncompositionend",
            // "oncompositionstart",
            // "oncompositionupdate",
            // "oncontextmenu",
            ("oncopy", "onCopy"),
            ("oncut", "onCut"),
            ("ondoubleclick", "onDoubleClick"),
            ("ondrag", "onDrag"),
            ("ondragend", "onDragEnd"),
            ("ondragenter", "onDragEnter"),
            ("ondragexit", "onDragExit"),
            ("ondragleave", "onDragLeave"),
            ("ondragover", "onDragOver"),
            ("ondragstart", "onDragStart"),
            ("ondrop", "onDrop"),
            // "ondurationchange",
            // "onemptied",
            // "onencrypted",
            // "onended",
            ("onerror", "onError"),
            ("onfocus", "onFocus"),
            ("oninput", "onInput"),
            ("onkeydown", "onKeyDown"),
            ("onkeypress", "onKeyPress"),
            ("onkeyup", "onKeyUp"),
            ("onload", "onLoad"),
            // "onloadeddata",
            // "onloadedmetadata",
            // "onloadstart",
            // "onmousedown",
            // "onmouseenter",
            // "onmouseleave",
            // "onmousemove",
            // "onmouseout",
            // "onmouseover",
            // "onmouseup",
            ("onpaste", "onPaste"),
            ("onpause", "onPause"),
            ("onplay", "onPlay"),
            ("onplaying", "onPlaying"),
            ("onprogress", "onProgress"),
            ("onratechange", "onRateChange"),
            ("onscroll", "onScroll"),
            ("onseeked", "onSeeked"),
            ("onseeking", "onSeeking"),
            ("onselect", "onSelect"),
            ("onstalled", "onStalled"),
            ("onsubmit", "onSubmit"),
            ("onsuspend", "onSuspend"),
            ("ontimeupdate", "onTimeUpdate"),
            ("ontouchcancel", "onTouchCancel"),
            ("ontouchend", "onTouchEnd"),
            ("ontouchmove", "onTouchMove"),
            // "ontouchstart",
            // "ontransitionend",
            // "onvolumechange",
            // "onwaiting",
            // "onwheel"
        ]);
    };

    if HTML_PROPS.contains_key(&&context[..]) { 
        for (item, value) in HTML_PROPS.iter() {
            if context.contains(&*item) {
                let v = format!("{}=", item);
                let rp = &format!("{}=", value)[..];
                context = context.replace(&v, &rp);
            };
        };
    }

    context
}

/// apply code fixes for the issues
pub fn apply_fix(json_results: &Value) {
    let data = &*json_results.get("data").unwrap();

    if data.is_object() {
        let issues = data.get("issues").unwrap();

        if issues.is_array() {
            assure_module_exist("ripgrep");
            let react_project = determine_react_project();
            for issue in issues.as_array() {
                for item in issue.clone() {
                    let iss: Issue = serde_json::from_value(item).unwrap();
                    let message = iss.message.to_string();

                    if message.contains(&RECCOMENDATION) {
                        let context = iss.context.to_string();
                        let rec_index = message.find(&RECCOMENDATION).unwrap_or(0);

                        if rec_index != 0 {
                            let rec = &message[rec_index..];
                            let rec: String = rec.to_owned().to_string(); // recommendation
                            let mut context: String = context.clone();

                            if react_project {
                                context = convert_props_react(context);
                            }

                            let replace_end = if context.ends_with("/>") { "/>" } else { ">" };
                            // trim tags from start and end
                            let context = context.replace("<", "");
                            let context = context.replace(replace_end, "");
                            let replace_context =
                                establish_context(context.clone(), &rec, react_project);

                            // apply code changes if recommendation exist.
                            if !replace_context.is_empty() {
                                let rg_command = Command::new("rg")
                                    .args([&context, &"-r".to_string(), &replace_context])
                                    .output()
                                    .expect("Failed to execute ripgrep replace");

                                let stdout = String::from_utf8(rg_command.stdout).unwrap();

                                //  TODO: get rg line number and jump to line.
                                if !stdout.is_empty() {
                                    let pfx = &stdout[..stdout.find(':').unwrap()];
                                    let path = Path::new(&pfx);
                                    let mut src = File::open(&path).unwrap();
                                    let mut ds = String::new();
                                    src.read_to_string(&mut ds).unwrap();
                                    drop(src);
                                    let new_data = ds.replace(&*context, &*replace_context);
                                    let mut s = File::create(&path).unwrap();
                                    s.write(new_data.as_bytes()).unwrap();
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    else if data.is_array() {
        let react_project = determine_react_project();
        for d in data.as_array() {
            for item in d.clone() {
                let it = item.clone();
                let issues = it.get("issues").unwrap();
    
                if issues.is_array() {
                    assure_module_exist("ripgrep");
                    for issue in issues.as_array() {
                        for item in issue.clone() {
                            let iss: Issue = serde_json::from_value(item).unwrap();
                            let message = iss.message.to_string();
                            
                            if message.contains(&RECCOMENDATION) {
                                let context = iss.context.to_string();
                                let rec_index = message.find(&RECCOMENDATION).unwrap_or(0);
                                // recommendation exist, attempt to map code fix.
                                if rec_index != 0 {
                                    let rec = &message[rec_index..];
                                    let rec: String = rec.to_owned().to_string(); // recommendation
                                    let mut context: String = context.clone();
        
                                    if react_project {
                                        context = convert_props_react(context);
                                    }

                                    let replace_end = if context.ends_with("/>") { "/>" } else { ">" };
                                    // trim tags from start and end
                                    let context = context.replace("<", "");
                                    let context = context.replace(replace_end, "");
                                    let replace_context =
                                        establish_context(context.clone(), &rec, react_project);
        
                                    // apply code changes if recommendation exist.
                                    if !replace_context.is_empty() {
                                        let rg_command = Command::new("rg")
                                            .args([&context, &"-r".to_string(), &replace_context])
                                            .output()
                                            .expect("Failed to execute ripgrep replace");
        
                                        let stdout = String::from_utf8(rg_command.stdout).unwrap();
        
                                        //  TODO: get rg line number and jump to line.
                                        if !stdout.is_empty() {
                                            let pfx = &stdout[..stdout.find(':').unwrap()];
                                            let path = Path::new(&pfx);
                                            let mut src = File::open(&path).unwrap();
                                            let mut ds = String::new();
                                            src.read_to_string(&mut ds).unwrap();
                                            drop(src);
                                            let new_data = ds.replace(&*context, &*replace_context);
                                            let mut s = File::create(&path).unwrap();
                                            s.write(new_data.as_bytes()).unwrap();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

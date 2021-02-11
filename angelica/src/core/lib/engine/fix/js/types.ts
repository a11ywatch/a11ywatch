export interface InvalidType {
  index: number;
  domSelector: string;
  selector?: string;
  message: string;
}

export interface ExtraConfig {
  lang?: string;
  alt?: string;
}

export type InvalidNesting = {
  h5_h2?: string;
};

export type FixInvalidReturn = {
  anchor_needs_props: string;
  button_needs_props: string;
  semantic_presentation_role: string;
  missing_link: string;
  iframe_title: string;
  alt: string;
  head: string;
  textarea: string;
  textinput: string;
  button: string;
  lang: string;
  form_label: string;
  contrast: string;
  no_skip_content: string;
  nesting: InvalidNesting;
};

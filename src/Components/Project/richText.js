import React, { useRef, useCallback, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
export function RichTextEditor(props) {
  const tinyMce = useRef();
  const [RTEVal, setRTEVal] = React.useState(props.initialValue);

  const handleEditorChange = (e) => {
    setRTEVal(e);
    props.onChange(e);
  };
  const onInit = useCallback((editor) => {
    tinyMce.current = editor;
  }, []);

  // sync tinymce with `value` if externally modified
  useEffect(() => {
    // tinymce isn't a fully controlled component, but luckily inputs entered in
    // are updated before `onChange` is invoked
    // so when this `useEffect` is called, it's already updated and shouldn't re-init
    // if the updated `value` matches what was initially entered
    // .. but it will re-init if the value was changed externally, which is what we want
    if (
      tinyMce.current &&
      tinyMce.current.getContent() !== props.initialValue
    ) {
      // update the editor value
      tinyMce.current.setContent(props.initialValue, { no_events: true });
    }
  }, [props.initialValue]);
  return (
    <Editor
      init={{
        oninit: onInit,
        height: 400,
        setup: onInit,
        menubar: false,
        plugins: `paste lists autolink code`,
        toolbar: `undo redo | bold italic underline blockquote forecolor | formatselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | h1 h2 h3 | code`,
        content_style: "p{margin: 0; font-size: 1.5vw;}",
        // content_css: "dark",
        content_css: "dark",
      }}
      apiKey="wgin50zzfyyye9l16h9p50adsvxfytkxnbrr65dyz39v80zq"
      value={RTEVal}
      onEditorChange={handleEditorChange}
    />
  );
}

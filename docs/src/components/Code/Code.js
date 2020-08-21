import React, { useEffect, useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import theme from 'prism-react-renderer/themes/synthwave84';
import { Button } from '@espressive/cascara';
import styles from './Code.module.scss';

// NOTE: We have to mute these properties as part of the theme so we can add
// styles in our CSS class names.
theme.plain.backgroundColor = undefined;
theme.plain.fontFamily = undefined;

const Code = ({ children, className, live = true, row }) => {
  const [editorOpen, setEditorOpen] = useState(false);
  const language = className && className.replace(/language-/, '');

  const [editorCode, setEditorCode] = useState(children.trim());

  const handleEditorToggle = () => {
    setEditorOpen(!editorOpen);
  };

  const handleCodeChange = (code) => {
    setEditorCode(code.trim());
  };

  useEffect(() => {
    setEditorCode(children.trim());
  }, [children]);

  const liveProviderProps = {
    code: editorCode,
    scope: {
      // NOTE: This list will grow significantly. We also need to do this for MDX
      // to be able to render our components there. We should explore how to make
      // a single list to pass components into scope for both the editor and MDX
      // all in the same place.
      Button,
      ...React,
    },
    theme,
  };

  if (live === true && language === 'jsx') {
    return (
      <LiveProvider {...liveProviderProps}>
        <div className={styles.CodeEditor}>
          <div className={styles.EditorControls}>
            <p
              style={{
                color: '#111',
                float: 'left',
                fontFamily: 'Inter',
                fontSize: '.875em',
                margin: '.25em .625rem',
              }}
            >
              Would love if we could get a title here. Maybe
              `remark-code-frontmatter`
            </p>
            <Button
              className={styles.CodeEditorButton}
              content={editorOpen ? '✕' : '✎'}
              onClick={handleEditorToggle}
              size='small'
            />
          </div>
          <div className={styles.EditorElements}>
            <LivePreview className={styles.LivePreview} />
            {editorOpen && (
              <>
                <LiveEditor
                  className={styles.LiveEditor}
                  onChange={handleCodeChange}
                />
                <LiveError className={styles.LiveError} />
              </>
            )}
          </div>
        </div>
      </LiveProvider>
    );
  }

  return (
    <LiveProvider disabled {...liveProviderProps}>
      <LiveEditor className={styles.LiveEditor} />
    </LiveProvider>
  );
};

export default Code;

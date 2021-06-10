import React, { useCallback, useEffect, useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import theme from 'prism-react-renderer/themes/synthwave84';
import pt from 'prop-types';

import { Button } from '@espressive/cascara';
import styles from './Code.module.scss';
import MDX_COMPONENTS from '../../lib/MDX_COMPONENTS';

// NOTE: We have to mute these properties as part of the theme so we can add
// styles in our CSS class names.
theme.plain.backgroundColor = undefined;
theme.plain.fontFamily = undefined;

const propTypes = {
  children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)]),
  className: pt.string,
  live: pt.bool,
  title: pt.string,
};

const Code = ({ children, className, live = true, title, ...rest }) => {
  const [editorOpen, setEditorOpen] = useState(false);
  const language = className && className.replace(/language-/, '');

  const [editorCode, setEditorCode] = useState(children.trim());

  const handleEditorToggle = useCallback(() => {
    // TODO: Make cursor focus on editor when opening
    // should also update styles for focus on editor so it is easier to see that it
    // is actually editable
    setEditorOpen(!editorOpen);
  }, [setEditorOpen, editorOpen]);

  const handleCodeChange = useCallback(
    (code) => {
      setEditorCode(code.trim());
    },
    [setEditorCode]
  );

  useEffect(() => {
    setEditorCode(children.trim());
  }, [children]);

  const liveProviderProps = {
    code: editorCode,
    scope: {
      ...MDX_COMPONENTS,
      ...React,
    },
    theme,
  };

  if (live === true && language === 'jsx') {
    return (
      <LiveProvider {...liveProviderProps}>
        <div className={styles.CodeEditor}>
          <div className={styles.EditorControls}>
            {title && <h4 className={styles.EditorTitle}>{title}</h4>}

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

Code.propTypes = propTypes;

export default Code;

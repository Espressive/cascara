/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { Button } from '@espressive/cascara';
import theme from 'prism-react-renderer/themes/nightOwl';

// const transformCode = (code, row) => {
//   if (code.startsWith('function') || code.startsWith('class')) return code;
//   return row ? `<div class='row'>${code}</div>` : `<div>${code}</div>`;
// };

const Code = ({ children, className, live = true, row }) => {
  const [editorOpen, setEditorOpen] = useState(false);
  const language = className && className.replace(/language-/, '');

  const [editorCode, setEditorCode] = useState(children.trim());

  function toggleEditor() {
    setEditorOpen(!editorOpen);
  }

  function handleChange(code) {
    setEditorCode(code.trim());
  }

  useEffect(() => {
    setEditorCode(children.trim());
  }, [children]);

  const liveProviderProps = {
    code: editorCode,
    scope: {
      Button,
      ...React,
    },
    theme,
    // transformCode: () => transformCode(editorCode, row),
  };

  if (live === true && language === 'jsx') {
    return (
      <LiveProvider {...liveProviderProps}>
        <div
          style={{
            backgroundColor: '#eee',
            borderRadius: '.375rem',
            padding: '.375em 3em .375em .375em',
            position: 'relative',
          }}
        >
          <Button
            content={editorOpen ? '✕' : '✎'}
            onClick={toggleEditor}
            size='small'
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              position: 'absolute',
              right: '.375rem',
              top: '.375rem',
              width: '2rem',
            }}
          />

          <LivePreview
            style={{ backgroundColor: 'white', padding: '.625rem' }}
          />
          {editorOpen && (
            <>
              <LiveEditor onChange={handleChange} />
              <LiveError
                style={{
                  backgroundColor: 'red',
                  margin: 0,
                  padding: '.625rem',
                }}
              />
            </>
          )}
        </div>
      </LiveProvider>
    );
  }

  return (
    <LiveProvider disabled {...liveProviderProps}>
      <LiveEditor>
        <LiveEditor />
      </LiveEditor>
    </LiveProvider>
  );
};

export default Code;

import React, { useState } from 'react';

const customDictionary = {
  teh: "the",
  wrok: "work",
  fot: "for",
  exampl: "example"
};

const SpellCheck = () => {
  const [text, setText] = useState('');
  const [correction, setCorrection] = useState('');

  const handleTextChange = (event) => {
    const inputText = event.target.value;
    setText(inputText);

    let correctedText = inputText;
    let foundCorrection = false;

    for (const [typo, correct] of Object.entries(customDictionary)) {
      const regex = new RegExp(`\\b${typo}\\b`, 'gi');
      if (regex.test(inputText)) {
        correctedText = inputText.replace(regex, correct);
        setCorrection(`Did you mean: <strong>${correct}</strong>?`);
        foundCorrection = true;
        break; // Show correction only for the first match
      }
    }

    if (!foundCorrection) {
      setCorrection('');
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Type here..."
        style={{ width: '300px', height: '100px' }}
      />
      <br />
      {correction && (
        <div>
          <span dangerouslySetInnerHTML={{ __html: correction }} />
        </div>
      )}
    </div>
  );
};

export default SpellCheck;

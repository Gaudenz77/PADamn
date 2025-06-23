import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

export const HelloWorld: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [outputValue, setOutputValue] = React.useState('');
  const [animate, setAnimate] = React.useState(false);

  const compressString = (input: string): string => {
    if (!input) return '';
    let result = '';
    let count = 1;

    for (let i = 1; i <= input.length; i++) {
      if (input[i] === input[i - 1]) {
        count++;
      } else {
        result += input[i - 1] + count;
        count = 1;
      }
    }

    return result;
  };

  const handleCompressClick = () => {
    const compressed = compressString(inputValue);
    setOutputValue(compressed);
    setAnimate(true);
  };

  const handleAnimationEnd = () => {
    setAnimate(false);
  };

  return (
    <div className="p-3 border rounded bg-light" style={{ maxWidth: 600, margin: '1rem auto', width: '90%' }}>
      <div className="mb-3">
        <label className="form-label">Input</label>
        <input
          type="text"
          className="form-control w-100"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="e.g. abbccc"
        />
      </div>

      <button
        className="btn btn-primary mb-3 w-100"
        onClick={handleCompressClick}
      >
        Compress
      </button>

      <div>
        <label className="form-label">Output</label>
        <input
          type="text"
          className={`form-control w-100 ${animate ? 'animate__animated animate__flipInX' : ''}`}
          value={outputValue}
          readOnly
          onAnimationEnd={handleAnimationEnd}
        />
      </div>
    </div>
  );
};

import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import Swal from 'sweetalert2';

export const HelloWorld: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [outputValue, setOutputValue] = React.useState('');
  const [animate, setAnimate] = React.useState(false);

  const [fromHour, setFromHour] = React.useState('');
  const [fromMinute, setFromMinute] = React.useState('');
  const [toHour, setToHour] = React.useState('');
  const [toMinute, setToMinute] = React.useState('');
  const [timeslots, setTimeslots] = React.useState<{ from: string; to: string }[]>([]);

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
/*
  const handleAddTimeslot = () => {
    if (fromHour && fromMinute && toHour && toMinute) {
      const from = `${fromHour.padStart(2, '0')}:${fromMinute.padStart(2, '0')}`;
      const to = `${toHour.padStart(2, '0')}:${toMinute.padStart(2, '0')}`;
      setTimeslots(prev => [...prev, { from, to }]);

      // Reset fields
      setFromHour('');
      setFromMinute('');
      setToHour('');
      setToMinute('');
    }
  };
*/

const handleAddTimeslot = () => {
  const fH = Number(fromHour);
  const fM = Number(fromMinute);
  const tH = Number(toHour);
  const tM = Number(toMinute);

  if (
    isNaN(fH) || isNaN(fM) || isNaN(tH) || isNaN(tM) ||
    fromHour === '' || fromMinute === '' || toHour === '' || toMinute === ''
  ) {
    Swal.fire({
      icon: 'warning',
      title: 'Missing Input',
      text: 'Please enter all time fields.',
    });
    return;
  }

  if (fH < 0 || fH > 23 || tH < 0 || tH > 23) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Hours',
      text: 'Hours must be between 0 and 23.',
    });
    return;
  }

  if (fM < 0 || fM > 59 || tM < 0 || tM > 59) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Minutes',
      text: 'Minutes must be between 0 and 59.',
    });
    return;
  }

  const fromTotal = fH * 60 + fM;
  const toTotal = tH * 60 + tM;

  if (fromTotal >= toTotal) {
    Swal.fire({
      icon: 'info',
      title: 'Invalid Timeslot',
      text: '"From" time must be earlier than "To" time.',
    });
    return;
  }

  const from = `${String(fH).padStart(2, '0')}:${String(fM).padStart(2, '0')}`;
  const to = `${String(tH).padStart(2, '0')}:${String(tM).padStart(2, '0')}`;

  setTimeslots(prev => [...prev, { from, to }]);

  setFromHour('');
  setFromMinute('');
  setToHour('');
  setToMinute('');

  Swal.fire({
    icon: 'success',
    title: 'Timeslot Added',
    text: `From ${from} to ${to}`,
    timer: 1500,
    showConfirmButton: false
  });
};

  return (
    <div className="p-3 border rounded bg-light" style={{ maxWidth: 600, margin: '1rem auto', width: '90%' }}>
      {/* INPUT FIELD */}
      <div className="mb-3 text-center">
        <label className="form-label">Input</label>
        <div className="d-flex justify-content-center">
          <input
            type="text"
            className="form-control w-auto text-center"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="e.g. abbccc"
          />
        </div>
      </div>

      {/* COMPRESS BUTTON */}
      <div className="text-center mb-3">
        <button className="btn btn-secondary" onClick={handleCompressClick}>
          Compress
        </button>
      </div>

      {/* OUTPUT FIELD */}
      <div className="text-center mb-4">
        <label className="form-label">Output</label>
        <div className="row justify-content-center align-items-center">
          <div className="col-auto">
            <input
              type="text"
              className={`form-control w-auto text-center ${animate ? 'animate__animated animate__flipInX' : ''}`}
              value={outputValue}
              readOnly
              onAnimationEnd={handleAnimationEnd}
            />
          </div>
        </div>
      </div>

      {/* TIMESLOT INPUT */}
      <div className="mb-3">
        <label className="form-label">Add Timeslot</label>
        <div className="row gx-2 mb-2">
          <div className="col">
            <input
              type="number"
              className="form-control"
              placeholder="From Hour"
              value={fromHour}
              onChange={e => setFromHour(e.target.value)}
              min="0"
              max="23"
            />
          </div>
          <div className="col">
            <input
              type="number"
              className="form-control"
              placeholder="From Min"
              value={fromMinute}
              onChange={e => setFromMinute(e.target.value)}
              min="0"
              max="59"
            />
          </div>
          <div className="col">
            <input
              type="number"
              className="form-control"
              placeholder="To Hour"
              value={toHour}
              onChange={e => setToHour(e.target.value)}
              min="0"
              max="23"
            />
          </div>
          <div className="col">
            <input
              type="number"
              className="form-control"
              placeholder="To Min"
              value={toMinute}
              onChange={e => setToMinute(e.target.value)}
              min="0"
              max="59"
            />
          </div>
        </div>
        <button className="btn btn-primary w-100" onClick={handleAddTimeslot}>
          Add Timeslot
        </button>
      </div>

      {/* TIMESLOT TABLE */}
      {timeslots.length > 0 && (
        <div>
          <h5 className="mt-4">Timeslots</h5>
          <table className="table table-bordered table-sm text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              {timeslots.map((slot, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{slot.from}</td>
                  <td>{slot.to}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

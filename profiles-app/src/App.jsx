import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileCard from './components/ProfileCard.jsx';
import { profiles } from './data/profiles.js';
import React, { useState } from 'react';

export default function App() {

  const [people, setPeople] = useState(profiles);
  const [name, setName] = useState('');
  const trimmed = name.trim();
  const exists = people.some(p => p.name.toLowerCase() === trimmed.toLowerCase());

  function increaseLike(id) {
    setPeople(ps => ps.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  }

  function submitNewProfile(e) {
    e.preventDefault();
    if (!trimmed || exists) {
      console.log("Validation failed: Name is empty or already exists.");
      return
    }

    const newProfile = {
      id: Date.now(), // Use timestamp for a simple unique ID
      name: trimmed,
      likes: 0,
    };

    setPeople(ps => [...ps, newProfile]);

    setName('');
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Profiles</h1>
      <Row xs={1} md={2} lg={3}>
        {people.map(p => (
          <Col key={p.id}>
            <ProfileCard name={p.name} likes={p.likes} />
            <button onClick={() => increaseLike(p.id)}>Like+</button>
          </Col>
        ))}
      </Row>
      <hr className="my-5" />
      <div className="py-2">
        <h1 className="mb-4 text-center">Register New Profile</h1>

        <form onSubmit={submitNewProfile} className="mb-3">

          <div className="d-flex align-items-center gap-2">

            <label htmlFor="profileNameInput" className="text-nowrap mb-0">Name:</label>

            <input
              id="profileNameInput"
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`form-control ${((!trimmed && name.length > 0) || exists) ? 'is-invalid' : ''}`}
            />

            <button type="submit" className="btn btn-primary" disabled={!trimmed || exists}>
              Create Profile
            </button>
          </div>

          {(!trimmed && name.length > 0) && (
            <div className="text-danger mt-1 ms-5">
              Name cannot be blank or only spaces.
            </div>
          )}
          {exists && (
            <div className="text-danger mt-1 ms-5">
              A profile named "{trimmed}" already exists!
            </div>
          )}
        </form>
      </div>
    </Container>
  );
}
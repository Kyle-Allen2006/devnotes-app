import { useState, useEffect } from 'react';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('devnotes'));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('devnotes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (text.trim() === '') return;

    const newNote = {
      id: Date.now(),
      content: text,
    };

    setNotes([newNote, ...notes]);
    setText('');
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '2rem auto',
      fontFamily: 'Segoe UI, sans-serif',
      color: '#333',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '1rem',
    },
    inputSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      marginBottom: '1rem',
    },
    textarea: {
      minHeight: '100px',
      padding: '0.5rem',
      fontSize: '1rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      resize: 'vertical',
    },
    button: {
      padding: '0.5rem',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    noteList: {
      listStyle: 'none',
      padding: 0,
    },
    noteItem: {
      background: '#f9f9f9',
      padding: '0.75rem',
      border: '1px solid #ddd',
      borderRadius: '4px',
      marginBottom: '0.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    deleteButton: {
      backgroundColor: '#dc3545',
      color: '#fff',
      border: 'none',
      padding: '0.3rem 0.5rem',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🗒️ DevNotes</h1>

      <div style={styles.inputSection}>
        <textarea
          style={styles.textarea}
          placeholder="Write your note here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button style={styles.button} onClick={addNote}>Add Note</button>
      </div>

      <ul style={styles.noteList}>
        {notes.map((note) => (
          <li key={note.id} style={styles.noteItem}>
            <span>{note.content}</span>
            <button style={styles.deleteButton} onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;

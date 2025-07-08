import { useState, useEffect } from 'react';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');
  const [project, setProject] = useState('General');
  const [projects, setProjects] = useState(['General']);
  const [newProject, setNewProject] = useState('');

  // Load notes, project, and projects list from localStorage
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('devnotes'));
    if (storedNotes) setNotes(storedNotes);

    const storedProject = localStorage.getItem('devnotes-project');
    if (storedProject) setProject(storedProject);

    const storedProjects = JSON.parse(localStorage.getItem('devnotes-projects'));
    if (storedProjects) setProjects(storedProjects);
  }, []);

  // Save notes
  useEffect(() => {
    localStorage.setItem('devnotes', JSON.stringify(notes));
  }, [notes]);

  // Save selected project
  useEffect(() => {
    localStorage.setItem('devnotes-project', project);
  }, [project]);

  // Save list of projects
  useEffect(() => {
    localStorage.setItem('devnotes-projects', JSON.stringify(projects));
  }, [projects]);

  const addNote = () => {
    if (text.trim() === '') return;

    const newNote = {
      id: Date.now(),
      content: text,
      project,
    };

    setNotes([newNote, ...notes]);
    setText('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const addProject = (e) => {
    e.preventDefault();
    const name = newProject.trim();
    if (!name || projects.includes(name)) return;

    setProjects([name, ...projects]);
    setProject(name);
    setNewProject('');
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
    projectInput: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '1rem',
    },
    input: {
      flex: 1,
      padding: '0.5rem',
      fontSize: '1rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    button: {
      padding: '0.5rem 1rem',
      fontSize: '1rem',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    projectList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      marginBottom: '1rem',
    },
    projectItem: {
      padding: '0.4rem 0.75rem',
      backgroundColor: '#f0f0f0',
      borderRadius: '4px',
      cursor: 'pointer',
      border: '1px solid #ccc',
    },
    activeProject: {
      backgroundColor: '#007bff',
      color: '#fff',
      fontWeight: 'bold',
    },
    textarea: {
      width: '100%',
      minHeight: '100px',
      padding: '0.5rem',
      fontSize: '1rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      resize: 'vertical',
      marginBottom: '0.5rem',
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

      <form onSubmit={addProject} style={styles.projectInput}>
        <input
          style={styles.input}
          type="text"
          placeholder="Create new project..."
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
        />
        <button style={styles.button} type="submit">Add</button>
      </form>

      <div style={styles.projectList}>
        {projects.map((proj) => (
          <div
            key={proj}
            style={{
              ...styles.projectItem,
              ...(proj === project ? styles.activeProject : {}),
            }}
            onClick={() => setProject(proj)}
          >
            {proj}
          </div>
        ))}
      </div>

      <textarea
        style={styles.textarea}
        placeholder={`Add a note for "${project}"...`}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button style={styles.button} onClick={addNote}>Add Note</button>

      <ul style={styles.noteList}>
        {notes
          .filter((note) => note.project === project)
          .map((note) => (
            <li key={note.id} style={styles.noteItem}>
              <span>{note.content}</span>
              <button
                style={styles.deleteButton}
                onClick={() => deleteNote(note.id)}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Notes;

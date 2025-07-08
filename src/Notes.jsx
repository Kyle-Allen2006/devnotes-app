import { useState, useEffect } from 'react';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');
  const [project, setProject] = useState('General');
  const [projects, setProjects] = useState(['General']);
  const [newProject, setNewProject] = useState('');
  const [theme, setTheme] = useState('light');

  // Load from localStorage on first render
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('devnotes'));
    const storedProject = localStorage.getItem('devnotes-project');
    const storedProjects = JSON.parse(localStorage.getItem('devnotes-projects'));
    const storedTheme = localStorage.getItem('devnotes-theme');

    if (storedNotes) setNotes(storedNotes);
    if (storedProject) setProject(storedProject);
    if (storedProjects) setProjects(storedProjects);
    if (storedTheme) setTheme(storedTheme);
  }, []);

  // Save to localStorage when values change
  useEffect(() => {
    localStorage.setItem('devnotes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('devnotes-project', project);
  }, [project]);

  useEffect(() => {
    localStorage.setItem('devnotes-projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('devnotes-theme', theme);
  }, [theme]);

  // 🔧 Add class to <body> for full page theme styling
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark' : 'light';
  }, [theme]);

  const addNote = () => {
    if (text.trim() === '') return;
    const newNote = { id: Date.now(), content: text, project };
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

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const isDark = theme === 'dark';

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '2rem auto',
      fontFamily: 'Segoe UI, sans-serif',
      color: isDark ? '#f1f1f1' : '#333',
      backgroundColor: isDark ? '#121212' : '#ffffff',
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: isDark ? '0 0 10px rgba(255,255,255,0.1)' : '0 0 10px rgba(0,0,0,0.1)',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '1rem',
    },
    toggleBtn: {
      backgroundColor: isDark ? '#f1f1f1' : '#333',
      color: isDark ? '#121212' : '#fff',
      border: 'none',
      padding: '0.4rem 0.75rem',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
      float: 'right',
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
      backgroundColor: isDark ? '#222' : '#fff',
      color: isDark ? '#fff' : '#000',
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
      backgroundColor: isDark ? '#444' : '#f0f0f0',
      color: isDark ? '#fff' : '#000',
      borderRadius: '4px',
      cursor: 'pointer',
      border: isDark ? '1px solid #555' : '1px solid #ccc',
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
      backgroundColor: isDark ? '#222' : '#fff',
      color: isDark ? '#fff' : '#000',
    },
    noteList: {
      listStyle: 'none',
      padding: 0,
    },
    noteItem: {
      background: isDark ? '#2a2a2a' : '#f9f9f9',
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
    clearfix: {
      clear: 'both',
      marginBottom: '1rem',
    },
  };

  return (
    <div style={styles.container}>
      <button style={styles.toggleBtn} onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
      <div style={styles.clearfix} />
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

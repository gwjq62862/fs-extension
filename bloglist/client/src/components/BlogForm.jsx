import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title,
      author,
      url,
    });
    setTitle('');
    setAuthor('');
    setUrl('');
  };
  return (
    <form onSubmit={addBlog}>
      <h2>Create new blog</h2>
      <label aria-label="title">
        title:{' '}
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </label>
      <label aria-label="author">
        author:{' '}
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </label>
      <label aria-label="url">
        url:{' '}
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </label>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;

import { useState } from 'react';
import { Link } from 'react-router';

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [visible, setVisible] = useState(false);
  const link = `blogs/${blog._id}`;
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const canDelete = blog.user && user && blog.user.username === user.username;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div
      style={blogStyle}
      className="blog p-4 bg-white border border-gray-200 rounded-xl shadow-sm mb-4 transition hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link
            to={link}
            className="font-semibold text-blue-600 hover:underline"
          >
            {blog.title}
          </Link>
          <span className="text-gray-500 text-sm">by {blog.author}</span>
        </div>
        <button
          onClick={toggleVisibility}
          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
        >
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      <div
        style={showWhenVisible}
        className="mt-4 pt-3 border-t border-gray-100 space-y-2 text-sm text-gray-600"
      >
        <div>
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline break-all"
          >
            {blog.url}
          </a>
        </div>

        <div className="flex items-center space-x-3">
          <span className="blog-likes font-medium text-gray-700">
            likes {blog.likes}
          </span>
          <button
            onClick={() => handleLike(blog)}
            className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-emerald-600 transition"
          >
            like
          </button>
        </div>

        {blog.user && (
          <div className="text-xs text-gray-400">Added by {blog.user.name}</div>
        )}

        {canDelete && (
          <div>
            <button
              onClick={() => handleDelete(blog)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-red-600 transition mt-1"
            >
              delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;

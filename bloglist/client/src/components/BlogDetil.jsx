import { useParams } from 'react-router-dom';
import { useBlogStore } from '../stores/blogStore';
import { useState } from 'react';

const BlogDetail = ({ blogs, handleLike }) => {
  const [comment, setComment] = useState('')
  const createComment = useBlogStore((state) => state.createComment)
  const id = useParams().id;
  const blog = blogs.find((b) => b._id === id);

if (!id || !blog) {
    throw new Error('Blog not found'); 
  }
  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    await createComment(blog._id, comment)
    setComment('')
  }
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4 max-w-2xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          {blog.title}
        </h2>
        <p className="text-sm font-medium text-gray-500 mt-1">
          by {blog.author}
        </p>
      </div>

      <div>
        <a
          href={blog.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline break-all text-sm"
        >
          {blog.url}
        </a>
      </div>

      <div className="flex items-center space-x-4 pt-2">
        <span className="font-semibold text-gray-700">{blog.likes} likes</span>
        <button
          onClick={() => handleLike(blog)}
          className="bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-emerald-600 transition shadow-sm"
        >
          like
        </button>
      </div>

      <div className="pt-3 border-t border-gray-100 text-xs text-gray-400 font-medium">
        added by {blog.user ? blog.user.name : 'Anonymous'}
      </div>

      <form onSubmit={handleCommentSubmit} className="mb-6 flex gap-3">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition"
        >
          add comment
        </button>
      </form>

      <div className="mt-4">
        <h4 className="font-semibold text-gray-800 mb-2">Comments</h4>
        {blog.comments && blog.comments.length > 0 ? (
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {blog.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400 italic">No comments yet</p>
        )}
      </div>



    </div>
  );
};

export default BlogDetail;

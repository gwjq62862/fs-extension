import { useState, useEffect, useRef } from 'react';
import './App.css';

import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';
import { Link, Route, Routes, useNavigate } from 'react-router';
import BlogDetail from './components/BlogDetil';
import Users from './components/User';
import UserDetail from './components/UserDetil';
import userService from './services/user';
import ErrorBoundary from '../ErrorBoundary';
import NotFoundPage from './components/NotFoundPage';
import { useNotificationStore } from './stores/notiStore';
import { useBlogStore } from './stores/blogStore';
import { useUserStore } from './stores/userStore';
function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const showNotification = useNotificationStore((state) => state.showNotification)
  const fetchBlogs = useBlogStore((state) => state.fetchBlogs)
  const blogs = useBlogStore((state) => state.blogs);
  const createBlog = useBlogStore((state) => state.createBlog);
  const deleteBlog = useBlogStore((state) => state.deleteBlog)
  const likeBlog = useBlogStore((state) => state.likeBlog)
  const login = useUserStore((state) => state.login)
  const logout = useUserStore((state) => state.logout)
  const user = useUserStore((state) => state.user)


  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [users, setUsers] = useState([]);
  const blogsLoaded = useBlogStore((state) => state.blogsLoaded)

  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);




  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await login({ username, password });
      setUsername('');
      setPassword('');
      showNotification(`Welcome ${user.name}`, 'success');
      navigate('/');
    } catch (exception) {
      console.log('Wrong credentials', exception);
      showNotification('Wrong username or password', 'error');
    }
  };

  const handleCreateBlog = async (blogObject) => {
    try {
      const returnedBlog = await createBlog(blogObject)
      showNotification(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        'success',
      );
      navigate('/');
    } catch (error) {
      console.log(error);
      showNotification('Failed to create blog', 'error');
    }
  };
  const handleLogout = () => {
    logout();
    showNotification('Logged out successfully', 'success');
    navigate('/');
  };

  const handleLike = async (blog) => {
    if (!user) {
      showNotification('Please login to like blogs', 'error');
      return;
    }
    try {
      await likeBlog(blog)
    } catch (error) {
      console.log('Error liking blog', error);
    }
  };

  const handleDeleteBlog = async (blog) => {
    try {
      await deleteBlog(blog._id);
      showNotification(`blog ${blog.title} removed`, 'success');
      navigate('/');
    } catch (error) {
      console.log(error);
      showNotification('failed to delete blog', 'error');
    }
  };

  useEffect(() => {
    if (!user) return
    let cancelled = false
    userService.getAll()
      .then((data) => { if (!cancelled) setUsers(data.users ?? []) })
      .catch(() => { if (!cancelled) setUsers([]) })
    return () => { cancelled = true }
  }, [user])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <div className="max-w-4xl mx-auto p-6">
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between bg-white shadow-sm border border-gray-100 px-6 py-4 rounded-xl mb-8">
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 font-medium transition"
            >
              blogs
            </Link>
            <Link
              to="/users"
              className="text-gray-600 hover:text-blue-600 font-medium transition"
            >
              users
            </Link>
            {user && (
              <Link
                to="/create"
                className="text-gray-600 hover:text-blue-600 font-medium transition"
              >
                create new
              </Link>
            )}
          </div>
          <div>
            {!user ? (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                login
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-semibold text-gray-700">
                  {user.name} logged-in
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-600 transition"
                >
                  logout
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Blogs App
          </h1>
        </header>

        <Notification />
        <ErrorBoundary>
          {/* Main Content Area */}
          <main className="bg-white shadow-sm border border-gray-100 rounded-xl p-6">
            <Routes>
              <Route
                path="/"
                element={
                  <div>

                    <div className="space-y-3">
                      {blogs.map((blog) => (
                        <Blog
                          key={blog._id}
                          blog={blog}
                          handleLike={handleLike}
                          handleDelete={handleDeleteBlog}
                          user={user}
                        />
                      ))}
                    </div>
                  </div>
                }
              />

              <Route
                path="/blogs/:id"
                element={
                  blogsLoaded
                    ? <BlogDetail blogs={blogs} handleLike={handleLike} />
                    : <p className="text-gray-500 text-center py-4">Loading...</p>
                }
              />

              <Route
                path="/login"
                element={
                  <div className="max-w-md mx-auto bg-white p-6 rounded-xl">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Login to application
                      </h2>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          username
                        </label>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          password
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                      >
                        login
                      </button>
                    </form>
                  </div>
                }
              />

              <Route
                path="/create"
                element={
                  user ? (
                    <BlogForm
                      createBlog={handleCreateBlog}
                      title={title}
                      setTitle={setTitle}
                      author={author}
                      setAuthor={setAuthor}
                      url={url}
                      setUrl={setUrl}
                    />
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      Please login to create a blog.
                    </p>
                  )
                }
              />

              <Route path="/users" element={<Users users={users} />} />
              <Route path="/users/:id" element={<UserDetail users={users} />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;

import { useParams } from 'react-router-dom';

const UserDetail = ({ users }) => {
  const { id } = useParams();

  const user = users.find((u) => u._id === id);

  if (!user) {
    return null;
  }
//logic is written by me and ui is genrated by ai
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-sm border border-gray-100 rounded-xl my-6">
      {/* User Header */}
      <div className="mb-6 border-b pb-4">
        <h2 className="text-3xl font-extrabold text-gray-900">{user.name}</h2>
        <p className="text-sm text-gray-500 mt-1">@{user.username}</p>
      </div>

      {/* Added Blogs Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span>Added blogs</span>
          <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {user.blogs.length}
          </span>
        </h3>

        {user.blogs.length === 0 ? (
          <p className="text-gray-500 italic">No blogs added yet.</p>
        ) : (
          <ul className="divide-y divide-gray-100 bg-gray-50 rounded-xl p-4 border border-gray-100">
            {user.blogs.map((blog) => (
              <li key={blog._id} className="py-3 px-2 flex items-center justify-between hover:bg-gray-100/50 rounded-lg transition">
                <span className="font-medium text-gray-800">{blog.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserDetail;

import { Link } from 'react-router-dom';

//ui is genrated by ai since desing take time
const Users = ({ users }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-sm border border-gray-100 rounded-xl my-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">Users</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-gray-600 text-sm uppercase tracking-wider">
              <th className="py-3 px-4 font-semibold">User</th>
              <th className="py-3 px-4 font-semibold text-center">Blogs Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3.5 px-4">
                  <Link 
                    to={`/users/${user._id}`} 
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {user.name}
                  </Link>
                </td>
                <td className="py-3.5 px-4 text-center text-gray-700 font-semibold">
                  <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs">
                    {user.blogs.length}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

import blogService from '../services/blog'
import { create } from 'zustand'

export const useBlogStore = create((set) => ({
    blogs: [],
     blogsLoaded: false, 
    fetchBlogs: async () => {
        try {
            const blogs = await blogService.getAll()
           set({ blogs: blogs.sort((a, b) => b.likes - a.likes), blogsLoaded: true })

        } catch (error) {
            console.log('Error fetching blogs:', error)
            set({ blogsLoaded: true })

            throw error
        }
    },
    createBlog: async (blogObject) => {
        try {
            const returnedBlog = await blogService.create(blogObject)
            set((state) => {
                const updatedBlogs = [...state.blogs, returnedBlog]
                return { blogs: updatedBlogs.sort((a, b) => b.likes - a.likes) }
            })
            return returnedBlog
        } catch (error) {
            console.log('Error creating blog:', error)
            throw error
        }
    },

    deleteBlog: async (id) => {
        try {
            await blogService.deleteBlog(id)
            set((state) => ({
                blogs: state.blogs.filter((b) => b._id !== id)
            }))
        } catch (error) {
            console.log('Error deleting blog:', error)
        }
    },
    likeBlog: async (blog) => {
        try {
            const updatedBlogData = { ...blog, likes: blog.likes + 1 }
            const returnedBlog = await blogService.update(blog._id, updatedBlogData)
            set((state) => {
                const updatedBlogs = state.blogs.map((b) =>
                    b._id !== blog._id ? b : returnedBlog
                )
                return { blogs: updatedBlogs.sort((a, b) => b.likes - a.likes) }
            })
        } catch (error) {
            console.log('Error liking blog:', error)
        }
    },
    createComment: async (blogId, content) => {
        try {
            const returnedBlog = await blogService.createComment(blogId, content);
            set((state) => ({
                blogs: state.blogs.map((b) => (b._id !== blogId ? b : returnedBlog))
            }));

            return returnedBlog;
        } catch (error) {
            console.log('Error creating comment:', error);
            throw error;
        }
    }


}))
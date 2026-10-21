import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Blog from './Blog';
import BlogForm from './BlogForm';

test('renders title and author, but does not render url or likes by default', () => {
  const blog = {
    _id: '293829fdnksanf',
    title: 'how to laugh',
    author: 'this guy',
    url: 'https://hello.com',
    likes: 12,
  };

  render(<Blog blog={blog} />);

  const title = screen.getByText((content) => content.includes('how to laugh'));
  const author = screen.getByText((content) => content.includes('this guy'));
  expect(title).toBeDefined();
  expect(author).toBeDefined();

  const url = screen.queryByText('https://hello.com');
  const likes = screen.queryByText(/12/);

  expect(url).not.toBeVisible();
  expect(likes).not.toBeVisible();
});

test('testing url and like appear when we click the view button', async () => {
  const blog = {
    _id: '293829fdnksanf',
    title: 'how to laugh',
    author: 'this guy',
    url: 'https://hello.com',
    likes: 12,
  };

  const mockHandler = vi.fn();
  render(<Blog blog={blog} handleLike={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByRole('button', { name: /view/i });

  await user.click(button);

  const url = screen.getByText('https://hello.com');
  const likes = screen.getByText(/12/);

  expect(url).toBeVisible();
  expect(likes).toBeVisible();
});

test('testing the like button behavior', async () => {
  const blog = {
    _id: '293829fdnksanf',
    title: 'how to laugh',
    author: 'this guy',
    url: 'https://hello.com',
    likes: 12,
  };

  const mockHandler = vi.fn();
  render(<Blog blog={blog} handleLike={mockHandler} />);
  const user = userEvent.setup();

  const button = screen.getByRole('button', { name: /view/i });
  await user.click(button);

  const likeButton = screen.getByRole('button', { name: /like/i });
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const titleInput = screen.getByRole('textbox', { name: /title/i });
  const authorInput = screen.getByRole('textbox', { name: /author/i });
  const urlInput = screen.getByRole('textbox', { name: /url/i });
  const createButton = screen.getByRole('button', { name: /create/i });

  await user.type(titleInput, 'testing a form with react testing library');
  await user.type(authorInput, 'John Doe');
  await user.type(urlInput, 'https://react-test.com');

  await user.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe(
    'testing a form with react testing library',
  );
  expect(createBlog.mock.calls[0][0].author).toBe('John Doe');
  expect(createBlog.mock.calls[0][0].url).toBe('https://react-test.com');
});

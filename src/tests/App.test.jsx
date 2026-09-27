import { act, fireEvent, render, screen } from '@testing-library/react';
import App from '../app';

const collection = (name) => ({ name, photos: [`https://example.test/${name}.jpg`] });
const jsonResponse = (body) => Promise.resolve(new Response(JSON.stringify(body)));

afterEach(() => vi.unstubAllGlobals());

test('renders the header and collections from the API', async () => {
  vi.stubGlobal('fetch', vi.fn(() => jsonResponse([collection('Горный поход')])));

  render(<App />);

  expect(screen.getByRole('heading', { name: 'Gallera' })).toBeInTheDocument();
  expect(await screen.findByText('Горный поход')).toBeInTheDocument();
});

test('ignores a stale response after the category was switched', async () => {
  const pending = [];
  vi.stubGlobal(
    'fetch',
    vi.fn(
      (url) =>
        new Promise((resolve) => {
          pending.push({ url: String(url), resolve });
        })
    )
  );

  render(<App />);
  fireEvent.click(screen.getByText('Море'));

  const [allRequest, seaRequest] = pending;
  expect(seaRequest.url).toContain('category=1');

  await act(async () => {
    seaRequest.resolve(new Response(JSON.stringify([collection('Море в июне')])));
  });
  await act(async () => {
    allRequest.resolve(new Response(JSON.stringify([collection('Старый ответ')])));
  });

  expect(screen.getByText('Море в июне')).toBeInTheDocument();
  expect(screen.queryByText('Старый ответ')).not.toBeInTheDocument();
});

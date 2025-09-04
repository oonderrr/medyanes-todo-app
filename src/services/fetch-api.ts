import { tryCatch } from '@/utils/try-catch';

interface PostApiProps {
  URL: string;
  body: unknown;
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
  headers?: { 'Content-Type': 'application/json' };
}

const postApi = async ({
  URL,
  body,
  method = 'POST',
  headers = { 'Content-Type': 'application/json' },
}: PostApiProps) => {
  if (!URL) throw new Error('URL is required');

  const { data, error } = await tryCatch(
    fetch(URL, {
      method,
      body: JSON.stringify(body),
      headers,
      cache: 'no-store',
    }).then(async (res) => {
      if (res.url.includes('/notification') && res.redirected) {
        return (window.location.href = res.url);
      } else {
        return await res.json();
      }
    }),
  );

  if (error) throw new Error(`API request failed: ${error}`);

  return data;
};

interface GetApiProps {
  URL: string;
  headers?: { 'Content-Type': 'application/json' };
}

const getApi = async ({
  URL,
  headers = { 'Content-Type': 'application/json' },
}: GetApiProps) => {
  if (!URL) throw new Error('URL is required');

  const { data, error } = await tryCatch(
    fetch(URL, {
      method: 'GET',
      headers,
      cache: 'no-store',
    }).then(async (res) => {
      return await res.json();
    }),
  );

  if (error) throw new Error(`API request failed: ${error}`);

  return data;
};

export { postApi, getApi };

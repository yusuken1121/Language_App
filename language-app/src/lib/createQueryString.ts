export const createQueryString = (
  searchParams: URLSearchParams | string,
  name: string,
  value: string
): string => {
  const params = new URLSearchParams(searchParams.toString());
  if (value) {
    params.set(name, value);
  } else {
    params.delete(name);
  }

  return params.toString();
};

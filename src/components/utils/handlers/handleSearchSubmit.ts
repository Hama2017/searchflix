export const handleSearchSubmit = (
  e: React.SyntheticEvent,
  query: string,
  onSearch: (query: string) => void
) => {
  e.preventDefault();
  if (query.trim()) onSearch(query.trim());
}

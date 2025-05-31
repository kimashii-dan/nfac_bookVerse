export default function ErrorFallback({ error }: { error: string }) {
  return (
    <div className="message-centered">
      <h2>Something went wrong.</h2>
      <pre>Error: {error}</pre>
    </div>
  );
}

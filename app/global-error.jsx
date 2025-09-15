"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div style={{ padding: 24 }}>
          <h2>Something went wrong!</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{String(error?.message || '')}</pre>
          <button onClick={() => reset()}>Try again</button>
        </div>
      </body>
    </html>
  );
}


type JsonLdProps = {
  data: Record<string, unknown> | null;
};

/** A single safe renderer for structured data. Keeping serialization in
 * one place makes every schema block server-rendered and inspectable. */
export function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "6rem 1.5rem",
        maxWidth: 500,
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2rem",
          fontWeight: 500,
          marginBottom: "0.75rem",
        }}
      >
        Página no encontrada
      </h1>
      <p
        style={{
          color: "var(--on-surface-muted)",
          marginBottom: "2rem",
          fontSize: "0.95rem",
        }}
      >
        La receta o categoría que buscas no existe.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          padding: "0.75rem 2rem",
          background: "linear-gradient(135deg, var(--primary), var(--primary-container))",
          color: "var(--on-primary)",
          borderRadius: "var(--radius-md)",
          fontWeight: 600,
          fontSize: "0.8rem",
          letterSpacing: "0.06em",
          textTransform: "uppercase" as const,
        }}
      >
        Volver al Inicio
      </Link>
    </div>
  );
}

import "./globals.css";

export default function NotFound() {
  const hibiscusCount = 404;
  const randomIndex = Math.floor(Math.random() * hibiscusCount);

  const errorText = "ERREUR 404 : Page introuvable";

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">

      {/* 🌺 Hibiscus animés qui traversent l'écran */}
      {Array.from({ length: hibiscusCount }).map((_, i) => {
        const top = Math.random() * 100;
        const duration = 10 + Math.random() * 10;
        const delay = Math.random() * -20;
        const amplitude = Math.random() * 60 - 30; // oscillation Y

        return (
          <span
            key={i}
            className={`hibiscus ${i === randomIndex ? "hibiscus-404" : ""}`}
            style={{
              top: `${top}vh`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              "--amplitude": `${amplitude}px`,
            } as React.CSSProperties}
          >
            🌺
            {i === randomIndex && <em>404</em>}
          </span>
        );
      })}

      {/* Texte */}
      <div className="relative z-10 text-center px-6 space-y-4">
        <div className="glitch-container">
          {errorText.split("").map((char, i) => (
            <span key={i}>{char === " " ? "\u00A0" : char}</span>
          ))}
        </div>

        <h2 className="text-3xl md:text-4xl font-semibold">
          Oups… une de nos fleurs d&rsquo;hibiscus s&rsquo;est amusée à voler cette page !
        </h2>

        <a
          href="/"
          className="mt-6 inline-block text-lg text-gold hover:text-bissap transition"
        >
          Retourner à l&rsquo;accueil
        </a>
      </div>
    </div>
  );
}
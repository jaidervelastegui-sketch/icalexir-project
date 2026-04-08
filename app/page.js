"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Camera,
  MessageCircle,
  Radio,
  Sparkles,
  Play,
  ArrowUpRight,
} from "lucide-react";

function formatFollowers(value) {
  if (value == null) return "--";
  return new Intl.NumberFormat("es-EC").format(value);
}

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 2 + Math.random() * 4,
        duration: 5 + Math.random() * 5,
        delay: Math.random() * 4,
      })),
    []
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: "999px",
            background: "rgba(255,255,255,0.78)",
            boxShadow: "0 0 18px rgba(255,80,170,0.22)",
          }}
          animate={{
            y: [0, -22, 0],
            x: [0, p.id % 2 === 0 ? 7 : -7, 0],
            opacity: [0.08, 0.55, 0.1],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function InteractiveCard({ children, href, style, delay = 0, target = "_blank", rel = "noreferrer" }) {
  const [glow, setGlow] = useState({ x: "50%", y: "50%", visible: 0 });

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, scale: 1.018 }}
      whileTap={{ scale: 0.992 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setGlow({
          x: `${e.clientX - rect.left}px`,
          y: `${e.clientY - rect.top}px`,
          visible: 1,
        });
      }}
      onMouseEnter={() => setGlow((g) => ({ ...g, visible: 1 }))}
      onMouseLeave={() => setGlow((g) => ({ ...g, visible: 0 }))}
      style={{
        ...style,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: glow.visible,
          transition: "opacity 0.28s ease",
          pointerEvents: "none",
          background: `radial-gradient(240px circle at ${glow.x} ${glow.y}, rgba(255,90,170,0.18), transparent 42%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          boxShadow: glow.visible
            ? "inset 0 0 0 1px rgba(255,255,255,0.14), 0 24px 70px rgba(255,90,170,0.10)"
            : "inset 0 0 0 1px rgba(255,255,255,0.02)",
          transition: "all 0.28s ease",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </motion.a>
  );
}

export default function Page() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [displayFollowers, setDisplayFollowers] = useState(0);
  const [updatedAt, setUpdatedAt] = useState("");
  const [status, setStatus] = useState("loading");

  const animatedValueRef = useRef(0);
  const animationRef = useRef(null);
  const hasLoadedOnceRef = useRef(false);

  const socials = [
    {
      label: "TikTok",
      note: "VIDEOS VIRALES",
      action: "Ver contenido",
      href: "https://www.tiktok.com/@icalexir",
      icon: Play,
    },
    {
      label: "Instagram",
      note: "MARCA PERSONAL",
      action: "Ver perfil",
      href: "https://www.instagram.com/icalexir/",
      icon: Camera,
    },
    {
      label: "Kick",
      note: "STREAM EN VIVO",
      action: "Ver stream",
      href: "https://kick.com/icalexirk",
      icon: Radio,
    },
    {
      label: "WhatsApp",
      note: "TRABAJA CONMIGO",
      action: "Escríbeme",
      href: "https://wa.me/593978997065",
      icon: MessageCircle,
    },
  ];

  async function cargarStats() {
    try {
      const res = await fetch("/api/stats", {
        cache: "no-store",
      });

      const rawText = await res.text();

      let data;
      try {
        data = JSON.parse(rawText);
      } catch {
        throw new Error("La API devolvió una respuesta inválida");
      }

      if (!res.ok) {
        throw new Error(data?.error || "No se pudieron cargar las estadísticas");
      }

      if (data?.data?.user) {
        setUser(data.data.user);
        setUpdatedAt(new Date().toLocaleTimeString("es-EC"));
        setStatus("online");
        setError("");
        hasLoadedOnceRef.current = true;
      } else {
        throw new Error("Respuesta inválida de la API");
      }
    } catch (err) {
      const message = err?.message || "Error cargando estadísticas";

      if (hasLoadedOnceRef.current && user) {
        setStatus("stale");
        setError(`Último dato conservado. ${message}`);
      } else {
        setStatus("offline");
        setError(message);
      }
    }
  }

  useEffect(() => {
    cargarStats();
    const interval = setInterval(cargarStats, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!user?.follower_count && user?.follower_count !== 0) return;

    const start = animatedValueRef.current;
    const target = user.follower_count;

    if (start === target) return;

    const duration = 1100;
    const startTime = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(start + (target - start) * eased);

      animatedValueRef.current = current;
      setDisplayFollowers(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [user?.follower_count]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(190,24,93,0.24), transparent 22%), radial-gradient(circle at 80% 15%, rgba(34,211,238,0.11), transparent 18%), #050505",
        color: "white",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <FloatingParticles />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          opacity: 0.08,
          pointerEvents: "none",
        }}
      />

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(16px)",
          background: "rgba(5,5,5,0.72)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: "1220px",
            margin: "0 auto",
            padding: "18px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 900,
                letterSpacing: "0.04em",
                textTransform: "lowercase",
              }}
            >
              icalexir
            </div>
          </div>

          <nav style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
            <a href="#inicio" style={navLink}>Inicio</a>
            <a href="#redes" style={navLink}>Redes</a>
            <a href="#contador" style={navLink}>Comunidad</a>
            <a href="#contacto" style={navLink}>Contacto</a>
          </nav>
        </div>
      </header>

      <main>
        <section id="inicio">
          <div
            style={{
              maxWidth: "1220px",
              margin: "0 auto",
              padding: "88px 24px 70px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "30px",
                alignItems: "center",
              }}
            >
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={fadeUp} style={badge}>
                  Creador de contenido
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    margin: "22px 0 0 0",
                    fontSize: "clamp(56px, 10vw, 118px)",
                    lineHeight: 0.88,
                    fontWeight: 900,
                    letterSpacing: "-0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  ALEXIS GER
                </motion.h1>

                <motion.div
                  variants={fadeUp}
                  transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    marginTop: "16px",
                    fontSize: "clamp(16px, 2.4vw, 24px)",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    textTransform: "lowercase",
                    color: "rgba(255,255,255,0.72)",
                  }}
                >
                  icalexir
                </motion.div>

                <motion.h2
                  variants={fadeUp}
                  transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    margin: "30px 0 0 0",
                    fontSize: "clamp(34px, 5.5vw, 72px)",
                    lineHeight: 0.95,
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    maxWidth: "760px",
                  }}
                >
                  Si no destaca,
                  <span
                    style={{
                      display: "block",
                      background: "linear-gradient(90deg, #ff4ea4, #ffffff, #6ee7ff)",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    no existe.
                  </span>
                </motion.h2>

                <motion.p
                  variants={fadeUp}
                  transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    marginTop: "22px",
                    maxWidth: "670px",
                    color: "rgba(255,255,255,0.62)",
                    fontSize: "18px",
                    lineHeight: 1.9,
                  }}
                >
                  Creador de contenido y estudiante audiovisual. Aquí encuentras todas mis redes y formas de contacto.
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  style={{
                    display: "flex",
                    gap: "14px",
                    flexWrap: "wrap",
                    marginTop: "30px",
                  }}
                >
                  <motion.a
                    whileHover={{
                      y: -2,
                      scale: 1.02,
                      boxShadow: "0 0 42px rgba(255,78,164,0.38)",
                    }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.22 }}
                    href="https://www.instagram.com/channel/AbaWPIu14iKSAHJD/"
                    target="_blank"
                    rel="noreferrer"
                    style={primaryButton}
                  >
                    Ver contenido
                  </motion.a>

                  <motion.a
                    whileHover={{
                      y: -2,
                      scale: 1.02,
                      boxShadow: "0 0 28px rgba(255,255,255,0.08)",
                      borderColor: "rgba(255,255,255,0.22)",
                    }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.22 }}
                    href="#contacto"
                    style={secondaryButton}
                  >
                    Trabajar conmigo
                  </motion.a>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.982 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={glassWrap}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.35 }}
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "28px",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <img
                      src="/hero.jpg"
                      alt="Alexis Ger"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80";
                      }}
                      style={{
                        width: "100%",
                        height: "560px",
                        display: "block",
                        objectFit: "cover",
                        objectPosition: "center",
                        transition: "transform 0.7s ease",
                      }}
                    />

                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.16), transparent)",
                      }}
                    />

                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        boxShadow: "inset 0 0 120px rgba(255,80,170,0.12)",
                        pointerEvents: "none",
                      }}
                    />

                    <div
                      style={{
                        position: "absolute",
                        left: "24px",
                        right: "24px",
                        bottom: "24px",
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "18px",
                        flexWrap: "wrap",
                        alignItems: "end",
                      }}
                    >
                      <div>
                        <div style={miniBadge}>
                          retrato oficial
                        </div>

                        <p
                          style={{
                            margin: "16px 0 0 0",
                            color: "rgba(255,255,255,0.72)",
                            maxWidth: "420px",
                            lineHeight: 1.8,
                          }}
                        >
                          Presencia visual, identidad propia y una landing con carácter.
                        </p>
                      </div>

                      <div style={statusCard}>
                        <div style={statusLabel}>estado</div>
                        <div style={statusValue}>creativo activo</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="redes">
          <div
            style={{
              maxWidth: "1220px",
              margin: "0 auto",
              padding: "0 24px 70px",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55 }}
              style={glassWrap}
            >
              <div
                style={{
                  color: "rgba(255,255,255,0.42)",
                  fontSize: "12px",
                  letterSpacing: "0.02em",
                  lineHeight: 1.7,
                }}
              >
                Cada plataforma, una forma distinta de destacar
              </div>

              <div
                style={{
                  marginTop: "12px",
                  fontSize: "clamp(28px, 4vw, 44px)",
                  fontWeight: 900,
                  textTransform: "uppercase",
                }}
              >
                Mis redes sociales
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "14px",
                  marginTop: "24px",
                }}
              >
                {socials.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <InteractiveCard
                      key={item.label}
                      href={item.href}
                      delay={index * 0.06}
                      style={socialCard}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "start",
                          gap: "12px",
                        }}
                      >
                        <div
                          style={{
                            color: "rgba(255,255,255,0.4)",
                            fontSize: "11px",
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                          }}
                        >
                          {item.note}
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.08, rotate: -4 }}
                          transition={{ duration: 0.22 }}
                          style={iconWrap}
                        >
                          <Icon size={18} strokeWidth={2.1} />
                        </motion.div>
                      </div>

                      <div
                        style={{
                          marginTop: "18px",
                          fontSize: "26px",
                          fontWeight: 800,
                          textTransform: "uppercase",
                        }}
                      >
                        {item.label}
                      </div>

                      <motion.div
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          marginTop: "18px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "10px 14px",
                          borderRadius: "999px",
                          border: "1px solid rgba(255,255,255,0.1)",
                          background: "rgba(0,0,0,0.22)",
                          fontSize: "11px",
                          textTransform: "uppercase",
                          letterSpacing: "0.18em",
                          color: "rgba(255,255,255,0.78)",
                          transition: "all 0.28s ease",
                          boxShadow: "0 0 0 rgba(0,0,0,0)",
                        }}
                      >
                        {item.action}
                        <ArrowUpRight size={14} />
                      </motion.div>
                    </InteractiveCard>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="contador">
          <div
            style={{
              maxWidth: "1220px",
              margin: "0 auto",
              padding: "0 24px 90px",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={glassWrap}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  gap: "20px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.38)",
                      fontSize: "12px",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                    }}
                  >
                    contador real de seguidores
                  </div>

                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "16px" }}>
                    <div style={tiktokBadge}>TikTok</div>

                    <div
                      style={
                        status === "online"
                          ? onlineBadge
                          : status === "stale"
                          ? staleBadge
                          : offlineBadge
                      }
                    >
                      {status === "online"
                        ? "online"
                        : status === "stale"
                        ? "último dato"
                        : status === "loading"
                        ? "cargando"
                        : "offline"}
                    </div>
                  </div>
                </div>

                <div style={updateCard}>
                  <div style={updateLabel}>Última actualización</div>
                  <div style={updateValue}>{updatedAt || "--:--:--"}</div>
                </div>
              </div>

              <motion.div
                animate={{
                  textShadow:
                    status === "online"
                      ? [
                          "0 0 18px rgba(255,78,164,0.20)",
                          "0 0 36px rgba(255,78,164,0.34)",
                          "0 0 18px rgba(255,78,164,0.20)",
                        ]
                      : "0 0 18px rgba(255,255,255,0.08)",
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  marginTop: "34px",
                  fontSize: "clamp(54px, 10vw, 108px)",
                  lineHeight: 0.95,
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  color: status === "offline" ? "#ffffff" : "#ff4ea4",
                }}
              >
                {formatFollowers(displayFollowers)}
              </motion.div>

              <div
                style={{
                  marginTop: "12px",
                  color: "rgba(255,255,255,0.58)",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontSize: "12px",
                }}
              >
                seguidores en TikTok
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "16px",
                  marginTop: "28px",
                }}
              >
                <div style={infoCard}>
                  <div style={infoLabel}>Usuario</div>
                  <div style={infoValue}>@{user?.username || "icalexir"}</div>
                </div>

                <div style={infoCard}>
                  <div style={infoLabel}>Fuente</div>
                  <div style={infoValue}>API /api/stats</div>
                </div>
              </div>

              {error && (
                <div
                  style={{
                    marginTop: "18px",
                    color: status === "stale" ? "#ffd58a" : "#ff9b9b",
                    fontSize: "13px",
                    opacity: 0.92,
                  }}
                >
                  {error}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        <section id="contacto">
          <div
            style={{
              maxWidth: "1220px",
              margin: "0 auto",
              padding: "0 24px 90px",
              textAlign: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.36)",
                }}
              >
                contacto / acceso
              </div>

              <a
                href="https://www.instagram.com/icalexir/"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "18px",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "clamp(28px, 5vw, 52px)",
                  lineHeight: 1,
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                @icalexir
              </a>

              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div style={footerGlow}>
                  <Sparkles size={14} />
                  presencia digital con intención
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

const navLink = {
  color: "rgba(255,255,255,0.72)",
  textDecoration: "none",
  fontSize: "12px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  transition: "all 0.28s ease",
};

const badge = {
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px 16px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.04)",
  color: "rgba(255,255,255,0.72)",
  letterSpacing: "0.04em",
  fontSize: "12px",
  boxShadow: "0 0 24px rgba(255,255,255,0.03)",
};

const glassWrap = {
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
  border: "1px solid rgba(255,255,255,0.09)",
  boxShadow: "0 20px 80px rgba(0,0,0,0.45)",
  backdropFilter: "blur(10px)",
  borderRadius: "34px",
  padding: "22px",
};

const primaryButton = {
  textDecoration: "none",
  color: "#fff",
  background: "linear-gradient(135deg, #d10071, #ff3f98)",
  padding: "15px 24px",
  borderRadius: "18px",
  fontWeight: 800,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  boxShadow: "0 0 40px rgba(209,0,113,0.35)",
  fontSize: "13px",
  transition: "all 0.28s ease",
};

const secondaryButton = {
  textDecoration: "none",
  color: "rgba(255,255,255,0.78)",
  padding: "15px 22px",
  borderRadius: "18px",
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.03)",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  fontSize: "13px",
  transition: "all 0.28s ease",
};

const miniBadge = {
  display: "inline-block",
  padding: "10px 14px",
  borderRadius: "999px",
  background: "rgba(0,0,0,0.38)",
  border: "1px solid rgba(255,255,255,0.12)",
  fontSize: "11px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.78)",
};

const statusCard = {
  padding: "14px 16px",
  borderRadius: "20px",
  background: "rgba(0,0,0,0.38)",
  border: "1px solid rgba(255,255,255,0.12)",
  minWidth: "180px",
};

const statusLabel = {
  color: "rgba(255,255,255,0.4)",
  fontSize: "11px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
};

const statusValue = {
  marginTop: "10px",
  fontSize: "18px",
  fontWeight: 800,
  textTransform: "uppercase",
};

const socialCard = {
  textDecoration: "none",
  color: "white",
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025))",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "28px",
  padding: "20px",
  boxSizing: "border-box",
  boxShadow: "0 16px 50px rgba(0,0,0,0.28)",
  transition: "all 0.32s ease",
};

const iconWrap = {
  width: "38px",
  height: "38px",
  display: "grid",
  placeItems: "center",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#ffffff",
  boxShadow: "0 0 20px rgba(255,80,170,0.08)",
};

const tiktokBadge = {
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px 14px",
  borderRadius: "999px",
  background: "rgba(255,60,149,0.1)",
  border: "1px solid rgba(255,60,149,0.22)",
  color: "#ff64af",
  fontSize: "11px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  fontWeight: 800,
};

const onlineBadge = {
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px 14px",
  borderRadius: "999px",
  background: "rgba(34,211,238,0.1)",
  border: "1px solid rgba(34,211,238,0.22)",
  color: "#6ee7ff",
  fontSize: "11px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  fontWeight: 800,
};

const staleBadge = {
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px 14px",
  borderRadius: "999px",
  background: "rgba(255,190,60,0.1)",
  border: "1px solid rgba(255,190,60,0.22)",
  color: "#ffd58a",
  fontSize: "11px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  fontWeight: 800,
};

const offlineBadge = {
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px 14px",
  borderRadius: "999px",
  background: "rgba(255,90,90,0.1)",
  border: "1px solid rgba(255,90,90,0.22)",
  color: "#ff9b9b",
  fontSize: "11px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  fontWeight: 800,
};

const updateCard = {
  minWidth: "220px",
  padding: "16px",
  borderRadius: "22px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.03)",
};

const updateLabel = {
  color: "rgba(255,255,255,0.38)",
  fontSize: "11px",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
};

const updateValue = {
  marginTop: "12px",
  fontSize: "20px",
  fontWeight: 800,
};

const infoCard = {
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025))",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "28px",
  padding: "22px",
  boxSizing: "border-box",
  boxShadow: "0 16px 50px rgba(0,0,0,0.28)",
};

const infoLabel = {
  color: "rgba(255,255,255,0.38)",
  fontSize: "11px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
};

const infoValue = {
  marginTop: "10px",
  fontSize: "20px",
  fontWeight: 800,
};

const footerGlow = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "10px 14px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "rgba(255,255,255,0.72)",
  fontSize: "12px",
  letterSpacing: "0.08em",
  textTransform: "lowercase",
  boxShadow: "0 0 28px rgba(255,80,170,0.08)",
};

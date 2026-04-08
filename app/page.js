"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, rgba(185, 0, 92, 0.26), transparent 24%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05), transparent 18%), #050505",
    color: "#ffffff",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    overflowX: "hidden",
  },
  container: {
    width: "100%",
    maxWidth: "1220px",
    margin: "0 auto",
    paddingLeft: "24px",
    paddingRight: "24px",
    boxSizing: "border-box",
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 40,
    backdropFilter: "blur(18px)",
    background: "rgba(5,5,5,0.72)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  navLink: {
    color: "rgba(255,255,255,0.72)",
    textDecoration: "none",
    fontSize: "13px",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    transition: "all 0.25s ease",
  },
  heroTitle: {
    margin: 0,
    fontSize: "clamp(54px, 11vw, 124px)",
    lineHeight: 0.9,
    fontWeight: 900,
    letterSpacing: "-0.03em",
    textTransform: "uppercase",
  },
  glass: {
    background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
    border: "1px solid rgba(255,255,255,0.09)",
    boxShadow: "0 20px 80px rgba(0,0,0,0.45)",
    backdropFilter: "blur(10px)",
  },
  card: {
    background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025))",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "28px",
    padding: "24px",
    boxSizing: "border-box",
    boxShadow: "0 16px 50px rgba(0,0,0,0.28)",
  },
  sectionLabel: {
    fontSize: "12px",
    letterSpacing: "0.32em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.38)",
    marginBottom: "12px",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "clamp(32px, 5vw, 56px)",
    lineHeight: 0.95,
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "-0.02em",
  },
};

export default function Page() {
  const products = [
    {
      code: "001/100",
      title: "Hoodie Hipergamia",
      description:
        "Oversized fit, composición frontal minimal y presencia visual diseñada para un drop limitado.",
    },
    {
      code: "Core Piece",
      title: "T-Shirt ICAL EXIR",
      description:
        "Base monocromática premium con energía urbana, limpia y lista para convertirse en pieza central.",
    },
    {
      code: "No Restock",
      title: "Access Layer",
      description:
        "Una propuesta construida alrededor de selección, exclusividad y deseo, no de saturación.",
    },
  ];

  const lookbook = [
    {
      title: "Front Identity",
      text: "Marca directa, limpia y reconocible desde lejos.",
    },
    {
      title: "Back Statement",
      text: "Mensajes fuertes con composición editorial y actitud street premium.",
    },
    {
      title: "Drop Mood",
      text: "Negro, brillo magenta y una sensación digital selectiva.",
    },
  ];

  const feed = [
    "Logo reveal",
    "Product detail",
    "Drop teaser",
    "Fit preview",
    "Back graphic",
    "Access soon",
  ];

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div
          style={{
            ...styles.container,
            minHeight: "78px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 900,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
              }}
            >
              ICAL EXIR
            </div>
            <div
              style={{
                marginTop: "6px",
                fontSize: "11px",
                color: "rgba(255,255,255,0.42)",
                textTransform: "uppercase",
                letterSpacing: "0.26em",
              }}
            >
              @icalexir
            </div>
          </div>

          <nav style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
            <a href="#drop" style={styles.navLink}>Drop</a>
            <a href="#lookbook" style={styles.navLink}>Lookbook</a>
            <a href="#feed" style={styles.navLink}>Feed</a>
            <a href="#contact" style={styles.navLink}>Access</a>
          </nav>
        </div>
      </header>

      <main>
        <section style={{ position: "relative" }}>
          <div style={{ ...styles.container, paddingTop: "92px", paddingBottom: "86px" }}>
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
                <motion.div variants={fadeUp}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 16px",
                      borderRadius: "999px",
                      border: "1px solid rgba(255,255,255,0.11)",
                      background: "rgba(255,255,255,0.04)",
                      color: "rgba(255,255,255,0.65)",
                      textTransform: "uppercase",
                      letterSpacing: "0.22em",
                      fontSize: "12px",
                    }}
                  >
                    Streetwear / Y2K / Premium
                  </div>
                </motion.div>

                <motion.h1 variants={fadeUp} style={{ ...styles.heroTitle, marginTop: "22px" }}>
                  Hipergamia
                </motion.h1>

                <motion.div
                  variants={fadeUp}
                  style={{
                    marginTop: "16px",
                    color: "#ff3c95",
                    fontSize: "14px",
                    fontWeight: 800,
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                  }}
                >
                  Limited Drop · 001/100
                </motion.div>

                <motion.p
                  variants={fadeUp}
                  style={{
                    marginTop: "26px",
                    maxWidth: "680px",
                    fontSize: "18px",
                    lineHeight: 1.9,
                    color: "rgba(255,255,255,0.62)",
                  }}
                >
                  Una marca construida con intención real. Oscura, urbana y selectiva. ICAL EXIR no busca verse genérica: busca sentirse como una identidad sólida, deseable y lista para convertirse en cultura.
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "30px" }}
                >
                  <a
                    href="https://instagram.com/icalexir"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                      background: "linear-gradient(135deg, #d10071, #ff3f98)",
                      padding: "15px 24px",
                      borderRadius: "18px",
                      fontWeight: 800,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      boxShadow: "0 0 40px rgba(209,0,113,0.35)",
                    }}
                  >
                    Join the drop
                  </a>

                  <div
                    style={{
                      padding: "15px 22px",
                      borderRadius: "18px",
                      border: "1px solid rgba(255,255,255,0.14)",
                      color: "rgba(255,255,255,0.58)",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontSize: "13px",
                      background: "rgba(255,255,255,0.03)",
                    }}
                  >
                    No restock
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <div
                  style={{
                    ...styles.glass,
                    borderRadius: "34px",
                    padding: "22px",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                      gap: "16px",
                    }}
                  >
                    <div style={{ ...styles.card, minHeight: "245px" }}>
                      <div
                        style={{
                          height: "130px",
                          borderRadius: "22px",
                          border: "1px dashed rgba(255,255,255,0.12)",
                          background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.35))",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "rgba(255,255,255,0.36)",
                          letterSpacing: "0.24em",
                          textTransform: "uppercase",
                          fontSize: "12px",
                        }}
                      >
                        Front Visual
                      </div>
                      <div
                        style={{
                          marginTop: "22px",
                          fontSize: "40px",
                          fontWeight: 900,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                        }}
                      >
                        IX
                      </div>
                      <div
                        style={{
                          marginTop: "8px",
                          color: "rgba(255,255,255,0.44)",
                          fontSize: "12px",
                          letterSpacing: "0.26em",
                          textTransform: "uppercase",
                        }}
                      >
                        Core symbol
                      </div>
                    </div>

                    <div
                      style={{
                        ...styles.card,
                        minHeight: "245px",
                        background:
                          "linear-gradient(180deg, rgba(255,50,140,0.11), rgba(255,255,255,0.03))",
                      }}
                    >
                      <div
                        style={{
                          height: "130px",
                          borderRadius: "22px",
                          border: "1px dashed rgba(255,255,255,0.12)",
                          background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.35))",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "rgba(255,255,255,0.36)",
                          letterSpacing: "0.24em",
                          textTransform: "uppercase",
                          fontSize: "12px",
                        }}
                      >
                        Back Visual
                      </div>
                      <div
                        style={{
                          marginTop: "22px",
                          fontSize: "28px",
                          fontWeight: 900,
                          textTransform: "uppercase",
                          lineHeight: 1,
                        }}
                      >
                        Hipergamia
                      </div>
                      <div
                        style={{
                          marginTop: "10px",
                          color: "#ff4fa4",
                          fontSize: "12px",
                          letterSpacing: "0.28em",
                          textTransform: "uppercase",
                        }}
                      >
                        001/100
                      </div>
                    </div>

                    <div style={{ ...styles.card, gridColumn: "1 / -1" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "10px",
                          flexWrap: "wrap",
                          color: "rgba(255,255,255,0.38)",
                          fontSize: "12px",
                          letterSpacing: "0.24em",
                          textTransform: "uppercase",
                        }}
                      >
                        <span>Campaign direction</span>
                        <span>Luxury street energy</span>
                      </div>
                      <div
                        style={{
                          marginTop: "20px",
                          fontSize: "clamp(26px, 4vw, 42px)",
                          fontWeight: 900,
                          lineHeight: 1,
                          textTransform: "uppercase",
                        }}
                      >
                        Only selected understand.
                      </div>
                      <p
                        style={{
                          marginTop: "14px",
                          marginBottom: 0,
                          color: "rgba(255,255,255,0.58)",
                          lineHeight: 1.85,
                          maxWidth: "760px",
                        }}
                      >
                        La intención visual no es solo verse bien. Es crear presencia, recordación y una atmósfera que se sienta exclusiva incluso antes de lanzar el producto.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="drop" style={{ ...styles.container, paddingTop: "20px", paddingBottom: "88px" }}>
          <div style={{ marginBottom: "30px" }}>
            <div style={styles.sectionLabel}>First limited drop</div>
            <h2 style={styles.sectionTitle}>Access through product</h2>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "18px",
            }}
          >
            {products.map((product) => (
              <motion.div key={product.title} variants={fadeUp} style={styles.card}>
                <div
                  style={{
                    color: "#ff4ea4",
                    fontSize: "12px",
                    letterSpacing: "0.26em",
                    textTransform: "uppercase",
                  }}
                >
                  {product.code}
                </div>
                <h3
                  style={{
                    marginTop: "18px",
                    marginBottom: 0,
                    fontSize: "30px",
                    fontWeight: 800,
                    lineHeight: 1,
                  }}
                >
                  {product.title}
                </h3>
                <p
                  style={{
                    marginTop: "16px",
                    marginBottom: 0,
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.85,
                  }}
                >
                  {product.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section
          id="lookbook"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <div style={{ ...styles.container, paddingTop: "88px", paddingBottom: "88px" }}>
            <div style={{ marginBottom: "30px" }}>
              <div style={styles.sectionLabel}>Lookbook direction</div>
              <h2 style={styles.sectionTitle}>Professional visual system</h2>
            </div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "18px",
              }}
            >
              {lookbook.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    ...styles.card,
                    minHeight: "330px",
                    display: "flex",
                    alignItems: "end",
                    background:
                      index === 1
                        ? "linear-gradient(180deg, rgba(255,65,155,0.12), rgba(0,0,0,0.42))"
                        : "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.42))",
                  }}
                >
                  <div>
                    <div
                      style={{
                        color: "rgba(255,255,255,0.38)",
                        fontSize: "12px",
                        letterSpacing: "0.26em",
                        textTransform: "uppercase",
                      }}
                    >
                      Frame 0{index + 1}
                    </div>
                    <h3
                      style={{
                        marginTop: "14px",
                        marginBottom: 0,
                        fontSize: "30px",
                        lineHeight: 1,
                        fontWeight: 900,
                        textTransform: "uppercase",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        marginTop: "16px",
                        marginBottom: 0,
                        color: "rgba(255,255,255,0.6)",
                        lineHeight: 1.85,
                      }}
                    >
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="feed" style={{ ...styles.container, paddingTop: "88px", paddingBottom: "88px" }}>
          <div style={{ marginBottom: "30px" }}>
            <div style={styles.sectionLabel}>Instagram architecture</div>
            <h2 style={styles.sectionTitle}>Feed with real intention</h2>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            {feed.map((item, index) => (
              <motion.div key={item} variants={fadeUp} style={styles.card} whileHover={{ y: -4 }}>
                <div
                  style={{
                    height: "160px",
                    borderRadius: "20px",
                    border: "1px dashed rgba(255,255,255,0.1)",
                    background:
                      index % 2 === 0
                        ? "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.38))"
                        : "linear-gradient(180deg, rgba(255,55,148,0.1), rgba(0,0,0,0.38))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.34)",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.24em",
                  }}
                >
                  Post 0{index + 1}
                </div>
                <div
                  style={{
                    marginTop: "18px",
                    fontSize: "22px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                  }}
                >
                  {item}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ ...styles.container, paddingTop: "88px", paddingBottom: "88px", textAlign: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div style={styles.sectionLabel}>Access message</div>
              <h2 style={{ ...styles.sectionTitle, maxWidth: "920px", margin: "0 auto" }}>
                This is not just a page. It is the first serious form of the brand.
              </h2>
              <p
                style={{
                  maxWidth: "840px",
                  margin: "24px auto 0",
                  color: "rgba(255,255,255,0.62)",
                  lineHeight: 1.9,
                  fontSize: "18px",
                }}
              >
                El objetivo ahora no es parecer una tienda cualquiera. Es transmitir visión, cuidado, profesionalismo y una identidad que se siente construida con intención real. El siguiente paso natural es convertir esta atención en acceso y comunidad.
              </p>

              <div
                style={{
                  marginTop: "28px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 22px",
                  borderRadius: "999px",
                  background: "rgba(255,60,149,0.1)",
                  border: "1px solid rgba(255,60,149,0.24)",
                  color: "#ff5aaa",
                  fontSize: "13px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 800,
                }}
              >
                Access is limited
              </div>
            </motion.div>
          </div>
        </section>

        <section id="contact" style={{ ...styles.container, paddingTop: "10px", paddingBottom: "90px", textAlign: "center" }}>
          <div
            style={{
              fontSize: "12px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.36)",
            }}
          >
            Contact / Access
          </div>
          <a
            href="https://instagram.com/icalexir"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              marginTop: "18px",
              color: "#fff",
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
        </section>
      </main>
    </div>
  );
}
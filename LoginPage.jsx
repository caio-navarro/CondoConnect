import React, { useState } from "react";
import { ReactDOM } from "next/dist/server/route-modules/app-page/vendored/rsc/entrypoints";

const LoginPage = () => {
  const [userType, setUserType] = useState(null); // null, 'resident', 'admin'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { userType, email, password });
  };

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setEmail("");
    setPassword("");
  };

  const handleBack = () => {
    setUserType(null);
    setEmail("");
    setPassword("");
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginCard}>
        <div style={styles.logoContainer}>
          <svg
            style={styles.logoIcon}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 45 L50 30 L70 45 L70 70 L30 70 Z"
              fill="none"
              stroke="white"
              strokeWidth="3"
            />
            <rect x="42" y="55" width="16" height="15" fill="white" />
            <rect x="35" y="50" width="8" height="8" fill="white" />
            <rect x="57" y="50" width="8" height="8" fill="white" />

            <path
              d="M15 55 L25 47 L35 55 L35 75 L15 75 Z"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            />
            <rect x="20" y="63" width="10" height="12" fill="white" />

            <path
              d="M65 55 L75 47 L85 55 L85 75 L65 75 Z"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            />
            <rect x="70" y="63" width="10" height="12" fill="white" />
          </svg>
        </div>

        <h1 style={styles.brandTitle}>CONDOCONNECT</h1>

        {userType === null ? (
          <>
            <p style={styles.welcomeText}>
              Selecione como você
              <br />
              deseja acessar
              <br />o sistema
            </p>

            <div style={styles.userTypeContainer}>
              <button
                style={styles.userTypeButton}
                onClick={() => handleUserTypeSelect("resident")}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(0, 123, 255, 0.15)";
                  e.target.style.borderColor = "#007BFF";
                  e.target.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                <div style={styles.iconWrapper}>
                  <svg
                    style={styles.icon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span style={styles.buttonTitle}>Morador</span>
                <span style={styles.buttonSubtitle}>Acesso de residente</span>
              </button>

              <button
                style={styles.userTypeButton}
                onClick={() => handleUserTypeSelect("admin")}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(0, 123, 255, 0.15)";
                  e.target.style.borderColor = "#007BFF";
                  e.target.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                <div style={styles.iconWrapper}>
                  <svg
                    style={styles.icon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span style={styles.buttonTitle}>Administrador/Síndico</span>
                <span style={styles.buttonSubtitle}>Acesso administrativo</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              style={styles.backButton}
              onClick={handleBack}
              onMouseEnter={(e) => {
                e.target.style.color = "#007BFF";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "rgba(255, 255, 255, 0.7)";
              }}
            >
              ← Voltar
            </button>

            <p style={styles.welcomeText}>
              {userType === "resident"
                ? "Acesso de Morador"
                : "Acesso Administrativo"}
              <br />
              Entre com suas credenciais
              <br />
              para continuar
            </p>

            <form style={styles.loginForm} onSubmit={handleSubmit}>
              <input
                type="email"
                style={styles.inputField}
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "#007BFF")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255, 255, 255, 0.3)")
                }
                required
              />

              <input
                type="password"
                style={styles.inputField}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "#007BFF")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255, 255, 255, 0.3)")
                }
                required
              />

              <button
                type="submit"
                style={styles.submitButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#0056b3";
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 6px 20px rgba(0, 123, 255, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#007BFF";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 4px 12px rgba(0, 123, 255, 0.3)";
                }}
              >
                ENTRAR
              </button>
            </form>

            <a
              href="#"
              style={styles.forgotPassword}
              onMouseEnter={(e) => {
                e.target.style.color = "#007BFF";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "rgba(255, 255, 255, 0.6)";
              }}
            >
              Esqueceu sua senha?
            </a>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#001B3D",
    padding: "16px",
    fontFamily:
      "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  loginCard: {
    backgroundColor: "#00224E",
    borderRadius: "12px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    position: "relative",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  logoIcon: {
    width: "80px",
    height: "80px",
  },
  brandTitle: {
    color: "#FFFFFF",
    fontSize: "20px",
    fontWeight: "600",
    letterSpacing: "2px",
    margin: "0 0 24px 0",
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "1.5",
    margin: "0 0 32px 0",
    opacity: "0.95",
  },
  userTypeContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  userTypeButton: {
    width: "100%",
    padding: "24px 20px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    outline: "none",
  },
  iconWrapper: {
    marginBottom: "8px",
  },
  icon: {
    width: "40px",
    height: "40px",
    color: "#007BFF",
  },
  buttonTitle: {
    color: "#FFFFFF",
    fontSize: "16px",
    fontWeight: "600",
    display: "block",
  },
  buttonSubtitle: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: "13px",
    fontWeight: "400",
    display: "block",
  },
  backButton: {
    position: "absolute",
    top: "24px",
    left: "24px",
    background: "none",
    border: "none",
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontWeight: "500",
    outline: "none",
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  inputField: {
    width: "100%",
    padding: "14px 16px",
    fontSize: "15px",
    color: "#FFFFFF",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "6px",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  },
  submitButton: {
    width: "100%",
    padding: "14px 16px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#FFFFFF",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "8px",
    letterSpacing: "1px",
    boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)",
    outline: "none",
  },
  forgotPassword: {
    display: "block",
    marginTop: "20px",
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: "13px",
    textDecoration: "none",
    transition: "all 0.3s ease",
  },
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  @media (max-width: 480px) {
    .login-card {
      padding: 32px 24px !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default LoginPage;

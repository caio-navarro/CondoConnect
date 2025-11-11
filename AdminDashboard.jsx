import React, { useState } from "react";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("inicio");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Dados mockados - virão do back-end
  const [residents, setResidents] = useState([
    {
      id: 1,
      name: "João Silva",
      email: "joao@email.com",
      phone: "(11) 98765-4321",
      block: "A",
      unit: "101",
      status: "pending",
      requestDate: "2025-10-15",
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@email.com",
      phone: "(11) 91234-5678",
      block: "B",
      unit: "205",
      status: "pending",
      requestDate: "2025-10-16",
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro@email.com",
      phone: "(11) 99876-5432",
      block: "A",
      unit: "303",
      status: "approved",
      requestDate: "2025-10-10",
    },
  ]);

  const [syndics, setSyndics] = useState([
    {
      id: 1,
      name: "Carlos Oliveira",
      email: "carlos@email.com",
      phone: "(11) 97654-3210",
      status: "pending",
      requestDate: "2025-10-17",
      experience: "5 anos como síndico",
    },
    {
      id: 2,
      name: "Ana Paula",
      email: "ana@email.com",
      phone: "(11) 96543-2109",
      status: "approved",
      requestDate: "2025-10-12",
      experience: "3 anos em administração",
    },
  ]);

  const stats = {
    totalResidents: residents.length,
    pendingResidents: residents.filter((r) => r.status === "pending").length,
    totalSyndics: syndics.length,
    pendingSyndics: syndics.filter((s) => s.status === "pending").length,
  };

  const handleApprove = (type, id) => {
    if (type === "resident") {
      setResidents(
        residents.map((r) => (r.id === id ? { ...r, status: "approved" } : r))
      );
    } else {
      setSyndics(
        syndics.map((s) => (s.id === id ? { ...s, status: "approved" } : s))
      );
    }
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleReject = (type, id) => {
    if (type === "resident") {
      setResidents(
        residents.map((r) => (r.id === id ? { ...r, status: "rejected" } : r))
      );
    } else {
      setSyndics(
        syndics.map((s) => (s.id === id ? { ...s, status: "rejected" } : s))
      );
    }
    setShowModal(false);
    setSelectedUser(null);
  };

  const openModal = (user, type) => {
    setSelectedUser({ ...user, type });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logoSection}>
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
          </svg>
          <h2 style={styles.brandName}>CONDOCONNECT</h2>
          <span style={styles.userRole}>Administrador</span>
        </div>

        <nav style={styles.nav}>
          <button
            style={{
              ...styles.navButton,
              ...(activeSection === "inicio" ? styles.navButtonActive : {}),
            }}
            onClick={() => setActiveSection("inicio")}
          >
            <svg
              style={styles.navIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Início
          </button>

          <button
            style={{
              ...styles.navButton,
              ...(activeSection === "moradores" ? styles.navButtonActive : {}),
            }}
            onClick={() => setActiveSection("moradores")}
          >
            <svg
              style={styles.navIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Moradores
            {stats.pendingResidents > 0 && (
              <span style={styles.badge}>{stats.pendingResidents}</span>
            )}
          </button>

          <button
            style={{
              ...styles.navButton,
              ...(activeSection === "sindicos" ? styles.navButtonActive : {}),
            }}
            onClick={() => setActiveSection("sindicos")}
          >
            <svg
              style={styles.navIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            Síndicos
            {stats.pendingSyndics > 0 && (
              <span style={styles.badge}>{stats.pendingSyndics}</span>
            )}
          </button>
        </nav>

        <button style={styles.logoutButton}>
          <svg
            style={styles.navIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sair
        </button>
      </aside>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h1 style={styles.pageTitle}>
            {activeSection === "inicio" && "Painel Administrativo"}
            {activeSection === "moradores" && "Gerenciar Moradores"}
            {activeSection === "sindicos" && "Gerenciar Síndicos"}
          </h1>
          <div style={styles.userInfo}>
            <span style={styles.userName}>Admin User</span>
            <div style={styles.avatar}>A</div>
          </div>
        </header>

        <div style={styles.contentArea}>
          {/* Seção Início */}
          {activeSection === "inicio" && (
            <div style={styles.section}>
              <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                  <div style={styles.statIcon}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                    </svg>
                  </div>
                  <div style={styles.statContent}>
                    <span style={styles.statLabel}>Total de Moradores</span>
                    <span style={styles.statValue}>{stats.totalResidents}</span>
                  </div>
                </div>

                <div style={styles.statCard}>
                  <div
                    style={{
                      ...styles.statIcon,
                      backgroundColor: "rgba(255, 193, 7, 0.1)",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFC107"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div style={styles.statContent}>
                    <span style={styles.statLabel}>Moradores Pendentes</span>
                    <span style={styles.statValue}>
                      {stats.pendingResidents}
                    </span>
                  </div>
                </div>

                <div style={styles.statCard}>
                  <div
                    style={{
                      ...styles.statIcon,
                      backgroundColor: "rgba(156, 39, 176, 0.1)",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9C27B0"
                      strokeWidth="2"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div style={styles.statContent}>
                    <span style={styles.statLabel}>Total de Síndicos</span>
                    <span style={styles.statValue}>{stats.totalSyndics}</span>
                  </div>
                </div>

                <div style={styles.statCard}>
                  <div
                    style={{
                      ...styles.statIcon,
                      backgroundColor: "rgba(244, 67, 54, 0.1)",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#F44336"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  <div style={styles.statContent}>
                    <span style={styles.statLabel}>Síndicos Pendentes</span>
                    <span style={styles.statValue}>{stats.pendingSyndics}</span>
                  </div>
                </div>
              </div>

              <div style={styles.welcomeCard}>
                <h2 style={styles.welcomeTitle}>
                  Bem-vindo ao Painel Administrativo
                </h2>
                <p style={styles.welcomeText}>
                  Aqui você pode gerenciar todas as solicitações de cadastro de
                  moradores e síndicos. Utilize o menu lateral para navegar
                  entre as seções.
                </p>
              </div>
            </div>
          )}

          {/* Seção Moradores */}
          {activeSection === "moradores" && (
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>Lista de Moradores</h2>
                <div style={styles.filterButtons}>
                  <button style={styles.filterButton}>Todos</button>
                  <button style={styles.filterButton}>Pendentes</button>
                  <button style={styles.filterButton}>Aprovados</button>
                </div>
              </div>

              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Nome</th>
                      <th style={styles.th}>Email</th>
                      <th style={styles.th}>Telefone</th>
                      <th style={styles.th}>Bloco/Unidade</th>
                      <th style={styles.th}>Status</th>
                      <th style={styles.th}>Data</th>
                      <th style={styles.th}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {residents.map((resident) => (
                      <tr key={resident.id} style={styles.tr}>
                        <td style={styles.td}>{resident.name}</td>
                        <td style={styles.td}>{resident.email}</td>
                        <td style={styles.td}>{resident.phone}</td>
                        <td style={styles.td}>
                          {resident.block}/{resident.unit}
                        </td>
                        <td style={styles.td}>
                          <span
                            style={{
                              ...styles.status,
                              ...(resident.status === "pending" &&
                                styles.statusPending),
                              ...(resident.status === "approved" &&
                                styles.statusApproved),
                              ...(resident.status === "rejected" &&
                                styles.statusRejected),
                            }}
                          >
                            {resident.status === "pending" && "Pendente"}
                            {resident.status === "approved" && "Aprovado"}
                            {resident.status === "rejected" && "Recusado"}
                          </span>
                        </td>
                        <td style={styles.td}>{resident.requestDate}</td>
                        <td style={styles.td}>
                          <button
                            style={styles.actionButton}
                            onClick={() => openModal(resident, "resident")}
                          >
                            Detalhes
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Seção Síndicos */}
          {activeSection === "sindicos" && (
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>Lista de Síndicos</h2>
                <div style={styles.filterButtons}>
                  <button style={styles.filterButton}>Todos</button>
                  <button style={styles.filterButton}>Pendentes</button>
                  <button style={styles.filterButton}>Aprovados</button>
                </div>
              </div>

              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Nome</th>
                      <th style={styles.th}>Email</th>
                      <th style={styles.th}>Telefone</th>
                      <th style={styles.th}>Status</th>
                      <th style={styles.th}>Data</th>
                      <th style={styles.th}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {syndics.map((syndic) => (
                      <tr key={syndic.id} style={styles.tr}>
                        <td style={styles.td}>{syndic.name}</td>
                        <td style={styles.td}>{syndic.email}</td>
                        <td style={styles.td}>{syndic.phone}</td>
                        <td style={styles.td}>
                          <span
                            style={{
                              ...styles.status,
                              ...(syndic.status === "pending" &&
                                styles.statusPending),
                              ...(syndic.status === "approved" &&
                                styles.statusApproved),
                              ...(syndic.status === "rejected" &&
                                styles.statusRejected),
                            }}
                          >
                            {syndic.status === "pending" && "Pendente"}
                            {syndic.status === "approved" && "Aprovado"}
                            {syndic.status === "rejected" && "Recusado"}
                          </span>
                        </td>
                        <td style={styles.td}>{syndic.requestDate}</td>
                        <td style={styles.td}>
                          <button
                            style={styles.actionButton}
                            onClick={() => openModal(syndic, "syndic")}
                          >
                            Detalhes
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {showModal && selectedUser && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                Detalhes do{" "}
                {selectedUser.type === "resident" ? "Morador" : "Síndico"}
              </h3>
              <button style={styles.closeButton} onClick={closeModal}>
                ×
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.modalField}>
                <span style={styles.modalLabel}>Nome:</span>
                <span style={styles.modalValue}>{selectedUser.name}</span>
              </div>

              <div style={styles.modalField}>
                <span style={styles.modalLabel}>Email:</span>
                <span style={styles.modalValue}>{selectedUser.email}</span>
              </div>

              <div style={styles.modalField}>
                <span style={styles.modalLabel}>Telefone:</span>
                <span style={styles.modalValue}>{selectedUser.phone}</span>
              </div>

              {selectedUser.type === "resident" && (
                <>
                  <div style={styles.modalField}>
                    <span style={styles.modalLabel}>Bloco:</span>
                    <span style={styles.modalValue}>{selectedUser.block}</span>
                  </div>

                  <div style={styles.modalField}>
                    <span style={styles.modalLabel}>Unidade:</span>
                    <span style={styles.modalValue}>{selectedUser.unit}</span>
                  </div>
                </>
              )}

              {selectedUser.type === "syndic" && selectedUser.experience && (
                <div style={styles.modalField}>
                  <span style={styles.modalLabel}>Experiência:</span>
                  <span style={styles.modalValue}>
                    {selectedUser.experience}
                  </span>
                </div>
              )}

              <div style={styles.modalField}>
                <span style={styles.modalLabel}>Data da Solicitação:</span>
                <span style={styles.modalValue}>
                  {selectedUser.requestDate}
                </span>
              </div>

              <div style={styles.modalField}>
                <span style={styles.modalLabel}>Status:</span>
                <span
                  style={{
                    ...styles.status,
                    ...(selectedUser.status === "pending" &&
                      styles.statusPending),
                    ...(selectedUser.status === "approved" &&
                      styles.statusApproved),
                    ...(selectedUser.status === "rejected" &&
                      styles.statusRejected),
                  }}
                >
                  {selectedUser.status === "pending" && "Pendente"}
                  {selectedUser.status === "approved" && "Aprovado"}
                  {selectedUser.status === "rejected" && "Recusado"}
                </span>
              </div>
            </div>

            {selectedUser.status === "pending" && (
              <div style={styles.modalFooter}>
                <button
                  style={styles.rejectButton}
                  onClick={() =>
                    handleReject(selectedUser.type, selectedUser.id)
                  }
                >
                  Recusar
                </button>
                <button
                  style={styles.approveButton}
                  onClick={() =>
                    handleApprove(selectedUser.type, selectedUser.id)
                  }
                >
                  Aprovar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#F5F7FA",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  sidebar: {
    width: "280px",
    backgroundColor: "#00224E",
    padding: "32px 24px",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    height: "100vh",
    overflowY: "auto",
  },
  logoSection: {
    textAlign: "center",
    marginBottom: "40px",
    paddingBottom: "24px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  },
  logoIcon: {
    width: "60px",
    height: "60px",
    marginBottom: "12px",
  },
  brandName: {
    color: "#FFFFFF",
    fontSize: "18px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    margin: "0 0 8px 0",
  },
  userRole: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: "13px",
    fontWeight: "400",
  },
  nav: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  navButton: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 16px",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "8px",
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textAlign: "left",
    position: "relative",
  },
  navButtonActive: {
    backgroundColor: "rgba(0, 123, 255, 0.15)",
    color: "#FFFFFF",
  },
  navIcon: {
    width: "20px",
    height: "20px",
  },
  badge: {
    position: "absolute",
    right: "16px",
    backgroundColor: "#F44336",
    color: "#FFFFFF",
    fontSize: "11px",
    fontWeight: "600",
    padding: "2px 8px",
    borderRadius: "12px",
    minWidth: "20px",
    textAlign: "center",
  },
  logoutButton: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 16px",
    backgroundColor: "rgba(244, 67, 54, 0.1)",
    border: "none",
    borderRadius: "8px",
    color: "#F44336",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "auto",
  },
  mainContent: {
    flex: 1,
    marginLeft: "280px",
    padding: "0",
  },
  header: {
    backgroundColor: "#FFFFFF",
    padding: "24px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  },
  pageTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#001B3D",
    margin: 0,
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  userName: {
    fontSize: "15px",
    fontWeight: "500",
    color: "#001B3D",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#007BFF",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: "600",
  },
  contentArea: {
    padding: "40px",
  },
  section: {
    animation: "fadeIn 0.5s ease",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px",
    marginBottom: "32px",
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    padding: "24px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  statIcon: {
    width: "56px",
    height: "56px",
    borderRadius: "12px",
    backgroundColor: "rgba(0, 123, 255, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  statContent: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  statLabel: {
    fontSize: "13px",
    color: "#6B7280",
    fontWeight: "500",
  },
  statValue: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#001B3D",
  },
  welcomeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    padding: "32px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  },
  welcomeTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#001B3D",
    marginBottom: "16px",
  },
  welcomeText: {
    fontSize: "15px",
    color: "#6B7280",
    lineHeight: "1.6",
    margin: 0,
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#001B3D",
    margin: 0,
  },
  filterButtons: {
    display: "flex",
    gap: "8px",
  },
  filterButton: {
    padding: "8px 16px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "6px",
    color: "#6B7280",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  tableContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    padding: "16px 20px",
    textAlign: "left",
    fontSize: "13px",
    fontWeight: "600",
    color: "#6B7280",
    backgroundColor: "#F9FAFB",
    borderBottom: "1px solid #E5E7EB",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  tr: {
    borderBottom: "1px solid #E5E7EB",
    transition: "background-color 0.2s ease",
  },
  td: {
    padding: "16px 20px",
    fontSize: "14px",
    color: "#374151",
  },
  status: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
  },
  statusPending: {
    backgroundColor: "rgba(255, 193, 7, 0.1)",
    color: "#F59E0B",
  },
  statusApproved: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    color: "#10B981",
  },
  statusRejected: {
    backgroundColor: "rgba(244, 67, 54, 0.1)",
    color: "#EF4444",
  },
  actionButton: {
    padding: "6px 16px",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "6px",
    color: "#FFFFFF",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    animation: "fadeIn 0.3s ease",
  },
  modal: {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    width: "90%",
    maxWidth: "600px",
    maxHeight: "90vh",
    overflow: "auto",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    animation: "slideUp 0.3s ease",
  },
  modalHeader: {
    padding: "24px 32px",
    borderBottom: "1px solid #E5E7EB",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#001B3D",
    margin: 0,
  },
  closeButton: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "transparent",
    border: "none",
    color: "#6B7280",
    fontSize: "28px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    lineHeight: "1",
  },
  modalBody: {
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  modalField: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  modalLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  modalValue: {
    fontSize: "15px",
    fontWeight: "500",
    color: "#001B3D",
  },
  modalFooter: {
    padding: "24px 32px",
    borderTop: "1px solid #E5E7EB",
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
  },
  rejectButton: {
    padding: "12px 24px",
    backgroundColor: "transparent",
    border: "2px solid #EF4444",
    borderRadius: "8px",
    color: "#EF4444",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  approveButton: {
    padding: "12px 24px",
    backgroundColor: "#10B981",
    border: "none",
    borderRadius: "8px",
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

document.head.appendChild(styleSheet);

export default AdminDashboard;

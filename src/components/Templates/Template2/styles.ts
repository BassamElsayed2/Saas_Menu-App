// ============================
// Global Styles for Template2 (Warm Light Theme)
// ============================

export const globalStyles = `
  @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&family=Cairo:wght@300;400;500;600;700;800&display=swap");

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "DM Sans", "Cairo", sans-serif;
    background: linear-gradient(135deg, #FFF8E7 0%, #FAF3E1 50%, #F5EDD5 100%);
    color: #1a1a1a;
    overflow-x: hidden;
    position: relative;
  }

  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 50%, rgba(255, 109, 31, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(245, 231, 198, 0.05) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: "Playfair Display", "Cairo", serif;
    font-weight: 700;
  }

  [dir="rtl"] {
    direction: rtl;
    text-align: right;
    font-family: "Cairo", "DM Sans", sans-serif;
  }

  [dir="ltr"] {
    direction: ltr;
    text-align: left;
  }

  html {
    scroll-behavior: smooth;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: linear-gradient(180deg, #FAF3E1 0%, #F5EDD5 100%);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #FF6D1F 0%, #FF8C42 100%);
    border-radius: 10px;
    border: 2px solid #FAF3E1;
    transition: all 0.3s ease;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #FF8C42 0%, #FF6D1F 100%);
    border-color: #FF6D1F;
  }

  /* Enhanced Animations */
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes scale-in {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes particle {
    0%, 100% { opacity: 0; transform: translateY(0) scale(0) rotate(0deg); }
    10% { opacity: 1; transform: translateY(-20px) scale(1) rotate(45deg); }
    90% { opacity: 0.8; transform: translateY(-120px) scale(1.2) rotate(180deg); }
    100% { opacity: 0; transform: translateY(-150px) scale(0) rotate(360deg); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }

  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }

  @keyframes ping {
    75%, 100% { transform: scale(2); opacity: 0; }
  }

  @keyframes slide-down {
    from { opacity: 0; transform: translateY(-100%); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slide-up {
    from { opacity: 0; transform: translateY(100%); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
  .animate-scale-in { animation: scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .animate-particle { animation: particle 10s ease-in-out infinite; }
  .animate-float { animation: float 3s ease-in-out infinite; }
  .animate-slide-down { animation: slide-down 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }

  /* Responsive utilities */
  @media (max-width: 768px) {
    .md-hidden { display: block !important; }
    .desktop-categories { display: none !important; }
    .ad-grid { grid-template-columns: 1fr !important; }
    .ad-grid > div:first-child { order: 1 !important; height: 200px !important; }
    .ad-grid > div:last-child { order: 2 !important; padding: 24px !important; }
  }

  @media (min-width: 769px) {
    .md-hidden { display: none !important; }
  }
`;

// Color constants for use in components
export const colors = {
  primary: "#FF6D1F",
  primaryLight: "#FF8C42",
  primaryLighter: "#FF9A4D",
  primaryLightest: "#FFB366",
  background: "#FAF3E1",
  backgroundLight: "#FFF8E7",
  backgroundDark: "#F5EDD5",
  backgroundCard: "#F5E7C6",
  text: "#1a1a1a",
  textMuted: "rgba(26, 26, 26, 0.7)",
  textLight: "rgba(26, 26, 26, 0.75)",
  white: "#FAF3E1",
  dark: "#222222",
  success: "#25D366",
  successDark: "#20BA5A",
  danger: "rgba(255, 59, 48, 0.95)",
  vegetarian: "rgb(34, 139, 34)",
};

// Shadow presets
export const shadows = {
  card: "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
  cardHover: "0 20px 48px rgba(255, 109, 31, 0.2), 0 8px 16px rgba(0, 0, 0, 0.1)",
  button: "0 12px 32px rgba(255, 109, 31, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.3)",
  buttonHover: "0 16px 48px rgba(255, 109, 31, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.3)",
  nav: "0 8px 32px rgba(255, 109, 31, 0.15), 0 2px 8px rgba(0, 0, 0, 0.05)",
  modal: "0 24px 64px rgba(0, 0, 0, 0.3)",
};

// Gradient presets
export const gradients = {
  primary: "linear-gradient(135deg, #FF6D1F 0%, #FF8C42 100%)",
  primaryExtended: "linear-gradient(135deg, #FF6D1F 0%, #FF8C42 50%, #FF9A4D 100%)",
  background: "linear-gradient(135deg, #FFF8E7 0%, #FAF3E1 50%, #F5EDD5 100%)",
  card: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 231, 198, 0.7) 100%)",
  overlay: "linear-gradient(to top, rgba(26, 26, 26, 0.6) 0%, rgba(26, 26, 26, 0.2) 40%, transparent 100%)",
  whatsapp: "linear-gradient(135deg, #25D366 0%, #20BA5A 100%)",
  dark: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
};

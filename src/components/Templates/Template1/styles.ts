// ============================
// Galaxy Theme - Global Styles
// ============================

export const globalStyles = `
  /* Fonts */
  @import url("https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap");
  @import url("https://cdn.jsdelivr.net/npm/remixicon@4.0.0/fonts/remixicon.css");

  body {
    font-family: "Space Grotesk", sans-serif;
  }

  html[dir="rtl"] body,
  html[lang="ar"] body {
    font-family: "Cairo", sans-serif;
  }

  /* Galaxy Animations */
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(2deg); }
  }

  @keyframes pulse-glow {
    0%, 100% { 
      box-shadow: 0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.2);
    }
    50% { 
      box-shadow: 0 0 40px rgba(139, 92, 246, 0.5), 0 0 80px rgba(59, 130, 246, 0.3);
    }
  }

  @keyframes twinkle {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.3; transform: scale(0.8); }
  }

  @keyframes shooting-star {
    0% { transform: translateX(0) translateY(0); opacity: 1; }
    100% { transform: translateX(-200px) translateY(200px); opacity: 0; }
  }

  @keyframes orbit {
    from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
    to { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
  }

  @keyframes modalIn {
    from { opacity: 0; transform: scale(0.9) translateY(20px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
  .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
  .animate-modal-in { animation: modalIn 0.3s ease-out forwards; }
  .animate-gradient { 
    background-size: 200% 200%;
    animation: gradient-shift 8s ease infinite; 
  }

  /* Stars Background */
  .stars-bg {
    background-image: 
      radial-gradient(2px 2px at 20px 30px, white, transparent),
      radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
      radial-gradient(1px 1px at 90px 40px, white, transparent),
      radial-gradient(2px 2px at 160px 120px, rgba(255,255,255,0.9), transparent),
      radial-gradient(1px 1px at 230px 80px, white, transparent),
      radial-gradient(2px 2px at 300px 150px, rgba(255,255,255,0.7), transparent),
      radial-gradient(1px 1px at 370px 50px, white, transparent),
      radial-gradient(2px 2px at 450px 180px, rgba(255,255,255,0.8), transparent);
    background-repeat: repeat;
    background-size: 500px 200px;
  }
`;

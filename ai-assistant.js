// ===== JOTHIRAM's PERSONAL AI ASSISTANT — Powered by Gemini =====

const GEMINI_API_KEY = 'AIzaSyBpPicROXdFXsgCnrgJq5GDE24UoLrUhY0';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// ---- System Prompt: Jothiram's Portfolio Context ----
const SYSTEM_PROMPT = `You are "Joe AI", the highly intelligent and friendly personal assistant for Jothiram K's portfolio. Your goal is to impress visitors by providing detailed, accurate, and enthusiastic information about Jothiram.

Here is the complete knowledge base you must use:

👤 PERSONAL INFO:
- Name: Jothiram K
- Role: Frontend Developer
- Education: 2nd-year Engineering Student

📖 ABOUT:
Jothiram is a passionate 2nd-year engineering student dedicated to web development. He specializes in building modern, responsive, and user-friendly websites with clean code and intuitive interfaces.

⚡ TECHNICAL SKILLS:
- Frontend: HTML5, CSS3, JavaScript (ES6+), Bootstrap 5, React.js
- Programming & Logic: JavaScript (ES6+), Python (Basic), Advanced Problem Solving, Logical Thinking
- Tools & Platforms: Git & GitHub, VS Code, Chrome DevTools, Figma (Basic)
- Soft Skills: Excellent Communication, Time Management, Team Collaboration

🚀 KEY PROJECTS:
1. Smart Ambulance Tracking & Green Corridor System: (Most Advanced) Real-time GPS tracking using Node.js, Express, Supabase, and JavaScript. Includes dynamic green corridor traffic signal control for emergencies.
2. Phishing Website Detection: Uses Machine Learning and Python to detect malicious sites, with a clean HTML/CSS/JS frontend.
3. Smart Campus Issues Manager: A responsive web app built to report and track campus-level problems efficiently.
4. Poorvika Clone: A high-fidelity responsive clone of the Poorvika e-commerce site, demonstrating mastery of layouts and Bootstrap 5.

🏆 CERTIFICATES & ACHIEVEMENTS:
- Industrial Training: Completed at BSNL (Bharat Sanchar Nigam Limited).
- Computer Application: Diploma in Computer Applications (DCA).
- Generative AI: Professional Certification from Guvi.
- Hackathon Winner: Secured 1st place at N S College of Engineering and Technology.
- AI Mastery: Certified AI Tools Workshop by be10X.

💼 SERVICES OFFERED:
- Premium Landing Page Design
- Custom Portfolio Website Development
- Responsive Mobile-First Website Fixes
- Expert HTML/CSS/JS Bug Fixing
- High-Quality Figma to HTML Conversion

📬 CONTACT & SOCIALS:
- GitHub: https://github.com/jothiramcodes-png/portfolio
- Instagram: https://www.instagram.com/j_o_t_h_i_r_a_m/
- LinkedIn: https://www.linkedin.com/in/jothi-ram-k-9166a3353
- Email: Contact via the form on the website!



TONE & BEHAVIOR:
- Be enthusiastic, professional, and helpful.
- Use **bolding** for emphasis.
- Use emojis like 🚀, ⚡, 👨‍💻, 🏆 to make replies engaging.
- Keep responses concise but informative (3-5 sentences usually).
- If someone asks to "Hire" or "Contact", point them to the LinkedIn or the contact form.
- Always refer to yourself as "Joe AI".`;

// ---- Conversation history for multi-turn chat ----
const conversationHistory = [];

// ---- Rule-based fallback (used when API quota is exceeded) ----
const fallbackResponses = [
  { keywords: ['hi','hello','hey','greet'], reply: `👋 Hello! I'm **Joe AI**, Jothiram's personal assistant. I can tell you about his **skills**, **projects**, **certificates**, or how to **contact** him. What's on your mind?` },
  { keywords: ['who','about','jothiram','student'], reply: `👨‍💻 **Jothiram K** is a 2nd-year engineering student who is passionate about **Frontend Development**. He loves building clean, modern, and high-performance websites!` },
  { keywords: ['skill','tech','know','language'], reply: `⚡ **Core Skills:**\n• **Frontend:** HTML5, CSS3, JavaScript, React.js, Bootstrap 5\n• **Programming:** Python, Logic & Problem Solving\n• **Tools:** Git, GitHub, VS Code, Figma\n• **Soft Skills:** Communication & Teamwork` },
  { keywords: ['project','built','work','develop'], reply: `🚀 **Featured Projects:**\n• **Smart Ambulance Tracking:** Real-time GPS & Green Corridor control (Node.js/Supabase)\n• **Phishing Detection:** ML-powered security tool (Python)\n• **Campus Issues Manager:** Responsive reporting app\n• **Poorvika Clone:** High-fidelity UI layout` },
  { keywords: ['service','offer','hire','freelance'], reply: `💼 **Services Jothiram Offers:**\n✔ Landing Page Design\n✔ Portfolio Development\n✔ Responsive Website Fixes\n✔ Figma to HTML Conversion\n✔ Bug Fixing (HTML/CSS/JS)` },
  { keywords: ['certificate','achievement','hackathon','award'], reply: `🏆 **Top Achievements:**\n🎖 **Hackathon Winner** (N S College)\n🎖 **BSNL** Industrial Training\n🎖 **Generative AI** Certification (Guvi)\n🎖 **DCA** Diploma\n🎖 **AI Mastery** (be10X)` },
  { keywords: ['contact','reach','linkedin','github','social'], reply: `📬 **Connect with Jothiram:**\n🔗 [LinkedIn](https://www.linkedin.com/in/jothi-ram-k-9166a3353)\n🔗 [GitHub](https://github.com/jothiramcodes-png/portfolio)\n📸 [Instagram](https://www.instagram.com/j_o_t_h_i_r_a_m/)\n\nYou can also use the **contact form** at the bottom of this page!` },

  { keywords: ['ambulance','tracking','green'], reply: `🚑 The **Smart Ambulance Tracking System** is a full-stack project using Node.js and Supabase. It provides real-time GPS tracking and even controls traffic signals (Green Corridor) for emergency vehicles!` }
];

function fallbackRespond(message) {
  const lower = message.toLowerCase();
  for (const item of fallbackResponses) {
    if (item.keywords.some(kw => lower.includes(kw))) return item.reply;
  }
  return `🤔 Try asking me about Jothiram's **skills**, **projects**, **services**, **certificates**, or **contact** info!`;
}

// ---- Call Gemini API ----
async function callGemini(userMessage) {
  conversationHistory.push({
    role: 'user',
    parts: [{ text: userMessage }]
  });

  const payload = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }]
    },
    contents: conversationHistory,
    generationConfig: {
      temperature: 0.8,
      maxOutputTokens: 400,
    }
  };

  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errData = await response.json();
    const errMsg = errData?.error?.message || 'API error';
    // If quota exceeded, silently use fallback
    if (response.status === 429 || errMsg.includes('quota') || errMsg.includes('RESOURCE_EXHAUSTED')) {
      conversationHistory.pop(); // remove the failed user message from history
      return fallbackRespond(userMessage);
    }
    throw new Error(errMsg);
  }

  const data = await response.json();
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't get a response. Please try again!";

  conversationHistory.push({
    role: 'model',
    parts: [{ text: reply }]
  });

  return reply;
}

// ===== CHATBOT UI LOGIC =====
(function () {
  const trigger = document.getElementById('ai-chat-trigger');
  const chatWindow = document.getElementById('ai-chat-window');
  const messagesContainer = document.getElementById('ai-chat-messages');
  const input = document.getElementById('ai-chat-input');
  const sendBtn = document.getElementById('ai-chat-send');
  const tooltip = document.getElementById('ai-chat-tooltip');
  const chips = document.querySelectorAll('.ai-chip');

  let isOpen = false;
  let tooltipHidden = false;
  let isLoading = false;

  // ---- Inject welcome message on load ----
  setTimeout(() => {
    appendMessage(`👋 Hi! I'm **Joe AI**, Jothiram's personal AI assistant — powered by Gemini!\n\nAsk me anything about his **skills**, **projects**, **services**, or how to **contact** him. I'm here to help! 🚀`, 'ai');
  }, 600);

  // ---- Toggle chat ----
  trigger.addEventListener('click', () => {
    isOpen = !isOpen;
    chatWindow.classList.toggle('open', isOpen);
    trigger.classList.toggle('active', isOpen);
    if (!tooltipHidden) {
      tooltip.classList.add('hidden');
      tooltipHidden = true;
    }
    if (isOpen) setTimeout(() => input.focus(), 350);
  });

  // ---- Close on outside click ----
  document.addEventListener('click', (e) => {
    if (isOpen && !chatWindow.contains(e.target) && e.target !== trigger && !trigger.contains(e.target)) {
      isOpen = false;
      chatWindow.classList.remove('open');
      trigger.classList.remove('active');
    }
  });

  // ---- Quick chips ----
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      if (isLoading) return;
      const text = chip.textContent.trim();
      sendMessage(text);
    });
  });

  // ---- Send button ----
  sendBtn.addEventListener('click', () => {
    if (isLoading) return;
    const text = input.value.trim();
    if (text) sendMessage(text);
  });

  // ---- Enter key ----
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isLoading) return;
      const text = input.value.trim();
      if (text) sendMessage(text);
    }
  });

  // ---- Send message flow ----
  async function sendMessage(text) {
    isLoading = true;
    sendBtn.style.opacity = '0.5';
    input.disabled = true;

    appendMessage(text, 'user');
    input.value = '';
    input.style.height = 'auto';

    const typingEl = appendTyping();

    try {
      const reply = await callGemini(text);
      typingEl.remove();
      appendMessage(reply, 'ai');
    } catch (err) {
      typingEl.remove();
      // Use fallback silently instead of showing error
      const fallback = fallbackRespond(text);
      appendMessage(fallback, 'ai');
      console.warn('Gemini API error (using fallback):', err);
    } finally {
      isLoading = false;
      sendBtn.style.opacity = '1';
      input.disabled = false;
      input.focus();
    }
  }

  // ---- Append message bubble ----
  function appendMessage(text, sender) {
    const wrapper = document.createElement('div');
    wrapper.classList.add(sender === 'ai' ? 'ai-message' : 'user-message');

    if (sender === 'ai') {
      const avatarEl = document.createElement('div');
      avatarEl.classList.add('ai-message-avatar');
      avatarEl.innerHTML = `<img src="joe-avatar.png" alt="Joe AI" style="width:28px;height:28px;border-radius:50%;object-fit:cover;object-position:top;">`;

      const bubble = document.createElement('div');
      bubble.classList.add('ai-bubble');
      bubble.innerHTML = formatMessage(text);

      wrapper.appendChild(avatarEl);
      wrapper.appendChild(bubble);
    } else {
      const bubble = document.createElement('div');
      bubble.classList.add('user-bubble');
      bubble.textContent = text;
      wrapper.appendChild(bubble);
    }

    messagesContainer.appendChild(wrapper);
    scrollBottom();
    return wrapper;
  }

  // ---- Typing indicator ----
  function appendTyping() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('ai-message');

    const avatarEl = document.createElement('div');
    avatarEl.classList.add('ai-message-avatar');
    avatarEl.innerHTML = `<img src="joe-avatar.png" alt="Joe AI" style="width:28px;height:28px;border-radius:50%;object-fit:cover;object-position:top;">`;

    const bubble = document.createElement('div');
    bubble.classList.add('ai-bubble');
    bubble.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;

    wrapper.appendChild(avatarEl);
    wrapper.appendChild(bubble);
    messagesContainer.appendChild(wrapper);
    scrollBottom();
    return wrapper;
  }

  // ---- Format markdown-ish text to HTML ----
  function formatMessage(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/^### (.+)$/gm, '<strong>$1</strong>')
      .replace(/^## (.+)$/gm, '<strong>$1</strong>')
      .replace(/^# (.+)$/gm, '<strong>$1</strong>')
      .replace(/^- (.+)$/gm, '• $1')
      .replace(/\n/g, '<br>');
  }

  function scrollBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // ---- Auto-resize textarea ----
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 90) + 'px';
  });



  // ---- Hide tooltip after 5s ----
  setTimeout(() => {
    if (!tooltipHidden) {
      tooltip.style.opacity = '0';
      tooltip.style.transition = 'opacity 0.5s ease';
      setTimeout(() => tooltip.classList.add('hidden'), 500);
      tooltipHidden = true;
    }
  }, 5000);

})();

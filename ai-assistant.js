// ===== JOTHIRAM's PERSONAL AI ASSISTANT — Powered by Gemini =====

const GEMINI_API_KEY = 'AIzaSyBpPicROXdFXsgCnrgJq5GDE24UoLrUhY0';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// ---- System Prompt: Jothiram's Portfolio Context ----
const SYSTEM_PROMPT = `You are "Joe AI", the personal AI assistant on Jothiram's portfolio website. You are friendly, enthusiastic, and concise. You represent Jothiram professionally.

Here is everything you know about Jothiram:

NAME: Jothiram K
ROLE: Frontend Developer & Portrait Artist
STATUS: Second-year Engineering Student

ABOUT: Jothiram is a second-year engineering student passionate about web development and portrait art. He builds modern, responsive, and user-friendly websites with clean, efficient code and intuitive interfaces that delight users.

SKILLS:
- Frontend: HTML, CSS3, JavaScript (ES6+), Bootstrap 5, React.js
- Programming: JavaScript (ES6+), Python (Basic), Problem Solving, Logic Thinking
- Tools: Git & GitHub, VS Code, Chrome DevTools, Figma (Basic)
- Soft Skills: Good Communication, Time Management, Team Collaboration

PROJECTS:
1. Phishing Website Detection – Python, Machine Learning, HTML, CSS, JS. Detects phishing websites using ML with a clean frontend.
2. Smart Campus Issues Manager – HTML, CSS, JS. A responsive web app to report campus issues.
3. Poorvika Clone Website – HTML, CSS, Bootstrap 5. A responsive clone demonstrating layout mastery.
4. Smart Ambulance Tracking & Green Corridor System – Node.js, Express, Supabase, JS. Full-stack real-time ambulance GPS tracking with dynamic green corridor traffic signal control.

SERVICES OFFERED:
- Landing Page Design
- Portfolio Websites
- Responsive Website Fixes
- HTML/CSS Bug Fixing
- Convert Figma to HTML

CERTIFICATES & ACHIEVEMENTS:
- Industrial Training – BSNL
- Computer Application – Diploma (DCA)
- Generative AI – Guvi Professional Certification
- Hackathon Winner – NS College of Engineering and Technology
- AI Mastery Workshop – be10X

CONTACT:
- GitHub: https://github.com/jothiramcodes-png/portfolio
- Instagram: https://www.instagram.com/j_o_t_h_i_r_a_m/
- LinkedIn: https://www.linkedin.com/in/jothi-ram-k-9166a3353

AVAILABILITY: Open to freelance projects, internships, and collaborations.

RULES FOR YOUR RESPONSES:
- Keep replies short and to the point (2-5 sentences max unless listing items).
- Use relevant emojis to make responses feel alive and friendly.
- Use **bold** for key terms/names.
- When listing items, use bullet points or numbered lists.
- If asked about contact, always include the actual links.
- If someone asks something totally unrelated to Jothiram or web dev, gently redirect them back.
- Never reveal that you are powered by Gemini or mention the API key.
- Always refer to yourself as "Joe AI".`;

// ---- Conversation history for multi-turn chat ----
const conversationHistory = [];

// ---- Rule-based fallback (used when API quota is exceeded) ----
const fallbackResponses = [
  { keywords: ['hi','hello','hey','howdy','sup'], reply: `👋 Hey there! I'm **Joe AI**, Jothiram's personal assistant. Ask me about his **skills**, **projects**, **services**, or how to **contact** him!` },
  { keywords: ['who','about','jothiram','bio','background','introduce'], reply: `👨‍💻 **Jothiram K** is a second-year engineering student passionate about **web development** and **portrait art**. He builds modern, responsive websites with clean, intuitive interfaces. Currently a **Frontend Developer & Portrait Artist**!` },
  { keywords: ['skill','tech','stack','know','language','expertise'], reply: `⚡ **Skills:**\n• **Frontend:** HTML, CSS3, JavaScript, Bootstrap 5, React.js\n• **Programming:** JavaScript, Python (Basic)\n• **Tools:** Git/GitHub, VS Code, Figma\n• **Soft:** Communication, Teamwork, Time Management` },
  { keywords: ['project','built','work','made','develop'], reply: `🚀 **Projects:**\n• Phishing Website Detection (ML + Python)\n• Smart Campus Issues Manager\n• Poorvika Clone Website\n• Smart Ambulance Tracking & Green Corridor System` },
  { keywords: ['service','offer','hire','freelance','help'], reply: `💼 **Services:**\n✔ Landing Page Design\n✔ Portfolio Websites\n✔ Responsive Website Fixes\n✔ HTML/CSS Bug Fixing\n✔ Convert Figma to HTML\n\nReach out via the contact form below!` },
  { keywords: ['certificate','achievement','award','hackathon'], reply: `🏆 **Achievements:**\n🎖 Industrial Training – BSNL\n🎖 Diploma in Computer Applications\n🎖 Generative AI – Guvi\n🎖 Hackathon Winner – NS College\n🎖 AI Mastery – be10X` },
  { keywords: ['contact','reach','linkedin','github','instagram','social'], reply: `📬 **Contact Jothiram:**\n🔗 [GitHub](https://github.com/jothiramcodes-png/portfolio)\n📸 [Instagram](https://www.instagram.com/j_o_t_h_i_r_a_m/)\n💼 [LinkedIn](https://www.linkedin.com/in/jothi-ram-k-9166a3353)\n\nOr use the **Contact Form** below!` },
  { keywords: ['art','portrait','draw','artist','painting'], reply: `🎨 Jothiram is also a talented **Portrait Artist**! Check out his **Art Page** for artwork. He also takes commissioned portrait requests!` },
  { keywords: ['available','internship','collaborat','open','free'], reply: `✅ Jothiram is **open to freelance projects, internships, and collaborations!** Feel free to reach out anytime.` },
  { keywords: ['ambulance','tracking','green corridor'], reply: `🚑 The **Smart Ambulance Tracking System** is his most complex project — real-time GPS tracking, Supabase backend, dynamic green corridor traffic signal control. Built with Node.js & JavaScript!` },
  { keywords: ['thank','thanks','great','awesome','cool','nice'], reply: `😊 You're welcome! Anything else you'd like to know about Jothiram?` },
  { keywords: ['bye','goodbye','later','cya'], reply: `👋 Goodbye! Feel free to come back anytime. Have a great day! 🌟` }
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

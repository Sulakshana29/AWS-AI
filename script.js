/* ============================================================
   AWS AI Practitioner Study Hub — Main JavaScript
   ============================================================ */

'use strict';

/* ─── AWS Services Data ─── */
const AWS_SERVICES = [
  { name: 'Amazon SageMaker', emoji: '⚡', category: 'ml', desc: 'End-to-end managed ML platform for building, training, tuning, and deploying ML models at scale.', domains: [1, 3] },
  { name: 'SageMaker Canvas', emoji: '🎨', category: 'ml', desc: 'No-code ML tool that lets business users build accurate ML models without writing code.', domains: [1] },
  { name: 'SageMaker Ground Truth', emoji: '🏷️', category: 'ml', desc: 'Data labeling service for creating high-quality training datasets using human reviewers.', domains: [1] },
  { name: 'SageMaker JumpStart', emoji: '🚀', category: 'ml', desc: 'One-click access to pre-trained models, solution templates, and example notebooks.', domains: [1, 2] },
  { name: 'SageMaker Clarify', emoji: '🔎', category: 'ml', desc: 'Detect bias in training data and models, and generate feature importance (SHAP) explanations.', domains: [4] },
  { name: 'SageMaker Model Registry', emoji: '📦', category: 'ml', desc: 'Catalog and manage ML model versions with metadata, approval workflows, and lineage tracking.', domains: [1, 5] },
  { name: 'SageMaker Experiments', emoji: '📊', category: 'ml', desc: 'Track, organize, and compare ML experiments to reproduce and share the best results.', domains: [1] },
  { name: 'Amazon Bedrock', emoji: '🌟', category: 'genai', desc: 'Managed service to access top foundation models via API. Powers generative AI apps without managing infrastructure.', domains: [2, 3] },
  { name: 'Amazon Titan Text', emoji: '📝', category: 'genai', desc: "AWS's own LLM for text generation, summarization, Q&A, and classification tasks.", domains: [2, 3] },
  { name: 'Amazon Titan Embeddings', emoji: '📐', category: 'genai', desc: "AWS's embedding model that converts text into semantic vectors for RAG and search applications.", domains: [2, 3] },
  { name: 'Amazon Titan Image Generator', emoji: '🖼️', category: 'genai', desc: 'Generate and edit high-quality images from text descriptions, with watermarking support.', domains: [2, 3] },
  { name: 'Bedrock Knowledge Bases', emoji: '🗄️', category: 'genai', desc: 'Managed RAG service — connect S3 documents, auto-create embeddings, and query with Bedrock FMs.', domains: [3] },
  { name: 'Bedrock Agents', emoji: '🤖', category: 'genai', desc: 'Build agentic workflows that plan, call APIs, query knowledge bases, and complete multi-step tasks autonomously.', domains: [3] },
  { name: 'Bedrock Guardrails', emoji: '🛡️', category: 'genai', desc: 'Safety layer for GenAI apps: content filtering, PII redaction, topic blocking, grounding checks.', domains: [3, 4] },
  { name: 'Amazon Q Business', emoji: '❓', category: 'genai', desc: 'Enterprise GenAI assistant that connects to 40+ data sources and provides permission-aware answers from company data.', domains: [3] },
  { name: 'Amazon Q Developer', emoji: '👨‍💻', category: 'genai', desc: 'AI coding companion integrated into IDEs. Generates, explains, refactors, and debugs code.', domains: [3] },
  { name: 'PartyRock', emoji: '🎮', category: 'genai', desc: 'No-code GenAI app builder powered by Amazon Bedrock. Great for experimenting with prompts and widgets.', domains: [2, 3] },
  { name: 'Amazon Rekognition', emoji: '👁️', category: 'vision', desc: 'Computer vision service for image and video analysis: objects, faces, text, scenes, moderation.', domains: [1, 4] },
  { name: 'Amazon Textract', emoji: '📄', category: 'vision', desc: 'Automatically extract text, handwriting, tables, and forms from scanned documents using ML.', domains: [1] },
  { name: 'Amazon Lookout for Vision', emoji: '🔬', category: 'vision', desc: 'Detect anomalies and defects in industrial images to automate quality inspection.', domains: [1] },
  { name: 'Amazon Comprehend', emoji: '💬', category: 'nlp', desc: 'NLP service for sentiment analysis, entity detection, key phrase extraction, and topic modeling.', domains: [1] },
  { name: 'Amazon Comprehend Medical', emoji: '🏥', category: 'nlp', desc: 'Extract medical information from clinical text: diagnoses, medications, dosages, and treatments.', domains: [1] },
  { name: 'Amazon Transcribe', emoji: '🎙️', category: 'nlp', desc: 'Automatic speech recognition (ASR) that converts audio/video to text with speaker identification.', domains: [1] },
  { name: 'Amazon Translate', emoji: '🌍', category: 'nlp', desc: 'Neural machine translation service for real-time and batch translation of text in 75+ languages.', domains: [1] },
  { name: 'Amazon Polly', emoji: '🔊', category: 'nlp', desc: 'Text-to-speech service that generates lifelike speech with natural-sounding voices in 60+ languages.', domains: [1] },
  { name: 'Amazon Lex', emoji: '💬', category: 'nlp', desc: 'Build conversational chatbots with automatic speech recognition and NLU for voice and text.', domains: [1] },
  { name: 'Amazon Kendra', emoji: '🔍', category: 'nlp', desc: 'Intelligent enterprise search service that uses ML to deliver highly accurate answers from internal content.', domains: [1, 3] },
  { name: 'Amazon Personalize', emoji: '🎯', category: 'ml', desc: 'Real-time ML-powered personalization and recommendation engine — same tech as Amazon.com.', domains: [1] },
  { name: 'Amazon Forecast', emoji: '📈', category: 'ml', desc: 'Fully managed time-series forecasting service using ML models trained on your data.', domains: [1] },
  { name: 'Amazon Fraud Detector', emoji: '🚨', category: 'ml', desc: 'Detect potentially fraudulent online activities using ML models built on Amazon\'s own fraud detection experience.', domains: [1] },
  { name: 'AWS CloudTrail', emoji: '📜', category: 'governance', desc: 'Audit log of all API calls across AWS services. Essential for security investigation and compliance.', domains: [5] },
  { name: 'AWS Config', emoji: '⚙️', category: 'governance', desc: 'Assess, audit, and evaluate configurations of AWS resources for compliance and governance.', domains: [5] },
  { name: 'Amazon Macie', emoji: '🔍', category: 'governance', desc: 'Uses ML to automatically discover and protect sensitive data (PII, PHI) stored in Amazon S3.', domains: [5] },
  { name: 'AWS IAM', emoji: '🔐', category: 'governance', desc: 'Manage access to AWS services and resources securely. Define who can do what with AI services.', domains: [5] },
  { name: 'AWS KMS', emoji: '🔑', category: 'governance', desc: 'Managed service to create and control encryption keys for protecting AI/ML data at rest.', domains: [5] },
  { name: 'Amazon A2I', emoji: '👮', category: 'governance', desc: 'Augmented AI — add human review workflows to ML predictions for high-stakes decisions.', domains: [4] },
];

/* ─── Flashcard Data ─── */
const FLASHCARDS = [
  // Domain 1
  { domain: 1, q: 'What is the difference between AI, ML, and Deep Learning?', a: 'AI is the broad field. ML is a subset of AI where systems learn from data. Deep Learning is a subset of ML using multi-layer neural networks. Generative AI is a subset of DL that creates new content.' },
  { domain: 1, q: 'What is Supervised Learning?', a: 'Training a model on labeled data (input–output pairs). The model learns to map inputs to correct outputs. Used for classification (discrete) and regression (continuous) tasks.' },
  { domain: 1, q: 'What is Unsupervised Learning?', a: 'Finding patterns in unlabeled data. Common techniques: K-Means (clustering), PCA (dimensionality reduction), autoencoders. No ground truth labels needed.' },
  { domain: 1, q: 'What are Precision and Recall?', a: 'Precision = TP / (TP + FP) — of all predicted positives, how many are actually positive. Recall = TP / (TP + FN) — of all actual positives, how many did we find. F1 = harmonic mean of both.' },
  { domain: 1, q: 'What is Overfitting?', a: 'Model performs well on training data but poorly on new data — it has memorized rather than generalized. Fix: more data, regularization (L1/L2), dropout, simpler model, cross-validation.' },
  { domain: 1, q: 'What is the ML Lifecycle?', a: 'Data Collection → Data Preparation → Model Training → Model Evaluation → Model Deployment → Monitoring & Retraining.' },
  { domain: 1, q: 'What is Amazon SageMaker Canvas?', a: 'A no-code visual ML interface in SageMaker. Business users can upload data, build ML models by pointing and clicking, and get predictions — no coding required.' },
  { domain: 1, q: 'What does SageMaker Ground Truth do?', a: 'Managed data labeling service. Send unlabeled images, text, or audio to human reviewers (via Mechanical Turk or your own team) to create high-quality training datasets.' },

  // Domain 2
  { domain: 2, q: 'What is a Foundation Model?', a: 'A large model pre-trained on massive, broad datasets. Can be adapted for many tasks via fine-tuning or prompting without retraining from scratch. Examples: Claude, GPT, Llama, Titan.' },
  { domain: 2, q: 'What is a token?', a: 'The basic processing unit for LLMs. Roughly 1 token ≈ 0.75 words or 4 characters. LLMs have a context window limit measured in tokens (e.g., 200K tokens). Pricing is per token.' },
  { domain: 2, q: 'What is an embedding?', a: 'A numerical vector that represents text (or images/audio) in high-dimensional space. Semantically similar content → similar vectors. Used for semantic search and as the core of RAG systems.' },
  { domain: 2, q: 'What does Temperature control in LLMs?', a: 'Randomness of the output. Temperature = 0: deterministic/greedy (always picks highest probability token). Temperature > 1: more creative/random. Optimal range for most tasks: 0.1–0.7.' },
  { domain: 2, q: 'What is the difference between Top-K and Top-P sampling?', a: 'Top-K: limit next token selection to top K candidates. Top-P (Nucleus): select from tokens whose cumulative probability ≥ P. Top-P is more flexible; Top-K is more predictable.' },
  { domain: 2, q: 'What is RLHF?', a: 'Reinforcement Learning from Human Feedback. Humans rate model outputs, and the model learns to produce higher-rated responses. Used to align LLMs with human preferences (safety, helpfulness).' },
  { domain: 2, q: 'What is a hallucination in LLMs?', a: 'When an LLM generates factually incorrect information confidently. Causes: over-reliance on pattern matching, lack of grounding. Mitigation: RAG, Bedrock Guardrails grounding check, lower temperature.' },
  { domain: 2, q: 'What is Amazon Bedrock?', a: 'AWS managed service providing API access to top foundation models (Anthropic Claude, Meta Llama, Mistral, Stability AI, Amazon Titan) without managing infrastructure. Supports fine-tuning and RAG.' },
  { domain: 2, q: 'What are Amazon Titan models?', a: 'AWS-built foundation models on Bedrock. Titan Text: text generation/Q&A. Titan Embeddings: vector representations for RAG. Titan Image Generator: text-to-image with watermarking.' },
  { domain: 2, q: 'What is a context window?', a: 'Maximum amount of text (in tokens) an LLM can process at once (input + output). Larger context = handle longer documents but higher cost. Critical for RAG design.' },

  // Domain 3
  { domain: 3, q: 'What is RAG (Retrieval-Augmented Generation)?', a: 'Architecture: retrieve relevant document chunks from a knowledge base using embeddings, inject them into the prompt context, then generate a grounded answer. Reduces hallucinations by grounding responses in real data.' },
  { domain: 3, q: 'When should you use RAG vs Fine-tuning?', a: 'RAG: when you need up-to-date or proprietary knowledge, documents change frequently, or you want grounded answers. Fine-tuning: when you need specific tone/format/behavior at scale, or task is highly specialized.' },
  { domain: 3, q: 'What is Zero-shot prompting?', a: 'Asking the model to perform a task without providing any examples. Relies entirely on the model\'s pre-trained knowledge. Best for simple, well-defined tasks.' },
  { domain: 3, q: 'What is Few-shot prompting?', a: 'Providing 2–5 input→output examples in the prompt before the actual request. Guides the model to follow a specific pattern, format, or reasoning style.' },
  { domain: 3, q: 'What is Chain-of-Thought prompting?', a: 'Instructing the model to "think step by step" before giving a final answer. Dramatically improves accuracy on complex reasoning, math, and logic problems.' },
  { domain: 3, q: 'What does Amazon Bedrock Knowledge Bases do?', a: 'Managed RAG service: connect S3 documents → auto-chunk and embed → store in vector database → query with natural language. Supports OpenSearch, Aurora pgvector, Pinecone as vector stores.' },
  { domain: 3, q: 'What are Amazon Bedrock Agents?', a: 'Autonomous agents that can break down complex tasks, call external APIs and Lambda functions, query Knowledge Bases, and execute multi-step workflows — without custom orchestration code.' },
  { domain: 3, q: 'What do Bedrock Guardrails provide?', a: 'Safety layer for GenAI apps: filter harmful content categories, block specific topics, detect and redact PII, enable grounding checks (fact verification), and watermark AI-generated images.' },
  { domain: 3, q: 'What is Amazon Q Business?', a: 'Managed enterprise GenAI assistant. Connects to 40+ data sources (S3, SharePoint, Salesforce, databases). Permission-aware — users only get answers from data they\'re authorized to see. No ML expertise needed.' },
  { domain: 3, q: 'What is Amazon Q Developer?', a: 'AI coding companion integrated into IDEs (VS Code, JetBrains, AWS Console). Generates code, explains complex code, suggests fixes, reviews code for security, and transforms legacy code.' },
  { domain: 3, q: 'What is PartyRock?', a: 'Free, no-code playground powered by Amazon Bedrock. Build and share GenAI apps by dragging and dropping widgets (text input, AI output, image generation, chatbot). Great for experimenting.' },
  { domain: 3, q: 'What metrics evaluate GenAI outputs?', a: 'ROUGE: overlap between generated and reference text (good for summarization). BLEU: n-gram precision for translation. BERTScore: semantic similarity using embeddings. Human evaluation is still gold standard.' },

  // Domain 4
  { domain: 4, q: 'What are the 6 pillars of Responsible AI?', a: 'Fairness (unbiased), Explainability (interpretable), Privacy (data protection), Robustness (reliable under adversarial conditions), Governance (oversight frameworks), Transparency (documenting capabilities and limits).' },
  { domain: 4, q: 'What is data bias in ML?', a: 'When training data over- or under-represents certain groups, leading to unfair model behavior. Types: sampling bias, measurement bias, confirmation bias, historical bias.' },
  { domain: 4, q: 'What does SageMaker Clarify do?', a: 'Detect bias in datasets (pre-training) and model predictions (post-training). Generate feature importance explanations using SHAP values. Integrated into SageMaker pipelines.' },
  { domain: 4, q: 'What is a Human-in-the-Loop (HITL) system?', a: 'System where humans review and validate model predictions before they trigger actions, especially in high-stakes scenarios. AWS A2I (Augmented AI) is the service for building HITL workflows on AWS.' },
  { domain: 4, q: 'What are AWS AI Service Cards?', a: 'Documentation provided by AWS for each AI service that describes: intended use cases, limitations, responsible AI design choices, and recommendations for responsible deployment.' },
  { domain: 4, q: 'What is SHAP?', a: 'SHapley Additive exPlanations — a method from game theory used to explain individual predictions by quantifying each feature\'s contribution to the outcome. Used by SageMaker Clarify.' },
  { domain: 4, q: 'How does Bedrock Guardrails support Responsible AI?', a: 'Filters harmful content (violence, hate, sexual), blocks specific topics, detects and redacts PII, validates grounding (halucination detection), and adds invisible watermarks to AI-generated images.' },
  { domain: 4, q: 'What is explainability in ML?', a: 'The ability to understand and communicate why a model made a specific prediction. Local explainability: explain one prediction. Global explainability: understand overall model behavior. Critical for regulated industries.' },

  // Domain 5
  { domain: 5, q: 'What is the Shared Responsibility Model for AI?', a: 'AWS manages security OF the cloud (infrastructure, physical security, managed service internals). Customer is responsible for security IN the cloud: data encryption, IAM policies, application config, PII handling.' },
  { domain: 5, q: 'Does AWS use your Bedrock prompts to train models?', a: 'No. AWS guarantees that prompts and responses sent to Amazon Bedrock are NOT used to train any foundation models. Your data remains private and is not shared with model providers.' },
  { domain: 5, q: 'What is CloudTrail used for in AI workloads?', a: 'Records all API calls to Bedrock, SageMaker, Rekognition, etc. Use it for: security auditing, investigating unauthorized access, compliance reporting, and tracking which models were invoked.' },
  { domain: 5, q: 'What is Amazon Macie?', a: 'ML-powered service that automatically discovers and classifies sensitive data (PII, credentials, financial data) stored in S3. Critical for data governance before training ML models on customer data.' },
  { domain: 5, q: 'What is IAM least privilege for AI services?', a: 'Grant only the minimum permissions needed. For Bedrock: use resource-based policies to restrict which models can be called. For SageMaker: scope roles to specific training jobs, S3 buckets, and endpoints.' },
  { domain: 5, q: 'What is SageMaker Model Lineage?', a: 'Tracks the complete history of a model: source data → processing jobs → training runs → evaluations → deployments. Critical for reproducibility, auditing, and regulatory compliance.' },
  { domain: 5, q: 'What compliance frameworks are relevant for AWS AI?', a: 'HIPAA (healthcare data), GDPR (EU personal data), SOC 2 (security controls), PCI DSS (payment data). Use HIPAA-eligible AWS services, sign BAAs, and encrypt PHI at all times.' },
  { domain: 5, q: 'How do you encrypt ML data on AWS?', a: 'At rest: S3 SSE-S3, SSE-KMS (customer-managed keys), or SSE-C. SageMaker supports KMS encryption for notebooks, training data, and model artifacts. In transit: TLS 1.2+ enforced by all AWS services.' },
];

/* ─── State ─── */
let completedTopics = JSON.parse(localStorage.getItem('aws-study-progress') || '{}');
let currentFC = 0;
let fcCards = [...FLASHCARDS];
let fcDomainFilter = 'all';
let fcIsFlipped = false;
let fcKnown = new Set(JSON.parse(localStorage.getItem('aws-fc-known') || '[]'));

/* ─── Particle Canvas ─── */
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 153, 0, ${p.opacity})`;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ─── Navbar ─── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

/* ─── Scroll Reveal ─── */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ─── Hero Bar Animations ─── */
function animateHeroBars() {
  const fills = document.querySelectorAll('.domain-bar-fill');
  setTimeout(() => {
    fills.forEach(fill => {
      fill.style.width = fill.dataset.width + '%';
    });
  }, 600);
}

/* ─── Topic Checkboxes & Progress ─── */
function getTotalTopics() {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  document.querySelectorAll('.topic-item').forEach(item => {
    const d = parseInt(item.dataset.domain);
    if (counts[d] !== undefined) counts[d]++;
  });
  return counts;
}

function getCompletedForDomain(domain) {
  return Object.keys(completedTopics).filter(k => {
    return k.startsWith('d' + domain + '-') && completedTopics[k];
  }).length;
}

function updateProgress() {
  const totals = getTotalTopics();
  let totalAll = 0, completedAll = 0;

  for (let d = 1; d <= 5; d++) {
    const total = totals[d];
    const done = getCompletedForDomain(d);
    totalAll += total;
    completedAll += done;

    // Update mini cards
    const fill = document.getElementById(`d${d}-progress-fill`);
    const count = document.getElementById(`d${d}-count`);
    if (fill) fill.style.width = total > 0 ? ((done / total) * 100) + '%' : '0%';
    if (count) count.textContent = `${done} / ${total} topics`;
  }

  // Overall ring
  const pct = totalAll > 0 ? Math.round((completedAll / totalAll) * 100) : 0;
  const ring = document.getElementById('overall-ring');
  const pctEl = document.getElementById('overall-pct');
  if (ring) {
    const circumference = 2 * Math.PI * 65;
    ring.style.strokeDashoffset = circumference * (1 - pct / 100);
  }
  if (pctEl) pctEl.textContent = pct + '%';

  localStorage.setItem('aws-study-progress', JSON.stringify(completedTopics));
}

function initTopics() {
  document.querySelectorAll('.topic-item').forEach(item => {
    const id = item.dataset.id;
    if (completedTopics[id]) item.classList.add('completed');

    item.addEventListener('click', () => {
      completedTopics[id] = !completedTopics[id];
      item.classList.toggle('completed', completedTopics[id]);
      updateProgress();
    });
  });
  updateProgress();
}

/* ─── Domain Accordion ─── */
function initDomainAccordion() {
  document.querySelectorAll('.domain-header').forEach(header => {
    header.addEventListener('click', () => {
      const section = header.closest('.domain-section');
      const wasOpen = section.classList.contains('open');

      // Close all
      document.querySelectorAll('.domain-section').forEach(s => s.classList.remove('open'));

      // Toggle clicked
      if (!wasOpen) {
        section.classList.add('open');
        // Small delay then scroll into view
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    });
  });

  // Flashcard preview buttons
  document.querySelectorAll('.domain-flashcard-preview').forEach(preview => {
    preview.addEventListener('click', () => {
      const domainFilter = preview.dataset.domainFilter;
      openFlashcards(domainFilter);
    });
  });
}

/* ─── Services Grid ─── */
function renderServices(filter = 'all', search = '') {
  const grid = document.getElementById('services-grid');
  if (!grid) return;

  const filtered = AWS_SERVICES.filter(s => {
    const matchFilter = filter === 'all' || s.category === filter;
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.desc.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  grid.innerHTML = filtered.map(s => `
    <div class="service-card" data-category="${s.category}">
      <div class="service-card-header">
        <div class="service-emoji">${s.emoji}</div>
        <div>
          <div class="service-name">${s.name}</div>
          <div class="service-category">${s.category.toUpperCase()}</div>
        </div>
      </div>
      <div class="service-desc">${s.desc}</div>
      <div class="service-domains">
        ${s.domains.map(d => `<span class="service-domain-tag d${d}">Domain ${d}</span>`).join('')}
      </div>
    </div>
  `).join('');

  if (filtered.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted);">No services match your search.</div>';
  }
}

function initServices() {
  renderServices();

  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('services-search');
  let activeFilter = 'all';

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderServices(activeFilter, searchInput ? searchInput.value : '');
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderServices(activeFilter, searchInput.value);
    });
  }
}

/* ─── Flashcards ─── */
function getFilteredCards() {
  if (fcDomainFilter === 'all') return [...FLASHCARDS];
  return FLASHCARDS.filter(c => c.domain === parseInt(fcDomainFilter));
}

function renderCard() {
  const card = fcCards[currentFC];
  if (!card) return;

  const qEl = document.getElementById('fc-question');
  const aEl = document.getElementById('fc-answer');
  const counter = document.getElementById('fc-counter');
  const flashcard = document.getElementById('flashcard');

  if (qEl) qEl.textContent = card.q;
  if (aEl) aEl.textContent = card.a;
  if (counter) counter.textContent = `${currentFC + 1} / ${fcCards.length}`;

  // Reset flip
  fcIsFlipped = false;
  if (flashcard) flashcard.classList.remove('flipped');

  // Update nav buttons
  const prev = document.getElementById('fc-prev-btn');
  const next = document.getElementById('fc-next-btn');
  if (prev) prev.disabled = currentFC === 0;
  if (next) next.disabled = currentFC === fcCards.length - 1;
}

function openFlashcards(domainFilter = 'all') {
  fcDomainFilter = domainFilter;
  fcCards = getFilteredCards();
  currentFC = 0;

  // Update filter buttons
  document.querySelectorAll('.fc-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.fcDomain === domainFilter);
  });

  renderCard();
  document.getElementById('flashcard-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeFlashcards() {
  document.getElementById('flashcard-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function initFlashcards() {
  // Open buttons
  document.getElementById('open-flashcards-btn')?.addEventListener('click', () => openFlashcards('all'));
  document.getElementById('hero-flashcard-btn')?.addEventListener('click', () => openFlashcards('all'));

  // Close
  document.getElementById('close-modal-btn')?.addEventListener('click', closeFlashcards);
  document.getElementById('modal-backdrop')?.addEventListener('click', closeFlashcards);

  // Card flip
  document.getElementById('flashcard-scene')?.addEventListener('click', () => {
    const card = document.getElementById('flashcard');
    fcIsFlipped = !fcIsFlipped;
    card?.classList.toggle('flipped', fcIsFlipped);
  });

  // Navigation
  document.getElementById('fc-prev-btn')?.addEventListener('click', () => {
    if (currentFC > 0) { currentFC--; renderCard(); }
  });

  document.getElementById('fc-next-btn')?.addEventListener('click', () => {
    if (currentFC < fcCards.length - 1) { currentFC++; renderCard(); }
  });

  // Domain filter buttons
  document.querySelectorAll('.fc-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      fcDomainFilter = btn.dataset.fcDomain;
      fcCards = getFilteredCards();
      currentFC = 0;

      document.querySelectorAll('.fc-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCard();
    });
  });

  // Actions
  document.getElementById('fc-know-btn')?.addEventListener('click', () => {
    if (fcCards[currentFC]) {
      fcKnown.add(currentFC);
      localStorage.setItem('aws-fc-known', JSON.stringify([...fcKnown]));
    }
    if (currentFC < fcCards.length - 1) { currentFC++; renderCard(); }
  });

  document.getElementById('fc-review-btn')?.addEventListener('click', () => {
    if (currentFC < fcCards.length - 1) { currentFC++; renderCard(); }
  });

  document.getElementById('fc-shuffle-btn')?.addEventListener('click', () => {
    for (let i = fcCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [fcCards[i], fcCards[j]] = [fcCards[j], fcCards[i]];
    }
    currentFC = 0;
    renderCard();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('flashcard-modal');
    if (!modal?.classList.contains('open')) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      if (currentFC < fcCards.length - 1) { currentFC++; renderCard(); }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      if (currentFC > 0) { currentFC--; renderCard(); }
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      const card = document.getElementById('flashcard');
      fcIsFlipped = !fcIsFlipped;
      card?.classList.toggle('flipped', fcIsFlipped);
    } else if (e.key === 'Escape') {
      closeFlashcards();
    }
  });
}

/* ─── Reset Progress ─── */
function initResetButton() {
  const btn = document.getElementById('reset-progress-btn');
  btn?.addEventListener('click', () => {
    if (confirm('Reset all study progress? This cannot be undone.')) {
      completedTopics = {};
      localStorage.removeItem('aws-study-progress');
      document.querySelectorAll('.topic-item').forEach(item => item.classList.remove('completed'));
      updateProgress();
    }
  });
}

/* ─── Hamburger Menu ─── */
function initHamburger() {
  const btn = document.getElementById('hamburger-btn');
  btn?.addEventListener('click', () => {
    // Simple mobile: scroll to domains as fallback
    document.getElementById('domains').scrollIntoView({ behavior: 'smooth' });
  });
}

/* ─── Auto-open first domain ─── */
function initDefaultOpen() {
  // Open domain 1 by default after slight delay
  setTimeout(() => {
    const d1 = document.getElementById('domain-1-section');
    if (d1) d1.classList.add('open');
  }, 800);
}

/* ─── Animate progress ring on scroll into view ─── */
function initRingAnimation() {
  const ring = document.getElementById('overall-ring');
  if (!ring) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      updateProgress(); // Triggers ring animation
    }
  }, { threshold: 0.3 });

  observer.observe(ring);
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initNavbar();
  initScrollReveal();
  animateHeroBars();
  initTopics();
  initDomainAccordion();
  initServices();
  initFlashcards();
  initResetButton();
  initHamburger();
  initDefaultOpen();
  initRingAnimation();

  console.log('%c AWS AI Study Hub 🚀', 'color: #FF9900; font-size: 18px; font-weight: bold;');
  console.log('%c AIF-C01 Exam Prep — Good luck! ☁️', 'color: #00d4ff; font-size: 12px;');
});

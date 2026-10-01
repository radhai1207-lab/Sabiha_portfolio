/**
 * Portfolio Data Configuration for SABIHA
 * Easy to update, extend, and customize with real links and files.
 */

export const PORTFOLIO_DATA = {
  author: {
    name: "SABIHA",
    tagline: "WORDS, WRITTEN. STORIES, SHAPED.",
    roles: ["Writer", "Author", "Content Creator"],
    credentials: [
      "BA English Literature",
      "Published Author",
      "Content Creator",
      "Former English Teacher"
    ],
    bio: [
      "Sabiha is an English Literature graduate whose relationship with words spans published books, poetry anthologies, digital brand storytelling, and education.",
      "Having taught English at Chaitanya Group of Institutions, she developed a deep pedagogical appreciation for language clarity, rhythm, and audience empathy. That foundation carried seamlessly into digital content creation.",
      "At Reach Skyline, Sabiha crafted compelling content for notable healthcare institutions — architecting captions, video narratives for both long-form and short-form formats, blog articles, and high-engagement social storytelling.",
      "As an independent author, co-author, and compiler, her written work spans mystery thrillers, international multi-voice anthologies, and curated women's poetry."
    ],
    contacts: {
      email: "sabiha1556sabiha1556@gmail.com",
      phone: "+91 6385139912",
      phoneRaw: "6385139912"
    }
  },

  books: [
    {
      id: "scream",
      number: "01",
      title: "SCREAM",
      role: "AUTHOR",
      roleInterpretation: "I created the story.",
      genre: "Mystery Thriller",
      publisher: "Notion Press",
      coverUrl: "https://d1n4jo9i5084wt.cloudfront.net/cover/1392709/56016720resize_cover_464130.png",
      description: "Her published mystery thriller, SCREAM, marked one of Sabiha's milestones as an author. A suspenseful investigation driven by keen observation, sharp deduction, and psychological tension.",
      link: "https://notionpress.com/in/read/scream-1392709",
      buttonText: "READ / VIEW ON NOTION PRESS",
      accent: "#732C3A"
    },
    {
      id: "musing-motley",
      number: "02",
      title: "A MUSING MOTLEY",
      role: "CO-AUTHOR",
      roleInterpretation: "I shared the page.",
      genre: "International Anthology",
      publisher: "Amazon",
      coverUrl: null,
      description: "An anthology bringing together writers from different countries, creating a shared collection of voices and perspectives across diverse cultural horizons.",
      link: "https://amzn.in/d/0foGmGvs",
      buttonText: "VIEW ON AMAZON",
      accent: "#3B4A5A"
    },
    {
      id: "nibs-of-fire",
      number: "03",
      title: "NIBS OF FIRE",
      role: "COMPILER",
      roleInterpretation: "I brought voices together.",
      genre: "Women's Poetry Collection",
      publisher: "Amazon",
      coverUrl: null,
      description: "Sabiha served as the compiler of a poetry collection bringing together powerful, resonant poetry written by women — curating cadence, theme, and evocative verse.",
      link: "https://amzn.in/d/0cXz9Jqt",
      buttonText: "VIEW ON AMAZON",
      accent: "#8B5A2B"
    }
  ],

  bookRoles: [
    {
      role: "AUTHOR",
      interpretation: "I created the story.",
      quote: "AUTHOR — \"I created the story.\"",
      subtext: "Conceiving narrative universes, characters with weight, suspenseful arcs, and individual authorial voice from blank pages to final bound book."
    },
    {
      role: "CO-AUTHOR",
      interpretation: "I shared the page.",
      quote: "CO-AUTHOR — \"I shared the page.\"",
      subtext: "Harmonizing alongside international writers in anthologies where distinct viewpoints weave into a unified, multifaceted reading experience."
    },
    {
      role: "COMPILER",
      interpretation: "I brought voices together.",
      quote: "COMPILER — \"I brought voices together.\"",
      subtext: "Selecting, organizing, and orchestrating works by fellow women poets — acting as an editorial steward for collective literary expression."
    }
  ],

  milestones: [
    {
      step: "01",
      title: "100 AUTHORS EZHUDHUNGA",
      subtitle: "NGO Literary Celebration",
      detail: "Celebrated alongside 100 authors through the prominent NGO event 'EZHUDHUNGA', honoring emerging literary talents."
    },
    {
      step: "02",
      title: "SCREAM PUBLISHED",
      subtitle: "Milestone Book Release",
      detail: "Her book SCREAM was published and highlighted through the event, formally establishing her voice in the mystery thriller genre."
    },
    {
      step: "03",
      title: "YOUNG AUTHOR AWARD",
      subtitle: "ISRO Scientist Gokul",
      detail: "Conferred the Young Author Award during the recognition ceremony, with notable involvement and presence of ISRO scientist Gokul."
    },
    {
      step: "04",
      title: "HONORARY RECOGNITION",
      subtitle: "Kalam Family Conferred Honor",
      detail: "Received an honorary award, medal, and certificate presented by the grandson of Dr. A.P.J. Abdul Kalam."
    }
  ],

  contentEcosystem: {
    company: "Reach Skyline",
    role: "Content Creator / Writer",
    summary: "Through Reach Skyline, Sabiha created captions and content for long-form and short-form videos, blogs and Instagram posts for notable healthcare institutions.",
    categories: [
      { name: "LONG-FORM VIDEO CONTENT", badge: "Scripts & Narratives", desc: "Structured educational pacing, clinical precision, patient-friendly flow." },
      { name: "SHORT-FORM VIDEO CONTENT", badge: "Reels & Shorts", desc: "Instant hooks, retaining viewer attention, concise messaging." },
      { name: "HEALTHCARE CONTENT", badge: "Specialized Sector", desc: "Empathetic, clear, and trustworthy communication for patients and medical audiences." },
      { name: "BLOGS", badge: "Long Reads", desc: "Authoritative, well-researched healthcare and wellness articles." },
      { name: "INSTAGRAM POSTS", badge: "Visual Storytelling", desc: "Carousel copy, visual-verbal harmony, high-shareability narratives." },
      { name: "CAPTIONS", badge: "Micro-Copy", desc: "Compelling introductory lines and authentic invitations to converse." }
    ]
  },

  teaching: {
    institution: "Chaitanya Group of Institutions",
    role: "English Teacher",
    summary: "Experience as an English teacher strengthened Sabiha's mastery over pedagogy, clarity of thought, and the subtle art of articulating ideas so they resonate across diverse minds.",
    skills: [
      { name: "Communication", desc: "Articulating complex thoughts with composure, poise, and genuine warmth." },
      { name: "Language & Syntax", desc: "Rigorous attention to grammatical elegance, pacing, and cadence." },
      { name: "Audience Understanding", desc: "Sensing how different listeners and readers absorb and process language." },
      { name: "Clarity & Simplicity", desc: "Distilling intricate thoughts into crisp, accessible phrasing without losing depth." },
      { name: "Storytelling in Pedagogy", desc: "Anchoring lessons in narrative contexts that make concepts unforgettable." },
      { name: "Presentation & Pacing", desc: "Balancing tone, emphasis, and breath to keep audiences engaged." }
    ]
  }
};

import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import profileImage from './asset/1733507502406-Picsart-BackgroundChanger.png';


const skillsData = {
    'Programming': [
        { name: 'Python', level: '95%' },
        { name: 'C', level: '85%' },
        { name: 'C++', level: '80%' },
        { name: 'SQL', level: '88%' },
        { name: 'JavaScript', level: '75%' },
        { name: 'HTML/CSS', level: '90%' },
    ],
    'ML/DL Algorithms': [
        { name: 'Random Forest, XGBoost, LightGBM', level: '90%' },
        { name: 'CNN, ANN, SVM, KNN, LDA', level: '85%' },
        { name: 'LLM', level: '80%' },
        { name: 'Gen AI', level: '82%' },
    ],
    'Tools & Frameworks': [
        { name: 'TensorFlow, Scikit-learn', level: '92%' },
        { name: 'Pandas, NumPy, OpenCV, Matplotlib', level: '95%' },
    ],
    'Automation': [
        { name: 'n8n', level: '90%' },
        { name: 'UiPath', level: '90%' },
    ],
    'Platforms & Other': [
        { name: 'Docker, Flask, GitHub', level: '85%' },
        { name: 'Google Colab, VS Code', level: '90%' },
    ],
};

const projectsData = [
    {
        title: 'Multimodal AI Translation Pipeline',
        description: 'Built a unified translation system combining BLIP (image captioning), EasyOCR (text extraction), XLM-RoBERTa (language detection), M2M100 (multilingual translation), BERTweet (emotion analysis), and gTTS (speech synthesis). Enables context-aware, emotion-sensitive, and multilingual translation from images or text.',
        tech: 'PyTorch, Hugging Face, EasyOCR, gTTS, Flask',
        link: 'https://github.com/dhinagar-a/multimodal-ai-translation-pipeline'
    },
    {
        title: 'AI-Powered Plant Disease Diagnosis and Treatment System',
        description: 'Built a ResNet-34 deep learning model to detect plant diseases from leaf images and integrated a Large Language Model (LLM) for treatment recommendations. Designed a React + Flask full-stack web app, styled with Bootstrap, and Dockerized the system for scalable deployment.',
        tech: 'ResNet-34, Flask, React, LLM, Docker',
        link: 'https://github.com/dhinagar-a/plant-disease-diagnosis-treatment-system'
    },
    
    {
        title: 'Credit Card Risk Analyzer (BNP Paribas)',
        description: 'Built a machine learning-based risk analysis system to detect credit card fraud and evaluate transaction risks. Used XGBoost, LightGBM, and SHAP for accurate and explainable predictions. Designed during the BNP Paribas Innoversité Hackathon, achieving 97% accuracy and top 2% selection among 31,000+ participants.',
        tech: 'Python, Scikit-learn, XGBoost, Flask, SHAP',
        link: 'https://github.com/dhinagar-a/credit-card-risk-analyzer'
    },
    {
        title: 'Chatbot for Tamil Nadu Textbooks (RAG + GenAI)',
        description: 'Built a bilingual AI chatbot using LangChain, FAISS, and GPT APIs to process 1000+ textbook pages into a semantic knowledge base. Supports Tamil and English queries with context-aware answers and features a scalable backend API for educational applications.',
        tech: 'Python, LangChain, FAISS, GPT, Flask',
        link: 'https://github.com/dhinagar-a/tamil-nadu-textbooks-chatbot'
    },
    
    {
        title: 'Emotion Recognition using GSR Signals',
        description: 'Classified emotional states (Amusing, Boring, Relaxing, Scary) using time-frequency features.',
        tech: 'Signal Processing, Machine Learning',
        link: 'https://github.com/dhinagar-a/emotion-recognition-gsr'
    },
    {
        title: 'Floating Barriers for Plastic Waste Management (IoT Project)',
        description: 'Designed floating barriers to prevent plastic waste in rivers (Trichy Corporation Initiative).',
        tech: 'IoT, Environmental Engineering',
        link: 'https://github.com/dhinagar-a/iot-plastic-waste-management'
    },
    
];

const certificationsData = [
    { title: 'NPTEL – Data Analytics', description: 'Statistical analysis & ML applications.' },
    { title: 'IBM – Data Science Specialization', description: 'Python-based data analytics and visualization.' },
    { title: 'UiPath RPA Certification', description: 'Process automation and workflow design.' },
    { title: 'IBM – SQL (Coursera)', description: 'Query optimization and data handling.' },
    { title: 'Cisco – Computer Networking', description: 'Networking fundamentals and system integration.' }
];

const experienceData = [
    { title: 'GOOGLE AI-ML Virtual Internship — National Internship Portal', description: 'Focused on model development, data preprocessing, and AI ethics.' },
    { title: 'BNP Paribas Hackathon — Machine Learning Track Participant', description: 'Gained experience in a competitive ML environment, reaching the top <2%.' }
];

const servicesData = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3.75H19.5M8.25 6.75H19.5M8.25 9.75H19.5M8.25 12.75H19.5m-11.25-9v11.25c0 .621-.504 1.125-1.125 1.125H4.5A1.125 1.125 0 0 1 3.375 15V4.875c0-.621.504-1.125 1.125-1.125H6.75A1.125 1.125 0 0 1 8.25 4.875V5.25" />
            </svg>
        ),
        title: 'AI & Machine Learning Solutions',
        description: 'Developing custom machine learning models for classification, regression, and NLP. Specializing in data analysis, predictive modeling, and computer vision.'
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
        ),
        title: 'GenAI & Chatbot Development',
        description: 'Building intelligent, context-aware chatbots and conversational AI using Large Language Models (LLMs), RAG pipelines, and frameworks like LangChain.'
    },
    {
        icon: (
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5 3 11.25l3.75 3.75M21 11.25H3" />
            </svg>
        ),
        title: 'Full-Stack Web Development',
        description: 'Creating responsive and scalable web applications from front-end to back-end, using modern frameworks like React and Flask to deliver seamless user experiences.'
    },
    {
        icon: (
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" />
            </svg>
        ),
        title: 'Automation & RPA',
        description: 'Designing and implementing automated workflows and robotic process automation (RPA) solutions with tools like UiPath and n8n to boost business efficiency.'
    },
];


const App = () => {
    const [activeView, setActiveView] = useState('home');
    const [theme, setTheme] = useState('dark');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [socialEmailText, setSocialEmailText] = useState('Email');
    const [socialPhoneText, setSocialPhoneText] = useState('Phone');
    const [modalEmailCopyText, setModalEmailCopyText] = useState('Copy');
    const [modalPhoneCopyText, setModalPhoneCopyText] = useState('Copy');

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsModalOpen(false);
            }
        };

        if (isModalOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isModalOpen]);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);
    
    const handleCopyToClipboard = (text: string, type: 'social-email' | 'social-phone' | 'modal-email' | 'modal-phone') => {
        navigator.clipboard.writeText(text).then(() => {
            if (type === 'social-email') {
                setSocialEmailText('Copied!');
                setTimeout(() => setSocialEmailText('Email'), 2000);
            } else if (type === 'social-phone') {
                setSocialPhoneText('Copied!');
                setTimeout(() => setSocialPhoneText('Phone'), 2000);
            } else if (type === 'modal-email') {
                setModalEmailCopyText('Copied!');
                setTimeout(() => setModalEmailCopyText('Copy'), 2000);
            } else if (type === 'modal-phone') {
                setModalPhoneCopyText('Copied!');
                setTimeout(() => setModalPhoneCopyText('Copy'), 2000);
            }
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };

    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            width: '100%',
        },
        heroImageContainer: {
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: '300px',
        },
        heroImage: {
            width: 'clamp(250px, 80vw, 350px)',
            height: 'clamp(250px, 80vw, 350px)',
            objectFit: 'cover',
            borderRadius: '50%',
            border: '4px solid var(--secondary-color)',
        },
        section: {
            backgroundColor: 'var(--primary-color)',
            padding: '3rem 2rem',
            borderRadius: '12px',
            margin: '2rem 0',
            width: '100%',
            boxSizing: 'border-box',
            transition: 'background-color 0.3s ease',
        },
        sectionTitle: {
            fontSize: '2.5rem',
            fontWeight: 600,
            marginBottom: '2rem',
            color: 'var(--text-color)',
            textAlign: 'center',
        },
        aboutText: {
            fontSize: '1.1rem',
            lineHeight: 1.8,
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
        },
        socialList: {
            listStyle: 'none',
            padding: 0,
            margin: '2rem 0 0 0',
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '1rem',
            flexWrap: 'wrap',
        },
        socialLink: {
            color: 'var(--text-color)',
            textDecoration: 'none',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            border: '1px solid var(--secondary-color)',
            borderRadius: '8px',
            backgroundColor: 'var(--secondary-color)',
        },
        icon: {
            width: '24px',
            height: '24px',
        },
        skillsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
        },
        skillCategoryTitle: {
            fontSize: '1.4rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
            color: 'var(--accent-color)',
            borderBottom: '2px solid var(--secondary-color)',
            paddingBottom: '0.5rem',
        },
        skillItem: {
            marginBottom: '1rem',
        },
        skillName: {
            fontSize: '1rem',
            marginBottom: '0.5rem',
        },
        skillBar: {
            height: '8px',
            backgroundColor: 'var(--secondary-color)',
            borderRadius: '4px',
            overflow: 'hidden',
        },
        projectsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
        },
        projectCard: {
            backgroundColor: 'var(--secondary-color)',
            padding: '1.5rem',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        },
        projectTitle: {
            fontSize: '1.3rem',
            fontWeight: 600,
            color: 'var(--accent-color)',
            margin: 0,
        },
        projectDescription: {
            fontSize: '0.95rem',
            lineHeight: 1.7,
            margin: 0,
            flexGrow: 1,
        },
        projectTech: {
            fontSize: '0.85rem',
            color: '#aaa',
            fontStyle: 'italic',
        },
        listItem: {
            backgroundColor: 'var(--secondary-color)',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '1rem',
        },
        listItemTitle: {
            fontSize: '1.2rem',
            fontWeight: 600,
            margin: '0 0 0.5rem 0',
        },
        listItemDescription: {
            fontSize: '1rem',
            lineHeight: 1.7,
            margin: 0,
        },
        educationContent: {
            textAlign: 'center',
        },
        servicesGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
        },
        serviceCard: {
            backgroundColor: 'var(--secondary-color)',
            padding: '2rem',
            borderRadius: '8px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        },
        serviceIcon: {
            width: '50px',
            height: '50px',
            color: 'var(--accent-color)',
        },
        serviceTitle: {
            fontSize: '1.3rem',
            fontWeight: 600,
            margin: 0,
        },
        serviceDescription: {
            fontSize: '0.95rem',
            lineHeight: 1.7,
            margin: 0,
        },
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, view: string) => {
        e.preventDefault();
        setActiveView(view);
        setIsMenuOpen(false); // Close menu on navigation
    };

    const NavLink = ({ view, name }: { view: string, name: string }) => (
        <a 
            href={`#${view}`} 
            onClick={(e) => handleNavClick(e, view)} 
            className={`nav-link ${activeView === view ? 'active' : ''}`}
        >
            {name}
        </a>
    );

    return (
        <div style={styles.container}>
            <nav className="nav">
                <div className="nav-logo">Dhinagar A</div>
                
                {/* Desktop Nav */}
                <div className="desktop-nav">
                    <NavLink view="home" name="Home" />
                    <NavLink view="skills" name="Skills" />
                    <NavLink view="projects" name="Projects" />
                    <NavLink view="services" name="Services" />
                    <button onClick={toggleTheme} className="theme-toggle-button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
                        {theme === 'dark' ? (
                            <svg className="theme-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                            </svg>
                        ) : (
                           <svg className="theme-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>
                        )}
                    </button>
                    <button onClick={() => setIsModalOpen(true)} className="lets-talk-button">Let's Talk</button>
                </div>

                 {/* Mobile Nav Actions & Hamburger */}
                <div className="mobile-nav">
                     <button onClick={toggleTheme} className="theme-toggle-button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
                         {theme === 'dark' ? (
                            <svg className="theme-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                            </svg>
                        ) : (
                           <svg className="theme-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>
                        )}
                    </button>
                    <button onClick={() => setIsModalOpen(true)} className="lets-talk-button">Let's Talk</button>
                    <button className="hamburger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                        {isMenuOpen ? (
                             <svg style={styles.icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                        ) : (
                             <svg style={styles.icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                        )}
                    </button>
                </div>
                 {/* Mobile Menu Overlay */}
                 <div className={`mobile-overlay ${isMenuOpen ? 'open' : ''}`}>
                    <NavLink view="home" name="Home" />
                    <NavLink view="skills" name="Skills" />
                    <NavLink view="projects" name="Projects" />
                    <NavLink view="services" name="Services" />
                </div>
            </nav>

            {activeView === 'home' && (
                <header id="home" className="hero">
                    <div className="hero-text">
                        <h1 className="hero-greeting animated-component" style={{ animationName: 'slideInLeft', animationDuration: '0.8s' }}>Hi, I’m <span className="hero-name">Dhinagar A</span> 👋</h1>
                        <p className="hero-title animated-component" style={{animationDelay: '200ms', animationName: 'slideUp', animationDuration: '0.7s'}}>AI & Machine Learning Engineer | Software Developer | Innovator</p>
                        <p className="hero-description animated-component" style={{animationDelay: '400ms', animationName: 'slideUp', animationDuration: '0.7s'}}>
                            I’m an enthusiastic Computer Science student specializing in Artificial Intelligence and Machine Learning at SRM Institute of Science and Technology. My goal is to build intelligent systems that drive innovation in sustainability, automation, and healthcare through machine learning and deep learning technologies.
                        </p>
                        <div className="quick-details animated-component" style={{animationDelay: '600ms', animationName: 'slideUp', animationDuration: '0.7s'}}>
                            🎓 <b>Program:</b> B.Tech CSE (AI & ML) <br />
                            🏫 <b>Institution:</b> SRM Institute of Science and Technology <br />
                            📍 <b>Location:</b> Tamil Nadu, India
                        </div>
                         <ul style={styles.socialList} className="social-list">
                            <li className="animated-component" style={{ animationName: 'slideUp', animationDuration: '0.7s', animationDelay: '800ms' }}>
                                 <a href="https://www.linkedin.com/in/dhinagar-a-673615250/" target="_blank" rel="noopener noreferrer" style={styles.socialLink} className="social-link">
                                    <svg style={{...styles.icon, fill: 'currentColor'}} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                    LinkedIn
                                </a>
                            </li>
                            <li className="animated-component" style={{ animationName: 'slideUp', animationDuration: '0.7s', animationDelay: '950ms' }}>
                                 <a href="https://github.com/dhina547" target="_blank" rel="noopener noreferrer" style={styles.socialLink} className="social-link">
                                    <svg style={{...styles.icon, fill: 'currentColor'}} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.69 0 3.84-2.33 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.57.69.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10Z"/></svg>
                                    GitHub
                                </a>
                            </li>
                            <li className="animated-component" style={{ animationName: 'slideUp', animationDuration: '0.7s', animationDelay: '1100ms' }}>
                                 <button onClick={() => handleCopyToClipboard('dhinagar547@gmail.com', 'social-email')} style={{...styles.socialLink, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem'}} className="social-link">
                                    <svg style={{...styles.icon, fill: 'currentColor'}} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                                    {socialEmailText}
                                </button>
                            </li>
                            <li className="animated-component" style={{ animationName: 'slideUp', animationDuration: '0.7s', animationDelay: '1250ms' }}>
                                 <button onClick={() => handleCopyToClipboard('+91 9597286291', 'social-phone')} style={{...styles.socialLink, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem'}} className="social-link">
                                    <svg style={{...styles.icon, fill: 'currentColor'}} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6.62 10.79a15.45 15.45 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.02.74-.25 1.02l-2.2 2.2z"/></svg>
                                    {socialPhoneText}
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div style={{...styles.heroImageContainer, animationDelay: '300ms', animationName: 'scaleIn', animationDuration: '0.7s'}} className="animated-component hero-image-container">
                        <img src={profileImage} alt="Dhinagar A" style={styles.heroImage} />
                    </div>
                </header>
            )}

            <main style={{width: '100%'}} key={activeView}>
                {activeView === 'home' && (
                    <div>
                        <section style={{...styles.section, animationDelay: '200ms', animationName: 'slideUp', animationDuration: '0.7s'}} className="animated-component section" aria-labelledby="about-me-title">
                            <h2 id="about-me-title" style={styles.sectionTitle} className="section-title">About Me</h2>
                            <p style={styles.aboutText}>
                                I am passionate about exploring the intersection of Artificial Intelligence, Data Science, and Software Engineering. With hands-on experience in developing end-to-end AI systems, I’ve worked on multiple projects involving image recognition, biosignal analysis, predictive maintenance, and code optimization. I believe AI can make a positive impact on society — from helping farmers identify plant diseases to creating intelligent code refactoring tools.
                            </p>
                        </section>
                        <section style={{...styles.section, animationDelay: '400ms', animationName: 'slideUp', animationDuration: '0.7s'}} className="animated-component section" aria-labelledby="experience-title">
                            <h2 id="experience-title" style={styles.sectionTitle} className="section-title">Internships & Experience</h2>
                            {experienceData.map(exp => (
                                <div style={styles.listItem} key={exp.title}>
                                    <h3 style={styles.listItemTitle}>{exp.title}</h3>
                                    <p style={styles.listItemDescription}>{exp.description}</p>
                                </div>
                            ))}
                        </section>
                        <section style={{...styles.section, animationDelay: '600ms', animationName: 'slideUp', animationDuration: '0.7s'}} className="animated-component section" aria-labelledby="certifications-title">
                            <h2 id="certifications-title" style={styles.sectionTitle} className="section-title">Certifications</h2>
                            {certificationsData.map(cert => (
                                <div style={styles.listItem} key={cert.title}>
                                    <h3 style={styles.listItemTitle}>{cert.title}</h3>
                                    <p style={styles.listItemDescription}>{cert.description}</p>
                                </div>
                            ))}
                        </section>
                        <section style={{...styles.section, animationDelay: '800ms', animationName: 'slideUp', animationDuration: '0.7s'}} className="animated-component section" aria-labelledby="education-title">
                            <h2 id="education-title" style={styles.sectionTitle} className="section-title">Education</h2>
                            <div style={styles.educationContent}>
                                <h3 style={styles.listItemTitle}>B.Tech, Computer Science & Engineering – AI & ML</h3>
                                <p style={styles.listItemDescription}>SRM Institute of Science and Technology</p>
                                <p style={{...styles.listItemDescription, color: '#aaa' }}>2022 – 2026</p>
                            </div>
                        </section>
                    </div>
                )}
                
                {activeView === 'skills' && (
                     <section id="skills" style={styles.section} className="fade-in section" aria-labelledby="skills-title">
                        <h2 id="skills-title" style={styles.sectionTitle} className="section-title">Skills</h2>
                        <div style={styles.skillsGrid}>
                            {Object.entries(skillsData).map(([category, skills]) => (
                                <div key={category}>
                                    <h3 style={styles.skillCategoryTitle}>{category}</h3>
                                    {skills.map(skill => (
                                        <div style={styles.skillItem} key={skill.name}>
                                            <p style={styles.skillName}>{skill.name}</p>
                                            <div style={styles.skillBar}>
                                                <div className="animated-skill-progress" style={{ width: skill.level }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {activeView === 'projects' && (
                    <section id="projects" style={styles.section} className="fade-in section" aria-labelledby="projects-title">
                        <h2 id="projects-title" style={styles.sectionTitle} className="section-title">Projects</h2>
                        <div style={styles.projectsGrid}>
                            {projectsData.map((project, index) => (
                                <div className="project-card slide-up" style={{...styles.projectCard, animationDelay: `${index * 100}ms`}} key={project.title}>
                                    <h3 style={styles.projectTitle}>{project.title}</h3>
                                    <p style={styles.projectDescription}>{project.description}</p>
                                    <p style={styles.projectTech}><b>Tech:</b> {project.tech}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {activeView === 'services' && (
                     <section id="services" style={styles.section} className="fade-in section" aria-labelledby="services-title">
                        <h2 id="services-title" style={styles.sectionTitle} className="section-title">What I Offer</h2>
                        <div style={styles.servicesGrid}>
                            {servicesData.map((service, index) => (
                                <div className="service-card slide-up" style={{...styles.serviceCard, animationDelay: `${index * 100}ms`}} key={service.title}>
                                    <div style={styles.serviceIcon}>{service.icon}</div>
                                    <h3 style={styles.serviceTitle}>{service.title}</h3>
                                    <p style={styles.serviceDescription}>{service.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
            {isModalOpen && (
                <div className="modal-overlay fade-in-fast" onClick={() => setIsModalOpen(false)} role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
                    <div className="modal-content scale-in-fast" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-button" onClick={() => setIsModalOpen(false)} aria-label="Close dialog">&times;</button>
                        <h2 id="contact-modal-title" className="modal-title">Let's Connect</h2>
                        <div className="contact-info">
                            <p>
                                <span>
                                    <strong>Email:</strong> 
                                    <a href="mailto:dhinagar547@gmail.com" className="contact-link">dhinagar547@gmail.com</a>
                                </span>
                                <button onClick={() => handleCopyToClipboard('dhinagar547@gmail.com', 'modal-email')} className="copy-button">
                                    {modalEmailCopyText}
                                </button>
                            </p>
                            <p>
                                <span>
                                    <strong>Phone:</strong> 
                                    <a href="tel:+919597286291" className="contact-link">+91 95972 86291</a>
                                </span>
                                <button onClick={() => handleCopyToClipboard('+91 9597286291', 'modal-phone')} className="copy-button">
                                    {modalPhoneCopyText}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}

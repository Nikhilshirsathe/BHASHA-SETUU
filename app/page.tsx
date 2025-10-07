'use client'

import { useState, useRef } from 'react'
import Tesseract from 'tesseract.js'

const translations = {
  en: {
    title: 'भाषा सेतु',
    subtitle: 'Offline Multilingual Floating Assistant',
    floatingWidget: 'Floating Widget',
    offlineTranslator: 'Offline Translator',
    voiceAssistant: 'Voice Assistant', 
    learningModules: 'Learning Modules',
    literatureCentre: 'Literature Centre',
    chatbot: 'Offline Chatbot',
    upload: 'Upload File (Image/PDF)',
    translate: 'Translate Offline',
    from: 'From',
    to: 'To',
    processing: 'Processing offline...',
    typeMessage: 'Ask me anything...',
    send: 'Send',
    alphabets: 'Alphabets & Scripts',
    words: 'Vocabulary Builder',
    grammar: 'Grammar Rules',
    poems: 'Stories & Poems',
    welcome: 'Welcome to Offline Language Assistant',
    description: '100% Offline • Privacy-Safe • Instant Translation • Voice Recognition',
    ocrExtract: 'Extract Text (OCR)',
    readAloud: 'Read Aloud',
    inlineTranslation: 'Inline Translation',
    floatingMode: 'Enable Floating Mode',
    offlineMode: 'Working Offline',
    selectText: 'Select text anywhere for instant translation'
  },
  ne: {
    title: 'भाषा सेतु',
    subtitle: 'अफलाइन बहुभाषिक फ्लोटिङ सहायक',
    floatingWidget: 'फ्लोटिङ विजेट',
    offlineTranslator: 'अफलाइन अनुवादक',
    voiceAssistant: 'आवाज सहायक',
    learningModules: 'सिकाइ मोड्युलहरू',
    literatureCentre: 'साहित्य केन्द्र',
    chatbot: 'अफलाइन च्याटबोट',
    upload: 'फाइल अपलोड (तस्बिर/PDF)',
    translate: 'अफलाइन अनुवाद',
    from: 'बाट',
    to: 'मा',
    processing: 'अफलाइन प्रक्रिया गर्दै...',
    typeMessage: 'मलाई जे सोध्नुहोस्...',
    send: 'पठाउनुहोस्',
    alphabets: 'वर्णमाला र लिपि',
    words: 'शब्दकोश निर्माता',
    grammar: 'व्याकरण नियम',
    poems: 'कथा र कविता',
    welcome: 'अफलाइन भाषा सहायकमा स्वागत',
    description: '१००% अफलाइन • गोपनीयता सुरक्षित • तुरुन्त अनुवाद • आवाज पहिचान',
    ocrExtract: 'पाठ निकाल्नुहोस् (OCR)',
    readAloud: 'ठूलो स्वरमा पढ्नुहोस्',
    inlineTranslation: 'इनलाइन अनुवाद',
    floatingMode: 'फ्लोटिङ मोड सक्षम गर्नुहोस्',
    offlineMode: 'अफलाइन काम गर्दै',
    selectText: 'तुरुन्त अनुवादको लागि कहीं पनि पाठ चयन गर्नुहोस्'
  },
  si: {
    title: 'භාෂා සේතු',
    subtitle: 'නොබැඳි බහුභාෂා පාවෙන සහායක',
    floatingWidget: 'පාවෙන විජට්',
    offlineTranslator: 'නොබැඳි පරිවර්තකය',
    voiceAssistant: 'හඬ සහායක',
    learningModules: 'ඉගෙනුම් මොඩියුල',
    literatureCentre: 'සාහිත්ය මධ්යස්ථානය',
    chatbot: 'නොබැඳි චැට්බොට්',
    upload: 'ගොනුව උඩුගත කරන්න (රූප/PDF)',
    translate: 'නොබැඳිව පරිවර්තනය',
    from: 'සිට',
    to: 'දක්වා',
    processing: 'නොබැඳිව සැකසෙමින්...',
    typeMessage: 'මට ඕනෑම දෙයක් අසන්න...',
    send: 'යවන්න',
    alphabets: 'අකුරු සහ ලිපි',
    words: 'වචන සම්පත් සාදන්නා',
    grammar: 'ව්යාකරණ නීති',
    poems: 'කතා සහ කවි',
    welcome: 'නොබැඳි භාෂා සහායකයට සාදරයෙන් පිළිගනිමු',
    description: '100% නොබැඳි • පෞද්ගලිකත්ව ආරක්ෂිත • ක්ෂණික පරිවර්තනය • හඬ හඳුනාගැනීම',
    ocrExtract: 'පෙළ නිස්සාරණය (OCR)',
    readAloud: 'ශබ්දයෙන් කියවන්න',
    inlineTranslation: 'අභ්යන්තර පරිවර්තනය',
    floatingMode: 'පාවෙන ප්රකාරය සක්රිය කරන්න',
    offlineMode: 'නොබැඳිව ක්රියා කරමින්',
    selectText: 'ක්ෂණික පරිවර්තනය සඳහා ඕනෑම තැන පෙළ තෝරන්න'
  }
}

export default function Home() {
  const [language, setLanguage] = useState('en')
  const [theme, setTheme] = useState('light')
  const [uiTheme, setUiTheme] = useState('nepali-theme')
  const [activeSection, setActiveSection] = useState('offlineTranslator')
  const [isFloatingMode, setIsFloatingMode] = useState(false)
  const [sourceText, setSourceText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [fromLang, setFromLang] = useState('ne')
  const [toLang, setToLang] = useState('en')
  const [processing, setProcessing] = useState(false)
  const [chatMessages, setChatMessages] = useState<{text: string, sender: 'user' | 'bot'}[]>([])
  const [chatInput, setChatInput] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const t = translations[language as keyof typeof translations]

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setProcessing(true)
    try {
      const { data: { text } } = await Tesseract.recognize(file, 'eng+nep')
      setSourceText(text)
    } catch (error) {
      console.error('OCR Error:', error)
    }
    setProcessing(false)
  }

  const translateText = async () => {
    if (!sourceText.trim()) return
    
    setProcessing(true)
    setTimeout(() => {
      setTranslatedText(`[Offline Translation ${fromLang} → ${toLang}]: ${sourceText}`)
      setProcessing(false)
    }, 1000)
  }

  const speakText = (text: string, lang: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang === 'ne' ? 'ne-NP' : lang === 'si' ? 'si-LK' : 'en-US'
    speechSynthesis.speak(utterance)
  }

  const sendMessage = () => {
    if (!chatInput.trim()) return
    setChatMessages(prev => [...prev, { text: chatInput, sender: 'user' }])
    setTimeout(() => {
      setChatMessages(prev => [...prev, { text: `Offline AI: I understand "${chatInput}". How can I help with translation or learning?`, sender: 'bot' }])
    }, 1000)
    setChatInput('')
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'offlineTranslator':
        return (
          <div className="translator-shrine">
            <div className="shrine-header">
              <h2 className="shrine-title">{t.offlineTranslator}</h2>
              <div className="offline-badge">
                <span>🔒</span> 100% Offline • Privacy Safe
              </div>
              <div className="decorative-border"></div>
            </div>
            
            <div className="sacred-upload" onClick={() => fileInputRef.current?.click()}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <div className="upload-icon">📜</div>
              <p className="upload-text">{processing ? t.processing : t.upload}</p>
              <small className="ocr-info">{t.ocrExtract} - Nepali & Sinhala Support</small>
              <div className="upload-ornament"></div>
            </div>

            <div className="translation-chambers">
              <div className="source-chamber">
                <div className="chamber-header">
                  <label className="chamber-label">{t.from}</label>
                  <div className="language-controls">
                    <select value={fromLang} onChange={(e) => setFromLang(e.target.value)} className="cultural-select">
                      <option value="ne">नेपाली</option>
                      <option value="si">සිංහල</option>
                      <option value="en">English</option>
                    </select>
                    <button className="voice-btn" onClick={() => speakText(sourceText, fromLang)} title={t.readAloud}>
                      🔊
                    </button>
                  </div>
                </div>
                <div className="text-chamber">
                  <textarea
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    placeholder="Enter text for offline translation..."
                    className="sacred-textarea"
                  />
                </div>
              </div>

              <div className="transformation-bridge">
                <div className="bridge-symbol">✨</div>
                <button className="transform-btn" onClick={translateText} disabled={processing || !sourceText.trim()}>
                  {processing ? t.processing : t.translate}
                </button>
              </div>

              <div className="target-chamber">
                <div className="chamber-header">
                  <label className="chamber-label">{t.to}</label>
                  <div className="language-controls">
                    <select value={toLang} onChange={(e) => setToLang(e.target.value)} className="cultural-select">
                      <option value="en">English</option>
                      <option value="ne">नेपाली</option>
                      <option value="si">සිංහල</option>
                    </select>
                    <button className="voice-btn" onClick={() => speakText(translatedText, toLang)} title={t.readAloud}>
                      🔊
                    </button>
                    <button className="inline-btn" title={t.inlineTranslation}>
                      📌
                    </button>
                  </div>
                </div>
                <div className="text-chamber">
                  <textarea
                    value={translatedText}
                    readOnly
                    placeholder="Offline translation will appear here..."
                    className="sacred-textarea result"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 'voiceAssistant':
        return (
          <div className="voice-shrine">
            <div className="shrine-header">
              <h2 className="shrine-title">{t.voiceAssistant}</h2>
              <div className="offline-badge">
                <span>🎙️</span> Offline Speech Recognition
              </div>
              <div className="decorative-border"></div>
            </div>
            
            <div className="voice-controls">
              <div className="voice-visualizer">
                <div className="sound-wave"></div>
                <div className="sound-wave"></div>
                <div className="sound-wave"></div>
                <div className="sound-wave"></div>
              </div>
              
              <div className="voice-commands">
                <h3>Voice Commands:</h3>
                <div className="command-list">
                  <div className="command-item">"Translate this" - Translate selected text</div>
                  <div className="command-item">"Read aloud" - Text-to-speech</div>
                  <div className="command-item">"Switch to Nepali" - Change language</div>
                  <div className="command-item">"Enable floating mode" - Activate widget</div>
                </div>
              </div>
              
              <button className="voice-record-btn">
                <span className="record-icon">🎤</span>
                <span>Hold to Speak</span>
              </button>
            </div>
          </div>
        )

      case 'chatbot':
        return (
          <div className="wisdom-temple">
            <div className="temple-header">
              <h2 className="temple-title">{t.chatbot}</h2>
              <div className="offline-badge">
                <span>🤖</span> 100% Offline AI • No Data Sent Online
              </div>
              <div className="temple-ornament">🧘♂️</div>
            </div>
            <div className="wisdom-chamber">
              <div className="conversation-scroll">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`message ${msg.sender}`}>
                    <div className="message-avatar">
                      {msg.sender === 'user' ? '🙏' : '🤖'}
                    </div>
                    <div className="message-content">
                      <strong>{msg.sender === 'user' ? 'You' : 'Offline AI'}:</strong>
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="message-input-area">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={t.typeMessage}
                  className="wisdom-input"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button className="send-btn" onClick={sendMessage}>
                  <span>{t.send}</span> 🙏
                </button>
              </div>
            </div>
          </div>
        )

      case 'learningModules':
        return (
          <div className="knowledge-temple">
            <div className="temple-header">
              <h2 className="temple-title">{t.learningModules}</h2>
              <div className="offline-badge">
                <span>📚</span> Offline Learning • Progress Tracking
              </div>
              <div className="temple-ornament">🏛️</div>
            </div>
            <div className="learning-mandala">
              <div className="learning-petal">
                <div className="petal-icon">🕰️</div>
                <h3>{t.alphabets}</h3>
                <p>Learn Devanagari & Sinhala scripts offline</p>
              </div>
              <div className="learning-petal">
                <div className="petal-icon">📚</div>
                <h3>{t.words}</h3>
                <p>Build vocabulary with offline quizzes</p>
              </div>
              <div className="learning-petal">
                <div className="petal-icon">⚖️</div>
                <h3>{t.grammar}</h3>
                <p>Master grammar rules and sentence formation</p>
              </div>
              <div className="learning-petal">
                <div className="petal-icon">🌸</div>
                <h3>{t.poems}</h3>
                <p>Cultural stories and poems with audio</p>
              </div>
            </div>
          </div>
        )

      case 'literatureCentre':
        return (
          <div className="heritage-library">
            <div className="library-header">
              <h2 className="library-title">{t.literatureCentre}</h2>
              <div className="offline-badge">
                <span>📖</span> Offline E-books • Inline Translation
              </div>
              <div className="library-ornament">📜</div>
            </div>
            <div className="manuscript-collection">
              {[
                { title: 'रामायण', culture: 'Sanskrit Epic', features: 'Inline Translation' },
                { title: 'महाभारत', culture: 'Ancient Wisdom', features: 'Voice Narration' },
                { title: 'गीता', culture: 'Spiritual Guide', features: 'Parallel Text' },
                { title: 'मुना मदन', culture: 'Nepali Classic', features: 'Audio Book' },
                { title: 'කුවේණී', culture: 'Sinhala Legend', features: 'Interactive Reading' },
                { title: 'සිරි සංගරාව', culture: 'Sinhala Poetry', features: 'Pronunciation Guide' }
              ].map((book, i) => (
                <div key={i} className="manuscript-scroll">
                  <div className="scroll-decoration"></div>
                  <div className="manuscript-content">
                    <h4 className="manuscript-title">{book.title}</h4>
                    <p className="manuscript-culture">{book.culture}</p>
                    <p className="manuscript-features">📱 {book.features}</p>
                  </div>
                  <div className="scroll-seal">🕰️</div>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={`cultural-app ${theme} ${uiTheme}`}>
      {/* Traditional Header with Cultural Elements */}
      <header className="cultural-header">
        <div className="header-ornament"></div>
        <div className="header-content">
          <div className="header-left">
            <h1 className="main-title">{t.title}</h1>
            <p className="subtitle">{t.subtitle}</p>
          </div>
          <div className="header-right">
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="cultural-select">
              <option value="en">English</option>
              <option value="ne">नेपाली</option>
              <option value="si">සිංහල</option>
            </select>
            <button className="theme-btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button className="culture-btn" onClick={() => setUiTheme(uiTheme === 'nepali-theme' ? 'srilankan-theme' : 'nepali-theme')}>
              {uiTheme === 'nepali-theme' ? '🏔️' : '🌴'}
            </button>
          </div>
        </div>
        <div className="header-ornament bottom"></div>
      </header>

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-content">
          <h2 className="welcome-title">{t.welcome}</h2>
          <p className="welcome-description">{t.description}</p>
          <div className="offline-status">
            <span className="status-indicator">🟢</span>
            <span className="status-text">{t.offlineMode}</span>
          </div>
        </div>
      </section>

      {/* Floating Widget Toggle */}
      <section className="floating-controls">
        <button 
          className={`floating-toggle ${isFloatingMode ? 'active' : ''}`}
          onClick={() => setIsFloatingMode(!isFloatingMode)}
        >
          <span className="toggle-icon">🎯</span>
          <span>{t.floatingMode}</span>
        </button>
        <p className="floating-hint">{t.selectText}</p>
      </section>

      {/* Cultural Sidebar */}
      <aside className="cultural-sidebar">

        <nav className="sidebar-nav">
          <button 
            className={`sidebar-item ${activeSection === 'offlineTranslator' ? 'active' : ''}`}
            onClick={() => setActiveSection('offlineTranslator')}
          >
            <span className="sidebar-icon">🔄</span>
            <span className="sidebar-text">{t.offlineTranslator}</span>
          </button>
          <button 
            className={`sidebar-item ${activeSection === 'voiceAssistant' ? 'active' : ''}`}
            onClick={() => setActiveSection('voiceAssistant')}
          >
            <span className="sidebar-icon">🎙️</span>
            <span className="sidebar-text">{t.voiceAssistant}</span>
          </button>
          <button 
            className={`sidebar-item ${activeSection === 'learningModules' ? 'active' : ''}`}
            onClick={() => setActiveSection('learningModules')}
          >
            <span className="sidebar-icon">📚</span>
            <span className="sidebar-text">{t.learningModules}</span>
          </button>
          <button 
            className={`sidebar-item ${activeSection === 'literatureCentre' ? 'active' : ''}`}
            onClick={() => setActiveSection('literatureCentre')}
          >
            <span className="sidebar-icon">📜</span>
            <span className="sidebar-text">{t.literatureCentre}</span>
          </button>
          <button 
            className={`sidebar-item ${activeSection === 'chatbot' ? 'active' : ''}`}
            onClick={() => setActiveSection('chatbot')}
          >
            <span className="sidebar-icon">🤖</span>
            <span className="sidebar-text">{t.chatbot}</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="cultural-main with-sidebar">
        <div className="content-container">
          {renderContent()}
        </div>
      </main>

      {/* Traditional Footer */}
      <footer className="cultural-footer">
        <div className="footer-pattern"></div>
        <div className="footer-content">
          <p>🕉️ भाषा सेतु - 100% Offline Multilingual Assistant 🕉️</p>
          <p>Privacy-Safe • No Internet Required • Cultural Heritage Preserved</p>
        </div>
        <div className="footer-pattern bottom"></div>
      </footer>
    </div>
  )
}
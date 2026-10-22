import React, { useState, useRef, useEffect } from 'react';
import { Icon } from './Icon';

interface ChatMessage {
  id: string;
  sender: 'user' | 'luna';
  text: string;
  timestamp: string;
  isAudioPlaying?: boolean;
}

export const VoiceLuna: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'luna',
      text: 'Greetings, Lunar Explorer! I am L.U.N.A. — your Lunar Understanding and Navigation Assistant. Ask me anything about the Moon, Apollo landings, water ice discoveries, or the Artemis program!',
      timestamp: 'Just now'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check Speech Synthesis
    if ('speechSynthesis' in window) {
      setSpeechSupported(true);
    }
    // Check Speech Recognition
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setRecognitionSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(transcript);
        handleSendMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // AI Response generator
  const generateLunaAnswer = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('apollo 11') || q.includes('neil armstrong') || q.includes('buzz aldrin')) {
      return 'Apollo 11 made history on July 20, 1969. Commander Neil Armstrong and Lunar Module Pilot Buzz Aldrin landed the LM Eagle at Mare Tranquillitatis (Sea of Tranquility), spending 21 hours and 36 minutes on the surface and collecting 21.5 kg of lunar samples.';
    }
    if (q.includes('water') || q.includes('ice')) {
      return 'Water ice was decisively discovered trapped inside permanently shadowed craters at the lunar poles. Notable missions like Chandrayaan-1 (2008) and NASA\'s LCROSS impact mission proved millions of tonnes of ice exist, which future Artemis bases can refine into oxygen and rocket propellant.';
    }
    if (q.includes('artemis')) {
      return 'The Artemis program is NASA\'s international campaign with ESA, JAXA, and CSA to land the first woman and first person of colour on the lunar South Pole. Key elements include the Space Launch System (SLS), Orion spacecraft, Starship HLS, and the orbiting Gateway outpost.';
    }
    if (q.includes('chandrayaan')) {
      return 'ISRO\'s Chandrayaan missions are pioneering! Chandrayaan-1 (2008) detected lunar water molecules globally. On August 23, 2023, Chandrayaan-3 accomplished the world\'s first successful landing near the lunar South Pole (Shiv Shakti point) with its Vikram lander and Pragyan rover.';
    }
    if (q.includes('gravity') || q.includes('heavy') || q.includes('weight')) {
      return 'The Moon\'s gravity is approximately 1.62 m/s², which is roughly 1/6th (16.6%) of Earth\'s gravity. A 60 kg person on Earth weighs only 10 kg on the Moon, enabling astronauts to execute the famous Apollo "bunny hop" gait.';
    }
    if (q.includes('distance') || q.includes('far')) {
      return 'The average distance from Earth to the Moon is 384,400 kilometres (238,855 miles). That is far enough to fit all seven other major planets of our solar system edge-to-edge between Earth and the Moon!';
    }
    if (q.includes('far side') || q.includes('dark side')) {
      return 'The Moon is tidally locked to Earth, so we always see the same face! The far side is not permanently dark; it experiences day and night just like the near side. China\'s Chang\'e 4 was the first mission to soft land on the far side in 2019, communicating via the Queqiao relay satellite.';
    }
    if (q.includes('temperature') || q.includes('cold') || q.includes('hot')) {
      return 'Because the Moon lacks an atmospheric blanket, surface temperatures vary wildly: from scorching highs of +120°C (+250°F) in sunlight to bone-chilling drops down to -130°C (-200°F) in darkness, and as low as -246°C in polar shadow craters!';
    }
    if (q.includes('who are you') || q.includes('what can you do')) {
      return 'I am L.U.N.A., your Lunar Understanding and Navigation Assistant! I can explain lunar geology, historical spaceflights, orbital mechanics, and upcoming Moon missions. Try asking about Apollo 11, lunar water, or gravity!';
    }

    return `Fascinating question about "${query}"! In lunar exploration, every mission from the Soviet Luna probes to Apollo and modern Artemis missions brings groundbreaking data. The Moon holds secrets to the early history of the Earth-Moon system over 4.5 billion years ago. Ask me about specific missions or lunar science!`;
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.1; // Friendly robotic AI assistant tone

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputQuery).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Simulate intelligent AI reply with slight latency
    setTimeout(() => {
      const lunaReply = generateLunaAnswer(text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'luna',
        text: lunaReply,
        timestamp: 'Just now'
      };
      setMessages((prev) => [...prev, botMsg]);

      // Automatically speak reply if requested
      if (speechSupported) {
        speakText(lunaReply);
      }
    }, 600);
  };

  const toggleMic = () => {
    if (!recognitionSupported) {
      alert('Speech Recognition is not supported in this browser. You can type your question directly below!');
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
  };

  const samplePrompts = [
    'How was water discovered on the Moon?',
    'Tell me about Apollo 11 and Neil Armstrong',
    'What is the Artemis program planning?',
    'What happened with Chandrayaan-3?'
  ];

  return (
    <div className="luna-module">
      <div className="luna-header-banner">
        <div className="luna-avatar-box">
          <div className={`luna-bot-icon ${isSpeaking ? 'speaking-pulse' : ''}`}>
            <Icon name="Bot" size={28} />
          </div>
          <div>
            <h4>L.U.N.A. Assistant</h4>
            <p>Lunar Understanding & Navigation Assistant • Voice-Enabled AI</p>
          </div>
        </div>

        <div className="status-chips">
          <span className="live-status-pill">
            <span className="live-dot"></span> Online
          </span>
          {isSpeaking && (
            <button className="stop-speech-btn" onClick={() => window.speechSynthesis.cancel()}>
              <Icon name="VolumeX" size={14} /> Stop Voice
            </button>
          )}
        </div>
      </div>

      {/* Suggested quick prompts */}
      <div className="suggested-prompts-bar">
        <span className="suggested-label">Suggested Queries:</span>
        <div className="prompts-scroll-row">
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              className="prompt-pill-btn"
              onClick={() => handleSendMessage(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="chat-messages-container">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-bubble-row ${msg.sender}`}>
            {msg.sender === 'luna' && (
              <div className="luna-mini-badge">
                <Icon name="Bot" size={16} />
              </div>
            )}
            <div className={`message-bubble ${msg.sender}`}>
              <p className="bubble-text">{msg.text}</p>
              <div className="bubble-footer">
                <span className="bubble-time">{msg.timestamp}</span>
                {msg.sender === 'luna' && speechSupported && (
                  <button
                    className="speak-again-btn"
                    onClick={() => speakText(msg.text)}
                    title="Read aloud"
                  >
                    <Icon name="Volume2" size={13} /> Speak
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Input Field & Voice Controls */}
      <div className="chat-input-toolbar">
        <button
          className={`mic-control-btn ${isListening ? 'listening' : ''}`}
          onClick={toggleMic}
          title={isListening ? 'Listening... click to stop' : 'Click to speak microphone'}
        >
          <Icon name={isListening ? 'MicOff' : 'Mic'} size={20} />
          {isListening && <span className="mic-listening-wave"></span>}
        </button>

        <input
          type="text"
          placeholder={isListening ? 'Listening to your voice...' : 'Ask L.U.N.A. any question about Moon exploration...'}
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          className="chat-text-input"
        />

        <button
          className="send-query-btn"
          onClick={() => handleSendMessage()}
          disabled={!inputQuery.trim()}
        >
          <Icon name="Send" size={18} />
        </button>
      </div>

      <style>{`
        .luna-module {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .luna-header-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f8faff;
          padding: 16px 20px;
          border-radius: 18px;
          border: 1.5px solid #e2e8f0;
          flex-wrap: wrap;
          gap: 12px;
        }

        .luna-avatar-box {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .luna-bot-icon {
          width: 50px;
          height: 50px;
          border-radius: 16px;
          background: linear-gradient(135deg, #3b1d73 0%, #582ca8 100%);
          color: #ffb800;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(59, 29, 115, 0.2);
          transition: all 0.3s ease;
        }

        .speaking-pulse {
          box-shadow: 0 0 0 6px rgba(255, 184, 0, 0.4);
          animation: pulseSpeaking 1s infinite alternate;
        }

        @keyframes pulseSpeaking {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }

        .luna-avatar-box h4 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 18px;
          font-weight: 800;
          color: #26164d;
        }

        .luna-avatar-box p {
          font-size: 12.5px;
          color: #64748b;
        }

        .status-chips {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .live-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #ecfdf5;
          color: #065f46;
          font-size: 12px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 12px;
        }

        .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 6px #10b981;
        }

        .stop-speech-btn {
          border: 1px solid #fecaca;
          background: #fef2f2;
          color: #991b1b;
          font-size: 11.5px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
        }

        .suggested-prompts-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .suggested-label {
          font-size: 12px;
          font-weight: 700;
          color: #64748b;
          white-space: nowrap;
        }

        .prompts-scroll-row {
          display: flex;
          gap: 8px;
          overflow-x: auto;
        }

        .prompt-pill-btn {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          color: #3b1d73;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .prompt-pill-btn:hover {
          background: #f3f0fa;
          border-color: #3b1d73;
        }

        .chat-messages-container {
          height: 380px;
          overflow-y: auto;
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 20px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .message-bubble-row {
          display: flex;
          gap: 10px;
          align-items: flex-end;
        }

        .message-bubble-row.user {
          justify-content: flex-end;
        }

        .luna-mini-badge {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #3b1d73;
          color: #ffb800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .message-bubble {
          max-width: 78%;
          padding: 14px 18px;
          border-radius: 18px;
          font-size: 14px;
          line-height: 1.5;
        }

        .message-bubble.luna {
          background: #f8faff;
          border: 1.5px solid #e2e8f0;
          color: #1e293b;
          border-bottom-left-radius: 4px;
        }

        .message-bubble.user {
          background: #3b1d73;
          color: #ffffff;
          border-bottom-right-radius: 4px;
        }

        .bubble-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 6px;
          font-size: 11px;
        }

        .message-bubble.luna .bubble-time {
          color: #94a3b8;
        }

        .message-bubble.user .bubble-time {
          color: #cbd5e1;
        }

        .speak-again-btn {
          border: none;
          background: transparent;
          color: #582ca8;
          font-size: 11px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
        }

        .chat-input-toolbar {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #ffffff;
          border: 1.5px solid #dbe2ef;
          border-radius: 18px;
          padding: 6px 10px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);
        }

        .chat-input-toolbar:focus-within {
          border-color: #582ca8;
          box-shadow: 0 0 0 3px rgba(88, 44, 168, 0.12);
        }

        .mic-control-btn {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          border: none;
          background: #f1f4fa;
          color: #4a5568;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
        }

        .mic-control-btn.listening {
          background: #ef4444;
          color: #ffffff;
        }

        .mic-listening-wave {
          position: absolute;
          inset: -4px;
          border-radius: 18px;
          border: 2px solid #ef4444;
          animation: micWave 1.2s infinite;
        }

        @keyframes micWave {
          0% { transform: scale(0.9); opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }

        .chat-text-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 14.5px;
          color: #1e293b;
          padding: 8px;
        }

        .send-query-btn {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          border: none;
          background: #ffb800;
          color: #1b1633;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .send-query-btn:hover:not(:disabled) {
          background: #e5a400;
          transform: translateY(-1px);
        }

        .send-query-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

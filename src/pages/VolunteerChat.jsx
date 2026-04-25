import { useState, useRef, useEffect } from 'react';
import { Send, MapPin, MessageCircle, Sparkles } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import MapView from '../components/MapView';
import { UrgencyBadge } from '../components/StatusBadge';
import { useLanguage } from '../i18n/LanguageContext';
import './VolunteerChat.css';

// Parse basic markdown bold and newlines
function formatMessage(text) {
  if (!text) return '';
  let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/^(\d+)\.\s/gm, '<br/>$1. ');
  html = html.replace(/\n/g, '<br/>');
  html = html.replace(/^<br\/>/, '');
  return html;
}

function formatTime(date) {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

export default function VolunteerChat() {
  const { t } = useLanguage();
  const { messages, isTyping, matchedTasks, sendMessage } = useChat();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const SUGGESTIONS = [
    t('chat.suggestion1'),
    t('chat.suggestion2'),
    t('chat.suggestion3'),
    t('chat.suggestion4'),
    t('chat.suggestion5'),
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim() || isTyping) return;
    sendMessage(inputText);
    setInputText('');
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className="volunteer-chat">
      {/* Chat Section */}
      <div className="chat-section">
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-message ${msg.role}`}>
              <div className="chat-bubble" dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }} />
              <span className="chat-timestamp">
                {formatTime(msg.timestamp)}
                {msg.role === 'user' && ' ✓✓'}
              </span>
            </div>
          ))}

          {isTyping && (
            <div className="chat-typing">
              <div className="chat-typing-dot" />
              <div className="chat-typing-dot" />
              <div className="chat-typing-dot" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {messages.length <= 2 && (
          <div className="chat-suggestions">
            {SUGGESTIONS.map((s, i) => (
              <button key={i} className="chat-suggestion-chip" onClick={() => sendMessage(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="chat-input-area">
          <input
            ref={inputRef}
            className="chat-input"
            type="text"
            placeholder={t('chat.inputPlaceholder')}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isTyping}
            id="chat-input"
          />
          <button
            className="chat-send-btn"
            onClick={handleSend}
            disabled={!inputText.trim() || isTyping}
            id="chat-send-btn"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Side Panel */}
      <div className="chat-side-panel">
        <div className="chat-side-header">
          <h3>
            <Sparkles size={16} style={{ display: 'inline', marginRight: 6, color: 'var(--accent)' }} />
            {t('chat.matchedTasks')}
          </h3>
          <p>{matchedTasks.length > 0 ? `${matchedTasks.length} ${t('chat.tasksFound')}` : t('chat.askAi')}</p>
        </div>

        <div className="chat-side-map">
          <MapView reports={matchedTasks} compact={true} />
        </div>

        <div className="chat-side-tasks">
          {matchedTasks.length === 0 ? (
            <div className="chat-side-empty">
              <MessageCircle size={32} />
              <p>{t('chat.emptyTasks')}</p>
            </div>
          ) : (
            matchedTasks.map((task) => (
              <div key={task.id} className={`chat-task-card urgency-${task.urgencyScore}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span className="chat-task-category">{task.category}</span>
                  <UrgencyBadge score={task.urgencyScore} />
                </div>
                <div className="chat-task-location">
                  <MapPin size={11} />
                  {task.locationName}
                  {task.distance !== undefined && ` · ${task.distance.toFixed(1)}km`}
                </div>
                <div className="chat-task-summary">
                  {task.summary || task.extractedText?.slice(0, 80) + '...'}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

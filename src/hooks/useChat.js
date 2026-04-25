import { useState, useCallback, useRef } from 'react';
import { chatModel } from '../config/gemini';
import { findNearbyReports, DEMO_CENTER, URGENCY_LABELS } from '../utils/demoZone';

/**
 * Chat hook with Gemini Function Calling for volunteer matchmaking.
 * 
 * The AI agent is constrained to:
 * 1. Only use the findTasks tool to search for nearby disaster reports
 * 2. Stay in-character as an UpLift emergency coordinator
 * 3. Redirect off-topic conversations back to disaster relief
 */

const SYSTEM_PROMPT = `You are UpLift's Emergency Coordinator AI. Your role is to help volunteers find and respond to disaster situations in their area.

PERSONALITY:
- Warm, professional, and focused on helping
- Empathetic to the disaster situation
- Concise but informative

RULES:
1. You ONLY help volunteers find tasks and understand disaster reports nearby
2. When a volunteer mentions their location or says they want to help, use the findTasks function
3. If someone asks about anything unrelated to disaster relief, politely redirect: "I'm focused on disaster coordination. How can I help you find tasks nearby?"
4. If no tasks are found, suggest expanding the search radius or checking back later
5. Present task results in a clear, organized way with urgency levels
6. Always remind volunteers about safety first
7. Do NOT make up information about tasks — only share what the findTasks tool returns
8. When presenting tasks, include: location, category, urgency, and a brief summary

CONVERSATION STARTERS:
- Greet users and ask how they'd like to help
- Ask about their location and skills
- Then use findTasks to find relevant work`;

const FIND_TASKS_TOOL = {
  functionDeclarations: [{
    name: "findTasks",
    description: "Search for verified disaster reports and tasks near a volunteer's location. Returns a list of tasks sorted by urgency.",
    parameters: {
      type: "OBJECT",
      properties: {
        latitude: {
          type: "NUMBER",
          description: "Latitude of the volunteer's location. Use 12.9784 for Indiranagar area."
        },
        longitude: {
          type: "NUMBER",
          description: "Longitude of the volunteer's location. Use 77.6408 for Indiranagar area."
        },
        radiusKm: {
          type: "NUMBER",
          description: "Search radius in kilometers. Default is 2."
        },
        skills: {
          type: "ARRAY",
          items: { type: "STRING" },
          description: "Volunteer skills like: rescue, medical, cleanup, construction, electrical, logistics, fire, first-aid, transport, general"
        },
        minUrgency: {
          type: "NUMBER",
          description: "Minimum urgency level to filter (1-5). Default is 1."
        }
      },
      required: ["latitude", "longitude"]
    }
  }]
};

export function useChat() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! 👋 I'm your UpLift Emergency Coordinator. I'm here to help you find tasks and assist with disaster relief efforts in your area.\n\nAre you near Indiranagar, Bangalore? Tell me your location and skills, and I'll find tasks that match!",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [matchedTasks, setMatchedTasks] = useState([]);
  const chatRef = useRef(null);

  // Initialize chat session
  const initChat = useCallback(() => {
    try {
      const chat = chatModel.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: 'Hi' }]
          },
          {
            role: 'model',
            parts: [{ text: "Hello! 👋 I'm your UpLift Emergency Coordinator. I'm here to help you find tasks and assist with disaster relief efforts in your area.\n\nAre you near Indiranagar, Bangalore? Tell me your location and skills, and I'll find tasks that match!" }]
          }
        ],
        tools: [FIND_TASKS_TOOL],
        systemInstruction: {
          role: 'user',
          parts: [{ text: SYSTEM_PROMPT }]
        },
      });
      chatRef.current = chat;
    } catch (err) {
      console.warn('Failed to init Gemini chat, will use fallback:', err.message);
      chatRef.current = null;
    }
  }, []);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: text.trim(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // Initialize chat on first real message
      if (!chatRef.current) {
        initChat();
      }

      let responseText = '';

      if (chatRef.current) {
        // Send to Gemini
        const result = await chatRef.current.sendMessage(text);
        const response = result.response;

        // Check if Gemini wants to call a function
        const functionCall = response.functionCalls()?.[0];
        
        if (functionCall && functionCall.name === 'findTasks') {
          const args = functionCall.args;
          const lat = args.latitude || DEMO_CENTER.lat;
          const lng = args.longitude || DEMO_CENTER.lng;
          const radius = args.radiusKm || 2;
          const skills = args.skills || [];
          const minUrgency = args.minUrgency || 1;

          // Execute the function with local data
          const tasks = findNearbyReports(lat, lng, radius, {
            status: 'verified',
            minUrgency,
            skills: skills.length > 0 ? skills : undefined
          });

          setMatchedTasks(tasks);

          // Send function result back to Gemini
          const functionResponse = await chatRef.current.sendMessage([{
            functionResponse: {
              name: 'findTasks',
              response: {
                tasks: tasks.map(t => ({
                  location: t.locationName,
                  category: t.category,
                  urgency: `${t.urgencyScore}/5 (${URGENCY_LABELS[t.urgencyScore]})`,
                  summary: t.summary,
                  distance: `${t.distance.toFixed(1)}km away`,
                  reportedBy: t.reportedBy
                })),
                totalFound: tasks.length,
                searchRadius: `${radius}km`,
                center: `${lat.toFixed(4)}, ${lng.toFixed(4)}`
              }
            }
          }]);

          responseText = functionResponse.response.text();
        } else {
          responseText = response.text();
        }
      } else {
        // Fallback: simulate AI response without Gemini
        responseText = getFallbackResponse(text);
      }

      // Add bot message
      const botMsg = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);

    } catch (err) {
      console.error('Chat error:', err);
      
      // Fallback response
      const fallbackText = getFallbackResponse(text);
      const botMsg = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: fallbackText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  }, [initChat]);

  const clearChat = useCallback(() => {
    chatRef.current = null;
    setMessages([{
      id: 'welcome',
      role: 'model',
      text: "Hello! 👋 I'm your UpLift Emergency Coordinator. I'm here to help you find tasks and assist with disaster relief efforts in your area.\n\nAre you near Indiranagar, Bangalore? Tell me your location and skills, and I'll find tasks that match!",
      timestamp: new Date()
    }]);
    setMatchedTasks([]);
  }, []);

  return {
    messages,
    isTyping,
    matchedTasks,
    sendMessage,
    clearChat
  };
}

// Fallback responses when Gemini isn't available
function getFallbackResponse(userText) {
  const lower = userText.toLowerCase();

  if (lower.includes('help') || lower.includes('volunteer') || lower.includes('task') || lower.includes('nearby') || lower.includes('find')) {
    const tasks = findNearbyReports(DEMO_CENTER.lat, DEMO_CENTER.lng, 2);
    const topTasks = tasks.slice(0, 5);
    
    if (topTasks.length === 0) {
      return "I couldn't find any active tasks in your area right now. Try expanding your search radius or check back later. New reports come in frequently!";
    }

    let response = `I found **${topTasks.length} tasks** near Indiranagar that need help:\n\n`;
    topTasks.forEach((t, i) => {
      const urgencyEmoji = t.urgencyScore >= 4 ? '🔴' : t.urgencyScore >= 3 ? '🟡' : '🔵';
      response += `${i + 1}. ${urgencyEmoji} **${t.category}** at ${t.locationName}\n   Urgency: ${t.urgencyScore}/5 (${URGENCY_LABELS[t.urgencyScore]}) — ${t.summary}\n\n`;
    });
    response += "⚠️ **Safety first!** Please assess the situation before acting. Would you like more details about any of these tasks?";
    
    return response;
  }

  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
    return "Hello! 😊 I'm ready to help you find disaster relief tasks nearby. Tell me:\n\n📍 **Your location** (or say 'Indiranagar')\n🛠️ **Your skills** (e.g., medical, rescue, cleanup)\n\nAnd I'll match you with the most urgent tasks!";
  }

  if (lower.includes('medical') || lower.includes('doctor') || lower.includes('nurse')) {
    const tasks = findNearbyReports(DEMO_CENTER.lat, DEMO_CENTER.lng, 2, { skills: ['medical'] });
    if (tasks.length > 0) {
      let response = `Great, we need medical volunteers! Here are the most urgent medical-related tasks:\n\n`;
      tasks.slice(0, 3).forEach((t, i) => {
        response += `${i + 1}. 🔴 **${t.category}** at ${t.locationName} — ${t.summary}\n\n`;
      });
      return response;
    }
    return "Thanks for offering medical help! I'm checking for medical emergencies in the area. Can you tell me your exact location?";
  }

  return "I'm here to help coordinate disaster relief. 🏗️\n\nTell me your **location** and **skills**, and I'll find tasks that match. For example:\n- \"I'm near Indiranagar and can help with cleanup\"\n- \"I'm a doctor near 100 Feet Road\"\n- \"Show me urgent tasks nearby\"";
}

"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, Mic, MicOff, X, Bot, User, Sparkles, Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  typing?: boolean
}

const predefinedResponses = {
  hello: "Hello! I'm your ESG assistant. How can I help you with your sustainability journey today?",
  help: "I can assist you with ESG data submission, sustainability metrics, compliance requirements, and best practices. What specific area would you like to explore?",
  esg: "ESG stands for Environmental, Social, and Governance. These are the three key factors used to measure the sustainability and ethical impact of an investment or business.",
  carbon:
    "Carbon emissions tracking is crucial for environmental reporting. I can help you understand carbon footprint calculation, reduction strategies, and reporting standards.",
  certification:
    "There are various sustainability certifications like ISO 14001, B-Corp, and Fair Trade. Which certification are you interested in learning about?",
  default:
    "That's an interesting question! While I'm still learning, I can help you with ESG data submission, sustainability metrics, and compliance. Could you rephrase your question or ask about a specific ESG topic?",
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! I'm your ESG assistant. I'm here to help you with sustainability questions, data submission guidance, and ESG best practices. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (key !== "default" && lowerMessage.includes(key)) {
        return response
      }
    }

    return predefinedResponses.default
  }

  const sendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const toggleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true)
      // Simulate voice input
      setTimeout(() => {
        setIsListening(false)
        setInputValue("How can I improve my ESG score?")
      }, 2000)
    } else {
      setIsListening(false)
    }
  }

  const speakMessage = (content: string) => {
    if ("speechSynthesis" in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(content)
      utterance.onend = () => setIsSpeaking(false)
      speechSynthesis.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleChat}
          className={cn(
            "h-14 w-14 rounded-full shadow-lg transition-all duration-300",
            "bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600",
            "transform hover:scale-105 active:scale-95",
            isOpen && "rotate-90"
          )}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <MessageCircle className="h-6 w-6 text-white" />
          )}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full animate-pulse" />
          )}
        </Button>
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className={cn(
          "fixed bottom-24 right-6 z-50 w-96 transition-all duration-300",
          isMinimized ? "h-16" : "h-[500px]"
        )}>
          <Card className={cn(
            "h-full shadow-xl border border-gray-200 dark:border-gray-700",
            "bg-white dark:bg-gray-800 transition-all duration-300",
            "flex flex-col overflow-hidden"
          )}>
            <CardHeader 
              className={cn(
                "pb-3 bg-gradient-to-r from-green-600 to-teal-500 text-white",
                "rounded-t-lg cursor-pointer transition-all duration-200",
                "hover:from-green-700 hover:to-teal-600"
              )}
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="h-6 w-6" />
                  <span className="font-semibold">ESG Assistant</span>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Powered
                </Badge>
              </CardTitle>
            </CardHeader>

            {!isMinimized && (
              <CardContent className="p-0 h-full flex flex-col">
                {/* Messages Area */}
                <ScrollArea 
                  ref={scrollAreaRef} 
                  className="flex-1 p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50"
                >
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex items-start space-x-2",
                        "transition-all duration-200 ease-out",
                        message.sender === "user" ? "justify-end" : "justify-start",
                        "animate-fade-in-up"
                      )}
                    >
                      {message.sender === "bot" && (
                        <Avatar className="h-8 w-8 bg-green-100 dark:bg-green-900/50">
                          <AvatarFallback className="bg-green-500 text-white">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                          "transition-all duration-200 hover:shadow-sm",
                          message.sender === "user" 
                            ? "bg-green-600 text-white" 
                            : "bg-gray-100 dark:bg-gray-700",
                          "animate-pop-in"
                        )}
                      >
                        <p>{message.content}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                          {message.sender === "bot" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 ml-2 opacity-70 hover:opacity-100"
                              onClick={() => (isSpeaking ? stopSpeaking() : speakMessage(message.content))}
                            >
                              {isSpeaking ? (
                                <VolumeX className="h-3 w-3" />
                              ) : (
                                <Volume2 className="h-3 w-3" />
                              )}
                            </Button>
                          )}
                        </div>
                      </div>

                      {message.sender === "user" && (
                        <Avatar className="h-8 w-8 bg-blue-100 dark:bg-blue-900/50">
                          <AvatarFallback className="bg-blue-500 text-white">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-start space-x-2 animate-fade-in">
                      <Avatar className="h-8 w-8 bg-green-100 dark:bg-green-900/50">
                        <AvatarFallback className="bg-green-500 text-white">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 bg-green-500 rounded-full animate-bounce" />
                          <div
                            className="h-2 w-2 bg-green-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                          <div
                            className="h-2 w-2 bg-green-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 border-t bg-white dark:bg-gray-800">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <Input
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me about ESG, sustainability, or data submission..."
                        className="pr-12 focus-visible:ring-green-500"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0",
                          isListening && "text-red-500 animate-pulse"
                        )}
                        onClick={toggleVoiceInput}
                      >
                        {isListening ? (
                          <MicOff className="h-4 w-4" />
                        ) : (
                          <Mic className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <Button
                      onClick={sendMessage}
                      disabled={!inputValue.trim()}
                      className={cn(
                        "h-10 w-10 p-0 bg-green-600 hover:bg-green-700",
                        "transition-transform duration-150 active:scale-95"
                      )}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>

                  {isListening && (
                    <div className="mt-2 text-center">
                      <Badge variant="outline" className="animate-pulse">
                        <Mic className="h-3 w-3 mr-1" />
                        Listening...
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </>
  )
}

// Add these animations to your global CSS
/*
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pop-in {
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  50% {
    transform: scale(1.02);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out forwards;
}

.animate-pop-in {
  animation: pop-in 0.2s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in-up 0.2s ease-out forwards;
}
*/
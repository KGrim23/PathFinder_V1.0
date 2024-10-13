'use client'

import React, { useState, useEffect } from 'react'
import {
  Bell,
  BarChart3,
  Flag,
  CornerDownLeft,
  History,
  LifeBuoy,
  MessageSquarePlus,
  Mic,
  Paperclip,
  Settings2,
  Sun,
  ThumbsUp,
  ThumbsDown,
  Volume2,
  CreditCard,
  User,
  LogOut,
  Menu,
  Frown,
  Meh,
  Smile,
  Monitor,
  Moon,
  Zap,
  Star,
  MessageSquare
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

// Notifications component
const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "New AI Insight",
      description: "Your AI assistant has generated a new insight based on your recent conversations.",
      type: "insight",
    },
    {
      id: 2,
      title: "Goal Reminder",
      description: "Don't forget to work on your 'Improve Communication' goal today.",
      type: "reminder",
    },
    {
      id: 3,
      title: "Chat Summary Ready",
      description: "Your weekly chat summary is now available for review.",
      type: "summary",
    },
  ]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-4 w-4 p-0 text-[10px] flex items-center justify-center"
          >
            {notifications.length}
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <ScrollArea className="h-[300px] w-full rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">
              Notifications
            </h4>
            {notifications.map((notification) => (
              <div key={notification.id} className="mb-4 last:mb-0">
                <div className="flex items-start space-x-4">
                  <div className="mt-1 bg-muted rounded-full p-1">
                    {notification.type === "insight" && (
                      <Zap className="h-5 w-5 text-muted-foreground" />
                    )}
                    {notification.type === "reminder" && (
                      <Star className="h-5 w-5 text-muted-foreground" />
                    )}
                    {notification.type === "summary" && (
                      <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

export function DashboardComponent() {
  const [currentPage, setCurrentPage] = useState('chat')
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const [currentTheme, setCurrentTheme] = useState('system')

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (inputMessage.trim() === '') return

    const newUserMessage = { type: 'user', content: inputMessage }
    const newAIMessage = { type: 'ai', content: "This is a dummy AI response. How can I assist you further?", feedback: { liked: false, disliked: false, sound: false } }
    setMessages([...messages, newUserMessage, newAIMessage])
    setInputMessage('')
  }

  const handleOptionClick = (option) => {
    const newUserMessage = { type: 'user', content: option }
    const newAIMessage = { type: 'ai', content: `Great! Let's talk about ${option}. How can I help you with that?`, feedback: { liked: false, disliked: false, sound: false } }
    setMessages([...messages, newUserMessage, newAIMessage])
  }

  const handleFeedback = (index, type) => {
    const updatedMessages = [...messages]
    updatedMessages[index].feedback[type] = !updatedMessages[index].feedback[type]
    setMessages(updatedMessages)
  }

  const Sidebar = ({ isMobile }) => (
    <aside className={`flex h-full flex-col border-r ${isMobile ? 'w-64' : 'w-14'}`}>
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home" className="w-full bg-black rounded-md">
          <Sun className="size-5 text-white" />
        </Button>
      </div>
      <nav className="grid gap-1 p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size={isMobile ? "default" : "icon"}
              className={`rounded-lg ${currentPage === 'chat' ? 'bg-muted' : ''} ${isMobile ? 'justify-start' : 'justify-center'} w-full`}
              aria-label="New Chat"
              onClick={() => setCurrentPage('chat')}
            >
              <MessageSquarePlus className={`size-5 ${isMobile ? 'mr-2' : ''}`} />
              {isMobile && <span>New Chat</span>}
            </Button>
          </TooltipTrigger>
          {!isMobile && <TooltipContent side="right" sideOffset={5}>New Chat</TooltipContent>}
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size={isMobile ? "default" : "icon"}
              className={`rounded-lg ${isMobile ? 'justify-start' : 'justify-center'} w-full`}
              aria-label="History"
            >
              <History className={`size-5 ${isMobile ? 'mr-2' : ''}`} />
              {isMobile && <span>History</span>}
            </Button>
          </TooltipTrigger>
          {!isMobile && <TooltipContent side="right" sideOffset={5}>History</TooltipContent>}
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size={isMobile ? "default" : "icon"}
              className={`rounded-lg ${isMobile ? 'justify-start' : 'justify-center'} w-full`}
              aria-label="Feedback"
              onClick={() => setIsFeedbackOpen(true)}
            >
              <Flag className={`size-5 ${isMobile ? 'mr-2' : ''}`} />
              {isMobile && <span>Feedback</span>}
            </Button>
          </TooltipTrigger>
          {!isMobile && <TooltipContent side="right" sideOffset={5}>Feedback</TooltipContent>}
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size={isMobile ? "default" : "icon"}
              className={`rounded-lg ${currentPage === 'progress' ? 'bg-muted' : ''} ${isMobile ? 'justify-start' : 'justify-center'} w-full`}
              aria-label="Progress"
              onClick={() => setCurrentPage('progress')}
            >
              <BarChart3 className={`size-5 ${isMobile ? 'mr-2' : ''}`} />
              {isMobile && <span>Progress</span>}
            </Button>
          </TooltipTrigger>
          {!isMobile && <TooltipContent side="right" sideOffset={5}>Progress</TooltipContent>}
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size={isMobile ? "default" : "icon"}
              className={`rounded-lg ${currentPage === 'settings' ? 'bg-muted' : ''} ${isMobile ? 'justify-start' : 'justify-center'} w-full`}
              aria-label="Settings"
              onClick={() => setCurrentPage('settings')}
            >
              <Settings2 className={`size-5 ${isMobile ? 'mr-2' : ''}`} />
              {isMobile && <span>Settings</span>}
            </Button>
          </TooltipTrigger>
          {!isMobile && <TooltipContent side="right" sideOffset={5}>Settings</TooltipContent>}
        </Tooltip>
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size={isMobile ? "default" : "icon"}
              className={`mt-auto rounded-lg ${isMobile ? 'justify-start' : 'justify-center'} w-full`}
              aria-label="Help"
            >
              <LifeBuoy className={`size-5 ${isMobile ? 'mr-2' : ''}`} />
              {isMobile && <span>Help</span>}
            </Button>
          </TooltipTrigger>
          {!isMobile && <TooltipContent side="right" sideOffset={5}>Help</TooltipContent>}
        </Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="mt-auto rounded-lg w-full justify-center">
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" alt="Rosana Fernandez" />
                <AvatarFallback>RF</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p>Rosana Fernandez</p>
                <p className="text-sm text-muted-foreground">Free trial tier</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setCurrentTheme('system')}>
              <Monitor className="mr-2 h-4 w-4" />
              <span>System</span>
              {currentTheme === 'system' && <Check className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCurrentTheme('light')}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Light</span>
              {currentTheme === 'light' && <Check className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCurrentTheme('dark')}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark</span>
              {currentTheme === 'dark' && <Check className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </aside>
  )

  const ChatInterface = ({ messages, 
    inputMessage,
    setInputMessage,
    handleSendMessage,
    handleOptionClick,
    handleFeedback
  }) => (
    <div className="flex flex-col h-full">
      <div className="mb-4 rounded-lg bg-muted p-4">
        <h2 className="mb-2 text-lg font-semibold">How can I assist you today?</h2>
        <div className="flex flex-wrap gap-2">
          {['Emotional Support', 'Career Advice', 'Personal Growth', 'Stress Management', 'Time Management', 'Work-Life Balance'].map((option) => (
            <Button key={option} variant="outline" size="sm" onClick={() => handleOptionClick(option)}>
              <span className="mr-2">{option === 'Emotional Support' ? '💬' : option === 'Career Advice' ? '🎯' : option === 'Personal Growth' ? '🌱' : option === 'Stress Management' ? '🧘' : option === 'Time Management' ? '⏳' : '⚖️'}</span> {option}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-auto mb-4">
        <Badge variant="outline" className="mb-2">
          Chat
        </Badge>
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded-lg ${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              {message.content}
            </div>
            {message.type === 'ai' && (
              <div className="mt-2 flex items-center space-x-2">
                <Button
                  variant={message.feedback.liked ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleFeedback(index, 'liked')}
                >
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button
                  variant={message.feedback.disliked ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleFeedback(index, 'disliked')}
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
                <Button
                  variant={message.feedback.sound ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleFeedback(index, 'sound')}
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="sticky bottom-0 bg-background pt-2">
        <div className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
          <Label htmlFor="message" className="sr-only">
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="Type your message here..."
            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <div className="flex items-center p-3 pt-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Paperclip className="size-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Attach File</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Mic className="size-4" />
                  <span className="sr-only">Use Microphone</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Use Microphone</TooltipContent>
            </Tooltip>
            <Button type="submit" size="sm" className="ml-auto gap-1.5">
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  )

  const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('general')

    return (
      <div className="space-y-6">
        <div className="flex space-x-4 border-b">
          <Button
            variant={activeTab === 'general' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('general')}
          >
            General
          </Button>
          <Button
            variant={activeTab === 'goals-focus' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('goals-focus')}
          >
            Goals & Focus
          </Button>
          <Button
            variant={activeTab === 'privacy' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('privacy')}
          >
            Privacy
          </Button>
        </div>

        {activeTab === 'general' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">General Settings</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about new messages and updates via email</p>
                  </div>
                  <Switch id="email-notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications on your device for important updates</p>
                  </div>
                  <Switch id="push-notifications" />
                </div>
              </CardContent>
            </Card>

          </div>
        )}

        {activeTab === 'goals-focus' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Goals & Focus Settings</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Personal Goals</CardTitle>
                <CardDescription>Select the goals you want to focus on</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['Improve Communication', 'Manage Stress', 'Boost Confidence', 'Career Development', 'Work-Life Balance'].map((goal) => (
                    <Button key={goal} variant="outline" size="sm">
                      {goal}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Soft Skills Focus</CardTitle>
                <CardDescription>Choose the soft skills you want to improve</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['Active Listening', 'Empathy', 'Conflict Resolution', 'Time Management', 'Leadership'].map((skill) => (
                    <Button key={skill} variant="outline" size="sm">
                      {skill}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Privacy Settings</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Data Collection</CardTitle>
                <CardDescription>Information about our data collection practices</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  By using this app, you accept our terms that we will collect and use your interactions with the AI for training purposes. This helps us improve our services and provide better assistance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Chat History</CardTitle>
                <CardDescription>Manage your chat history settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="save-chat-history" />
                  <Label htmlFor="save-chat-history">Save chat history</Label>
                </div>
                <Button variant="outline">Clear Chat History</Button>
                <Button variant="outline">Download Chat History</Button>
              </CardContent>
            </Card>

          </div>
        )}
      </div>
    )
  }

  const ProgressPage = () => {
    const data = [
      { name: 'Jan', progress: 30 },
      { name: 'Feb', progress: 45 },
      { name: 'Mar', progress: 60 },
      { name: 'Apr', progress: 70 },
      { name: 'May', progress: 85 },
      { name: 'Jun', progress: 100 },
    ]

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Your Progress</h2>
        <Card>
          <CardHeader>
            <CardTitle>Progress Over Time</CardTitle>
            <CardDescription>Track your improvement in soft skills and goal achievement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="progress" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const FeedbackDialog = ({ isOpen, onClose }) => {
    const [selectedMood, setSelectedMood] = useState(null)
    const [feedbackText, setFeedbackText] = useState("")
  
    const handleSubmit = (event) => {
      event.preventDefault()
      // Handle feedback submission logic here
      console.log("Feedback submitted with mood:", selectedMood, "and text:", feedbackText)
      setSelectedMood(null)
      setFeedbackText("")
      onClose()
    }
  
    const MoodIcon = ({ mood, icon: Icon }) => (
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "h-12 w-12 rounded-full",
          selectedMood === mood && "bg-primary text-primary-foreground"
        )}
        onClick={() => setSelectedMood(mood)}
      >
        <Icon className="h-6 w-6" />
      </Button>
    )
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Provide Feedback</DialogTitle>
            <DialogDescription>
              We appreciate your feedback. Please let us know how we can improve.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center space-x-4 mb-4">
              <MoodIcon mood="frown" icon={Frown} />
              <MoodIcon mood="meh" icon={Meh} />
              <MoodIcon mood="smile" icon={Smile} />
            </div>
            <Textarea
              placeholder="Type your feedback here..."
              className="min-h-[100px] mb-4"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={!selectedMood || !feedbackText.trim()}>
                Submit Feedback
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="grid h-screen w-full md:grid-cols-[auto_1fr]">
      {!isMobile && <Sidebar isMobile={false} />}
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <Sidebar isMobile={true} />
              </SheetContent>
            </Sheet>
          )}
          <h1 className="text-xl font-semibold">Lumny App</h1>
          <div className="ml-auto">
            <Notifications />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4">
          {currentPage === 'chat' && (
            <ChatInterface
              messages={messages}
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              handleSendMessage={handleSendMessage}
              handleOptionClick={handleOptionClick}
              handleFeedback={handleFeedback}
            />
          )}
          {currentPage === 'settings' && <SettingsPage />}
          {currentPage === 'progress' && <ProgressPage />}
        </main>
      </div>
      <FeedbackDialog isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </div>
  )
}
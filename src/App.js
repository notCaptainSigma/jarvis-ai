import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic } from "lucide-react";

export default function JarvisApp() {
  const [chat, setChat] = useState("");
  const [log, setLog] = useState([]);

  const handleSpeak = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.voice = speechSynthesis.getVoices().find(v => v.lang.includes('en'));
    speechSynthesis.speak(msg);
  };

  const handleSend = () => {
    if (!chat.trim()) return;
    const response = `Jarvis: Processing your request - "${chat}"`;
    setLog([...log, { from: "You", text: chat }, { from: "Jarvis", text: response }]);
    handleSpeak(response);
    setChat("");
  };

  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    recognition.onresult = function (event) {
      const voiceText = event.results[0][0].transcript;
      setChat(voiceText);
    };
  };

  const date = new Date().toLocaleString();

  return (
    <div className="min-h-screen bg-black text-white p-4 font-mono">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">JARVIS SYSTEM ONLINE</h1>
        <span className="text-xs text-gray-400">{date}</span>
      </div>

      <Card className="bg-gray-900 border border-cyan-500 mb-4">
        <CardContent className="p-4">
          <div className="h-64 overflow-y-scroll space-y-2 mb-4">
            {log.map((entry, i) => (
              <div key={i} className={`text-sm ${entry.from === "You" ? "text-cyan-300" : "text-green-400"}`}>
                <strong>{entry.from}:</strong> {entry.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={chat}
              onChange={(e) => setChat(e.target.value)}
              placeholder="Speak or type your command..."
              className="flex-1 bg-black border-cyan-500"
            />
            <Button onClick={handleSend} className="bg-cyan-600">Send</Button>
            <Button onClick={handleVoiceInput} className="bg-cyan-800"><Mic size={16} /></Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border border-cyan-500">
        <CardContent className="p-4">
          <h2 className="text-lg font-bold text-cyan-400 mb-2">Today's System Stats</h2>
          <ul className="text-sm space-y-1 text-gray-300">
            <li>💾 Memory Active</li>
            <li>🎤 Voice Input Enabled</li>
            <li>🔊 Voice Output Enabled</li>
            <li>📅 Realtime Clock Running</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [emails, setEmails] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [subjects, setSubjects] = useState("");


  const handleSend = async () => {
    setLoading(true);
    setStatus(null);

    try {
      const emailList = emails.split(",").map(e => e.trim());

      const res = await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify({
          emails: emailList,
          message,
          subject: subjects,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">📨 Email Blast Tool</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Email input */}
          <div className="space-y-2">
            <Label>Recipients</Label>
            <Textarea
              placeholder="email1@gmail.com, email2@gmail.com"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
            />
          </div>


          
          <div className="space-y-2">
            <Label>Subject</Label>
            <Textarea
              placeholder="What's the subject of your email"
              value={subjects}
              onChange={(e) => setSubjects(e.target.value)}
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label>Message</Label>
            <Textarea
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          {/* Button */}
          <Button
            onClick={handleSend}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Sending...
              </>
            ) : (
              "Send Email"
            )}
          </Button>

          {/* Status */}
          {status === "success" && (
            <p className="text-green-600 text-sm">✅ Emails sent successfully</p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-sm">❌ Failed to send emails</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
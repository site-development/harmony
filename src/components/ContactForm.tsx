"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export function ContactForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    propertyInterest: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real app, this would be an API call to your backend
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // const result = await response.json();
      const success = true; // Simulating success

      if (success) {
        toast({
          title: "Message sent!",
          description: "Thank you for your inquiry. We'll get back to you shortly.",
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          propertyInterest: ""
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send your message. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium">
          Name <span className="text-red-500">*</span>
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Email <span className="text-red-500">*</span>
        </label>
        <Input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="your.email@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm font-medium">
          Phone (optional)
        </label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your phone number"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="propertyInterest" className="block text-sm font-medium">
          I'm interested in
        </label>
        <select
          id="propertyInterest"
          name="propertyInterest"
          value={formData.propertyInterest}
          onChange={handleChange}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="">Select an option</option>
          <option value="buying">Buying a property</option>
          <option value="selling">Selling my property</option>
          <option value="renting">Renting a property</option>
          <option value="investing">Real estate investment</option>
          <option value="other">Other inquiry</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium">
          Your message <span className="text-red-500">*</span>
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="How can we help you?"
          className="min-h-[120px]"
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-black text-white hover:bg-black/90"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Submit"
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By submitting this form, you agree to our <a href="#" className="underline">Privacy Policy</a> and consent to being contacted regarding your inquiry.
      </p>
    </form>
  );
}

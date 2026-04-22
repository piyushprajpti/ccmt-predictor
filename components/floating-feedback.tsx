"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquarePlus, X, Send, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomSelect } from "@/components/ui/custom-select";
import { db } from "@/lib/firebase";
import { doc, setDoc, arrayUnion, serverTimestamp } from "firebase/firestore";

const CATEGORIES = [
  "General Feedback",
  "Bug Report",
  "Wrong College Data",
  "Missing College / Branch",
  "Predictor Result Issue",
  "Suggest New Feature",
  "UI/UX Problem",
  "Appreciation ❤️"
];

export function FloatingFeedback() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current && 
        !containerRef.current.contains(event.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleOpenFeedback = () => setIsOpen(true);
    window.addEventListener("open-feedback", handleOpenFeedback);
    return () => window.removeEventListener("open-feedback", handleOpenFeedback);
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!category) newErrors.category = "Please select a category.";
    if (!description.trim()) newErrors.description = "Please provide some details.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const emailId = email.trim().toLowerCase();
      
      await setDoc(doc(db, "feedbacks", emailId), {
        email: emailId,
        submissions: arrayUnion({
          name: name.trim(),
          category,
          description: description.trim(),
          createdAt: new Date().toISOString(),
        }),
        lastUpdatedAt: serverTimestamp()
      }, { merge: true });

      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Auto close after success
      setTimeout(() => {
        setIsOpen(false);
        // Reset form state after close animation completes
        setTimeout(() => {
          setIsSuccess(false);
          setName("");
          setEmail("");
          setCategory("");
          setDescription("");
        }, 300);
      }, 5000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setIsSubmitting(false);
      setErrors({ submit: "Failed to submit feedback. Please try again later." });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring" as const, 
        damping: 25, 
        stiffness: 300,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeIn" as const }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, damping: 20, stiffness: 300 } }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={containerRef}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] max-w-[380px] bg-card text-card-foreground shadow-2xl rounded-2xl border border-border z-[100] overflow-hidden flex flex-col"
          >
            <div className="bg-primary text-primary-foreground px-5 py-4 flex justify-between items-center shadow-sm z-10 relative">
              <div className="flex items-center gap-2">
                <MessageSquarePlus className="w-5 h-5" />
                <h3 className="font-heading font-semibold text-base">Send Feedback</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors p-1.5 rounded-full hover:bg-white/10"
                aria-label="Close feedback form"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 relative">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-8 text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
                      <Send className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-xl">Thank You!</h4>
                      <p className="text-sm text-muted-foreground">Your feedback has been received. Further communication will be done through your email.</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit} 
                    className="space-y-4"
                    noValidate
                  >
                    <motion.div variants={itemVariants} className="space-y-1.5">
                      <label htmlFor="name" className="text-sm font-semibold text-on-surface">Name</label>
                      <input
                        id="name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
                        }}
                        className={`w-full px-3 py-2.5 bg-surface-container-lowest border rounded-xl text-sm outline-none transition-all ${errors.name ? 'border-destructive focus:ring-2 focus:ring-destructive/20' : 'border-outline-variant/60 focus:border-primary/40 focus:ring-2 focus:ring-primary/20'}`}
                        placeholder="John Doe"
                      />
                      <AnimatePresence>
                        {errors.name && (
                          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-xs text-destructive flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="space-y-1.5">
                      <label htmlFor="email" className="text-sm font-semibold text-on-surface">Email</label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                        }}
                        className={`w-full px-3 py-2.5 bg-surface-container-lowest border rounded-xl text-sm outline-none transition-all ${errors.email ? 'border-destructive focus:ring-2 focus:ring-destructive/20' : 'border-outline-variant/60 focus:border-primary/40 focus:ring-2 focus:ring-primary/20'}`}
                        placeholder="john@example.com"
                      />
                      <AnimatePresence>
                        {errors.email && (
                          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-xs text-destructive flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-1.5 relative z-50">
                      <label htmlFor="category" className="text-sm font-semibold text-on-surface">Category</label>
                      <CustomSelect
                        value={category}
                        onChange={(val) => {
                          setCategory(val);
                          if (errors.category) setErrors(prev => ({ ...prev, category: "" }));
                        }}
                        options={CATEGORIES}
                        placeholder="Select a category"
                        className={errors.category ? "[&>button]:border-destructive [&>button]:focus:ring-destructive/20" : ""}
                      />
                      <AnimatePresence>
                        {errors.category && (
                          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-xs text-destructive flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.category}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-1.5 z-10 relative">
                      <label htmlFor="description" className="text-sm font-semibold text-on-surface">Description</label>
                      <textarea
                        id="description"
                        rows={4}
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                          if (errors.description) setErrors(prev => ({ ...prev, description: "" }));
                        }}
                        className={`w-full px-3 py-2.5 bg-surface-container-lowest border rounded-xl text-sm outline-none transition-all resize-none custom-scrollbar ${errors.description ? 'border-destructive focus:ring-2 focus:ring-destructive/20' : 'border-outline-variant/60 focus:border-primary/40 focus:ring-2 focus:ring-primary/20'}`}
                        placeholder="Please provide details..."
                      />
                      <AnimatePresence>
                        {errors.description && (
                          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-xs text-destructive flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    <motion.div variants={itemVariants} className="pt-2 z-10 relative">
                      <AnimatePresence>
                        {errors.submit && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0, marginBottom: 0 }} 
                            animate={{ opacity: 1, height: "auto", marginBottom: 12 }} 
                            exit={{ opacity: 0, height: 0, marginBottom: 0 }} 
                            className="bg-destructive/10 text-destructive text-sm px-3 py-2 rounded-lg flex items-start gap-2"
                          >
                            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                            <p>{errors.submit}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <Button 
                        type="submit" 
                        className="w-full h-11 rounded-xl text-sm font-bold shadow-md shadow-primary/20" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            Submit Feedback
                            <Send className="w-4 h-4" />
                          </span>
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={toggleRef}
        layout
        type="button"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 h-14 min-w-[56px] bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/30 flex items-center justify-center z-[100] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-shadow overflow-hidden px-4"
        aria-label="Toggle feedback form"
      >
        <div className="flex items-center gap-2">
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <MessageSquarePlus className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!isOpen && isHovered && (
              <motion.span
                initial={{ opacity: 0, width: 0, x: -10 }}
                animate={{ opacity: 1, width: "auto", x: 0 }}
                exit={{ opacity: 0, width: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="font-bold text-sm whitespace-nowrap overflow-hidden"
              >
                Feedback
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </>
  );
}

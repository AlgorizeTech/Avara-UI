'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Button from '@/components/custom/blocks/Button';
import { InputBlock } from '@/components/custom/blocks/InputBlock';

interface WaitlistProps {
  className?: string;
}

export default function Waitlist({ className = '' }: WaitlistProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`max-w-sm mx-auto p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm ${className}`}
      >
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 25 }}
            className="w-12 h-12 bg-green-50 dark:bg-green-950 rounded-full flex items-center justify-center mx-auto"
          >
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          </motion.div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              You&apos;re all set!
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              We&apos;ll notify you when we launch. Thanks for your interest!
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setIsSubmitted(false);
              setEmail('');
            }}
            className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            Join another email
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`max-w-sm mx-auto p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm ${className}`}
    >
      <div className="text-center space-y-4 mb-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
            Join the waitlist
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Be the first to know when we launch. No spam, just updates.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* The library's Input: it owns the error line, so a wrong address is
            reported beside the field rather than in a separate element. */}
        <InputBlock
          type="email"
          inputSize="sm"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
          placeholder="Enter your email"
          disabled={isLoading}
          error={error || undefined}
          aria-label="Email address"
        />

        <Button
          type="submit"
          variant="default"
          size="sm"
          loading={isLoading}
          iconRight={<ArrowRight className="w-4 h-4" />}
          className="w-full"
        >
          {isLoading ? 'Joining...' : 'Join waitlist'}
        </Button>
      </form>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4 leading-relaxed">
        By joining, you agree to receive updates about our launch.
      </p>
    </motion.div>
  );
}

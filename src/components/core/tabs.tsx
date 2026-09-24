'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type TabItem = {
  id: string | number;
  name: string;
  content: string;
};

export interface TabsProps {
  items?: TabItem[];
  className?: string;
}

export default function Tabs({ items = [], className = '' }: TabsProps) {
  const [activeTab, setActiveTab] = useState<string | number>(items[0]?.id ?? 1);

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  const indicatorVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1 }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={tabVariants}
      className={`bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl border border-border/50 overflow-hidden w-full max-w-2xl ${className}`}
    >
      {/* Tabs Header */}
      <div className='flex border-b border-border/60 bg-muted/50 backdrop-blur-sm'>
        {items.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-6 py-4 text-sm font-medium transition-all duration-300 ease-out ${
              activeTab === tab.id
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-selected={activeTab === tab.id}
            role='tab'
          >
            <span className='relative z-10'>{tab.name}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary'
                initial="hidden"
                animate="visible"
                variants={indicatorVariants}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Content Area */}
      <div className='relative overflow-hidden'>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            role='tabpanel'
            className='p-8 bg-card/60 backdrop-blur-sm text-foreground/80'
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {items.find((tab) => tab.id === activeTab)?.content || items[0]?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

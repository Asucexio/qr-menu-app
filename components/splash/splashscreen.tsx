'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { QrCode } from 'lucide-react';

interface SplashScreenProps {
  show: boolean;
  onComplete: () => void;
}

export function SplashScreen({ show, onComplete }: SplashScreenProps) {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-stone-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.div
              className="flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-500/10 ring-1 ring-amber-500/30"
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(245, 158, 11, 0)',
                  '0 0 24px 4px rgba(245, 158, 11, 0.25)',
                  '0 0 0 0 rgba(245, 158, 11, 0)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <QrCode className="h-10 w-10 text-amber-500" strokeWidth={1.5} />
            </motion.div>

            <div className="text-center">
              <motion.h1
                className="text-2xl font-bold tracking-tight text-stone-100 sm:text-3xl"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                QR Menu Builder
              </motion.h1>
              <motion.p
                className="mt-2 text-sm text-stone-500"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
              >
                Digital menus, one scan away
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-12 h-1 w-32 overflow-hidden rounded-full bg-stone-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="h-full rounded-full bg-amber-500"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

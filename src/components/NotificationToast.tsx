import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Sparkles } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { toastMessage } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-neutral-950/95 border border-amber-500/50 text-neutral-100 rounded-lg shadow-2xl backdrop-blur-md text-xs font-medium animate-in fade-in slide-in-from-bottom-3 duration-300">
      <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
      <span>{toastMessage}</span>
    </div>
  );
};

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, MessageCircle, HelpCircle } from 'lucide-react';

export default function ConciergeSupport() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-serif text-2xl font-bold">Help & Support</h1>
      </div>

      <Card className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <MessageCircle size={24} className="text-[#C4623A]" />
          <div>
            <div className="font-serif font-bold text-sm">Stylist & Technical Support</div>
            <p className="text-xs text-neutral-500">Average response time: 4 minutes</p>
          </div>
        </div>
        <Button fullWidth variant="primary" size="sm">
          Start Live Chat
        </Button>
      </Card>

      <div className="space-y-2 text-xs">
        <div className="font-semibold uppercase text-neutral-500">Frequently Asked Questions</div>
        {[
          "How does mindful cooldown work?",
          "Can I export my lookbook to PDF?",
          "How do I sync my work calendar?",
          "What happens when the 1-month trial ends?"
        ].map((q, idx) => (
          <Card key={idx} className="p-3 flex justify-between items-center cursor-pointer">
            <span>{q}</span>
            <span className="text-neutral-400">›</span>
          </Card>
        ))}
      </div>
    </div>
  );
}

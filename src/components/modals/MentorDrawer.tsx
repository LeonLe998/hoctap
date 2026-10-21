import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mentorNote } from '../../data/initialData';

export const MentorDrawer: React.FC = () => {
  const { isMentorOpen, setIsMentorOpen } = useApp();

  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'mentor'; text: string; time: string }[]>([
    {
      sender: 'mentor',
      text: mentorNote.note,
      time: '08:15'
    },
    {
      sender: 'mentor',
      text: 'Tuần này chúng ta tập trung kỹ năng pháp chế lao động FDI. Em có thắc mắc gì về việc lập biên bản hay cách thương lượng hòa giải cứ hỏi thầy nhé!',
      time: '08:16'
    }
  ]);

  if (!isMentorOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userMsg = question.trim();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [...prev, { sender: 'user', text: userMsg, time: now }]);
    setQuestion('');

    setTimeout(() => {
      let mentorAnswer = 'Thầy đã nhận được câu hỏi. Điểm mấu chốt là em cần đối chiếu biên bản với thỏa ước lao động tập thể và quy chế nội bộ trước khi áp dụng hình thức sa thải nhé!';
      if (userMsg.toLowerCase().includes('lương') || userMsg.toLowerCase().includes('c&b')) {
        mentorAnswer = 'Về phần lương 3P và trợ cấp thôi việc, em nhớ loại trừ thời gian NLĐ đã tham gia BHTN theo Nghị định 145/2020/NĐ-CP để không bị trùng lắp chi phí doanh nghiệp.';
      } else if (userMsg.toLowerCase().includes('tiếng trung') || userMsg.toLowerCase().includes('hsk')) {
        mentorAnswer = 'Trong phỏng vấn với sếp người Hoa, việc phát âm chuẩn thanh 1 và thanh 4 rất quan trọng để thể hiện phong thái tự tin và chuyên nghiệp.';
      } else if (userMsg.toLowerCase().includes('toeic') || userMsg.toLowerCase().includes('tiếng anh')) {
        mentorAnswer = 'Với Part 3, nhớ tận dụng 8 giây giữa 2 đoạn audio để đọc lướt câu hỏi và đoán trước ngữ cảnh (Onboarding, Meeting, hay Relocation) nhé.';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'mentor',
          text: mentorAnswer,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-surface-container-lowest h-full shadow-2xl flex flex-col border-l border-surface-container-highest animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-space-lg bg-surface-container-low border-b border-surface-container-highest/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-[14px]">
              {mentorNote.mentorAvatar}
            </div>
            <div className="flex flex-col">
              <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                {mentorNote.mentorName}
              </span>
              <span className="font-label-xs text-label-xs text-on-surface-variant">
                {mentorNote.mentorTitle}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsMentorOpen(false)}
            className="text-outline hover:text-on-surface p-1 rounded-md transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Message Feed */}
        <div className="flex-1 p-space-lg overflow-y-auto space-y-space-md bg-surface">
          <div className="text-center">
            <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs">
              Kênh trao đổi 1:1 với Mentor Tuần 3
            </span>
          </div>

          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-space-md rounded-xl text-body-sm font-body-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-primary-container text-on-primary rounded-br-none shadow-xs'
                    : 'bg-surface-container-lowest text-on-surface border border-surface-container-highest/70 rounded-bl-none shadow-xs'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-outline mt-1 px-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-space-md bg-surface-container-low border-t border-surface-container-highest/60 flex items-center gap-space-sm shrink-0">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Hỏi Mentor về nghiệp vụ, bài tập, phỏng vấn..."
            className="flex-1 h-10 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm border border-surface-container-highest focus:border-primary focus:outline-none"
          />
          <button
            type="submit"
            className="h-10 px-3.5 rounded-lg bg-primary-container text-on-primary hover:opacity-95 font-label-md text-label-md font-semibold flex items-center justify-center shrink-0 shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

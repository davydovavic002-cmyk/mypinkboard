"use client";
import React, { useState, useRef } from 'react';
import { Plus, Folder, MousePointer2, Pencil, Type, Image as ImageIcon } from 'lucide-react';

export default function SimpleMiro() {
  const [notes, setNotes] = useState([]); // Храним заметки/текст
  const [tool, setTool] = useState('select'); // Текущий инструмент
  const canvasRef = useRef(null);

  // Функция добавления новой заметки на доску
  const addNote = (e) => {
    if (tool !== 'type') return;
    const rect = e.target.getBoundingClientRect();
    const newNote = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      text: "Новая заметка...",
      color: "#FFD1DC"
    };
    setNotes([...notes, newNote]);
  };

  return (
    <div className="flex h-screen w-full bg-[#FFF5F7] overflow-hidden font-sans">
      
      {/* ЛЕВАЯ ПАНЕЛЬ: СОРТИРОВКА (Notion Style) */}
      <aside className="w-72 bg-white/70 backdrop-blur-md border-r border-[#FFD1DC] p-6 flex flex-col">
        <h2 className="text-[#8B4367] font-bold mb-6 flex items-center gap-2">
          <Folder size={20} /> Проекты
        </h2>
        <div className="space-y-2 flex-1">
          <div className="p-2 bg-[#FFD1DC]/40 rounded-lg text-sm cursor-pointer">🌸 Идеи для дома</div>
          <div className="p-2 hover:bg-[#FFD1DC]/20 rounded-lg text-sm cursor-pointer transition-all">📝 Конспекты: IT</div>
        </div>
        <button className="mt-auto flex items-center justify-center gap-2 bg-[#FFB7C5] text-white p-3 rounded-2xl hover:bg-[#FF8DA1] transition-all">
          <Plus size={18} /> Новая папка
        </button>
      </aside>

      {/* ОСНОВНАЯ ДОСКА */}
      <main className="flex-1 relative bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')] cursor-crosshair"
            onClick={addNote}>
        
        {/* ПАНЕЛЬ ИНСТРУМЕНТОВ */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-4 bg-white/90 p-3 rounded-3xl shadow-xl border border-[#FFD1DC] z-50">
          <button onClick={() => setTool('select')} className={`p-2 rounded-xl ${tool === 'select' ? 'bg-[#FFD1DC]' : ''}`}><MousePointer2 size={22} /></button>
          <button onClick={() => setTool('pencil')} className={`p-2 rounded-xl ${tool === 'pencil' ? 'bg-[#FFD1DC]' : ''}`}><Pencil size={22} /></button>
          <button onClick={() => setTool('type')} className={`p-2 rounded-xl ${tool === 'type' ? 'bg-[#FFD1DC]' : ''}`}><Type size={22} /></button>
          <button className="p-2 hover:bg-[#FFF0F5] rounded-xl"><ImageIcon size={22} /></button>
        </div>

        {/* ОТРЕНДЕРЕННЫЕ ЗАМЕТКИ */}
        {notes.map(note => (
          <div 
            key={note.id}
            style={{ left: note.x, top: note.y, backgroundColor: note.color }}
            className="absolute p-4 shadow-md rounded-lg min-w-[150px] cursor-move border border-[#FFB7C5]/50 animate-in fade-in zoom-in duration-300"
          >
            <textarea 
              className="bg-transparent border-none outline-none text-[#8B4367] resize-none w-full h-full text-sm placeholder-[#8B4367]/50"
              defaultValue={note.text}
              autoFocus
            />
          </div>
        ))}

        {/* Слой для рисования (SVG или Canvas будет тут) */}
        {tool === 'pencil' && (
            <div className="absolute inset-0 pointer-events-none">
                <p className="absolute bottom-10 left-10 text-[#FFB7C5] italic">Режим рисования активен...</p>
            </div>
        )}
      </main>
    </div>
  );
}

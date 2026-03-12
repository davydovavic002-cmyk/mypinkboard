"use client";
import React, { useState, useRef } from 'react';
import { Plus, Folder, MousePointer2, Pencil, Type, Image as ImageIcon, Heart } from 'lucide-react';

export default function SimpleMiro() {
  const [tool, setTool] = useState('pencil');
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e) => {
    if (tool !== 'pencil') return;
    setIsDrawing(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setLines([...lines, { points: [{ x: e.clientX - rect.left, y: e.clientY - rect.top }], color: '#FFB7C5' }]);
  };

  const draw = (e) => {
    if (!isDrawing || tool !== 'pencil') return;
    const rect = e.currentTarget.getBoundingClientRect();
    let lastLine = lines[lines.length - 1];
    lastLine.points.push({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setLines([...lines.slice(0, -1), lastLine]);
  };

  return (
    <div className="flex h-screen w-full bg-[#FFF0F5] overflow-hidden m-0 p-0 font-sans">
      
      {/* SIDEBAR — Теперь он точно будет слева */}
      <aside className="w-72 bg-white/80 backdrop-blur-md border-r border-[#FFD1DC] p-6 flex flex-col z-20 shadow-xl">
        <div className="flex items-center gap-2 mb-8 text-[#8B4367]">
          <Heart fill="#FFB7C5" size={24} stroke="none" />
          <h1 className="font-bold text-xl tracking-tight">Pink Board</h1>
        </div>

        <div className="flex-1 space-y-4">
          <p className="text-[10px] uppercase font-bold text-[#FFB7C5] tracking-widest px-2">Твои папки</p>
          <div className="space-y-1">
             <div className="flex items-center gap-3 p-3 bg-[#FFD1DC]/40 rounded-2xl text-[#8B4367] font-medium transition-all">
                <Folder size={18} /> Идеи для дома
             </div>
             <div className="flex items-center gap-3 p-3 hover:bg-[#FFD1DC]/20 rounded-2xl text-[#8B4367]/70 transition-all cursor-pointer">
                <Folder size={18} /> Конспекты: IT
             </div>
          </div>
        </div>

        <button className="flex items-center justify-center gap-2 bg-[#FFB7C5] text-white p-4 rounded-2xl hover:bg-[#FF8DA1] transition-all shadow-md active:scale-95">
          <Plus size={20} /> Создать страницу
        </button>
      </aside>

      {/* CANVAS — Основная рабочая зона */}
      <main 
        className="flex-1 relative bg-white m-4 rounded-[40px] shadow-inner overflow-hidden touch-none cursor-crosshair border-4 border-[#FFD1DC]/30"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={() => setIsDrawing(false)}
      >
        {/* ПАНЕЛЬ ИНСТРУМЕНТОВ — Парит сверху */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-3 bg-white/90 backdrop-blur-md p-3 rounded-3xl shadow-2xl border border-[#FFD1DC] z-50">
          <ToolBtn active={tool==='select'} onClick={()=>setTool('select')} icon={<MousePointer2 size={20}/>} />
          <ToolBtn active={tool==='pencil'} onClick={()=>setTool('pencil')} icon={<Pencil size={20}/>} />
          <ToolBtn active={tool==='type'} onClick={()=>setTool('type')} icon={<Type size={20}/>} />
          <div className="w-[1px] bg-[#FFD1DC] mx-1" />
          <ToolBtn icon={<ImageIcon size={20}/>} />
        </div>

        {/* SVG СЛОЙ ДЛЯ РИСОВАНИЯ */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {lines.map((line, i) => (
            <polyline
              key={i}
              points={line.points.map(p => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke={line.color}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </svg>

        {/* ПРИВЕТСТВИЕ */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
           <h2 className="text-4xl font-bold text-[#FFB7C5] rotate-[-5deg]">Начни рисовать здесь...</h2>
        </div>
      </main>
    </div>
  );
}

// Мини-компонент для кнопок инструментов
function ToolBtn({ icon, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`p-3 rounded-2xl transition-all ${active ? 'bg-[#FFB7C5] text-white shadow-inner' : 'text-[#8B4367] hover:bg-[#FFF0F5]'}`}
    >
      {icon}
    </button>
  );
}

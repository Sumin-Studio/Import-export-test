import { useState, useRef, useEffect } from 'react';
import svgPaths from "../imports/svg-fqfnxyzk1n";

interface InteractiveDatePickerProps {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
  onClose: () => void;
}

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function Container() {
  return (
    <div className="aspect-[20/20] relative size-full" data-name="container">
      <div className="absolute bottom-1/4 left-[35.94%] overflow-clip right-[35.94%] top-1/4" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.62498 10.0001">
          <path d={svgPaths.p14a5e00} fill="var(--fill-0, #1E3145)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon({ onClick }: { onClick: () => void }) {
  return (
    <div className="h-[16px] relative shrink-0 w-[20px] cursor-pointer" data-name="icon" onClick={onClick}>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 size-[32px] top-1/2" data-name="leftIcon">
        <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="resizer" />
          </svg>
        </div>
        <div className="flex flex-[1_0_0] items-center justify-center max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative">
          <div className="flex-none rotate-180 w-full">
            <Container />
          </div>
        </div>
        <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="resizer" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute bottom-[35.94%] left-1/4 overflow-clip right-1/4 top-[35.94%]" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0012 5.625">
          <path d={svgPaths.p95b0600} fill="var(--fill-0, #1E3145)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute bottom-1/4 left-[35.94%] overflow-clip right-[35.94%] top-1/4" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.62498 10.0001">
          <path d={svgPaths.p14a5e00} fill="var(--fill-0, #1E3145)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon1({ onClick }: { onClick: () => void }) {
  return (
    <div className="h-[16px] relative shrink-0 w-[20px] cursor-pointer" data-name="icon" onClick={onClick}>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 size-[32px] top-1/2" data-name="leftIcon">
        <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="resizer" />
          </svg>
        </div>
        <Container3 />
        <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="resizer" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function InteractiveDatePicker({ selectedDate, onSelect, onClose }: InteractiveDatePickerProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(selectedDate ? selectedDate.getMonth() : today.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate ? selectedDate.getFullYear() : today.getFullYear());
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    onSelect(newDate);
  };

  const handlePickerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const daysInPrevMonth = getDaysInMonth(currentMonth - 1, currentYear);

    const days: JSX.Element[] = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      days.push(
        <div key={`prev-${day}`} className="flex-[1_0_0] h-[40px] min-h-px min-w-px relative" data-name="disabled day">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[40px] top-1/2" data-name="_Date Picker/Day">
            <div className="absolute left-0 rounded-[100px] size-[40px] top-0" data-name="_Date Picker/Day Foreground">
              <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[1.45] left-1/2 not-italic text-[#828995] text-[15px] text-center top-[calc(50%-11px)] w-[40px]">{day}</p>
            </div>
          </div>
        </div>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate && 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === currentMonth && 
        selectedDate.getFullYear() === currentYear;
      
      const isToday = today.getDate() === day && 
        today.getMonth() === currentMonth && 
        today.getFullYear() === currentYear;

      days.push(
        <div 
          key={`current-${day}`} 
          className="cursor-pointer flex-[1_0_0] h-[40px] min-h-px min-w-px relative" 
          data-name="_Date Picker/Day"
          onClick={() => handleDateClick(day)}
        >
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 rounded-[100px] size-[40px] top-1/2" data-name="_Date Picker/Day Foreground">
            <div className={`absolute left-0 rounded-[100px] size-[40px] top-0 ${isSelected ? 'bg-[#1f68dd]' : ''} ${isToday && !isSelected ? 'border border-[#1f68dd] border-solid' : ''}`}>
              <p className={`-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[1.45] left-1/2 not-italic text-[15px] text-center top-[calc(50%-11px)] w-[40px] ${isSelected ? 'text-white' : isToday ? 'text-[#1f68dd]' : 'text-[#1e3145]'}`}>
                {day}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push(
        <div key={`next-${day}`} className="flex-[1_0_0] h-[40px] min-h-px min-w-px relative" data-name="disabled day">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[40px] top-1/2" data-name="_Date Picker/Day">
            <div className="absolute left-0 rounded-[100px] size-[40px] top-0" data-name="_Date Picker/Day Foreground">
              <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[1.45] left-1/2 not-italic text-[#828995] text-[15px] text-center top-[calc(50%-11px)] w-[40px]">{day}</p>
            </div>
          </div>
        </div>
      );
    }

    // Group into weeks
    const weeks: JSX.Element[] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(
        <div key={`week-${i}`} className="content-stretch flex items-center relative shrink-0 w-full" data-name={`week ${i / 7 + 1}`}>
          {days.slice(i, i + 7)}
        </div>
      );
    }

    return weeks;
  };

  return (
    <div ref={pickerRef} className="absolute bg-white rounded-[6px] shadow-[0px_3px_6px_0px_rgba(0,0,0,0.2),0px_0px_0px_1px_rgba(0,0,0,0.05)] w-[296px] z-[100] mt-1 right-0" data-name="Date Picker" onClick={handlePickerClick}>
      <div className="content-stretch flex flex-col items-center overflow-clip relative rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start pb-[8px] relative rounded-[6px] shrink-0 w-full" data-name="_Date Picker/Calendar">
          <div className="relative shrink-0 w-full" data-name="_month selector">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center justify-between p-[16px] relative w-full">
                <div className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[32px]" data-name="Icon Button">
                  <Icon onClick={previousMonth} />
                </div>
                <div className="h-[36px] relative shrink-0 w-[162px]" data-name="DatePicker/ControlGroup">
                  <div className="absolute content-stretch flex flex-col inset-[0_51.85%_0_0] items-start" data-name="Select Box">
                    <div className="bg-white content-stretch flex gap-[4px] items-center min-h-[24px] px-[8px] relative rounded-bl-[4px] rounded-tl-[4px] shrink-0" data-name="input wrap">
                      <div aria-hidden="true" className="absolute border border-[#cfd1d5] border-solid inset-0 pointer-events-none rounded-bl-[4px] rounded-tl-[4px]" />
                      <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="left">
                        <div className="content-stretch flex items-center relative shrink-0" data-name="content">
                          <div className="content-stretch flex items-center overflow-clip py-[2px] relative shrink-0" data-name="textValue">
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1e3145] text-[13px] whitespace-nowrap">{monthNamesShort[currentMonth]}</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center justify-center py-[2px] relative shrink-0" data-name="rightElement">
                        <div className="content-stretch flex items-center justify-center relative shrink-0 size-[32px]" data-name="chevron">
                          <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                              <g id="resizer" />
                            </svg>
                          </div>
                          <Container1 />
                          <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                              <g id="resizer" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute content-stretch flex flex-col inset-[0_0_0_48.15%] items-start" data-name="Select Box">
                    <div className="bg-white content-stretch flex gap-[4px] items-center min-h-[24px] px-[8px] relative rounded-br-[4px] rounded-tr-[4px] shrink-0" data-name="input wrap">
                      <div aria-hidden="true" className="absolute border-[#cfd1d5] border-b border-r border-solid border-t inset-0 pointer-events-none rounded-br-[4px] rounded-tr-[4px]" />
                      <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="left">
                        <div className="content-stretch flex items-center relative shrink-0" data-name="content">
                          <div className="content-stretch flex items-center overflow-clip py-[2px] relative shrink-0" data-name="textValue">
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1e3145] text-[13px] whitespace-nowrap">{currentYear}</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center justify-center py-[2px] relative shrink-0" data-name="rightElement">
                        <div className="content-stretch flex items-center justify-center relative shrink-0 size-[32px]" data-name="chevron">
                          <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                              <g id="resizer" />
                            </svg>
                          </div>
                          <Container1 />
                          <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                              <g id="resizer" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[32px]" data-name="Icon Button">
                  <Icon1 onClick={nextMonth} />
                </div>
              </div>
            </div>
          </div>
          <div className="relative shrink-0 w-full" data-name="_Date Picker/Day Labels">
            <div aria-hidden="true" className="absolute border-[#e1e2e5] border-b border-solid inset-0 pointer-events-none" />
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-center justify-center leading-[1.45] not-italic pb-[8px] px-[12px] relative text-[#424f60] text-[13px] text-center w-full">
                <p className="flex-[1_0_0] min-h-px min-w-px relative">S</p>
                <p className="flex-[1_0_0] min-h-px min-w-px relative">M</p>
                <p className="flex-[1_0_0] min-h-px min-w-px relative">T</p>
                <p className="flex-[1_0_0] min-h-px min-w-px relative">W</p>
                <p className="flex-[1_0_0] min-h-px min-w-px relative">T</p>
                <p className="flex-[1_0_0] min-h-px min-w-px relative">F</p>
                <p className="flex-[1_0_0] min-h-px min-w-px relative">S</p>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="month">
            <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="left margin">
              <div className="bg-white h-[40px] shrink-0 w-full" data-name="_Date Picker/Edge" />
              <div className="bg-white h-[40px] shrink-0 w-full" data-name="_Date Picker/Edge" />
              <div className="bg-white h-[40px] shrink-0 w-[10px]" data-name="_Date Picker/Edge" />
              <div className="bg-white h-[40px] shrink-0 w-full" data-name="_Date Picker/Edge" />
              <div className="bg-white h-[40px] shrink-0 w-full" data-name="_Date Picker/Edge" />
              <div className="bg-white h-[40px] shrink-0 w-full" data-name="_Date Picker/Edge" />
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-center min-h-px min-w-px relative" data-name="weeks">
              {renderCalendar()}
            </div>
            <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="right margin">
              <div className="bg-white h-[40px] shrink-0 w-[10px]" data-name="_Date Picker/Edge" />
              <div className="bg-white h-[40px] shrink-0 w-[10px]" data-name="_Date Picker/Edge" />
              <div className="bg-white h-[40px] shrink-0 w-[10px]" data-name="_Date Picker/Edge" />
              <div className="bg-white h-[40px] shrink-0 w-[10px]" data-name="_Date Picker/Edge" />
              <div className="bg-white h-[40px] shrink-0 w-[10px]" data-name="_Date Picker/Edge" />
              <div className="bg-white h-[40px] shrink-0 w-[10px]" data-name="_Date Picker/Edge" />
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#cfd1d5] border-solid inset-[-1px] pointer-events-none rounded-[7px] shadow-[0px_3px_6px_0px_rgba(0,0,0,0.2),0px_0px_0px_1px_rgba(0,0,0,0.05)]" />
    </div>
  );
}
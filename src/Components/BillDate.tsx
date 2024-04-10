import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from "lucide-react"
import {Button} from '@/Components/ui/button'; 

interface BillDateProps {
  setFilterDate: (date: string) => void;
  filterDate: string;
}

export default function DateChanger({ setFilterDate, filterDate }: BillDateProps) {
  const [date, setDate] = useState(new Date(`${filterDate}T00:00`));
  console.log(date,'=', filterDate);

  const handlePreviousDay = () => {
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      const newDateString = newDate.toISOString().split('T')[0];
      setFilterDate(newDateString);  // Update filterDate
      return newDate;
    });
  };
  
  const handleNextDay = () => {
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      const newDateString = newDate.toISOString().split('T')[0];
      setFilterDate(newDateString);  // Update filterDate
      return newDate;
    });
  };

  return (
    <div>
        <Button variant="outline" size="icon" onClick={handlePreviousDay} className="border-none">
            <ChevronLeft className="h-4 w-4" />
        </Button>
        <span>{date.toDateString()}</span>
        <Button variant="outline" size="icon" onClick={handleNextDay} className="border-none">
            <ChevronRight className="h-4 w-4" />
        </Button>
    </div>
  );
}
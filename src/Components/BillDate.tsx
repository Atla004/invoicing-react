import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from "lucide-react"
import {Button} from '@/Components/ui/button'; 
import { max } from 'date-fns';
import { toast } from 'sonner';

interface BillDateProps {
  setFilterDate: (date: string) => void;
  filterDate: string;
  maxDate: string;
}

export default function DateChanger({ setFilterDate, filterDate , maxDate}: BillDateProps) {
  const [date, setDate] = useState(new Date(`${filterDate}T00:00`));


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
    console.log('maxDate', maxDate, 'prevDate', prevDate, 'filterDate', filterDate, 'date', date);
    const newDate = new Date(prevDate);
    newDate.setHours(0, 0, 0, 0);  // Set the time to midnight

    const maxDateObj = new Date(maxDate + 'T00:00');
    maxDateObj.setHours(0, 0, 0, 0);  // Set the time to midnight

    // Only update filterDate and date if newDate is less than maxDate
    if (newDate.getTime() < maxDateObj.getTime()) {
      newDate.setDate(newDate.getDate() + 1);
      const newDateString = newDate.toISOString().split('T')[0];
      setFilterDate(newDateString);  // Update filterDate
      return newDate;  // Update date
    }

    // If newDate is greater or equal to maxDate, return the previous date
    toast.error('No puedes seleccionar una fecha mayor a la fecha actual');
    return prevDate;
  });
};
  return (
    <div>
        <Button variant="outline" size="icon" onClick={handlePreviousDay} className="border-none">
            <ChevronLeft className="h-4 w-4" />
        </Button>
        <span>{filterDate}</span>
        <Button variant="outline" size="icon" onClick={handleNextDay} className="border-none">
            <ChevronRight className="h-4 w-4" />
        </Button>
    </div>
  );
}
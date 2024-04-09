import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from "lucide-react"
import {Button} from '@/Components/ui/button'; 

export default function DateChanger() {
  const [date, setDate] = useState(new Date('2004-12-12'));

  const handlePreviousDay = () => {
    setDate(prevDate => new Date(prevDate.setDate(prevDate.getDate() - 1)));
  };

  const handleNextDay = () => {
    setDate(prevDate => new Date(prevDate.setDate(prevDate.getDate() + 1)));
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
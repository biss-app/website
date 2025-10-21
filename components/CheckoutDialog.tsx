"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin, ChevronDown } from "lucide-react";

interface CheckoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { date: Date; time: string; city: string; mode: "click&collect" | "livraison" }) => void;
  loading: boolean;
  mode: "click&collect" | "livraison"; // Mode déjà choisi avant l'ouverture
}

const cities = ["Aubière", "Ceyrat", "Chamalières", "Cournon-d'Auvergne", "Clermont-Ferrand", "Gerzat", "Lempdes", "Royat"];

const monthNames = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre"
];

const CheckoutDialog: React.FC<CheckoutDialogProps> = ({ isOpen, onClose, onConfirm, loading, mode }) => {
  const [dateInput, setDateInput] = useState("JJ/MM/AAAA");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [dateError, setDateError] = useState("");
  const [dateTouched, setDateTouched] = useState(false);

  const [timeInput, setTimeInput] = useState("HHhMM");
  const [selectedTime, setSelectedTime] = useState("");

  const [selectedCity, setSelectedCity] = useState("");
  const [agreed, setAgreed] = useState(false);

  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const today = new Date();
  const minDate = new Date(today);
  if (today.getHours() >= 12) minDate.setDate(minDate.getDate() + 2);
  else minDate.setDate(minDate.getDate() + 1);
  const maxDate = new Date(today);
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  // -------------------- Date --------------------
  const handleDateKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDateTouched(true);
    const pos = dateInput.search(/[JMA]/);

    if (/^\d$/.test(e.key) && pos !== -1) {
      const chars = dateInput.split("");
      if (pos === 0 && parseInt(e.key) > 3) return;
      if (pos === 1 && parseInt(chars[0]) === 3 && parseInt(e.key) > 1) return;
      if (pos === 3 && parseInt(e.key) > 1) return;
      if (pos === 4 && parseInt(chars[3]) === 1 && parseInt(e.key) > 2) return;

      chars[pos] = e.key;
      const newValue = chars.join("");
      setDateInput(newValue);
      validateDateLive(newValue);

      setTimeout(() => dateInputRef.current?.setSelectionRange(pos + 1, pos + 1));
    } else if (e.key === "Backspace") {
      const backPos = [...dateInput].reverse().findIndex((ch) => /\d/.test(ch));
      if (backPos !== -1) {
        const realPos = dateInput.length - 1 - backPos;
        const chars = dateInput.split("");
        if (realPos <= 1) chars[realPos] = "J";
        else if (realPos <= 4) chars[realPos] = "M";
        else chars[realPos] = "A";
        setDateInput(chars.join(""));
        setSelectedDate(undefined);
        setDateError("");
        setTimeout(() => dateInputRef.current?.setSelectionRange(realPos, realPos));
      }
    }
  };

  const validateDateLive = (value: string) => {
    if (!dateTouched) return;

    const [dayStr, monthStr, yearStr] = value.split("/");
    const day = parseInt(dayStr.replace(/[J]/g, "0"), 10);
    const month = parseInt(monthStr.replace(/[M]/g, "0"), 10);
    const year = parseInt(yearStr.replace(/[A]/g, "0"), 10);

    if (!dayStr.includes("J") && !monthStr.includes("M") && !yearStr.includes("A")) {
      const parsed = new Date(year, month - 1, day);

      if (isNaN(parsed.getTime()) || parsed < minDate || parsed > maxDate) {
        setDateError(`Veuillez saisir une date comprise entre ${minDate.toLocaleDateString()} et ${maxDate.toLocaleDateString()}`);
        setSelectedDate(undefined);
        return;
      }

      if (month === 2 && day > 28) {
        setDateError(`Le mois de février ne comporte que 28 jours en ${year}`);
        setSelectedDate(undefined);
        return;
      }

      if ([4, 6, 9, 11].includes(month) && day > 30) {
        setDateError(`Le mois de ${monthNames[month - 1]} ne comporte que 30 jours`);
        setSelectedDate(undefined);
        return;
      }

      setDateError("");
      setSelectedDate(parsed);
    }
  };

  // -------------------- Heure --------------------
  const handleTimeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pos = timeInput.search(/[HM]/);

    if (/^\d$/.test(e.key) && pos !== -1) {
      const chars = timeInput.split("");
      if (pos === 0 && parseInt(e.key) > 2) return;
      if (pos === 1 && parseInt(chars[0]) === 2 && parseInt(e.key) > 3) return;
      if (pos === 3 && parseInt(e.key) > 5) return;

      chars[pos] = e.key;
      const newValue = chars.join("");
      setTimeInput(newValue);

      const [hhStr, mmStr] = newValue.split("h");
      const hh = parseInt(hhStr.replace(/[H]/g, "0"), 10);
      const mm = parseInt(mmStr.replace(/[M]/g, "0"), 10);

      if (hh > 23 || mm > 59) setSelectedTime("");
      else if (!newValue.includes("H") && !newValue.includes("M")) setSelectedTime(newValue);
      else setSelectedTime("");

      setTimeout(() => timeInputRef.current?.setSelectionRange(pos + 1, pos + 1));
    } else if (e.key === "Backspace") {
      const backPos = [...timeInput].reverse().findIndex((ch) => /\d/.test(ch));
      if (backPos !== -1) {
        const realPos = timeInput.length - 1 - backPos;
        const chars = timeInput.split("");
        if (realPos <= 1) chars[realPos] = "H";
        else chars[realPos] = "M";
        setTimeInput(chars.join(""));
        setSelectedTime("");
        setTimeout(() => timeInputRef.current?.setSelectionRange(realPos, realPos));
      }
    }
  };

  // -------------------- Validation finale --------------------
  const handleConfirm = () => {
    if (!selectedDate || !selectedTime || (mode === "livraison" && !selectedCity) || !agreed) return;
    onConfirm({ date: selectedDate, time: selectedTime, city: selectedCity, mode });
  };

  const renderMaskedText = (value: string, placeholders: string[], placeholderColor: string, valueColor: string) =>
    value.split("").map((ch, i) =>
      placeholders.includes(ch)
        ? <span key={i} className={`text-${placeholderColor}`}>{ch}</span>
        : <span key={i} className={`text-${valueColor}`}>{ch}</span>
    );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Choisir mon créneau de {mode === "livraison" ? "livraison" : "retrait"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Date */}
          <div>
            <Label>Date</Label>
            <div className="relative bg-white border rounded-md h-10">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <div className="pl-10 flex items-center h-full text-sm tracking-widest cursor-text">
                {renderMaskedText(dateInput, ["J","M","A"], "gray-400", "black")}
              </div>
              <Input ref={dateInputRef} type="text" value={dateInput} onKeyDown={handleDateKeyDown} readOnly className="absolute top-0 left-0 w-full h-full opacity-0 caret-black cursor-text" />
            </div>
            {dateError && <p className="text-red-600 text-sm mt-1">{dateError}</p>}
          </div>

          {/* Heure */}
          <div>
            <Label>Heure</Label>
            <div className="relative bg-white border rounded-md h-10">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <div className="pl-10 flex items-center h-full text-sm tracking-widest cursor-text">
                {renderMaskedText(timeInput, ["H","M"], "gray-400", "black")}
              </div>
              <Input ref={timeInputRef} type="text" value={timeInput} onKeyDown={handleTimeKeyDown} readOnly className="absolute top-0 left-0 w-full h-full opacity-0 caret-black cursor-text" />
            </div>
          </div>

          {/* Phrase Click&Collect */}
          {mode === "click&collect" && (
            <p className="text-sm text-gray-600 mt-2">
              Le retrait se réalise à l'arrêt de tramway <span className="text-gold">Stade M. Michelin</span>.
            </p>
          )}

          {/* Ville */}
          {mode === "livraison" && (
            <div>
              <Label>Ville</Label>
              <div className="relative mt-2">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-full text-sm justify-between text-left pl-10">
                    <SelectValue placeholder="Choisir une ville" />
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => <SelectItem key={city} value={city}>{city}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Checkbox checked={agreed} onCheckedChange={(val) => setAgreed(!!val)} />
            <Label>J'accepte les <a href="/conditions-generales-de-vente" className="text-gold underline">Conditions Générales de Vente</a></Label>
          </div>
          <Button className="w-full mt-2" onClick={handleConfirm} disabled={loading}>
            {loading ? "Chargement en cours..." : "Procéder au paiement"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
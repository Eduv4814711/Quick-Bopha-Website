"use client";

import React, { useState } from "react";
import { PhoneCall, AlertTriangle, MessageSquare, MapPin, ShieldAlert, X, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { COMPANY_DETAILS } from "@/lib/constants";
import { toast } from "sonner";

export function EmergencyTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    incidentType: "Alarm Trigger / Intrusion",
    locationAddress: "Wolmaransstad / N12 Corridor",
    notes: "",
  });

  const captureGPS = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
        toast.success("GPS Coordinates Acquired for 24/7 Control Room");
      },
      (err) => {
        setLocating(false);
        toast.error("Unable to get exact GPS. Please enter your address below.");
      },
      { timeout: 8000 }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        gps: coords,
        timestamp: new Date().toISOString(),
      };

      const res = await fetch("/api/emergency/dispatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Emergency Alert Dispatched to 24/7 Control Room Desk!");

      // Open WhatsApp pre-filled link
      const textMsg = encodeURIComponent(
        `🚨 EMERGENCY DISPATCH REQUEST 🚨\nName: ${formData.name}\nPhone: ${formData.phone}\nType: ${formData.incidentType}\nLocation: ${formData.locationAddress}${
          coords ? `\nGPS: ${coords.lat}, ${coords.lng}` : ""
        }\nNotes: ${formData.notes || "Immediate armed response requested."}`
      );
      window.open(`https://wa.me/${COMPANY_DETAILS.hotlines.whatsappDispatch}?text=${textMsg}`, "_blank");
    } catch {
      setIsSubmitting(false);
      toast.error("Network issue. Please dial 018 011 9111 immediately!");
    }
  };

  return (
    <>
      {/* Floating Speed Dial / Emergency Pulse Trigger */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Rapid Callout Pill */}
        <div className="hidden sm:flex items-center gap-2 bg-white/95 text-[#0B1340] border border-red-200 rounded-full px-3.5 py-1.5 shadow-lg text-xs backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
          <span className="font-semibold text-red-600">24/7 Rapid Response Desk:</span>
          <a
            href={`tel:${COMPANY_DETAILS.hotlines.controlRoom.replace(/\s+/g, "")}`}
            className="font-bold text-[#0B1340] hover:text-red-600"
          >
            {COMPANY_DETAILS.hotlines.controlRoom}
          </a>
        </div>

        {/* Action Trigger Buttons */}
        <div className="flex items-center gap-2">
          {/* Direct WhatsApp Quick Link */}
          <a
            href={`https://wa.me/${COMPANY_DETAILS.hotlines.whatsappDispatch}?text=EMERGENCY%20REQUEST%20-%20Please%20dispatch%20Control%20Room%20to%20my%20location`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
            title="Emergency WhatsApp Dispatch"
          >
            <MessageSquare className="w-5 h-5" />
          </a>

          {/* Emergency Trigger Dialog Button */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger
              className="relative group w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 animate-radar focus:outline-none focus:ring-4 focus:ring-rose-400/50 cursor-pointer"
              aria-label="Activate Emergency Control Room Dispatch"
            >
              <ShieldAlert className="w-7 h-7" />
              <span className="sr-only">Emergency Control Room Trigger</span>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[460px] bg-white dark:bg-slate-900 border-rose-500/30">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-lg">
                  <AlertTriangle className="w-5 h-5 animate-pulse text-rose-600" />
                  24/7 Control Room Emergency Dispatch
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-600 dark:text-slate-400">
                  Instant telemetry dispatch to Quick Bopha Tactical Armed Response units in Wolmaransstad, Maquassi Hills, and the N12 corridor.
                </DialogDescription>
              </DialogHeader>

              {isSuccess ? (
                <div className="py-6 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">Dispatch Transmitted</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Our 24/7 Control Room has received your incident log. Keep your line open.
                    </p>
                  </div>
                  <div className="pt-2">
                    <a
                      href={`tel:${COMPANY_DETAILS.hotlines.controlRoom.replace(/\s+/g, "")}`}
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-sm"
                    >
                      <PhoneCall className="w-4 h-4" />
                      Direct Voice Hotline: {COMPANY_DETAILS.hotlines.controlRoom}
                    </a>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => { setIsSuccess(false); setIsOpen(false); }}>
                    Close
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                  <div className="bg-rose-50 dark:bg-rose-950/30 p-2.5 rounded-lg border border-rose-200 dark:border-rose-900/50 flex items-center justify-between text-xs">
                    <span className="font-semibold text-rose-800 dark:text-rose-300">Direct Voice Hotline:</span>
                    <a
                      href={`tel:${COMPANY_DETAILS.hotlines.controlRoom.replace(/\s+/g, "")}`}
                      className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1 hover:underline"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      {COMPANY_DETAILS.hotlines.controlRoom}
                    </a>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="em-name" className="text-xs">Your Name / Business</Label>
                      <Input
                        id="em-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nkagisang / Farm Estate"
                        className="h-9 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="em-phone" className="text-xs">Phone Number</Label>
                      <Input
                        id="em-phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="082 123 4567"
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs">Incident Classification</Label>
                    <Select
                      value={formData.incidentType}
                      onValueChange={(val) => {
                        if (val) setFormData({ ...formData, incidentType: val });
                      }}
                    >
                      <SelectTrigger className="h-9 text-xs">
                        <SelectValue placeholder="Select emergency type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Alarm Trigger / Intrusion">Alarm Trigger / Perimeter Intrusion</SelectItem>
                        <SelectItem value="Armed Robbery in Progress">Armed Robbery / High Risk</SelectItem>
                        <SelectItem value="Panic Button Activated">Panic Button Activated</SelectItem>
                        <SelectItem value="Farm Attack / Rural Crisis">Agricultural / Farm Security Attack</SelectItem>
                        <SelectItem value="Medical Emergency / Trauma">Medical First Responder Dispatch</SelectItem>
                        <SelectItem value="Suspicious Vehicle / Prowler">Suspicious Vehicle / Prowler</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="em-loc" className="text-xs">Location / Premises</Label>
                      <button
                        type="button"
                        onClick={captureGPS}
                        className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 font-medium"
                      >
                        <MapPin className="w-3 h-3" />
                        {locating ? "Locating..." : coords ? "GPS Attached ✓" : "Attach GPS Coordinates"}
                      </button>
                    </div>
                    <Input
                      id="em-loc"
                      required
                      value={formData.locationAddress}
                      onChange={(e) => setFormData({ ...formData, locationAddress: e.target.value })}
                      placeholder="Street address or farm landmark (Wolmaransstad / N12)"
                      className="h-9 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="em-notes" className="text-xs">Brief Description (Optional)</Label>
                    <Input
                      id="em-notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. 2 suspects at back fence, siren sounding"
                      className="h-9 text-xs"
                    />
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold h-10 text-xs gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      {isSubmitting ? "Dispatching..." : "Transmit to 24/7 Control Desk"}
                    </Button>
                  </div>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}

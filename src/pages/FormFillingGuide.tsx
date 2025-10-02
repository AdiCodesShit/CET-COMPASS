"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockFormGuide } from "@/lib/data";
import { toast } from "sonner";

const DummyRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    percentile: "",
    caste: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dummy Form Submitted:", formData);
    toast.success("Dummy form submitted successfully! This is just for practice.");
    setFormData({
      name: "",
      email: "",
      percentile: "",
      caste: "",
    });
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Dummy Registration Form (Practice)</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="john.doe@example.com" required />
          </div>
          <div>
            <Label htmlFor="percentile">MHT-CET Percentile</Label>
            <Input id="percentile" type="number" step="0.01" value={formData.percentile} onChange={handleChange} placeholder="90.50" required />
          </div>
          <div>
            <Label htmlFor="caste">Caste Category</Label>
            <Input id="caste" value={formData.caste} onChange={handleChange} placeholder="OPEN/OBC/SC/ST/EWS" required />
          </div>
          <Button type="submit">Submit Dummy Form</Button>
        </form>
      </CardContent>
    </Card>
  );
};

const FormFillingGuide = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Form Filling Guide</h2>

      <Accordion type="single" collapsible className="w-full">
        {mockFormGuide.map((section, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-semibold">{section.title}</AccordionTrigger>
            <AccordionContent>
              <div dangerouslySetInnerHTML={{ __html: section.content }} className="prose dark:prose-invert max-w-none" />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <DummyRegistrationForm />
    </div>
  );
};

export default FormFillingGuide;
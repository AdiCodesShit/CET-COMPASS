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
import { FileText, User, Mail, Percent, Tag } from "lucide-react"; // Added icons

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
    <Card className="mt-8 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-bold">
          <FileText className="h-6 w-6 mr-2 text-app-purple" /> Dummy Registration Form (Practice)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <Label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <User className="h-4 w-4 mr-1 text-app-blue" /> Full Name
            </Label>
            <Input id="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
          </div>
          <div>
            <Label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Mail className="h-4 w-4 mr-1 text-app-blue" /> Email
            </Label>
            <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="john.doe@example.com" required />
          </div>
          <div>
            <Label htmlFor="percentile" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Percent className="h-4 w-4 mr-1 text-app-blue" /> MHT-CET Percentile
            </Label>
            <Input id="percentile" type="number" step="0.01" value={formData.percentile} onChange={handleChange} placeholder="90.50" required />
          </div>
          <div>
            <Label htmlFor="caste" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Tag className="h-4 w-4 mr-1 text-app-blue" /> Caste Category
            </Label>
            <Input id="caste" value={formData.caste} onChange={handleChange} placeholder="OPEN/OBC/SC/ST/EWS" required />
          </div>
          <Button type="submit" className="gradient-button">Submit Dummy Form</Button>
        </form>
      </CardContent>
    </Card>
  );
};

const FormFillingGuide = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center gradient-text">Form Filling Guide</h2>
      <p className="text-center text-muted-foreground mb-8">
        Navigate the MHT-CET CAP registration process with ease.
      </p>

      <Accordion type="single" collapsible className="w-full">
        {mockFormGuide.map((section, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-app-light-blue/50 dark:border-app-blue/30">
            <AccordionTrigger className="text-lg font-semibold text-app-purple hover:no-underline hover:text-app-blue transition-colors">
              {section.title}
            </AccordionTrigger>
            <AccordionContent>
              <div dangerouslySetInnerHTML={{ __html: section.content }} className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300" />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <DummyRegistrationForm />
    </div>
  );
};

export default FormFillingGuide;
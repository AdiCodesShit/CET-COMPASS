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
import { Checkbox } from "@/components/ui/checkbox"; // Import Checkbox
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Import Select components
import { mockFormGuide } from "@/lib/data";
import { toast } from "sonner";
import { FileText, User, Mail, Percent, Tag, Calendar, Phone, Home, GraduationCap, DollarSign, Accessibility } from "lucide-react"; // Added more icons

const DummyRegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    dob: "",
    gender: "",
    email: "",
    mobile: "",
    address: "",
    mhtCetRollNo: "",
    mhtCetPercentile: "",
    hscMarks: "",
    casteCategory: "",
    domicileStatus: "",
    annualIncome: "",
    pwdStatus: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dummy Form Submitted:", formData);
    toast.success("Dummy form submitted successfully! This is just for practice.");
    setFormData({
      fullName: "",
      fatherName: "",
      motherName: "",
      dob: "",
      gender: "",
      email: "",
      mobile: "",
      address: "",
      mhtCetRollNo: "",
      mhtCetPercentile: "",
      hscMarks: "",
      casteCategory: "",
      domicileStatus: "",
      annualIncome: "",
      pwdStatus: "",
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
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Personal Details */}
          <div>
            <Label htmlFor="fullName" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <User className="h-4 w-4 mr-1 text-app-blue" /> Full Name
            </Label>
            <Input id="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" required />
          </div>
          <div>
            <Label htmlFor="fatherName" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <User className="h-4 w-4 mr-1 text-app-blue" /> Father's Name
            </Label>
            <Input id="fatherName" value={formData.fatherName} onChange={handleChange} placeholder="Richard Doe" required />
          </div>
          <div>
            <Label htmlFor="motherName" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <User className="h-4 w-4 mr-1 text-app-blue" /> Mother's Name
            </Label>
            <Input id="motherName" value={formData.motherName} onChange={handleChange} placeholder="Jane Doe" required />
          </div>
          <div>
            <Label htmlFor="dob" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Calendar className="h-4 w-4 mr-1 text-app-blue" /> Date of Birth
            </Label>
            <Input id="dob" type="date" value={formData.dob} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="gender" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <User className="h-4 w-4 mr-1 text-app-blue" /> Gender
            </Label>
            <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Mail className="h-4 w-4 mr-1 text-app-blue" /> Email
            </Label>
            <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="john.doe@example.com" required />
          </div>
          <div>
            <Label htmlFor="mobile" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Phone className="h-4 w-4 mr-1 text-app-blue" /> Mobile Number
            </Label>
            <Input id="mobile" type="tel" value={formData.mobile} onChange={handleChange} placeholder="9876543210" required />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="address" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Home className="h-4 w-4 mr-1 text-app-blue" /> Address
            </Label>
            <Input id="address" value={formData.address} onChange={handleChange} placeholder="123 Main St, Anytown" required />
          </div>

          {/* Academic Details */}
          <div>
            <Label htmlFor="mhtCetRollNo" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <GraduationCap className="h-4 w-4 mr-1 text-app-blue" /> MHT-CET Roll No.
            </Label>
            <Input id="mhtCetRollNo" value={formData.mhtCetRollNo} onChange={handleChange} placeholder="123456789" required />
          </div>
          <div>
            <Label htmlFor="mhtCetPercentile" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Percent className="h-4 w-4 mr-1 text-app-blue" /> MHT-CET Percentile
            </Label>
            <Input id="mhtCetPercentile" type="number" step="0.01" value={formData.mhtCetPercentile} onChange={handleChange} placeholder="90.50" required />
          </div>
          <div>
            <Label htmlFor="hscMarks" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <GraduationCap className="h-4 w-4 mr-1 text-app-blue" /> HSC Marks (%)
            </Label>
            <Input id="hscMarks" type="number" step="0.01" value={formData.hscMarks} onChange={handleChange} placeholder="85.20" required />
          </div>

          {/* Category & Other Details */}
          <div>
            <Label htmlFor="casteCategory" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Tag className="h-4 w-4 mr-1 text-app-blue" /> Caste Category
            </Label>
            <Select value={formData.casteCategory} onValueChange={(value) => handleSelectChange("casteCategory", value)}>
              <SelectTrigger id="casteCategory">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OPEN">OPEN</SelectItem>
                <SelectItem value="OBC">OBC</SelectItem>
                <SelectItem value="SC">SC</SelectItem>
                <SelectItem value="ST">ST</SelectItem>
                <SelectItem value="EWS">EWS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="domicileStatus" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Home className="h-4 w-4 mr-1 text-app-blue" /> Domicile Status
            </Label>
            <Select value={formData.domicileStatus} onValueChange={(value) => handleSelectChange("domicileStatus", value)}>
              <SelectTrigger id="domicileStatus">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                <SelectItem value="Outside Maharashtra">Outside Maharashtra</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="annualIncome" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <DollarSign className="h-4 w-4 mr-1 text-app-blue" /> Annual Family Income
            </Label>
            <Input id="annualIncome" type="number" value={formData.annualIncome} onChange={handleChange} placeholder="500000" />
          </div>
          <div>
            <Label htmlFor="pwdStatus" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Accessibility className="h-4 w-4 mr-1 text-app-blue" /> PwD Status
            </Label>
            <Select value={formData.pwdStatus} onValueChange={(value) => handleSelectChange("pwdStatus", value)}>
              <SelectTrigger id="pwdStatus">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="No">No</SelectItem>
                <SelectItem value="Yes">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full h-12 text-lg gradient-button md:col-span-2 mt-4">Submit Dummy Form</Button>
        </form>
      </CardContent>
    </Card>
  );
};

const FormFillingGuide = () => {
  const [checkedDocuments, setCheckedDocuments] = useState<string[]>([]);

  const handleDocumentCheck = (id: string, checked: boolean) => {
    setCheckedDocuments(prev =>
      checked ? [...prev, id] : prev.filter(docId => docId !== id)
    );
  };

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
              {section.content && (
                <div dangerouslySetInnerHTML={{ __html: section.content }} className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300" />
              )}
              {section.documentItems && (
                <div className="space-y-3 mt-4">
                  <p className="text-sm text-muted-foreground">Ensure you have the following documents ready:</p>
                  {section.documentItems.map(doc => (
                    <div key={doc.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-app-light-blue/20 dark:hover:bg-app-blue/10 transition-colors">
                      <Checkbox
                        id={doc.id}
                        checked={checkedDocuments.includes(doc.id)}
                        onCheckedChange={(checked) => handleDocumentCheck(doc.id, checked as boolean)}
                      />
                      <label
                        htmlFor={doc.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {doc.text}
                      </label>
                    </div>
                  ))}
                  <p className="mt-4 text-sm text-red-600"><strong>Note:</strong> Always refer to the official MHT-CET CAP brochure for the most up-to-date and complete list of documents.</p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <DummyRegistrationForm />
    </div>
  );
};

export default FormFillingGuide;
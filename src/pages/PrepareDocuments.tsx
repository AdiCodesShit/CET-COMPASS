"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Upload, CheckCircle, XCircle } from "lucide-react";
import { mockFormGuide } from "@/lib/data";
import { toast } from "sonner";
import { convertImageToPdfAndDownload } from "@/lib/pdf-utils";

interface DocumentStatus {
  [key: string]: "pending" | "uploaded" | "error";
}

const PrepareDocuments = () => {
  const documentItems = mockFormGuide.find(section => section.documentItems)?.documentItems || [];
  const [documentStatuses, setDocumentStatuses] = useState<DocumentStatus>(
    documentItems.reduce((acc, doc) => ({ ...acc, [doc.id]: "pending" }), {})
  );

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, docId: string, docName: string) => {
    const file = event.target.files?.[0];
    if (!file) {
      toast.error("No file selected.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPEG, PNG, GIF).");
      return;
    }

    setDocumentStatuses(prev => ({ ...prev, [docId]: "pending" }));
    const loadingToastId = toast.loading(`Preparing "${docName}"...`);

    try {
      await convertImageToPdfAndDownload(file, docName);
      setDocumentStatuses(prev => ({ ...prev, [docId]: "uploaded" }));
      toast.success(`"${docName}" PDF generated and downloaded!`, { id: loadingToastId });
    } catch (error) {
      console.error("Error converting image to PDF:", error);
      setDocumentStatuses(prev => ({ ...prev, [docId]: "error" }));
      toast.error(`Failed to prepare "${docName}". Please try again.`, { id: loadingToastId });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center gradient-text">Prepare Your Documents</h2>
      <p className="text-center text-muted-foreground mb-8">
        Upload images of your required documents to convert them into compressed PDFs for easy submission.
      </p>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-bold">
            <FileText className="h-6 w-6 mr-2 text-app-purple" /> Required Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p className="text-sm text-muted-foreground">
            Upload an image for each document. We'll convert it to a PDF and attempt to compress it.
            For best results, ensure your images are clear and well-lit.
          </p>
          <p className="text-xs text-red-600">
            <strong>Note:</strong> While we attempt compression, always verify the final PDF size and quality against official requirements.
          </p>
          {documentItems.map((doc) => (
            <div key={doc.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-md bg-app-light-blue/10 dark:bg-app-blue/5">
              <Label htmlFor={`file-upload-${doc.id}`} className="flex-1 text-base font-medium text-gray-800 dark:text-gray-200 mb-2 sm:mb-0">
                {doc.text}
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id={`file-upload-${doc.id}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, doc.id, doc.text)}
                  className="hidden" // Hide the default file input
                />
                <Button
                  onClick={() => document.getElementById(`file-upload-${doc.id}`)?.click()}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Upload className="h-4 w-4" /> Upload & Convert
                </Button>
                {documentStatuses[doc.id] === "uploaded" && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {documentStatuses[doc.id] === "error" && (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default PrepareDocuments;
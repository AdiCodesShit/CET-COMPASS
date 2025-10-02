"use client";

import { jsPDF } from "jspdf";

/**
 * Converts an image file to a PDF, attempting to compress it.
 * @param imageFile The image file to convert.
 * @param documentName The name for the generated PDF document.
 * @param maxWidth The maximum width for the image in the PDF (to help with compression).
 * @param maxHeight The maximum height for the image in the PDF (to help with compression).
 * @returns A Promise that resolves when the PDF is generated and downloaded.
 */
export const convertImageToPdfAndDownload = async (
  imageFile: File,
  documentName: string,
  maxWidth: number = 1500, // Max width for image in PDF, helps with compression
  maxHeight: number = 1500 // Max height for image in PDF, helps with compression
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions to fit within maxWidth/maxHeight while maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context."));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas to JPEG data URL with compression
        // Quality can be adjusted (0.1 to 1.0)
        const imgData = canvas.toDataURL("image/jpeg", 0.7); // 0.7 is a good balance for quality/size

        const pdf = new jsPDF({
          orientation: width > height ? "l" : "p", // Landscape if image is wider, portrait otherwise
          unit: "px",
          format: [width, height], // Set PDF page size to image size
        });

        pdf.addImage(imgData, "JPEG", 0, 0, width, height);
        pdf.save(`${documentName}.pdf`);
        resolve();
      };

      img.onerror = (error) => {
        reject(new Error("Error loading image: " + error));
      };
    };

    reader.onerror = (error) => {
      reject(new Error("Error reading file: " + error));
    };

    reader.readAsDataURL(imageFile);
  });
};
"use client";
import { useState } from "react";

export default function Home() {

  const [theFile, setTheFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;

    setTheFile(file);
  };

  const callGetTranscription = async () => {
    setIsLoading(true);

    if (!theFile) {
      // Handle the case when no file is selected
      setIsLoading(false);
      return;
    }
    //below this

    const formData = new FormData();
    formData.set("file", theFile);

    try {
      const response = await fetch("/api", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Handle the success response
        console.log("File uploaded successfully");
      } else {
        // Handle the error response
        console.error("Failed to upload file");
      }

      const data = await response.json();

      setResponse(data.output.text);
    } catch (error) {
      // Handle any errors
      console.error("An error occurred while uploading the file", error);
    }

    setTheFile(null);
    setIsLoading(false);
  };


  return (<div>Hello there</div>)
  
  }
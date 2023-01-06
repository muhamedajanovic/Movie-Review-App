import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";

export default function Dashboard() {
  return (
    <div className="fixed inset-0 dark:bg-white dark:bg-opacity-50 bg-primary bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="dark:bg-primary bg-white rounded w-[45rem] h-[40rem] overflow-auto">
        <div className="h-full flex items-center justify-center">
          <FileUploader>
            <div className="w-48 h-48 border border-dashed dark:border-dark-subtle border-light-subtle rounded-full flex flex-col items-center justify-center dark:text-dark-subtle text-secondary cursor-pointer">
              <AiOutlineCloudUpload size={80} />
              <p>Drop your file here!</p>
            </div>
          </FileUploader>
        </div>
      </div>
    </div>
  );
}

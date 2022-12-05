import React, { createContext } from "react";

const NotificationContext = createContext;

export default function NotificationProvider({ children }) {
  const updateNotification = () => {};

  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      <div className="fixed left-1/2 -translate-x-1/2 top-24">
        <div className="bg-red-400 shadow-md shadow-gray-700 rounded bounce-custom">
          <p className="text-white px-4 py-2 font-semibold">
            Something went wrong
          </p>
        </div>
      </div>
    </NotificationContext.Provider>
  );
}

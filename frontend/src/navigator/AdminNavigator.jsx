import React from "react";
import { Route, Routes } from "react-router-dom";
import Actors from "../components/admin/Actors";
import Dashboard from "../components/admin/Dashboard";
import Movies from "../components/admin/Movies";
import NotFound from "../components/NotFound";

export default function AdminNavigator() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/actors" element={<Actors />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

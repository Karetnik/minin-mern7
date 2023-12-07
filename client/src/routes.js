import React from "react";
import {Routes, Route, Navigate} from "react-router-dom"
import {CreatePage} from "./pages/CreatePage";
import {LinksPage} from "./pages/LinksPage";
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/create" exact element={<CreatePage />} />
        <Route path="/links" exact element={<LinksPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="*" element={<Navigate to="/create" />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/auth" exact element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  )
}

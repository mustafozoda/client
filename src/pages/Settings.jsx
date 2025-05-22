import React from "react";
import Header from "../layout/Header";

import { useTranslation } from "react-i18next";
import { useLanguageStore } from "../store/useLanguageStore";
import CustomModal from "../components/CustomModal";
const Settings = () => {
  const { t } = useTranslation("common");
  const { language, setLanguage } = useLanguageStore();
  return (
    <div className="relative z-10 flex flex-1 flex-col overflow-auto">
      <Header title={t("settings")} />
      <div className="flex flex-1 items-center justify-center">
        <button onClick={() => setLanguage("hu")}>Magyar</button>
        <button onClick={() => setLanguage("en")}>English</button>
      </div>
      <CustomModal />
    </div>
  );
};

export default Settings;

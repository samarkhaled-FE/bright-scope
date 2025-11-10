import { useState, useEffect } from "react";
import apiHelper from "../api/apiHelper";
import { notyf } from "../utils/toast";
import { useAuth } from "../context/AuthContext"; // ✅ أضف ده
import { useTranslation } from "react-i18next";

export const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loading: authLoading } = useAuth(); // ✅ نستخدم حالة الـAuth
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await apiHelper.get("services/services/", {
          publicRequest: true,
          params: { language: i18n.language },
        });

        setServices(response.data);
        console.log("services:", response.data);
      } catch (err) {
        console.error("Error fetching services:", err);
        if (err.response?.status === 401) {
          notyf.error("Please sign in to view services.");
        } else {
          notyf.error("Failed to load services. Please try again later.");
        }
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    // ✅ نمنع التنفيذ إلا بعد ما الـAuthContext يخلص تحميله
    if (!authLoading) {
      fetchServices();
    }
  }, [authLoading, i18n.language]);

  return { services, loading, error };
};

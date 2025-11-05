import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const GoogleSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // ✅ 存储 token
      localStorage.setItem("token", token);
      console.log("✅ Token stored:", token);

      // ✅ 清理 URL（防止刷新又触发 useEffect）
      window.history.replaceState({}, "", "/");

      // ✅ 登录成功后跳转
      setTimeout(() => {
        navigate("/");
      }, 300);
    } else {
      console.error("❌ No token found in URL");
      navigate("/loginrequired");
    }
  }, [navigate]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "18px",
      }}
    >
      Logging in with Google...
    </div>
  );
};

export default GoogleSuccess;

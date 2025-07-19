import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "../images/logo.png";
import logo1 from "../images/logo1.png";
import { useSidebar } from "../context/SidebarContext";
import { useChatHistory } from "../context/ChatHistoryContext";
import { IconUserCircle } from "@tabler/icons-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MoreVertical } from "lucide-react";
import { Search } from "lucide-react";

const Sidebar = ({ onMenuSelect }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isSidebarToggled, setIsSidebarToggled, isMedium } = useSidebar();
  const expanded = isMobile || isMedium ? mobileOpen : isSidebarToggled;
  const [user, setUser] = useState({ name: "", email: "" });
  const { chatHistory, setChatHistory } = useChatHistory();
  const [searchHistory, setSearchHistory] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const updateSearchHistory = () => {
      const stored = JSON.parse(localStorage.getItem("searchHistory")) || [];
      setSearchHistory(stored);
    };
    updateSearchHistory();
    window.addEventListener("refreshSearchHistory", updateSearchHistory);
    return () => window.removeEventListener("refreshSearchHistory", updateSearchHistory);
  }, []);

  useEffect(() => {
    const name = `${localStorage.getItem("firstName") || ""} ${localStorage.getItem("lastName") || ""}`;
    const email = localStorage.getItem("email") || "";
    setUser({ name, email });
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    onMenuSelect?.(mobileOpen);
  }, [mobileOpen, onMenuSelect]);

  useEffect(() => {
    if (isMedium || isMobile) {
      setMobileOpen(false);
    }
  }, [location.pathname, isMedium, isMobile]);

  const handleNavigate = (path) => {
    if (location.pathname === path) {
      navigate("/refresh-temp");
      setTimeout(() => navigate(path), 10);
    } else {
      navigate(path);
    }
    if (onMenuSelect) onMenuSelect(false);
    setMobileOpen(false);
  };

  const handleRename = (index) => {
    const updated = [...searchHistory];
    updated[index] = editValue;
    setSearchHistory(updated);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    const updated = [...searchHistory];
    updated.splice(index, 1);
    setSearchHistory(updated);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
  };

  const PromptCard = ({ item, index }) => {
    const [hover, setHover] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const isEditing = editingIndex === index;

    return (
      <div
        className="bg-gray-100 border border-gray-300 rounded-lg p-2 shadow-sm hover:shadow-md relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          setHover(false);
          setMenuOpen(false);
        }}
      >
        {isEditing ? (
          <input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={() => handleRename(index)}
            onKeyDown={(e) => e.key === "Enter" && handleRename(index)}
            className="w-full text-sm p-1 border rounded"
            autoFocus
          />
        ) : (
          <div
            onClick={() => handleNavigate(`/home?q=${encodeURIComponent(item)}`)}
            className="text-sm text-gray-800 cursor-pointer truncate w-full"
            title={item}
          >
            {item}
          </div>
        )}

        {hover && (
          <div className="absolute top-2 right-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
              className="text-gray-500 hover:text-black"
            >
              <MoreVertical size={16} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-1 bg-white border shadow rounded z-10 w-24">
                <button
                  onClick={() => {
                    setEditValue(item);
                    setEditingIndex(index);
                  }}
                  className="block w-full text-left text-sm px-2 py-1 hover:bg-gray-100"
                >
                  Rename
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="block w-full text-left text-sm px-2 py-1 hover:bg-gray-100 text-red-500"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const SidebarContent = () => (
    <div
      className={`h-full shadow-lg flex flex-col 
        ${expanded ? "w-64" : "w-20"} 
        bg-white/40 backdrop-blur-md border border-white/20
        transition-all duration-500 ease-in-out`}
    >
      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Top Logo + Toggle */}
        <div>
          <div className="mt-10 p-4 flex items-center justify-center border-b border-gray-200 relative">
            {expanded ? (
              <img src={logo} alt="Logo Expanded" className="h-14 w-30 cursor-pointer" />
            ) : (
              <img src={logo1} alt="Logo Collapsed" className="h-15 w-15 cursor-pointer" />
            )}

            {!isMobile && !isMedium && (
              <button
                onClick={() => setIsSidebarToggled((prev) => !prev)}
                className="hidden lg:flex fixed top-4 z-50 p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110 hover:ring-2 hover:ring-white hover:ring-offset-2"
                style={{
                  left: expanded ? "14rem" : "4rem",
                  backgroundColor: "#29ABE2",
                }}
              >
                {expanded ? (
                  <ChevronLeft className="h-4 w-4 text-white" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-white" />
                )}
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className={`flex flex-col gap-4 mt-4 ${expanded ? "items-start" : "items-center"} px-2`}>
            <SidebarItem
              icon={<HomeIcon />}
              label="Home"
              active={location.pathname === "/home"}
              onClick={() => handleNavigate("/home")}
              expanded={expanded}
            />
            <SidebarItem
              icon={<Search />}
              label="Chat History"
              active={location.pathname === "/chat-history"}
              onClick={() => handleNavigate("/chat-history")}
              expanded={expanded}
            />
          </nav>

          {/* History */}
          <div className={`mt-4 px-4 ${expanded ? "" : "hidden"}`}>
            {chatHistory.length > 0 && (
              <button
                onClick={() => {
                  localStorage.removeItem("chatHistory");
                  setChatHistory([]);
                }}
                className="mt-2 text-xs text-red-500 hover:underline"
              >
                Clear History
              </button>
            )}

            {chatHistory.length === 0 && searchHistory.length > 0 && (
              <div className="mt-4 space-y-2">
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Recent Searches</h3>
                {searchHistory.map((item, index) => (
                  <PromptCard key={index} item={item} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fixed Profile Section */}
      <div className={`px-2 py-2 border-t border-gray-200 flex ${expanded ? "justify-start" : "justify-center"}`}>
        <button
          onClick={() => handleNavigate("/profile")}
          className={`flex ${expanded ? "flex-row items-start gap-2" : "flex-col items-center gap-1"}
            text-gray-800 hover:bg-gray-100 rounded-lg w-full px-2 py-2 transition-colors duration-200`}
        >
          <IconUserCircle size={30} stroke={1.5} className="text-blue-600" />
          {expanded && (
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span>Welcome back</span>
                <span role="img" aria-label="wave">👏</span>
              </div>
              <div className="font-medium">{user.name || "Guest"}</div>
              <div className="text-gray-500 text-xs">{user.email || "guest@example.com"}</div>
            </div>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:flex fixed top-0 left-0 h-full z-30">
        <SidebarContent />
      </div>

      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-md flex items-center justify-between px-4 py-3 z-40">
        <img src={logo1} alt="Logo" className="h-8" />
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? (
            <XMarkIcon className="h-6 w-6 text-gray-700" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div
          className={`fixed top-0 left-0 h-full z-50 lg:hidden transition-transform duration-500 ${
            mobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
          } bg-white shadow-lg`}
        >
          <SidebarContent />
        </div>
      )}
    </>
  );
};

const SidebarItem = ({ icon, label, active, onClick, expanded }) => (
  <div className="relative group w-full">
    <button
      onClick={onClick}
      className={`
        flex ${expanded ? "flex-row justify-start items-center gap-3" : "flex-col items-center gap-2"}
        px-4 py-2 rounded-lg w-full text-gray-700 transition-all duration-300
        ${active ? "scale-105 text-blue-600 font-semibold shadow-md" : "hover:scale-105 hover:text-blue-500"}
        focus:outline-none focus:ring-2 focus:ring-blue-500
      `}
    >
      <span
        className={`
          absolute left-0 top-0 h-full w-1 rounded-l-lg bg-blue-500
          transition-all duration-300 ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
        `}
      />
      {React.cloneElement(icon, {
        className: `h-5 w-5 ${active ? "text-blue-600" : "group-hover:text-blue-500 text-gray-600"}`,
      })}
      {expanded && <span>{label}</span>}
    </button>

    {/* Tooltip for collapsed state */}
    {!expanded && (
      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap text-sm bg-gray-800 text-white px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
        {label}
      </div>
    )}
  </div>
);

export default Sidebar;
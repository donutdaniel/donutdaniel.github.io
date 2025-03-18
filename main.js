document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");

  // Check for saved theme preference or default to dark
  const savedTheme = localStorage.getItem("theme");

  // Set initial theme - default to dark if no preference saved
  if (savedTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
  }

  // Toggle theme function
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }

  // Add click event listener to the toggle button
  themeToggleBtn.addEventListener("click", toggleTheme);
});

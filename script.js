const storeLinks = {
  ios: "",
  android: "",
};

const yearNode = document.getElementById("year");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const storeLinkNodes = document.querySelectorAll(".store-link");

storeLinkNodes.forEach((node) => {
  const platform = node.getAttribute("data-platform");
  const href = platform ? storeLinks[platform] : "";

  if (!href) {
    node.classList.add("is-disabled");
    node.setAttribute("aria-disabled", "true");
    node.setAttribute("tabindex", "-1");
    return;
  }

  node.href = href;
  node.classList.remove("is-disabled");
  node.removeAttribute("aria-disabled");
  node.removeAttribute("tabindex");
});

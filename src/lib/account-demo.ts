// Static presentation fixtures, never a session or an authenticated user.
export const demoProfile = {
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  initials: "AM",
  memberSince: "2024",
};
export const demoOrders = [
  {
    number: "NS-10428",
    date: "September 24, 2026",
    status: "Delivered",
    items: [
      { slug: "field-overshirt", size: "M" },
      { slug: "heavyweight-cotton-tee", size: "M" },
    ],
    total: 136,
  },
  {
    number: "NS-10216",
    date: "August 12, 2026",
    status: "Delivered",
    items: [
      { slug: "everyday-straight-jean", size: "30" },
      { slug: "weekender-canvas-tote", size: "One size" },
    ],
    total: 126,
  },
  {
    number: "NS-10087",
    date: "June 3, 2026",
    status: "Delivered",
    items: [{ slug: "off-duty-crew", size: "M" }],
    total: 76,
  },
];

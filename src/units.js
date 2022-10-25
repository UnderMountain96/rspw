const units = [
  { name: "rock", targets: ["scissors", "lizard"], icon: "🗿" },
  { name: "scissors", targets: ["paper", "lizard"], icon: "✂️" },
  { name: "paper", targets: ["rock", "spock"], icon: "📜" },
  { name: "lizard", targets: ["spock", "paper"], icon: "🦎", extended: true },
  { name: "spock", targets: ["scissors", "rock"], icon: "🖖", extended: true },
];

export default units;

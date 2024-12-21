const numberColors = (number: number) => {
  if (!number) return "rgba(217, 154, 124, 0.5)"; // Default color for empty tiles
  if (number === 2) return "rgba(242, 198, 182, 1)"; // Light terracotta for 2
  if (number === 4) return "rgba(234, 184, 161, 1)"; // Light terracotta for 4
  if (number === 8) return "rgba(226, 170, 140, 1)"; // Light terracotta for 8
  if (number === 16) return "rgba(218, 150, 120, 1)"; // Light terracotta for 16
  if (number === 32) return "rgba(255, 200, 150, 1)"; // Lighter orangeish terracotta for 32
  if (number === 64) return "rgba(255, 180, 120, 1)"; // Lighter orangeish terracotta for 64
  if (number === 128) return "rgba(255, 160, 90, 1)"; // Lighter orangeish terracotta for 128
  if (number === 256) return "rgba(255, 140, 60, 1)"; // Lighter orangeish terracotta for 256
  if (number === 512) return "rgba(200, 70, 30, 1)"; // Reddish terracotta for 512
  if (number === 1024) return "rgba(180, 50, 20, 1)"; // Reddish terracotta for 1024
  if (number === 2048) return "rgba(255, 76, 76, 1)"; // Red for 2048
  return "rgba(233, 154, 124, 1)"; // Default color for any other number
};

export default numberColors;

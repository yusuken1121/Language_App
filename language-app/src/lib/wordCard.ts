export const getLearningStatusText = (status: number) => {
  switch (status) {
    case 1:
      return "未学習";
    case 2:
      return "1回目";
    case 3:
      return "2回目";
    case 4:
      return "3回目";
    case 99:
      return "習得済";
    default:
      return "未学習";
  }
};

export const formatDate = (date: Date | null) => {
  if (!date) return "Not available";
  return new Date(date).toLocaleDateString();
};

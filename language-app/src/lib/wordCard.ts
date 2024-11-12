export const getLearningStatusText = (status: number) => {
  switch (status) {
    case 1:
      return "未学習";
    case 2:
      return "学習中";
    case 3:
      return "学習済";
    default:
      return "未学習";
  }
};

export const formatDate = (date: Date | null) => {
  if (!date) return "Not available";
  return new Date(date).toLocaleDateString();
};

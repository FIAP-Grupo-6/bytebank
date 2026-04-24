import { BadgeProps } from "@/components/ui/badge";

export type Category =
  | "food"
  | "transport"
  | "salary"
  | "housing"
  | "leisure"
  | "health"
  | "education"
  | "other";

export const categoryMap: Record<Category, { label: string; badge: BadgeProps["type"] }> = {
  food: { label: "Alimentação", badge: "yellow" },
  transport: { label: "Transporte", badge: "blue" },
  salary: { label: "Salário", badge: "green" },
  housing: { label: "Moradia", badge: "purple" },
  leisure: { label: "Lazer", badge: "pink" },
  health: { label: "Saúde", badge: "red" },
  education: { label: "Educação", badge: "teal" },
  other: { label: "Outros", badge: "default" },
};
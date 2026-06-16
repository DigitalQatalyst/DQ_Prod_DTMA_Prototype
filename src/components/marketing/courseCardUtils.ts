export interface CourseCardData {
  id: string;
  title: string;
  image: string;
  category?: string;
  level?: string;
  rating: number;
  reviews: number;
  duration: string;
  price: number;
  originalPrice: number;
  badge?: string | null;
  comingSoon?: boolean;
  modules?: { length: number };
  totalLessons?: number;
  instructor?: string;
  description?: string;
}

export function formatCategoryLabel(category?: string) {
  if (!category) return "";
  return category.replace(/-/g, " ");
}

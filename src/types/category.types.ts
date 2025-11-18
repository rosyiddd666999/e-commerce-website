
export interface Category {
  id: number;
  name: string;
  image?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCategoryDTO {
  name: string;
  image?: File;
}

export interface UpdateCategoryDTO extends Partial<CreateCategoryDTO> {
  id: number;
}
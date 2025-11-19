from pydantic import BaseModel

class Category(BaseModel):
    category_id: int
    class_id: int
    division_id: int
    name: str

class CategoryCreate(BaseModel):
    class_id: int
    division_id: int
    name: str

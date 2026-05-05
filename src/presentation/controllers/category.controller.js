export default class CategoryController {
constructor(categoryService) {
this.categoryService = categoryService;
}
createCategory = async (req, res) => {
const data = req.body;
data.userId = req.user.id;
try {
const category = await this.categoryService.createCategory(data);
res.status(201).json({
type: "success",
title: "Categoria creada",
description: "La categoria fue creada correctamente.",
data: category
});
} catch (error) {
res.status(400).json({
type: "error",
title: "Error al crear categoria",
description: error.message
});
}
};
getCategoriesByUserId = async (req, res) => {
const userId = req.user.id;
try {
const categories = await this.categoryService.getCategoriesByUserId(userId);
res.status(200).json({
type: "success",
title: "Categorias obtenidas",
description: "Las categorias del usuario fueron obtenidas correctamente.",
data: categories
});
} catch (error) {
res.status(500).json({
type: "error",
title: "Error interno del servidor",
description: error.message
});
}
};
updateCategory = async (req, res) => {
const { id } = req.params;
const data = req.body;
try {
const category = await this.categoryService.updateCategory(id, data);
res.status(200).json({
type: "success",
title: "Categoria actualizada",
description: "La categoria fue actualizada correctamente.",
data: category
});
} catch (error) {
res.status(404).json({
type: "error",
title: "Categoria no encontrada",
description: error.message
});
}
};
deleteCategory = async (req, res) => {
const { id } = req.params;
try {
const result = await this.categoryService.deleteCategory(id);
res.status(200).json({
type: "success",
title: "Categoria eliminada",
description: "La categoria fue eliminada correctamente.",
data: result
});
} catch (error) {
res.status(404).json({
type: "error",
title: "Categoria no encontrada",
description: error.message
});
}
};
}
import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
name: {
type: String,
required: true
},
userId: {
type: String,
required: true
}
}, { timestamps: true });
const CategoryModel = mongoose.model("Category", categorySchema);
export default class CategoryMongoRepository {
async save(category) {
return await CategoryModel.create(category);
}
async findByUserId(userId) {
return await CategoryModel.find({ userId });
}
async update(id, data) {
return await CategoryModel.findByIdAndUpdate(id, data, {
new: true
});
}
async delete(id) {
return await CategoryModel.findByIdAndDelete(id);
}
}
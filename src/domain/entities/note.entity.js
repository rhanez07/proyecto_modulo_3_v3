
export default class NoteEntity {
    constructor ({ id, title, content, imageUrl, isPrivate, password, userId, categoryId, createdAt,updatedAt }) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl || null;
        this.isPrivate = isPrivate || false;
        this.password = password || null;
        this.userId = userId;
        this.categoryId = categoryId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;

    }

}

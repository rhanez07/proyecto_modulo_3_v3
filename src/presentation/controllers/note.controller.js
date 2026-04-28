export default class NoteController {
    constructor(noteService) {
        this.noteService = noteService;
    }

    createNote = async (req, res) => {
        const data = req.body;
        if (req.file) data.imageUrl = '/uploads/' + req.file.filename;
        data.userId = req.user.id;

        try {
            const note = await this.noteService.createNote(data);

            res.status(201).json({
                type: "success",
                title: "Nota creada",
                description: "La nota fue creada correctamente.",
                data: note
            });
        } catch (error) {
            res.status(400).json({
                type: "error",
                title: "Solicitud incorrecta",
                description: error.message
            });
        }
    }

    getNotesByUserId = async (req, res) => {
        const userId = req.user.id;

        try {
            const notes = await this.noteService.getNotesByUserId(userId);

            res.status(200).json({
                type: "success",
                title: "Notas obtenidas",
                description: "Las notas del usuario fueron obtenidas correctamente.",
                data: notes
            });
        } catch (error) {
            res.status(500).json({
                type: "error",
                title: "Error interno del servidor",
                description: error.message
            });
        }
    }

    updateNote = async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        if (req.file) data.imageUrl = '/uploads/' + req.file.filename;

        try {
            const note = await this.noteService.updateNote(id, data);

            res.status(200).json({
                type: "success",
                title: "Nota actualizada",
                description: "La nota fue actualizada correctamente.",
                data: note
            });
        } catch (error) {
            res.status(404).json({
                type: "error",
                title: "Nota no encontrada",
                description: error.message
            });
        }
    }

    deleteNote = async (req, res) => {
        const { id } = req.params;

        try {
            const result = await this.noteService.deleteNote(id);

            res.status(200).json({
                type: "success",
                title: "Nota eliminada",
                description: "La nota fue eliminada correctamente.",
                data: result
            });
        } catch (error) {
            res.status(404).json({
                type: "error",
                title: "Nota no encontrada",
                description: error.message
            });
        }
    }

    shareNote = async (req, res) => {
        const { id } = req.params;
        const { email } = req.body;
        const currentUserId = req.user.id;

        if (!email) {
            return res.status(400).json({
                type: "error",
                title: "Email requerido",
                description: "Debe enviar el correo electrónico del usuario destino."
            });
        }

        try {
            const result = await this.noteService.shareNoteByEmail(id, email, currentUserId);

            res.status(200).json({
                type: "success",
                title: "Nota compartida",
                description: "La nota fue compartida correctamente.",
                data: result
            });
        } catch (error) {
            res.status(400).json({
                type: "error",
                title: "Error al compartir la nota",
                description: error.message
            });
        }
    }
}
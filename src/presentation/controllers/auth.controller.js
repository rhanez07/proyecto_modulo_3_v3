export default class AuthController {
    constructor({ authService }) {
        this.authService = authService;
    }

  register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            type: "error",
            title: "Datos requeridos",
            description: "Email and password are required"
        });
    }

    try {
        const result = await this.authService.register(req.body);

        res.status(201).json({
            type: "success",
            title: "Usuario registrado",
            description: "El usuario fue registrado correctamente.",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            type: "error",
            title: "Error al registrar usuario",
            description: error.message
        });
    }
}

  login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            type: "error",
            title: "Datos requeridos",
            description: "Email and password are required"
        });
    }

    try {
        const result = await this.authService.login(req.body);

        res.status(200).json({
            type: "success",
            title: "Inicio de sesión correcto",
            description: "El usuario inició sesión correctamente.",
            data: result
        });
    } catch (error) {
        res.status(401).json({
            type: "error",
            title: "Credenciales inválidas",
            description: error.message
        });
    }
}
}
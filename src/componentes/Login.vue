<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span v-if="isRegister">Registro de Usuario</span>
        <span v-else>Inicio de Sesión</span>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="isRegister ? register() : login()">
          <v-text-field
            v-if="isRegister"
            v-model="nombre"
            label="Nombre"
            required
            :error-messages="nombreErrors"
          ></v-text-field>
          <v-text-field
            v-model="email"
            label="Email"
            required
            type="email"
            :error-messages="emailErrors"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            required
            type="password"
            :error-messages="passwordErrors"
          ></v-text-field>
          <v-btn type="submit" color="primary">{{ isRegister ? 'Registrarse' : 'Iniciar Sesión' }}</v-btn>
        </v-form>
        <v-alert v-if="error" type="error">{{ error }}</v-alert>
        <v-alert v-if="success" type="success">{{ successMessage }}</v-alert>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="toggleMode">{{ isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { getUsuarios, createUsuario } from "./servicios/usuarios";

export default {
  data() {
    return {
      isRegister: true,
      nombre: "",
      email: "",
      password: "",
      error: null,
      success: false,
      successMessage: "",
      usuarios: [],
      nombreErrors: [],
      emailErrors: [],
      passwordErrors: []
    };
  },
  async mounted() {
    this.usuarios = await getUsuarios();
  },
  methods: {
    toggleMode() {
      this.isRegister = !this.isRegister;
      this.error = null;
      this.success = false;
      this.successMessage = "";
      this.nombre = "";
      this.email = "";
      this.password = "";
    },
    validarEmail() {
      var re = /\S+@\S+\.\S+/;
      return re.test(this.email);
    },
    validateForm() {
      this.nombreErrors = [];
      this.emailErrors = [];
      this.passwordErrors = [];
      
      if (!this.nombre) {
        this.nombreErrors.push("Nombre es requerido.");
      }
      if (!this.email) {
        this.emailErrors.push("Email es requerido.");
      } else if (!this.validarEmail()) {
        this.emailErrors.push("Email no es válido.");
      }
      if (!this.password) {
        this.passwordErrors.push("Password es requerido.");
      }
      
      return !this.nombreErrors.length && !this.emailErrors.length && !this.passwordErrors.length;
    },
    async register() {
      this.error = null;
      this.success = false;

      if (!this.validateForm()) {
        return;
      }

      const existingUser = this.usuarios.find(user => user.email === this.email);
      if (existingUser) {
        this.error = "Email ya registrado";
        return;
      }

      const newUser = {
        nombre: this.nombre,
        email: this.email,
        password: this.password
      };

      try {
        const data = await createUsuario(newUser);
        this.usuarios.push(data);
        this.success = true;
        this.successMessage = "Usuario registrado con éxito";
        this.toggleMode();
      } catch (error) {
        this.error = "Error al registrar usuario";
        console.error("Error al registrar usuario:", error);
      }
    },
    async login() {
      this.error = null;
      this.success = false;

      const user = this.usuarios.find(user => user.email === this.email && user.password === this.password);
      if (!user) {
        this.error = "Email o contraseña incorrectos";
        this.email = "";
        this.password = "";
        return;
      }

      this.success = true;
      this.successMessage = "Inicio de sesión exitoso";
      this.$router.push('/navbar'); // Redirigir a Navbar.vue
    }
  }
};
</script>

<style scoped>
.v-container {
  max-width: 500px;
  margin: 0 auto;
  padding-top: 50px;
}
</style>

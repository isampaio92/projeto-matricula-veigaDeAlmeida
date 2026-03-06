<template>
  <div class="form-card">
    <h2>Matrícula Online</h2>
    <form @submit.prevent="enviarFormulario">
      
      <div class="input-group">
        <label for="nome">Nome Completo</label>
        <input 
            type="text" 
            id="nome" 
            v-model="dadosFormulario.nome" 
            @blur="validarNome"
            :class="{ 'input-erro' : erros.nome }"
            placeholder="Digite seu nome completo"
        />
        <span v-if="erros.nome" class="mensagem-erro">{{ erros.nome }}</span>
      </div>

      <div class="input-group">
        <label for="email">E-mail</label>
        <input
            type="email" 
            id="email" 
            v-model="dadosFormulario.email"
            @blur="validarEmail"
            :class="{ 'input-erro' : erros.email }"
            placeholder="Digite seu e-mail"
        />
        <span v-if="erros.email" class="mensagem-erro">{{ erros.email }}</span>
      </div>

      <div class="input-group">
        <label for="curso">Selecione o Curso</label>
        <select
            id="curso"
            v-model="dadosFormulario.curso"
            @change="validarCurso"
            :class="{ 'input-erro' : erros.curso }"
        >
          <option value="" disabled>Escolha uma opção...</option>
          <option v-for="curso in listaCursos" :key="curso.id" :value="curso.id">
            {{ curso.nome }}
          </option>
        </select>
        <span v-if="erros.curso" class="mensagem-erro">{{ erros.curso }}</span>
      </div>

      <button
        type="submit"
        class="btn-submit"
        :disabled="estaProcessando || formularioInvalido"
        :class="{ 'btn-processando' : estaProcessando }">
            {{ estaProcessando ? 'Processando matrícula...' : 'Realizar Matrícula' }}
      </button>
      <div v-if="mensagemSucesso" class="mensagem-sucesso">
        {{ mensagemSucesso }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';

const dadosFormulario = ref({
  nome: '',
  email: '',
  curso: ''
});

const erros = ref({
    nome : '',
    email : '',
    curso : ''
});

const estaProcessando = ref(false);
const mensagemSucesso = ref('')

onMounted(async () => {
  try {
    const resposta = await fetch('http://localhost:3000/cursos');
    const cursos = await resposta.json();

    listaCursos.value = cursos;
  } catch (erro) {
    console.error('Erro ao buscar cursos do backend:', erro);
  }
});

const validarNome = () => {
    if (dadosFormulario.value.nome.trim().length < 3) {
        erros.value.nome = 'O nome deve ter pelo menos 3 caracteres.';
    } else {
        erros.value.nome = '';
    }
};

const validarEmail = () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(dadosFormulario.value.email)) {
        erros.value.email = 'Por favor, insira um e-mail válido';
    } else {
        erros.value.email = '';
    }
};

const validarCurso = () => {
    if (!dadosFormulario.value.curso) {
        erros.value.curso = 'Deve selecionar um curso para continuar.';
    } else {
        erros.value.curso = '';
    }
};

const formularioInvalido = computed(() => {
  return erros.value.nome !== '' || 
         erros.value.email !== '' || 
         erros.value.curso !== '' ||
         dadosFormulario.value.nome === '' ||
         dadosFormulario.value.email === '' ||
         dadosFormulario.value.curso === '';
});

const enviarFormulario = async () => {
  validarNome();
  validarEmail();
  validarCurso();

  if (formularioInvalido.value) return;

  estaProcessando.value = true
  mensagemSucesso.value = '';

  try {
    const resposta = await fetch('http://localhost:3000/matricula', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: dadosFormulario.value.nome,
        email: dadosFormulario.value.email,
        curso: Number(dadosFormulario.value.curso)
      })
    });

    if (resposta.status === 201) {
      const dadosRetorno = await resposta.json();
      mensagemSucesso.value = dadosRetorno.mensagem;

      dadosFormulario.value = { nome: '', email: '', curso: '' }; 
    } else {
      const dadosErro = await resposta.json();
      alert('Erro do servidor: ' + dadosErro.erro);
    }

  } catch (erro) {
    console.error('Erro ao enviar para a API:', erro);
    alert('Erro de conexão. Verifique se o backend está rodando.');
  } finally {
    estaProcessando.value = false;
  }
}
</script>

<style scoped>
.form-card {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.input-group {
  margin-bottom: 20px; /* Aumentei a margem para caber a mensagem de erro */
  display: flex;
  flex-direction: column;
}
label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}
input, select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
}
input:focus, select:focus {
  outline: none;
  border-color: #4CAF50;
}

/* Estilos de Validação e Erro */
.input-erro {
  border-color: #dc3545 !important;
  background-color: #f8d7da;
}
.mensagem-erro {
  color: #dc3545;
  font-size: 12px;
  margin-top: 5px;
}

/* Estilos do Botão e Feedback */
.btn-submit {
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, opacity 0.3s;
}
.btn-submit:hover:not(:disabled) {
  background-color: #45a049;
}
.btn-submit:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}
.btn-processando {
  animation: pulsar 1.5s infinite;
}

.mensagem-sucesso {
  margin-top: 15px;
  padding: 10px;
  background-color: #d4edda;
  color: #155724;
  border-radius: 4px;
  text-align: center;
  font-weight: bold;
}

/* Animação simples para o botão a carregar */
@keyframes pulsar {
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
}
</style>

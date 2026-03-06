import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

interface DadosMatricula {
  nome: string;
  email: string;
  curso: number;
}

const cursosDisponiveis = [
  { id: 1, nome: 'Introdução ao JavaScript' },
  { id: 2, nome: 'Arquitetura de Software' },
  { id: 3, nome: 'Design de Interfaces (UI/UX)' }
];

const matriculasRealizadas: DadosMatricula[] = [];

app.get('/cursos', (req: Request, res: Response) => {
    res.status(200).json(cursosDisponiveis);
});

app.post('/matricula', (req: Request, res: Response) => {
    const { nome, email, curso } = req.body as DadosMatricula;

    if (!nome || !email || !curso) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    const novaMatricula: DadosMatricula = { nome, email, curso };
    matriculasRealizadas.push(novaMatricula);

    console.log('Nova matrícula recebida:', novaMatricula);

    return res.status(201).json({ mensagem: 'Matrícula realizada com sucesso!' })
});

const PORTA = 3000;
app.listen(PORTA, () => console.log(`Servidor rodando na porta ${PORTA}`));
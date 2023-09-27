import axios from 'axios';
import { Client } from 'pg';

import { dbConfig } from '../db/config';

const middlewareURL = 'https://localhost.com/middleware';
const laboratoriosURL = 'https://sistemas-br.mxns.com/teste/edd/EDDAPI';

async function realizarIntegracao() {
  try {
    const client = new Client(dbConfig);
    await client.connect();

    const respostaLaboratorios = await axios.get(laboratoriosURL);

    await client.query('INSERT INTO tabela_laboratorio (dados) VALUES ($1)', [
      JSON.stringify(respostaLaboratorios.data),
    ]);

    await axios.post(middlewareURL, { dados: respostaLaboratorios.data });

    console.log('Integração realizada com sucesso.');

    await client.end();
  } catch (error) {
    console.error('Erro ao realizar a integração:', error);
  }
}

export { realizarIntegracao };

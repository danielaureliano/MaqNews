# MaqNews

## Descrição
Projeto para exibição de notícias e frases motivacionais da Maqplan.

## Estrutura do Projeto
```
MaqNews/
├── env/          # Arquivos de configuração e variáveis de ambiente
│   ├── .env
├── src/          # Código-fonte
│   ├── js/       # Arquivos JavaScript
│   │   ├── api.js
│   │   ├── app.js
│   │   ├── carousel.js
│   │   ├── client.js
│   │   ├── logger.js
│   ├── css/      # Arquivos CSS
│   │   ├── styles.css
│   ├── html/     # Arquivos HTML
│   │   ├── index.html
├── tests/        # Testes automatizados
│   ├── api.test.js
│   ├── carousel.test.js
│   ├── app.test.js
├── logs/         # Logs gerados pela aplicação
│   ├── error.log
│   ├── combined.log
└── README.md     # Documentação do projeto
```

---

## Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/danielaureliano/maqnews.git
   cd maqnews
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie o arquivo `.env` no diretório `env/` com o seguinte conteúdo:
   ```env
   API_URL=<sua-api-url>
   API_PRIVATE_KEY=<seu-token>
   ```

---

## Como Executar o Projeto
1. Para iniciar o projeto, utilize o comando:
   ```bash
   npm start
   ```

2. O projeto estará disponível localmente. Abra o arquivo `index.html` em um navegador ou configure um servidor local para servir a aplicação.

---

## Executando os Testes
### **Pré-requisitos**
Certifique-se de que o Jest esteja instalado. Se ainda não estiver, instale com o comando:
```bash
npm install jest --save-dev
```

### **Rodando os Testes**
Para executar os testes automatizados:
1. Execute o comando:
   ```bash
   npm test
   ```

2. O Jest irá rodar todos os testes localizados no diretório `tests/` e exibir o resultado no terminal.

### **Sobre os Testes**
- **`api.test.js`**: Verifica as interações com a API.
- **`carousel.test.js`**: Testa o comportamento do carrossel, como ativação de itens e indicadores.
- **`app.test.js`**: Valida a inicialização do aplicativo, incluindo o carregamento de dados e a atualização da data/hora.

### **Cobertura dos Testes**
Para visualizar a cobertura de testes, use o comando:
```bash
npm test -- --coverage
```
Este comando gerará um relatório mostrando quais partes do código estão sendo testadas e quais não estão.

---

## Logs
Os logs de erro e operações gerais são armazenados no diretório `logs/`. Certifique-se de verificar os arquivos:
- `error.log` para erros específicos.
- `combined.log` para um resumo das operações realizadas.

---

## Contribuindo
Contribuições são bem-vindas! Siga os passos:
1. Crie um fork do repositório.
2. Faça suas alterações em uma nova branch.
3. Envie um Pull Request com uma descrição clara do que foi alterado.

---

## Contato
Caso tenha dúvidas ou sugestões, entre em contato com o desenvolvedor:
- **Daniel Aureliano** - [E-mail](mailto:daniel.aureliano@gmail.com)

---

## Licença
Este projeto é propriedade da Maqplan e todos os direitos estão reservados.

---

## Código do Servidor
```javascript
// filepath: src/js/app.js
const express = require('express');
const path = require('path');
const app = express();

// Servir arquivos estáticos das pastas 'src/css' e 'src/js'
app.use('/css', express.static(path.join(__dirname, '..', 'css')));
app.use('/js', express.static(path.join(__dirname, '..', 'js')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'html', 'index.html'));
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
```

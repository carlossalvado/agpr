# Aplicação do Profissional - Sistema de Agendamentos

Uma aplicação React completa para profissionais visualizarem e gerenciarem seus agendamentos e comissões.

## 🚀 Funcionalidades

- **Login Seguro**: Autenticação usando função PostgreSQL `authenticate_professional`
- **Dashboard de Agendamentos**: Visualização completa dos agendamentos com filtros
- **Edição de Agendamentos**: Modal para editar cliente, data, status e observações
- **Sistema de Comissões**: Relatório detalhado baseado nos atendimentos realizados
- **Isolamento de Dados**: Cada profissional vê apenas seus próprios dados (RLS)

## 🛠️ Tecnologias Utilizadas

- **React 18** com TypeScript
- **Supabase** (PostgreSQL + Auth)
- **Tailwind CSS** para estilização
- **React Router** para navegação
- **Row Level Security** para isolamento de dados

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 16+
- npm ou yarn
- Projeto Supabase configurado

### Instalação

```bash
# Clonar o repositório
cd professional-app

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm start

# Executar testes
npm test

# Build para produção
npm run build
```

## 🔧 Configuração

### Supabase
A aplicação está configurada para usar o projeto Supabase com ID `nlosdmsqebaczvuklnih`.

### Estrutura do Banco de Dados

#### Tabelas Principais:
- `professionals` - Dados dos profissionais
- `appointments` - Agendamentos
- `appointment_services` - Serviços nos agendamentos
- `professional_commissions` - Comissões calculadas

#### Funções PostgreSQL:
- `authenticate_professional` - Autenticação
- `create_professional_commission` - Cálculo automático de comissões

## 🔐 Autenticação

A aplicação usa autenticação baseada em profissionais cadastrados no banco de dados:

```sql
-- Exemplo de criação de profissional
SELECT create_professional_with_auth(
  'user-uuid'::uuid,
  'Nome do Profissional',
  'Especialidade',
  'email@exemplo.com',
  'senha123'
);
```

## 📱 Interface

### Login
- Formulário de login com email e senha
- Validação de credenciais usando função PostgreSQL

### Dashboard
- **Agendamentos**: Lista com filtros por status
- **Comissões**: Relatório com métricas e cálculos

### Funcionalidades
- Visualização de agendamentos por status (Pendente, Confirmado, Concluído, Cancelado)
- Edição completa de agendamentos
- Cálculo automático de comissões baseado em atendimentos concluídos

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes com cobertura
npm test -- --coverage

# Executar testes em modo watch
npm test
```

## 🚀 Deploy

### Build para Produção

```bash
npm run build
```

O build gera arquivos otimizados na pasta `build/` que podem ser servidos por qualquer servidor estático.

### Exemplo com serve:

```bash
npm install -g serve
serve -s build
```

## 🔒 Segurança

- **Row Level Security (RLS)** habilitado em todas as tabelas
- Políticas específicas garantem que profissionais vejam apenas seus dados
- Autenticação obrigatória para todas as operações
- Dados sensíveis criptografados no banco

## 📊 Sistema de Comissões

As comissões são calculadas automaticamente quando agendamentos são marcados como "completed":

- Baseado na tabela `professional_commissions`
- Percentual configurável por serviço/profissional
- Relatório em tempo real no dashboard

## 🐛 Troubleshooting

### Erro de Autenticação
- Verificar se o profissional está cadastrado
- Confirmar email e senha
- Verificar se o profissional está ativo

### Problemas de Conexão
- Verificar configuração do Supabase
- Confirmar chaves de API
- Verificar conectividade de rede

## 📝 Scripts Disponíveis

- `npm start` - Inicia servidor de desenvolvimento
- `npm test` - Executa testes
- `npm run build` - Gera build de produção
- `npm run eject` - Remove ferramentas de build (irreversível)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

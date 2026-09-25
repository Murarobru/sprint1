/* =========================================================
   DADOS PADRÃO
   Usados apenas para popular o localStorage na
   primeira execução (banco de dados simulado).
========================================================= */

const SERVICOS_PADRAO = [
  {
    id: 1,
    nome: "Reparo de vazamento",
    categoria: "Manutenção hidráulica",
    duracao: "1 h",
    valor: 150,
    descricao:
      "Identificação e reparo de vazamentos em instalações hidráulicas."
  },
  {
    id: 2,
    nome: "Desentupimento",
    categoria: "Manutenção",
    duracao: "1 h",
    valor: 180,
    descricao:
      "Desentupimento de pias, ralos, vasos sanitários e tubulações."
  },
  {
    id: 3,
    nome: "Instalação hidráulica",
    categoria: "Instalação",
    duracao: "3 h",
    valor: 450,
    descricao:
      "Instalação e adequação de pontos hidráulicos residenciais e comerciais."
  },
  {
    id: 4,
    nome: "Manutenção preventiva",
    categoria: "Manutenção",
    duracao: "2 h",
    valor: 300,
    descricao:
      "Inspeção preventiva das instalações e identificação de possíveis problemas."
  },
  {
    id: 5,
    nome: "Instalação de torneira e acessórios",
    categoria: "Instalação",
    duracao: "1 h",
    valor: 120,
    descricao:
      "Instalação de torneiras, registros, válvulas e acessórios hidráulicos."
  },
  {
    id: 6,
    nome: "Adequação de rede hidráulica",
    categoria: "Instalação",
    duracao: "4 h",
    valor: 600,
    descricao:
      "Alteração e adequação de redes hidráulicas conforme a necessidade do imóvel."
  }
];

const FUNCIONARIOS_PADRAO = [
  {
    id: 1,
    nome: "Carlos Eduardo Ávila",
    cargo: "Gerente",
    especialidades: ["Manutenção hidráulica", "Manutenção", "Instalação"],
    telefone: "(48) 99999-0001",
    email: "carlos@avilahidraulicas.com.br",
    status: "Ativo"
  },
  {
    id: 2,
    nome: "Marcos Vinícius Souza",
    cargo: "Supervisor",
    especialidades: ["Instalação"],
    telefone: "(48) 99999-0002",
    email: "marcos@avilahidraulicas.com.br",
    status: "Ativo"
  },
  {
    id: 3,
    nome: "Rafael Lima",
    cargo: "Técnico",
    especialidades: ["Manutenção hidráulica", "Manutenção"],
    telefone: "(48) 99999-0003",
    email: "rafael@avilahidraulicas.com.br",
    status: "Ativo"
  },
  {
    id: 4,
    nome: "Juliana Alves",
    cargo: "Técnico",
    especialidades: ["Instalação"],
    telefone: "(48) 99999-0004",
    email: "juliana@avilahidraulicas.com.br",
    status: "Ativo"
  }
];

const CARGOS = ["Gerente", "Supervisor", "Técnico"];

const horarios = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00"
];

/* =========================================================
   CAMADA DE DADOS (localStorage)
   Simula um banco de dados para:
   - Serviços      (RF19 - cadastro de serviço)
   - Funcionários  (RF15/RF16/RF19)
   - Clientes      (RF19 - cadastro de cliente)
========================================================= */

function inicializarBancoDados() {
  if (!localStorage.getItem("servicosDB")) {
    salvarServicos(SERVICOS_PADRAO);
  }

  if (!localStorage.getItem("funcionariosDB")) {
    salvarFuncionarios(FUNCIONARIOS_PADRAO);
  }

  if (!localStorage.getItem("clientesDB")) {
    salvarClientes([]);
  }
}

function getServicos() {
  return JSON.parse(localStorage.getItem("servicosDB") || "null") || SERVICOS_PADRAO;
}

function salvarServicos(lista) {
  localStorage.setItem("servicosDB", JSON.stringify(lista));
}

function getFuncionarios() {
  return JSON.parse(localStorage.getItem("funcionariosDB") || "null") || FUNCIONARIOS_PADRAO;
}

function salvarFuncionarios(lista) {
  localStorage.setItem("funcionariosDB", JSON.stringify(lista));
}

function getClientes() {
  return JSON.parse(localStorage.getItem("clientesDB") || "[]");
}

function salvarClientes(lista) {
  localStorage.setItem("clientesDB", JSON.stringify(lista));
}

function proximoId(lista) {
  return lista.length ? Math.max(...lista.map(item => Number(item.id))) + 1 : 1;
}

/* =========================================================
   FUNÇÕES AUXILIARES
========================================================= */

function moeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function buscarServico(id) {
  return getServicos().find(servico => servico.id === Number(id));
}

function buscarFuncionario(id) {
  return getFuncionarios().find(funcionario => funcionario.id === Number(id));
}

function formatarData(data) {
  if (!data) {
    return "-";
  }

  const partes = data.split("-");

  if (partes.length !== 3) {
    return data;
  }

  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

/* =========================================================
   VALIDAÇÃO DE E-MAIL
========================================================= */

function validarEmail(email) {
  if (!email) {
    return false;
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
}

/* =========================================================
   VALIDAÇÃO DE TELEFONE
========================================================= */

function validarTelefone(telefone) {
  if (!telefone) {
    return false;
  }

  const numero = telefone.replace(/\D/g, "");

  if (numero.length !== 10 && numero.length !== 11) {
    return false;
  }

  if (/^(\d)\1+$/.test(numero)) {
    return false;
  }

  const ddd = Number(numero.substring(0, 2));

  if (ddd < 11 || ddd > 99) {
    return false;
  }

  if (numero.length === 11 && numero.charAt(2) !== "9") {
    return false;
  }

  return true;
}

/* =========================================================
   FORMATAÇÃO DE TELEFONE
========================================================= */

function formatarTelefone(telefone) {
  const numero = telefone.replace(/\D/g, "");

  if (numero.length === 11) {
    return `(${numero.substring(0, 2)}) ${numero.substring(2, 7)}-${numero.substring(7)}`;
  }

  if (numero.length === 10) {
    return `(${numero.substring(0, 2)}) ${numero.substring(2, 6)}-${numero.substring(6)}`;
  }

  return telefone;
}

/* =========================================================
   VALIDAÇÃO DE ENDEREÇO
========================================================= */

function validarEndereco(endereco) {
  if (!endereco) {
    return false;
  }

  const enderecoLimpo = endereco.trim();

  if (enderecoLimpo.length < 10) {
    return false;
  }

  if (!/[a-zA-ZÀ-ÿ]/.test(enderecoLimpo)) {
    return false;
  }

  return true;
}

/* =========================================================
   VALIDAÇÃO DE CEP (OPCIONAL)
========================================================= */

function validarCEP(cep) {
  if (!cep) {
    return false;
  }

  const numero = cep.replace(/\D/g, "");

  return numero.length === 8;
}

/* =========================================================
   LISTAGEM DE SERVIÇOS
   RF02
========================================================= */

function renderServicos() {
  const lista = document.querySelector("#lista-servicos");

  if (!lista) {
    return;
  }

  lista.innerHTML = getServicos()
    .map(
      servico => `
        <div class="card">
          <span class="badge">${servico.categoria}</span>
          <h3>${servico.nome}</h3>
          <p>${servico.descricao}</p>
          <p><strong>Duração estimada:</strong> ${servico.duracao}</p>
          <div class="price">${moeda(servico.valor)}</div>
          <button class="btn" onclick="escolherServico(${servico.id})">Agendar serviço</button>
        </div>
      `
    )
    .join("");
}

/* =========================================================
   ESCOLHA DO SERVIÇO
   RF01 / RF02
========================================================= */

function escolherServico(id) {
  localStorage.setItem("servicoSelecionado", String(id));
  window.location.href = "agendamento.html";
}

/* =========================================================
   PÁGINA DE AGENDAMENTO
   RF03
========================================================= */

function carregarAgendamento() {
  const selectServico = document.querySelector("#servico");

  if (!selectServico) {
    return;
  }

  selectServico.innerHTML = `
    <option value="">Selecione um serviço</option>
    ${getServicos()
      .map(
        servico => `
          <option value="${servico.id}">${servico.nome} - ${moeda(servico.valor)}</option>
        `
      )
      .join("")}
  `;

  const servicoSelecionado = localStorage.getItem("servicoSelecionado");

  if (servicoSelecionado) {
    selectServico.value = servicoSelecionado;
  }

  configurarDataMinima();
  renderHorarios();
  atualizarResumoAgendamento();

  selectServico.addEventListener("change", atualizarResumoAgendamento);

  const data = document.querySelector("#data");

  if (data) {
    data.addEventListener("change", () => {
      renderHorarios();
      atualizarResumoAgendamento();
    });
  }

  const horario = document.querySelector("#horario");

  if (horario) {
    horario.addEventListener("change", atualizarResumoAgendamento);
  }
}

/* =========================================================
   CONFIGURAR DATA MÍNIMA
========================================================= */

function configurarDataMinima() {
  const campoData = document.querySelector("#data");

  if (!campoData) {
    return;
  }

  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");

  campoData.min = `${ano}-${mes}-${dia}`;
}

/* =========================================================
   HORÁRIOS
========================================================= */

function renderHorarios() {
  const selectHorario = document.querySelector("#horario");

  if (!selectHorario) {
    return;
  }

  const data = document.querySelector("#data")?.value || "";

  let horariosIndisponiveis = [];

  if (data) {
    const dia = Number(data.split("-")[2]);

    horariosIndisponiveis = dia % 2 === 0 ? ["09:00", "14:00"] : ["10:00", "15:00"];
  }

  selectHorario.innerHTML = `
    <option value="">Selecione um horário</option>
    ${horarios
      .map(horario => {
        const ocupado = horariosIndisponiveis.includes(horario);

        if (ocupado) {
          return `<option value="${horario}" disabled>${horario} - ocupado</option>`;
        }

        return `<option value="${horario}">${horario} - disponível</option>`;
      })
      .join("")}
  `;
}

/* =========================================================
   RESUMO DO AGENDAMENTO
========================================================= */

function atualizarResumoAgendamento() {
  const resumo = document.querySelector("#resumo-agendamento");

  if (!resumo) {
    return;
  }

  const servicoId = document.querySelector("#servico")?.value;
  const data = document.querySelector("#data")?.value || "";
  const horario = document.querySelector("#horario")?.value || "";
  const servico = buscarServico(servicoId);

  if (!servico) {
    resumo.innerHTML = `<strong>Selecione um serviço para visualizar o resumo do atendimento.</strong>`;
    return;
  }

  resumo.innerHTML = `
    <strong>${servico.nome}</strong><br>
    Categoria: ${servico.categoria}<br>
    Duração: ${servico.duracao}<br>
    Valor: ${moeda(servico.valor)}<br>
    Data: ${data ? formatarData(data) : "-"}<br>
    Horário: ${horario || "-"}
  `;
}

/* =========================================================
   SALVAR AGENDAMENTO
   RF03
========================================================= */

function salvarAgendamento(event) {
  event.preventDefault();

  const servicoId = Number(document.querySelector("#servico").value);
  const data = document.querySelector("#data").value;
  const horario = document.querySelector("#horario").value;

  if (!servicoId) {
    alert("Selecione um serviço.");
    return;
  }

  if (!data) {
    alert("Selecione uma data.");
    return;
  }

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const dataSelecionada = new Date(`${data}T00:00:00`);

  if (dataSelecionada < hoje) {
    alert("A data selecionada não pode ser anterior a hoje.");
    return;
  }

  if (!horario) {
    alert("Selecione um horário.");
    return;
  }

  const agendamento = { servicoId, data, horario };

  localStorage.setItem("agendamento", JSON.stringify(agendamento));

  window.location.href = "cliente.html";
}

/* =========================================================
   DADOS DO CLIENTE
   RF04 / RF19 (cadastro de cliente)
========================================================= */

function salvarCliente(event) {
  event.preventDefault();

  const cliente = {
    nome: document.querySelector("#nome")?.value.trim(),
    telefone: document.querySelector("#telefone")?.value.trim(),
    email: document.querySelector("#email")?.value.trim(),
    endereco: document.querySelector("#endereco")?.value.trim(),
    observacoes: document.querySelector("#observacoes")?.value.trim()
  };

  if (!cliente.nome) {
    alert("Informe o nome do cliente.");
    return;
  }

  if (cliente.nome.length < 3) {
    alert("Informe um nome válido.");
    return;
  }

  if (!cliente.telefone) {
    alert("Informe o telefone.");
    return;
  }

  if (!validarTelefone(cliente.telefone)) {
    alert("Informe um número de telefone válido com DDD.");
    return;
  }

  cliente.telefone = formatarTelefone(cliente.telefone);

  if (!cliente.email) {
    alert("Informe o e-mail.");
    return;
  }

  if (!validarEmail(cliente.email)) {
    alert("Informe um endereço de e-mail válido.");
    return;
  }

  if (!cliente.endereco) {
    alert("Informe o endereço.");
    return;
  }

  if (!validarEndereco(cliente.endereco)) {
    alert("Informe um endereço válido com pelo menos 10 caracteres.");
    return;
  }

  const agendamento = JSON.parse(localStorage.getItem("agendamento") || "null");

  if (!agendamento) {
    alert("O agendamento não foi encontrado.");
    window.location.href = "index.html";
    return;
  }

  /* =====================================================
     RF19 - Cadastro de cliente
     Insere ou atualiza o cliente na base (upsert por e-mail)
  ===================================================== */

  const clientesDB = getClientes();
  const existenteIdx = clientesDB.findIndex(c => c.email === cliente.email);

  if (existenteIdx !== -1) {
    cliente.id = clientesDB[existenteIdx].id;
    clientesDB[existenteIdx] = cliente;
  } else {
    cliente.id = proximoId(clientesDB);
    clientesDB.push(cliente);
  }

  salvarClientes(clientesDB);

  localStorage.setItem("cliente", JSON.stringify(cliente));

  window.location.href = "confirmacao.html";
}

/* =========================================================
   CONFIRMAÇÃO
   RF05
========================================================= */

function carregarConfirmacao() {
  const container = document.querySelector("#dados-confirmacao");

  if (!container) {
    return;
  }

  const agendamento = JSON.parse(localStorage.getItem("agendamento") || "null");
  const cliente = JSON.parse(localStorage.getItem("cliente") || "null");

  if (!agendamento || !cliente) {
    container.innerHTML = `<div class="warning">Os dados do agendamento estão incompletos.</div>`;
    return;
  }

  const servico = buscarServico(agendamento.servicoId);

  if (!servico) {
    container.innerHTML = `<div class="warning">Serviço não encontrado.</div>`;
    return;
  }

  container.innerHTML = `
    <h3>Dados do serviço</h3>
    <p><strong>Serviço:</strong> ${servico.nome}</p>
    <p><strong>Categoria:</strong> ${servico.categoria}</p>
    <p><strong>Duração estimada:</strong> ${servico.duracao}</p>
    <p><strong>Valor:</strong> ${moeda(servico.valor)}</p>
    <p><strong>Data:</strong> ${formatarData(agendamento.data)}</p>
    <p><strong>Horário:</strong> ${agendamento.horario}</p>
    <hr>
    <h3>Dados do cliente</h3>
    <p><strong>Nome:</strong> ${cliente.nome}</p>
    <p><strong>Telefone:</strong> ${cliente.telefone}</p>
    <p><strong>E-mail:</strong> ${cliente.email}</p>
    <p><strong>Endereço:</strong> ${cliente.endereco || "Não informado"}</p>
    <p><strong>Observações:</strong> ${cliente.observacoes || "Nenhuma"}</p>
  `;
}

/* =========================================================
   NOTIFICAÇÕES AUTOMÁTICAS
   RF07
========================================================= */

function gerarNotificacoes(ordem) {
  const cliente = ordem.cliente;

  function simularStatusEnvio() {
    return Math.random() < 0.1 ? "Falha" : "Enviada";
  }

  const dataAtendimento = new Date(`${ordem.agendamento.data}T${ordem.agendamento.horario}:00`);
  const dataLembrete = new Date(dataAtendimento.getTime() - 24 * 60 * 60 * 1000);

  const lembreteTexto = isNaN(dataLembrete.getTime())
    ? "-"
    : dataLembrete.toLocaleString("pt-BR");

  return [
    {
      tipo: "Confirmação do agendamento",
      canal: "E-mail",
      destinatario: cliente.email,
      status: simularStatusEnvio(),
      detalhe: `Confirmação referente à ${ordem.numero}.`
    },
    {
      tipo: "Lembrete de atendimento",
      canal: "WhatsApp",
      destinatario: cliente.telefone,
      status: "Programada",
      detalhe: `Programada para ${lembreteTexto}.`
    },
    {
      tipo: "Aviso de nova Ordem de Serviço",
      canal: "WhatsApp",
      destinatario: ordem.funcionario,
      status: simularStatusEnvio(),
      detalhe: `Funcionário responsável avisado sobre a ${ordem.numero}.`
    }
  ];
}

/* =========================================================
   RF16 - ATRIBUIÇÃO DE FUNCIONÁRIOS
   Seleciona automaticamente o funcionário responsável
   pelo atendimento, priorizando quem tem a especialidade
   compatível com a categoria do serviço e alternando entre
   os funcionários aptos (rodízio) para equilibrar a carga.
========================================================= */

function atribuirFuncionario(servico) {
  const ativos = getFuncionarios().filter(f => f.status === "Ativo");

  if (!ativos.length) {
    return { id: null, nome: "Equipe Técnica" };
  }

  let candidatos = ativos.filter(f => (f.especialidades || []).includes(servico.categoria));

  if (!candidatos.length) {
    candidatos = ativos;
  }

  const rotacao = JSON.parse(localStorage.getItem("rotacaoFuncionarios") || "{}");
  const chave = servico.categoria;
  let indice = rotacao[chave] || 0;

  if (indice >= candidatos.length) {
    indice = 0;
  }

  const escolhido = candidatos[indice];

  rotacao[chave] = (indice + 1) % candidatos.length;
  localStorage.setItem("rotacaoFuncionarios", JSON.stringify(rotacao));

  return { id: escolhido.id, nome: escolhido.nome };
}

/* =========================================================
   CONFIRMAR AGENDAMENTO
   RF05 / RF06 / RF07 / RF16
========================================================= */

function confirmarAgendamento() {
  const agendamento = JSON.parse(localStorage.getItem("agendamento") || "null");
  const cliente = JSON.parse(localStorage.getItem("cliente") || "null");

  if (!agendamento || !cliente) {
    alert("Não foi possível localizar os dados do agendamento.");
    return;
  }

  const servico = buscarServico(agendamento.servicoId);

  if (!servico) {
    alert("Serviço não encontrado.");
    return;
  }

  const numeroOS = "OS-" + Date.now().toString().slice(-8);

  /* RF16 - define automaticamente o funcionário responsável */
  const responsavel = atribuirFuncionario(servico);

  const ordemServico = {
    numero: numeroOS,
    status: "Confirmado",
    criadoEm: new Date().toLocaleString("pt-BR"),
    cliente,
    agendamento,
    servico,
    funcionarioId: responsavel.id,
    funcionario: responsavel.nome
  };

  localStorage.setItem("ordemServico", JSON.stringify(ordemServico));

  const historico = JSON.parse(localStorage.getItem("historicoOS") || "[]");
  historico.push(ordemServico);
  localStorage.setItem("historicoOS", JSON.stringify(historico));

  const notificacoes = gerarNotificacoes(ordemServico);
  localStorage.setItem("notificacoes", JSON.stringify(notificacoes));

  const falhasEnvio = notificacoes.filter(notificacao => notificacao.status === "Falha");

  if (falhasEnvio.length > 0) {
    const logFalhas = JSON.parse(localStorage.getItem("logFalhasNotificacoes") || "[]");

    falhasEnvio.forEach(falha =>
      logFalhas.push({
        ...falha,
        os: numeroOS,
        registradoEm: new Date().toLocaleString("pt-BR"),
        motivo: "Simulação de falha no canal de envio."
      })
    );

    localStorage.setItem("logFalhasNotificacoes", JSON.stringify(logFalhas));
  }

  window.location.href = "ordem-servico.html";
}

/* =========================================================
   ORDEM DE SERVIÇO
   RF06 / RF07
========================================================= */

function carregarOS() {
  const container = document.querySelector("#os");

  if (!container) {
    return;
  }

  const ordem = JSON.parse(localStorage.getItem("ordemServico") || "null");
  const notificacoes = JSON.parse(localStorage.getItem("notificacoes") || "[]");
  const logFalhas = JSON.parse(localStorage.getItem("logFalhasNotificacoes") || "[]");

  if (!ordem) {
    container.innerHTML = `<div class="warning">Nenhuma Ordem de Serviço encontrada.</div>`;
    return;
  }

  container.innerHTML = `
    <div class="success-box">
      <h2>Agendamento Confirmado</h2>
      <p>O status do atendimento foi atualizado para <strong>Confirmado</strong> e a Ordem de Serviço foi gerada automaticamente.</p>
    </div>

    <div class="card" style="margin-top:20px">
      <h2>${ordem.numero}</h2>
      <p><strong>Status:</strong> ${ordem.status}</p>
      <p><strong>Gerada em:</strong> ${ordem.criadoEm}</p>
      <hr>
      <h3>Cliente</h3>
      <p><strong>Nome:</strong> ${ordem.cliente.nome}</p>
      <p><strong>Telefone:</strong> ${ordem.cliente.telefone}</p>
      <p><strong>E-mail:</strong> ${ordem.cliente.email}</p>
      <p><strong>Endereço:</strong> ${ordem.cliente.endereco || "Não informado"}</p>
      <hr>
      <h3>Atendimento</h3>
      <p><strong>Serviço:</strong> ${ordem.servico.nome}</p>
      <p><strong>Categoria:</strong> ${ordem.servico.categoria}</p>
      <p><strong>Data:</strong> ${formatarData(ordem.agendamento.data)}</p>
      <p><strong>Horário:</strong> ${ordem.agendamento.horario}</p>
      <p><strong>Duração:</strong> ${ordem.servico.duracao}</p>
      <p><strong>Valor estimado:</strong> ${moeda(ordem.servico.valor)}</p>
      <p><strong>Responsável:</strong> ${ordem.funcionario}</p>
    </div>

    <div class="summary">
      <h3>Notificações automáticas</h3>
      ${
        notificacoes.length
          ? notificacoes
              .map(
                notificacao => `
                  <p class="${notificacao.status === "Falha" ? "notif-falha" : ""}">
                    ${notificacao.status === "Falha" ? "✗" : "✓"}
                    <strong>${notificacao.tipo}</strong><br>
                    Canal: ${notificacao.canal}<br>
                    Destinatário: ${notificacao.destinatario}<br>
                    Status: ${notificacao.status}
                    ${notificacao.detalhe ? `<br><small>${notificacao.detalhe}</small>` : ""}
                  </p>
                `
              )
              .join("")
          : `<p>Nenhuma notificação registrada.</p>`
      }
      <hr>
      <h3>Log de falhas de envio</h3>
      ${
        logFalhas.length
          ? logFalhas
              .map(
                falha => `
                  <p class="notif-falha">
                    ✗ ${falha.tipo} (${falha.canal}) para ${falha.destinatario}<br>
                    <small>${falha.registradoEm} · ${falha.os} · ${falha.motivo}</small>
                  </p>
                `
              )
              .join("")
          : `<p><small>Nenhuma falha de envio registrada.</small></p>`
      }
      <small>No demonstrativo, as notificações são apenas simuladas. Em produção, esta etapa pode integrar e-mail, WhatsApp ou SMS.</small>
    </div>
  `;
}

/* =========================================================
   NOVO AGENDAMENTO
========================================================= */

function novoAgendamento() {
  localStorage.removeItem("servicoSelecionado");
  localStorage.removeItem("agendamento");
  localStorage.removeItem("cliente");
  localStorage.removeItem("ordemServico");
  localStorage.removeItem("notificacoes");

  window.location.href = "index.html";
}

/* =========================================================
   PAINEL ADMINISTRATIVO
   RF19
========================================================= */

function verificarAcessoAdmin() {
  if (sessionStorage.getItem("acessoAdmin") === "true") {
    return true;
  }

  const senha = prompt("Painel Administrativo\n\nDigite a senha de administrador:");

  if (senha === "admin123") {
    sessionStorage.setItem("acessoAdmin", "true");
    return true;
  }

  alert("Senha incorreta. Você será redirecionado para a página inicial.");
  window.location.href = "index.html";
  return false;
}

function trocarAba(nome) {
  document.querySelectorAll(".admin-panel").forEach(painel => {
    painel.hidden = painel.id !== `aba-${nome}`;
  });

  document.querySelectorAll(".tab-btn").forEach(botao => {
    botao.classList.toggle("active", botao.dataset.tab === nome);
  });
}

/* ---------------------------------------------------------
   RF15 - GERENCIAMENTO DE FUNCIONÁRIOS
   Cadastrar, editar e remover.
--------------------------------------------------------- */

function popularCategoriasEspecialidade() {
  const container = document.querySelector("#funcionario-especialidades");

  if (!container) {
    return;
  }

  const categorias = [...new Set(getServicos().map(servico => servico.categoria))];
  const marcados = new Set(
    Array.from(document.querySelectorAll(".especialidade-check:checked")).map(chk => chk.value)
  );

  container.innerHTML = categorias
    .map(
      categoria => `
        <label class="checkbox-item">
          <input type="checkbox" value="${categoria}" class="especialidade-check" ${
        marcados.has(categoria) ? "checked" : ""
      }>
          ${categoria}
        </label>
      `
    )
    .join("");
}

function salvarFuncionario(event) {
  event.preventDefault();

  const id = document.querySelector("#funcionario-id").value;
  const nome = document.querySelector("#funcionario-nome").value.trim();
  const cargo = document.querySelector("#funcionario-cargo").value;
  const telefone = document.querySelector("#funcionario-telefone").value.trim();
  const email = document.querySelector("#funcionario-email").value.trim();
  const status = document.querySelector("#funcionario-status").value;
  const especialidades = Array.from(
    document.querySelectorAll(".especialidade-check:checked")
  ).map(chk => chk.value);

  if (nome.length < 3) {
    alert("Informe um nome válido.");
    return;
  }

  if (!validarTelefone(telefone)) {
    alert("Informe um telefone válido com DDD.");
    return;
  }

  if (!validarEmail(email)) {
    alert("Informe um e-mail válido.");
    return;
  }

  if (especialidades.length === 0) {
    alert("Selecione ao menos uma especialidade.");
    return;
  }

  const lista = getFuncionarios();

  if (id) {
    const idx = lista.findIndex(f => f.id === Number(id));

    if (idx === -1) {
      alert("Funcionário não encontrado.");
      return;
    }

    lista[idx] = {
      ...lista[idx],
      nome,
      cargo,
      telefone: formatarTelefone(telefone),
      email,
      status,
      especialidades
    };
  } else {
    lista.push({
      id: proximoId(lista),
      nome,
      cargo,
      telefone: formatarTelefone(telefone),
      email,
      status,
      especialidades
    });
  }

  salvarFuncionarios(lista);
  cancelarEdicaoFuncionario();
  carregarPainelFuncionarios();
  carregarPainelOS();
}

function editarFuncionario(id) {
  const funcionario = buscarFuncionario(id);

  if (!funcionario) {
    return;
  }

  document.querySelector("#funcionario-id").value = funcionario.id;
  document.querySelector("#funcionario-nome").value = funcionario.nome;
  document.querySelector("#funcionario-cargo").value = funcionario.cargo;
  document.querySelector("#funcionario-telefone").value = funcionario.telefone;
  document.querySelector("#funcionario-email").value = funcionario.email;
  document.querySelector("#funcionario-status").value = funcionario.status;

  document.querySelectorAll(".especialidade-check").forEach(chk => {
    chk.checked = (funcionario.especialidades || []).includes(chk.value);
  });

  document.querySelector("#funcionario-submit").textContent = "Salvar alterações";
  document.querySelector("#form-funcionario").scrollIntoView({ behavior: "smooth" });
}

function removerFuncionario(id) {
  if (!confirm("Remover este funcionário? Atendimentos já atribuídos a ele manterão o registro histórico.")) {
    return;
  }

  const lista = getFuncionarios().filter(f => f.id !== Number(id));
  salvarFuncionarios(lista);
  carregarPainelFuncionarios();
  carregarPainelOS();
}

function cancelarEdicaoFuncionario() {
  const form = document.querySelector("#form-funcionario");

  if (!form) {
    return;
  }

  form.reset();
  document.querySelector("#funcionario-id").value = "";
  document.querySelector("#funcionario-submit").textContent = "Cadastrar funcionário";
  document.querySelectorAll(".especialidade-check").forEach(chk => (chk.checked = false));
}

function carregarPainelFuncionarios() {
  const container = document.querySelector("#lista-funcionarios");

  if (!container) {
    return;
  }

  popularCategoriasEspecialidade();

  const ordemCargo = { Gerente: 0, Supervisor: 1, Técnico: 2 };
  const lista = [...getFuncionarios()].sort(
    (a, b) => (ordemCargo[a.cargo] ?? 3) - (ordemCargo[b.cargo] ?? 3)
  );

  container.innerHTML = lista.length
    ? `
      <table class="table">
        <thead>
          <tr><th>Nome</th><th>Cargo</th><th>Especialidades</th><th>Contato</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
          ${lista
            .map(
              f => `
                <tr>
                  <td>${f.nome}</td>
                  <td>${f.cargo}</td>
                  <td>${(f.especialidades || []).join(", ")}</td>
                  <td>${f.telefone}<br><small>${f.email}</small></td>
                  <td><span class="pill ${f.status === "Ativo" ? "pill-ativo" : "pill-inativo"}">${f.status}</span></td>
                  <td>
                    <button class="btn secondary" onclick="editarFuncionario(${f.id})">Editar</button>
                    <button class="btn secondary" onclick="removerFuncionario(${f.id})">Remover</button>
                  </td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    `
    : `<p class="empty-state">Nenhum funcionário cadastrado.</p>`;
}

/* ---------------------------------------------------------
   RF19 - CADASTRO DE SERVIÇO
--------------------------------------------------------- */

function salvarServico(event) {
  event.preventDefault();

  const id = document.querySelector("#servico-id").value;
  const nome = document.querySelector("#servico-nome").value.trim();
  const categoria = document.querySelector("#servico-categoria").value.trim();
  const duracao = document.querySelector("#servico-duracao").value.trim();
  const valor = Number(document.querySelector("#servico-valor").value);
  const descricao = document.querySelector("#servico-descricao").value.trim();

  if (nome.length < 3) {
    alert("Informe um nome de serviço válido.");
    return;
  }

  if (!categoria) {
    alert("Informe a categoria do serviço.");
    return;
  }

  if (!duracao) {
    alert("Informe a duração estimada.");
    return;
  }

  if (!valor || valor <= 0) {
    alert("Informe um valor válido.");
    return;
  }

  const lista = getServicos();

  if (id) {
    const idx = lista.findIndex(s => s.id === Number(id));

    if (idx === -1) {
      alert("Serviço não encontrado.");
      return;
    }

    lista[idx] = { ...lista[idx], nome, categoria, duracao, valor, descricao };
  } else {
    lista.push({ id: proximoId(lista), nome, categoria, duracao, valor, descricao });
  }

  salvarServicos(lista);
  cancelarEdicaoServico();
  carregarPainelServicos();
  popularCategoriasEspecialidade();
}

function editarServico(id) {
  const servico = buscarServico(id);

  if (!servico) {
    return;
  }

  document.querySelector("#servico-id").value = servico.id;
  document.querySelector("#servico-nome").value = servico.nome;
  document.querySelector("#servico-categoria").value = servico.categoria;
  document.querySelector("#servico-duracao").value = servico.duracao;
  document.querySelector("#servico-valor").value = servico.valor;
  document.querySelector("#servico-descricao").value = servico.descricao;

  document.querySelector("#servico-submit").textContent = "Salvar alterações";
  document.querySelector("#form-servico").scrollIntoView({ behavior: "smooth" });
}

function removerServico(id) {
  if (!confirm("Remover este serviço do catálogo?")) {
    return;
  }

  const lista = getServicos().filter(s => s.id !== Number(id));
  salvarServicos(lista);
  carregarPainelServicos();
  popularCategoriasEspecialidade();
}

function cancelarEdicaoServico() {
  const form = document.querySelector("#form-servico");

  if (!form) {
    return;
  }

  form.reset();
  document.querySelector("#servico-id").value = "";
  document.querySelector("#servico-submit").textContent = "Cadastrar serviço";
}

function carregarPainelServicos() {
  const container = document.querySelector("#lista-servicos-admin");

  if (!container) {
    return;
  }

  const lista = getServicos();

  container.innerHTML = lista.length
    ? `
      <table class="table">
        <thead>
          <tr><th>Serviço</th><th>Categoria</th><th>Duração</th><th>Valor</th><th></th></tr>
        </thead>
        <tbody>
          ${lista
            .map(
              s => `
                <tr>
                  <td>${s.nome}<br><small>${s.descricao || ""}</small></td>
                  <td>${s.categoria}</td>
                  <td>${s.duracao}</td>
                  <td>${moeda(s.valor)}</td>
                  <td>
                    <button class="btn secondary" onclick="editarServico(${s.id})">Editar</button>
                    <button class="btn secondary" onclick="removerServico(${s.id})">Remover</button>
                  </td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    `
    : `<p class="empty-state">Nenhum serviço cadastrado.</p>`;
}

/* ---------------------------------------------------------
   RF19 - CADASTRO DE CLIENTES (visualização/gestão)
--------------------------------------------------------- */

function removerCliente(id) {
  if (!confirm("Remover este cliente da base de cadastros?")) {
    return;
  }

  const lista = getClientes().filter(c => c.id !== Number(id));
  salvarClientes(lista);
  carregarPainelClientes();
}

function carregarPainelClientes() {
  const container = document.querySelector("#lista-clientes");

  if (!container) {
    return;
  }

  const lista = getClientes();

  container.innerHTML = lista.length
    ? `
      <table class="table">
        <thead>
          <tr><th>Nome</th><th>Contato</th><th>Endereço</th><th></th></tr>
        </thead>
        <tbody>
          ${lista
            .map(
              c => `
                <tr>
                  <td>${c.nome}</td>
                  <td>${c.telefone}<br><small>${c.email}</small></td>
                  <td>${c.endereco || "Não informado"}</td>
                  <td><button class="btn secondary" onclick="removerCliente(${c.id})">Remover</button></td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    `
    : `<p class="empty-state">Nenhum cliente cadastrado ainda. Os clientes são cadastrados automaticamente ao concluir um agendamento.</p>`;
}

/* ---------------------------------------------------------
   RF16 - REATRIBUIÇÃO MANUAL DE FUNCIONÁRIO EM UMA OS
--------------------------------------------------------- */

function reatribuirFuncionarioOS(numero, funcionarioId) {
  if (!funcionarioId) {
    return;
  }

  const historico = JSON.parse(localStorage.getItem("historicoOS") || "[]");
  const idx = historico.findIndex(os => os.numero === numero);

  if (idx === -1) {
    return;
  }

  const funcionario = buscarFuncionario(funcionarioId);

  historico[idx].funcionarioId = funcionario ? funcionario.id : null;
  historico[idx].funcionario = funcionario ? funcionario.nome : "Equipe Técnica";

  localStorage.setItem("historicoOS", JSON.stringify(historico));

  const atual = JSON.parse(localStorage.getItem("ordemServico") || "null");

  if (atual && atual.numero === numero) {
    atual.funcionarioId = historico[idx].funcionarioId;
    atual.funcionario = historico[idx].funcionario;
    localStorage.setItem("ordemServico", JSON.stringify(atual));
  }

  carregarPainelOS();
}

function carregarPainelOS() {
  const container = document.querySelector("#lista-os");

  if (!container) {
    return;
  }

  const historico = JSON.parse(localStorage.getItem("historicoOS") || "[]");
  const funcionariosAtivos = getFuncionarios().filter(f => f.status === "Ativo");

  container.innerHTML = historico.length
    ? `
      <table class="table">
        <thead>
          <tr><th>OS</th><th>Cliente</th><th>Serviço</th><th>Data/Horário</th><th>Responsável</th><th>Reatribuir (RF16)</th></tr>
        </thead>
        <tbody>
          ${[...historico]
            .reverse()
            .map(
              os => `
                <tr>
                  <td>${os.numero}</td>
                  <td>${os.cliente.nome}</td>
                  <td>${os.servico.nome}</td>
                  <td>${formatarData(os.agendamento.data)}<br><small>${os.agendamento.horario}</small></td>
                  <td>${os.funcionario}</td>
                  <td>
                    <select onchange="reatribuirFuncionarioOS('${os.numero}', this.value)">
                      <option value="">Selecionar...</option>
                      ${funcionariosAtivos
                        .map(
                          f => `
                            <option value="${f.id}" ${f.id === os.funcionarioId ? "selected" : ""}>${f.nome}</option>
                          `
                        )
                        .join("")}
                    </select>
                  </td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    `
    : `<p class="empty-state">Nenhuma Ordem de Serviço registrada ainda.</p>`;
}

function inicializarPainelAdmin() {
  if (!verificarAcessoAdmin()) {
    return;
  }

  carregarPainelFuncionarios();
  carregarPainelServicos();
  carregarPainelClientes();
  carregarPainelOS();
}

/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  inicializarBancoDados();

  renderServicos();
  carregarAgendamento();
  carregarConfirmacao();
  carregarOS();

  if (document.querySelector("#painel-admin")) {
    inicializarPainelAdmin();
  }
});

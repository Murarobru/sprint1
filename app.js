const servicos = [
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
     FUNÇÕES AUXILIARES
  ========================================================= */
  
  function moeda(valor) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }
  
  function buscarServico(id) {
    return servicos.find(
      servico => servico.id === Number(id)
    );
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
  
    const regex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    return regex.test(email);
  }
  
  /* =========================================================
     VALIDAÇÃO DE TELEFONE
  ========================================================= */
  
  function validarTelefone(telefone) {
    if (!telefone) {
      return false;
    }
  
    // Remove tudo que não for número
    const numero = telefone.replace(/\D/g, "");
  
    /*
      Telefone brasileiro:
  
      10 dígitos:
      (48) 3333-3333
  
      11 dígitos:
      (48) 99999-9999
    */
  
    if (
      numero.length !== 10 &&
      numero.length !== 11
    ) {
      return false;
    }
  
    /*
      Impede números formados
      por um único dígito.
  
      Exemplo:
      11111111111
      99999999999
    */
  
    if (/^(\d)\1+$/.test(numero)) {
      return false;
    }
  
    /*
      DDD brasileiro deve estar
      entre 11 e 99.
    */
  
    const ddd = Number(
      numero.substring(0, 2)
    );
  
    if (ddd < 11 || ddd > 99) {
      return false;
    }
  
    /*
      Quando possui 11 dígitos,
      o terceiro dígito normalmente
      deve ser 9 para celular.
    */
  
    if (
      numero.length === 11 &&
      numero.charAt(2) !== "9"
    ) {
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
      return `(${numero.substring(0, 2)}) ${numero.substring(
        2,
        7
      )}-${numero.substring(7)}`;
    }
  
    if (numero.length === 10) {
      return `(${numero.substring(0, 2)}) ${numero.substring(
        2,
        6
      )}-${numero.substring(6)}`;
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
  
    /*
      Considera válido um endereço
      com pelo menos 10 caracteres.
    */
  
    if (enderecoLimpo.length < 10) {
      return false;
    }
  
    /*
      O endereço precisa possuir
      pelo menos uma letra.
    */
  
    if (!/[a-zA-ZÀ-ÿ]/.test(enderecoLimpo)) {
      return false;
    }
  
    return true;
  }
  
  /* =========================================================
     VALIDAÇÃO DE CEP
     OPCIONAL
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
    const lista =
      document.querySelector("#lista-servicos");
  
    if (!lista) {
      return;
    }
  
    lista.innerHTML = servicos
      .map(
        servico => `
          <div class="card">
  
            <span class="badge">
              ${servico.categoria}
            </span>
  
            <h3>
              ${servico.nome}
            </h3>
  
            <p>
              ${servico.descricao}
            </p>
  
            <p>
              <strong>
                Duração estimada:
              </strong>
  
              ${servico.duracao}
            </p>
  
            <div class="price">
              ${moeda(servico.valor)}
            </div>
  
            <button
              class="btn"
              onclick="escolherServico(${servico.id})"
            >
              Agendar serviço
            </button>
  
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
    localStorage.setItem(
      "servicoSelecionado",
      String(id)
    );
  
    window.location.href =
      "agendamento.html";
  }
  
  /* =========================================================
     PÁGINA DE AGENDAMENTO
     RF03
  ========================================================= */
  
  function carregarAgendamento() {
    const selectServico =
      document.querySelector("#servico");
  
    if (!selectServico) {
      return;
    }
  
    selectServico.innerHTML = `
      <option value="">
        Selecione um serviço
      </option>
  
      ${servicos
        .map(
          servico => `
            <option value="${servico.id}">
              ${servico.nome} -
              ${moeda(servico.valor)}
            </option>
          `
        )
        .join("")}
    `;
  
    const servicoSelecionado =
      localStorage.getItem(
        "servicoSelecionado"
      );
  
    if (servicoSelecionado) {
      selectServico.value =
        servicoSelecionado;
    }
  
    configurarDataMinima();
  
    renderHorarios();
  
    atualizarResumoAgendamento();
  
    selectServico.addEventListener(
      "change",
      atualizarResumoAgendamento
    );
  
    const data =
      document.querySelector("#data");
  
    if (data) {
      data.addEventListener(
        "change",
        () => {
          renderHorarios();
          atualizarResumoAgendamento();
        }
      );
    }
  
    const horario =
      document.querySelector("#horario");
  
    if (horario) {
      horario.addEventListener(
        "change",
        atualizarResumoAgendamento
      );
    }
  }
  
  /* =========================================================
     CONFIGURAR DATA MÍNIMA
  ========================================================= */
  
  function configurarDataMinima() {
    const campoData =
      document.querySelector("#data");
  
    if (!campoData) {
      return;
    }
  
    const hoje = new Date();
  
    const ano =
      hoje.getFullYear();
  
    const mes =
      String(
        hoje.getMonth() + 1
      ).padStart(2, "0");
  
    const dia =
      String(
        hoje.getDate()
      ).padStart(2, "0");
  
    campoData.min =
      `${ano}-${mes}-${dia}`;
  }
  
  /* =========================================================
     HORÁRIOS
  ========================================================= */
  
  function renderHorarios() {
    const selectHorario =
      document.querySelector(
        "#horario"
      );
  
    if (!selectHorario) {
      return;
    }
  
    const data =
      document.querySelector(
        "#data"
      )?.value || "";
  
    /*
      Demonstração:
  
      Alguns horários são considerados
      ocupados dependendo do dia.
  
      Em produção, estes horários
      devem vir do backend/banco de dados.
    */
  
    let horariosIndisponiveis = [];
  
    if (data) {
      const dia =
        Number(
          data.split("-")[2]
        );
  
      if (dia % 2 === 0) {
        horariosIndisponiveis = [
          "09:00",
          "14:00"
        ];
      } else {
        horariosIndisponiveis = [
          "10:00",
          "15:00"
        ];
      }
    }
  
    selectHorario.innerHTML = `
      <option value="">
        Selecione um horário
      </option>
  
      ${horarios
        .map(horario => {
          const ocupado =
            horariosIndisponiveis.includes(
              horario
            );
  
          if (ocupado) {
            return `
              <option
                value="${horario}"
                disabled
              >
                ${horario} - ocupado
              </option>
            `;
          }
  
          return `
            <option value="${horario}">
              ${horario} - disponível
            </option>
          `;
        })
        .join("")}
    `;
  }
  
  /* =========================================================
     RESUMO DO AGENDAMENTO
  ========================================================= */
  
  function atualizarResumoAgendamento() {
    const resumo =
      document.querySelector(
        "#resumo-agendamento"
      );
  
    if (!resumo) {
      return;
    }
  
    const servicoId =
      document.querySelector(
        "#servico"
      )?.value;
  
    const data =
      document.querySelector(
        "#data"
      )?.value || "";
  
    const horario =
      document.querySelector(
        "#horario"
      )?.value || "";
  
    const servico =
      buscarServico(servicoId);
  
    if (!servico) {
      resumo.innerHTML = `
        <strong>
          Selecione um serviço para
          visualizar o resumo do atendimento.
        </strong>
      `;
  
      return;
    }
  
    resumo.innerHTML = `
      <strong>
        ${servico.nome}
      </strong>
  
      <br>
  
      Categoria:
      ${servico.categoria}
  
      <br>
  
      Duração:
      ${servico.duracao}
  
      <br>
  
      Valor:
      ${moeda(servico.valor)}
  
      <br>
  
      Data:
      ${data
        ? formatarData(data)
        : "-"}
  
      <br>
  
      Horário:
      ${horario || "-"}
    `;
  }
  
  /* =========================================================
     SALVAR AGENDAMENTO
     RF03
  ========================================================= */
  
  function salvarAgendamento(event) {
    event.preventDefault();
  
    const servicoId =
      Number(
        document.querySelector(
          "#servico"
        ).value
      );
  
    const data =
      document.querySelector(
        "#data"
      ).value;
  
    const horario =
      document.querySelector(
        "#horario"
      ).value;
  
    if (!servicoId) {
      alert(
        "Selecione um serviço."
      );
  
      return;
    }
  
    if (!data) {
      alert(
        "Selecione uma data."
      );
  
      return;
    }
  
    /*
      Verifica se a data escolhida
      não é anterior à data atual.
    */
  
    const hoje = new Date();
  
    hoje.setHours(
      0,
      0,
      0,
      0
    );
  
    const dataSelecionada =
      new Date(
        `${data}T00:00:00`
      );
  
    if (
      dataSelecionada < hoje
    ) {
      alert(
        "A data selecionada não pode ser anterior a hoje."
      );
  
      return;
    }
  
    if (!horario) {
      alert(
        "Selecione um horário."
      );
  
      return;
    }
  
    const agendamento = {
      servicoId,
      data,
      horario
    };
  
    localStorage.setItem(
      "agendamento",
      JSON.stringify(
        agendamento
      )
    );
  
    window.location.href =
      "cliente.html";
  }
  
  /* =========================================================
     DADOS DO CLIENTE
     RF04
  ========================================================= */
  
  function salvarCliente(event) {
    event.preventDefault();
  
    const cliente = {
      nome:
        document.querySelector(
          "#nome"
        )?.value.trim(),
  
      telefone:
        document.querySelector(
          "#telefone"
        )?.value.trim(),
  
      email:
        document.querySelector(
          "#email"
        )?.value.trim(),
  
      endereco:
        document.querySelector(
          "#endereco"
        )?.value.trim(),
  
      observacoes:
        document.querySelector(
          "#observacoes"
        )?.value.trim()
    };
  
    /* =====================================================
       VALIDAÇÃO DO NOME
    ===================================================== */
  
    if (!cliente.nome) {
      alert(
        "Informe o nome do cliente."
      );
  
      return;
    }
  
    if (cliente.nome.length < 3) {
      alert(
        "Informe um nome válido."
      );
  
      return;
    }
  
    /* =====================================================
       VALIDAÇÃO DO TELEFONE
    ===================================================== */
  
    if (!cliente.telefone) {
      alert(
        "Informe o telefone."
      );
  
      return;
    }
  
    if (
      !validarTelefone(
        cliente.telefone
      )
    ) {
      alert(
        "Informe um número de telefone válido com DDD."
      );
  
      return;
    }
  
    /*
      Salva o telefone já formatado.
    */
  
    cliente.telefone =
      formatarTelefone(
        cliente.telefone
      );
  
    /* =====================================================
       VALIDAÇÃO DO E-MAIL
    ===================================================== */
  
    if (!cliente.email) {
      alert(
        "Informe o e-mail."
      );
  
      return;
    }
  
    if (
      !validarEmail(
        cliente.email
      )
    ) {
      alert(
        "Informe um endereço de e-mail válido."
      );
  
      return;
    }
  
    /* =====================================================
       VALIDAÇÃO DO ENDEREÇO
    ===================================================== */
  
    if (!cliente.endereco) {
      alert(
        "Informe o endereço."
      );
  
      return;
    }
  
    if (
      !validarEndereco(
        cliente.endereco
      )
    ) {
      alert(
        "Informe um endereço válido com pelo menos 10 caracteres."
      );
  
      return;
    }
  
    /* =====================================================
       VERIFICAR AGENDAMENTO
    ===================================================== */
  
    const agendamento =
      JSON.parse(
        localStorage.getItem(
          "agendamento"
        ) || "null"
      );
  
    if (!agendamento) {
      alert(
        "O agendamento não foi encontrado."
      );
  
      window.location.href =
        "index.html";
  
      return;
    }
  
    /* =====================================================
       SALVAR CLIENTE
    ===================================================== */
  
    localStorage.setItem(
      "cliente",
      JSON.stringify(
        cliente
      )
    );
  
    window.location.href =
      "confirmacao.html";
  }
  
  /* =========================================================
     CONFIRMAÇÃO
     RF05
  ========================================================= */
  
  function carregarConfirmacao() {
    const container =
      document.querySelector(
        "#dados-confirmacao"
      );
  
    if (!container) {
      return;
    }
  
    const agendamento =
      JSON.parse(
        localStorage.getItem(
          "agendamento"
        ) || "null"
      );
  
    const cliente =
      JSON.parse(
        localStorage.getItem(
          "cliente"
        ) || "null"
      );
  
    if (
      !agendamento ||
      !cliente
    ) {
      container.innerHTML = `
        <div class="warning">
          Os dados do agendamento
          estão incompletos.
        </div>
      `;
  
      return;
    }
  
    const servico =
      buscarServico(
        agendamento.servicoId
      );
  
    if (!servico) {
      container.innerHTML = `
        <div class="warning">
          Serviço não encontrado.
        </div>
      `;
  
      return;
    }
  
    container.innerHTML = `
      <h3>
        Dados do serviço
      </h3>
  
      <p>
        <strong>Serviço:</strong>
        ${servico.nome}
      </p>
  
      <p>
        <strong>Categoria:</strong>
        ${servico.categoria}
      </p>
  
      <p>
        <strong>Duração estimada:</strong>
        ${servico.duracao}
      </p>
  
      <p>
        <strong>Valor:</strong>
        ${moeda(servico.valor)}
      </p>
  
      <p>
        <strong>Data:</strong>
        ${formatarData(
          agendamento.data
        )}
      </p>
  
      <p>
        <strong>Horário:</strong>
        ${agendamento.horario}
      </p>
  
      <hr>
  
      <h3>
        Dados do cliente
      </h3>
  
      <p>
        <strong>Nome:</strong>
        ${cliente.nome}
      </p>
  
      <p>
        <strong>Telefone:</strong>
        ${cliente.telefone}
      </p>
  
      <p>
        <strong>E-mail:</strong>
        ${cliente.email}
      </p>
  
      <p>
        <strong>Endereço:</strong>
        ${cliente.endereco ||
        "Não informado"}
      </p>
  
      <p>
        <strong>Observações:</strong>
        ${cliente.observacoes ||
        "Nenhuma"}
      </p>
    `;
  }
  
  /* =========================================================
     CONFIRMAR AGENDAMENTO
     RF05 / RF06 / RF07
  ========================================================= */
  
  function confirmarAgendamento() {
    const agendamento =
      JSON.parse(
        localStorage.getItem(
          "agendamento"
        ) || "null"
      );
  
    const cliente =
      JSON.parse(
        localStorage.getItem(
          "cliente"
        ) || "null"
      );
  
    if (
      !agendamento ||
      !cliente
    ) {
      alert(
        "Não foi possível localizar os dados do agendamento."
      );
  
      return;
    }
  
    const servico =
      buscarServico(
        agendamento.servicoId
      );
  
    if (!servico) {
      alert(
        "Serviço não encontrado."
      );
  
      return;
    }
  
    /* =====================================================
       RF06
       GERAÇÃO AUTOMÁTICA DA OS
    ===================================================== */
  
    const numeroOS =
      "OS-" +
      Date.now()
        .toString()
        .slice(-8);
  
    const ordemServico = {
      numero: numeroOS,
  
      status:
        "Agendado",
  
      criadoEm:
        new Date().toLocaleString(
          "pt-BR"
        ),
  
      cliente,
  
      agendamento,
  
      servico,
  
      funcionario:
        "Equipe Técnica"
    };
  
    localStorage.setItem(
      "ordemServico",
      JSON.stringify(
        ordemServico
      )
    );
  
    /* =====================================================
       HISTÓRICO DAS OS
    ===================================================== */
  
    const historico =
      JSON.parse(
        localStorage.getItem(
          "historicoOS"
        ) || "[]"
      );
  
    historico.push(
      ordemServico
    );
  
    localStorage.setItem(
      "historicoOS",
      JSON.stringify(
        historico
      )
    );
  
    /* =====================================================
       RF07
       NOTIFICAÇÕES
    ===================================================== */
  
    const notificacao = {
      cliente:
        `Confirmação enviada para ${cliente.email} e ${cliente.telefone}.`,
  
      funcionario:
        `Funcionário responsável notificado sobre a ${numeroOS}.`
    };
  
    localStorage.setItem(
      "notificacao",
      JSON.stringify(
        notificacao
      )
    );
  
    window.location.href =
      "ordem-servico.html";
  }
  
  /* =========================================================
     ORDEM DE SERVIÇO
     RF06 / RF07
  ========================================================= */
  
  function carregarOS() {
    const container =
      document.querySelector(
        "#os"
      );
  
    if (!container) {
      return;
    }
  
    const ordem =
      JSON.parse(
        localStorage.getItem(
          "ordemServico"
        ) || "null"
      );
  
    const notificacao =
      JSON.parse(
        localStorage.getItem(
          "notificacao"
        ) || "null"
      );
  
    if (!ordem) {
      container.innerHTML = `
        <div class="warning">
          Nenhuma Ordem de Serviço
          encontrada.
        </div>
      `;
  
      return;
    }
  
    container.innerHTML = `
      <div class="success-box">
  
        <h2>
          Agendamento Pendente
        </h2>
        <h2>
          Agendamento será confirmado após análise do profissional
        </h2>
  
        <p>
          A Ordem de Serviço foi
          gerada automaticamente.
        </p>
  
      </div>
  
      <div
        class="card"
        style="margin-top:20px"
      >
  
        <h2>
          ${ordem.numero}
        </h2>
  
        <p>
          <strong>Status:</strong>
          ${ordem.status}
        </p>
  
        <p>
          <strong>Gerada em:</strong>
          ${ordem.criadoEm}
        </p>
  
        <hr>
  
        <h3>
          Cliente
        </h3>
  
        <p>
          <strong>Nome:</strong>
          ${ordem.cliente.nome}
        </p>
  
        <p>
          <strong>Telefone:</strong>
          ${ordem.cliente.telefone}
        </p>
  
        <p>
          <strong>E-mail:</strong>
          ${ordem.cliente.email}
        </p>
  
        <p>
          <strong>Endereço:</strong>
          ${ordem.cliente.endereco ||
          "Não informado"}
        </p>
  
        <hr>
  
        <h3>
          Atendimento
        </h3>
  
        <p>
          <strong>Serviço:</strong>
          ${ordem.servico.nome}
        </p>
  
        <p>
          <strong>Categoria:</strong>
          ${ordem.servico.categoria}
        </p>
  
        <p>
          <strong>Data:</strong>
          ${formatarData(
            ordem.agendamento.data
          )}
        </p>
  
        <p>
          <strong>Horário:</strong>
          ${ordem.agendamento.horario}
        </p>
  
        <p>
          <strong>Duração:</strong>
          ${ordem.servico.duracao}
        </p>
  
        <p>
          <strong>Valor estimado:</strong>
          ${moeda(
            ordem.servico.valor
          )}
        </p>
  
        <p>
          <strong>Responsável:</strong>
          ${ordem.funcionario}
        </p>
  
      </div>
  
      <div class="summary">
  
        <h3>
          Notificações automáticas
        </h3>
  
        <p>
          ✓
          ${notificacao?.cliente ||
          "Cliente notificado."}
        </p>
  
        <p>
          ✓
          ${notificacao?.funcionario ||
          "Funcionário notificado."}
        </p>
  
        <small>
          No demonstrativo, as notificações
          são apenas simuladas.
          Em produção, esta etapa pode
          integrar e-mail, WhatsApp ou SMS.
        </small>
  
      </div>
    `;
  }
  
  /* =========================================================
     NOVO AGENDAMENTO
  ========================================================= */
  
  function novoAgendamento() {
    localStorage.removeItem(
      "servicoSelecionado"
    );
  
    localStorage.removeItem(
      "agendamento"
    );
  
    localStorage.removeItem(
      "cliente"
    );
  
    localStorage.removeItem(
      "ordemServico"
    );
  
    localStorage.removeItem(
      "notificacao"
    );
  
    window.location.href =
      "index.html";
  }
  
  /* =========================================================
     INICIALIZAÇÃO
  ========================================================= */
  
  document.addEventListener(
    "DOMContentLoaded",
    () => {
      renderServicos();
  
      carregarAgendamento();
  
      carregarConfirmacao();
  
      carregarOS();
    }
  );
  
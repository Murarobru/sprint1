DEMONSTRATIVO — ÁVILA HIDRÁULICAS

Fluxo:
1. Serviço
2. Data e horário
3. Dados do cliente
4. Confirmação
5. Ordem de Serviço

Requisitos cobertos:
RF01 — Agendamento sem cadastro prévio
RF02 — Consulta de serviços com descrição, categoria, duração e valor
RF03 — Escolha de data e horário disponíveis
RF04 — Cadastro dos dados necessários ao atendimento
RF05 — Confirmação e registro do agendamento (status atualizado para "Confirmado")
RF06 — Geração automática da Ordem de Serviço
RF07 — Notificações automáticas simuladas com canal (e-mail/WhatsApp), tipo
       (confirmação, lembrete antes do atendimento e aviso ao funcionário),
       destinatário e log de falhas de envio

Observações:
- O protótipo é frontend puro.
- O localStorage do navegador simula a persistência.
- Os horários ocupados são simulados para demonstração.
- As notificações são simuladas; não há envio real por e-mail/SMS/WhatsApp.
- A próxima etapa pode conectar o fluxo a uma API e banco de dados.

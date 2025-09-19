async function formatDate(date:any){
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0"); // +1 pq janeiro = 0
  const ano = date.getFullYear();

  const horas = String(date.getHours()).padStart(2, "0");
  const minutos = String(date.getMinutes()).padStart(2, "0");
  const segundos = String(date.getSeconds()).padStart(2, "0");

  return `${dia}/${mes}/${ano}, ${horas}:${minutos}:${segundos}`;
}

async function formatDateDeadline(date:any){
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0"); // +1 pq janeiro = 0
  const ano = date.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

export {formatDate, formatDateDeadline}
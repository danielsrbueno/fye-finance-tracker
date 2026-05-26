const userEmail = sessionStorage.getItem("userEmail")
const userName = sessionStorage.getItem("userName")
const userId = sessionStorage.getItem("userId")

const init = async () => {
  if (!userEmail || !userName || !userId)
    window.location.href = "../login/index.html"

  const historic = localStorage.getItem("chatHistoric")
  if (!historic) 
    localStorage.setItem("chatHistoric", JSON.stringify({ messages: []}))

  const parsedHistoric = JSON.parse(localStorage.getItem("chatHistoric"))
  parsedHistoric.messages.forEach(message => createMessageElement(message))

  const chatElement = document.getElementById("chat")
  chatElement.scrollTo(0, chatElement.scrollHeight)
}

const sendMessage = async () => {
  const messageElement = document.getElementById('inpMessage')
  const userMessage = document.getElementById('inpMessage').value.trim()
  const userFirstName = sessionStorage.getItem("userName").split(" ")[0]
  const date = new Date()

  const formatedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

  if (!userMessage)
    return showToast("Digite uma mensagem.", "error")
  
  messageElement.value = ""

  const categories = await getCategories(userId)

  const message = `
    Nome do usuário: ${userFirstName}; 
    Data atual: ${formatedDate};
    Categorias: ${JSON.stringify(categories)};
    Input: ${userMessage};
  `

  createMessageElement(userMessage)

  const apiResponseJson = await fetch("http://localhost:5173/send-message", {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
  },
    body: JSON.stringify({ message })
  })
  .then(res => res.json())
  .then(data => data)
 
  const { apiResponse } = apiResponseJson

  const { response, itemName, amount, eventDate, category, description } = JSON.parse(apiResponse)

  const responseMessage = `
    ${response} <br>
    <hr>
    <strong>Dados da transação</strong> <br>
    Nome: ${itemName} <br>
    Valor: R$${amount} <br>
    Data: ${eventDate.split("-")[2]}/${eventDate.split("-")[1]}/${eventDate.split("-")[0]} <br>
    Categoria: ${
      categories.map(ctg => ctg.id === category ? ctg.category : -1)
      .filter(ctg => ctg !== -1)[0]
    } <br>
    Descrição: ${description} <br>
  `

  createMessageElement(responseMessage)
  saveMessage(userMessage)
  saveMessage(responseMessage)
  
  createTransaction(itemName, amount, eventDate, category, description)
}

const getCategories = async (userId) => {
  return fetch(`/category/all/${userId}`)
  .then(res => res.json())
  .then(data => data)
}

const createTransaction = async (itemName, amount, eventDate, category, description) => {
  const transactionName = itemName
  const transactionAmount = Math.abs(amount)
  const transactionDate = eventDate
  const transactionCategoryId = Number(category)
  const transactionDescription = description

  const body = {
    userId: Number(userId),
    transactionName,
    transactionAmount,
    transactionDate,
    transactionCategoryId,
    transactionDescription
  }

  const res = await fetch("/transaction/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  
  if (res.ok) 
    showToast("Transação cadastrada com sucesso!", "success")
   else 
    showToast("Algo deu errado. Tente novamente mais tarde.", "error")
  
}

const createMessageElement = (message) => {
  const chatElement = document.getElementById("chat")
  
  chatElement.innerHTML += `
   <div class="message">${message}</div>
  `
  
  chatElement.scrollTo(0, chatElement.scrollHeight)
}

const saveMessage = (message) => {
  const parsedHistoric = JSON.parse(localStorage.getItem("chatHistoric"))
  parsedHistoric.messages.push(message)
  localStorage.setItem("chatHistoric", JSON.stringify(parsedHistoric))
}

const showToast = (message, type) => {
  const toastElement = document.getElementById("toast")

  if (toastElement.classList.contains("toast-success"))
    toastElement.classList.remove("toast-success")
  if (toastElement.classList.contains("toast-warning"))
    toastElement.classList.remove("toast-warning")
  if (toastElement.classList.contains("toast-error"))
    toastElement.classList.remove("toast-error")

  const typeIcon = {
    "success": "check",
    "warning": "warning",
    "error": "x",
  }

  const structure = `<i class='ph-bold ph-${typeIcon[type]}'></i>${message}`

  toastElement.classList.add("toast-" + type)
  toastElement.innerHTML = structure

  toastElement.style.transform = 'translateX(0)'

  setTimeout(() => toastElement.style.transform = 'translateX(130%)', 5000)
}

const signOut = () => {
  sessionStorage.removeItem("userEmail")
  sessionStorage.removeItem("userName")
  sessionStorage.removeItem("userId")
  sessionStorage.removeItem("lastLogin")

  window.location.href = '../../login/index.html'
}
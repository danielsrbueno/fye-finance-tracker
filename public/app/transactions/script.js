const userEmail = sessionStorage.getItem("userEmail")
const userName = sessionStorage.getItem("userName")
const userId = sessionStorage.getItem("userId")

let localData = {}
let month, year

const typeValues = {
  "INCOME": 1,
  "EXPENSE": 2,
  "INVESTMENT": 3,
}

const typeId = {
  1: "INCOME",
  2: "EXPENSE",
  3: "INVESTMENT",
}

const init = () => {
  if (!userEmail || !userName || !userId)
    window.location.href = "../login/index.html"

  const userNames = userName.split(" ")
  const firstName = userNames[0]
  const lastName = userNames[userNames.length -1]

  sidebarUserName.innerHTML = `${firstName} ${lastName}`
  sidebarAvatar.innerHTML = `${firstName[0]}${lastName[0]}`

  const currentDate = new Date()

  month = currentDate.getMonth()
  year = currentDate.getFullYear()

  changeMonth(0)
}

const changeMonth = async (counter) => {
  const transactionsElement = document.getElementById("transactions")
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

  if (counter == 1 && month + 1 > 11) {
    month = 0
    year += 1
  } else if (counter == -1 && month - 1 < 0) {
    month = 11
    year -= 1
  } else {
    month += counter
  }
  
  dateText.innerHTML = `${months[month]} | ${year}`
  localData = await fetchData()
  const { items, categories } = localData
  transactionsElement.innerHTML = ""
  items.forEach(item => showItem(item, categories))
}

const loadData = async () => {
  const data = await fetchData()
  localData = data
  const { items, categories } = data
  
  items.forEach(item => showItem(item, categories))

  sctCategory.innerHTML += loadCategoryOptions(categories)
  sctType.innerHTML += loadTypeOptions()
}

const fetchData = () => {
  return fetch(`/transaction/all/${userId}?month=${(month < 9 ? "0" : "") + (month + 1)}&year=${year}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  })
  .then(res => res.json())
  .then(data => data)
}

const showItem = (item, categories) => {
  const transactionsElement = document.getElementById("transactions")
  const { id, item_name, amount, event_date, category, item_description } = item

  const categoryInfos = categories.filter(ctg => ctg.category == category)[0]

  if (!categoryInfos) {
    console.warn(`Category not found: ${category}`)
    return
  }

  let formatedDate = event_date.substring(0, 10)
  
  const structure = `
    <div class="transaction-row" id='item_${id}'>
      <div class="options-container hidden" id="item_options_${id}">
        <div class="option"><i class="ph-bold ph-flag" oncliconsck="markAsCurring(${id})"></i>Marcar como recorrente</div>
        <div class="option color-red" onclick="deleteTransaction(${id})"><i class="ph-bold ph-trash"></i>Excluir</div>
      </div>
      <div class="show-options" id="show_options_${id}" onclick="showOptions(${id})">
        <i class="ph-fill ph-dots-three-outline-vertical"></i>
      </div>
      <div class="content">
        <input type="text" class="form-input mono flex-3" placeholder="Nome da transação" id='item_name_${id}' value='${item_name}' onblur="updateTransaction('item_name_${id}')">

        <div class="divisor"></div>

        <p class="mono currency">R$</p>
        <input type="number" class="form-input mono flex-1 amount-input" id='item_amount_${id}' value='${amount}' onblur="updateTransaction('item_amount_${id}')">

        <div class="divisor"></div>

        <input type="date" class="form-input mono flex-2" id='item_event_${id}' value='${formatedDate}' onblur="updateTransaction('item_event_${id}')">

        <div class="divisor"></div>
      
        <select class="form-input mono flex-1" id='item_type_${id}' onblur="updateCategoryOptions(${id})">
          <option value="" disabled>Tipo</option>
          ${loadTypeOptions(categoryInfos.item_type)}
        </select>

        <div class="divisor"></div>

        <select class="form-input mono flex-1" id='item_category_${id}' onblur="updateTransaction('item_category_${id}')">
          <option value="" disabled>Categoria</option>
          ${loadCategoryOptions(categories, category, categoryInfos.item_type)}
        </select>

      </div>

      <div class="divisor"></div>

      <input type="text" class="form-input mono flex-3 description" placeholder="Descrição" id='item_description_${id}' value='${item_description}' onblur="updateTransaction('item_description_${id}')">
    </div>
  `
  transactionsElement.innerHTML += structure
}

const showOptions = (elementId) => {
  const containerElement = document.getElementById(`item_options_${elementId}`)
  const buttonElement = document.getElementById(`show_options_${elementId}`)
  
  if (containerElement.classList.contains("hidden")) {
    buttonElement.innerHTML = '<i class="ph-bold ph-x"></i>'
    containerElement.classList.add("flex")
    containerElement.classList.remove("hidden")
  } else {
    buttonElement.innerHTML = '<i class="ph-fill ph-dots-three-outline-vertical"></i>'
    containerElement.classList.remove("flex")
    containerElement.classList.add("hidden")
  }
}

const deleteTransaction = (id) => {
  showOptions(id)

  const body = {
    userId: Number(userId),
    transactionId: id
  }

  fetch("/transaction/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(res => {
        if (res.ok){
          showToast("Transação excluida com sucesso.", "success")
          const { items, categories } = localData

          const index = items
          .map((item, i) => item.id == id ? i : -1)
          .filter((number) => number != -1)[0]

          localData.items.splice(index, 1)

          const transactionsElement = document.getElementById("transactions")
          transactionsElement.innerHTML = ""
          localData.items.forEach(item => showItem(item, categories))
        }
        else
          showToast("Erro ao excluida transação.", "error")
      })
      .catch(err => showToast("Erro ao excluida transação.", "error"))
}

const updateTransaction = (elementId) => {
  const id = elementId.split("_")[2]
  const inputType = elementId.split("_")[1]
  const inputValue = document.getElementById(elementId).value

  const { items, categories } = localData

  const item = items.filter(item => item.id == id)[0]

  const currentCategory = categories.filter(category => category.category == item.category)[0]

  let categoryName = item.category
  let categoryId = currentCategory ? currentCategory.id : 0

  if (inputType == "category") {
    if (!inputValue) 
      return showToast("Selecione uma categoria.", "warning")

    const category = categories.filter(category => category.id == inputValue)[0]

    categoryName = category ? category.category : ""
    categoryId = category ? category.id : 0
  }

  if (!compareItem(item, inputValue, inputType, categoryName)) {
    const body = {
      userId: Number(userId),
      transactionId: Number(item.id),
      transactionName: (inputType == "name" ? inputValue : item.item_name).trim(),
      transactionCategoryId: Number(categoryId),
      transactionAmount: Number(inputType == "amount" ? inputValue : item.amount),
      transactionDate: inputType == "event" ? inputValue : item.event_date.split("T")[0],
      transactionDescription: inputType == "description" ? inputValue : item.item_description
    }

    fetch("/transaction/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(res => {
        if (res.ok){
          showToast("Transação atualizada.", "success")
          setItem(body)
        }
        else
          showToast("Erro ao atualizar transação.", "error")
      })
      .catch(err => showToast("Erro ao atualizar transação.", "error"))
  }
}

const compareItem = (item, value, inputType, category="") => {
  if (item.item_name != value && inputType == "name") return false
  if (Number(item.amount) != Number(value) && inputType == "amount") return false
  if (item.event_date.split("T")[0] != value && inputType == "event") return false
  if (category != item.category && inputType == "category") return false
  if (typeValues[item.item_type] != value && inputType == "type") return false
  if (item.item_description != value && inputType == "description") return false

  return true
}

const setItem = (body) => {
  const { transactionName, transactionCategoryId, transactionTypeId, transactionAmount, transactionDate, transactionDescription } = body

  const transactionId = (body.transactionId || -1)
  
  const index = localData.items
  .map((item, i) => item.id == transactionId ? i : -1)
  .filter((number) => number != -1)[0]
  localData.items[index] = {
    id: transactionId,
    item_name: transactionName,
    category: getCategoryById(transactionCategoryId),
    item_type: typeId[transactionTypeId],
    amount: transactionAmount,
    event_date: transactionDate,
    item_description: transactionDescription
  }
}

const getCategoryById = (categoryId) => {
  return localData.categories
  .map(category => category.id == categoryId ? category.category : null)
  .filter(category => category != null)[0]
}

const loadCategoryOptions = (options, selected = "", type = "") => {
  let optionsCollection = ""

  if (type != "")
    options = localData.categories.filter(category => category.item_type == type)

  options.forEach(option => {
    if (option.category == selected) 
      optionsCollection += `<option value="${option.id}" selected>${option.category}</option>`
    else
      optionsCollection += `<option value="${option.id}">${option.category}</option>`
  })
  return optionsCollection
}

const loadTypeOptions = (selected = "") => {
  return `
    <option value="1" ${typeValues[selected] == 1 ? "selected" : ""}>Renda</option>
    <option value="2" ${typeValues[selected] == 2 ? "selected" : ""}>Gasto</option>
    <option value="3" ${typeValues[selected] == 3 ? "selected" : ""}>Investimento</option>
  `
}

const createTransaction = async () => {
  const elements = {
    name: document.getElementById("inpName"),
    amount: document.getElementById("inpAmount"),
    eventDate: document.getElementById("inpEventDate"),
    category: document.getElementById("sctCategory"),
    description: document.getElementById("inpDescription"),
  }

  const transactionName = elements.name.value.trim()
  const transactionAmount = Math.abs(elements.amount.value)
  const transactionDate = elements.eventDate.value
  const transactionCategoryId = elements.category.value
  const transactionDescription = elements.description.value.trim()

  const body = {
    userId: Number(userId),
    transactionName,
    transactionAmount,
    transactionDate,
    transactionCategoryId,
    transactionDescription
  }
  
  if (!fieldsValidation(elements, body))
    return

  const res = await fetch("/transaction/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  
  if (res.ok) {
    showToast("Transação cadastrada com sucesso!", "success")
    const result = await res.json()

    const { id, item_name, category, item_description, amount, event_date } = result[0]

    localData.items.push({ id, item_name, category, item_description, amount, event_date })
    
    const { items, categories } = localData
    const transactionsElement = document.getElementById("transactions")
    transactionsElement.innerHTML = ""
    items.forEach(item => showItem(item, categories))
    
    cleanInputs(elements)
  } else {
    showToast("Algo deu errado. Tente novamente mais tarde.", "error")
  }
}

const fieldsValidation = (elements, body) => {
  elements.name.classList.remove("wrong")
  elements.amount.classList.remove("wrong")
  elements.eventDate.classList.remove("wrong")
  elements.category.classList.remove("wrong")

  const {
    transactionName,
    transactionAmount,
    transactionDate,
    transactionCategoryId,
  } = body

  if (transactionName.length <= 1) {
    validationFailed(elements.name, "O nome da transação deve ter, no mínimo, 2 caracteres")
    return false 
  }
  if (transactionName.length > 60) {
    validationFailed(elements.name, "O nome da transação deve ter, no máximo, 60 caracteres")
    return false 
  }
  if (transactionAmount == 0){
    validationFailed(elements.amount, "O valor da transação não deve ser 0")
    return false 
  }
  if (!transactionDate){
    validationFailed(elements.eventDate, "Preencha o campo de data de realização")
    return false 
  }
  if (!transactionCategoryId){
    validationFailed(elements.category, "Defina uma categoria de transação")
    return false 
  }

  return true
}

const validationFailed = (element, message) => {
  element.classList.add("wrong")
  showToast(message, "warning")
}

const showCategoryDialog = () => {
  loadCategories()

  const overlayElement = document.getElementById("categoryOverlay")
  const dialogElement = document.getElementById("categoryDialog")
  const bodyElement = document.getElementById("body")

  if (overlayElement.classList.contains("hidden")) {
    overlayElement.classList.remove("hidden")
    dialogElement.classList.remove("hidden")
    bodyElement.style.overflow = "hidden"
  } else {
    overlayElement.classList.add("hidden")
    dialogElement.classList.add("hidden")
    bodyElement.style.overflow = "auto"
  }

}

const createCategory = () => {
  const transactionsElement = document.getElementById("transactions")
  const categoryNameInput = document.getElementById("inpCategoryName")
  const categoryName = (categoryNameInput.value).trim()
  const categoryTypeInput = document.getElementById("sctCategoryType")
  const categoryType = document.getElementById("sctCategoryType").value

  if (categoryName.length < 3)
    return showToast("O nome da categoria deve ter, no mínimo, 3 caracteres.", "warning")
  if (!categoryType)
    return showToast("Selecione um tipo para a categoria.", "warning")

  const body = {
    userId: Number(userId),
    categoryName,
    categoryType: Number(categoryType)
  } 

  fetch("/category/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  .then(res => {
    if(res.ok) {
      showToast("Categoria criada com sucesso.", "success")
      res.json()
      .then(json => {
        localData.categories.push({ id, category } = json[0])
        loadCategories()
        categoryNameInput.value = ""
        categoryTypeInput.value = ""

        const { items, categories } = localData
        
        transactionsElement.innerHTML = ""
        items.forEach(item => showItem(item, categories))
      })
    }
    else
      showToast("Algo deu errado. Tente novamente mais tarde.", "error")
  })
  .catch(err => showToast("Algo deu errado. Tente novamente mais tarde.", "error"))
}

const updateCategory = (elementId) => {
  const id = elementId.split("_")[2]
  const inputType = elementId.split("_")[1]
  const inputValue = document.getElementById(elementId).value

  const { categories } = localData

  const currentCategory = categories.filter(category => category.id == id)[0]
  if (inputValue == currentCategory.category && inputType == "name")
    return

  const body = {
    userId: Number(userId),
    categoryId: Number(id),
    categoryName: inputType == "name" ? (inputValue).trim() : currentCategory.category,
    categoryType: inputType == "type" ? Number(inputValue) : typeValues[currentCategory.item_type]
  }

  fetch("/category/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(res => {
      if (res.ok){
        showToast("Categoria atualizada.", "success")
        setCategory(body)
      }
      else
        showToast("Erro ao atualizar transação.", "error")
    })
    .catch(err => showToast("Erro ao atualizar transação.", "error"))
  
}

const setCategory = (body) => {
  const { categoryId, categoryName, categoryType } = body

  const index = localData.categories
    .map((category, i) => category.id == categoryId ? i : -1)
    .filter((number) => number != -1)[0]

  const oldCategoryName = localData.categories[index].category

  localData.categories[index] = {
    id: categoryId,
    category: categoryName,
    item_type: typeId[categoryType]
  }

  localData.items.forEach(item => {
    if (item.category == oldCategoryName) 
      item.category = categoryName
  })

  loadCategories()

  const transactionsElement = document.getElementById("transactions")
  transactionsElement.innerHTML = ""

  const { items, categories } = localData
  items.forEach(item => showItem(item, categories))
}

const deleteCategory = (id) => {
  const body = {
    userId: Number(userId),
    categoryId: id
  }

  fetch("/category/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(res => {
        if (res.ok){
          showToast("Categoria excluida com sucesso.", "success")
          const { categories } = localData

          const index = categories
          .map((category, i) => category.id == id ? i : -1)
          .filter((number) => number != -1)[0]

          localData.categories.splice(index, 1)

          loadCategories()

          const transactionsElement = document.getElementById("transactions")
          transactionsElement.innerHTML = ""
          localData.items.forEach(item => showItem(item, categories))
        }
        else
          showToast("Erro ao excluida transação.", "error")
      })
      .catch(err => showToast("Erro ao excluida transação.", "error"))
}

const loadCategories = () => {
  const { categories } = localData
  const elementContainer = document.getElementById("categories")

  elementContainer.innerHTML = ""

  categories.forEach((category) => (
    elementContainer.innerHTML += `
      <div class="transaction-row" style="margin-bottom: 0.5rem">
          <div class="content">
            <input type="text" class="form-input mono flex-3" placeholder="Nome da categoria" value="${category.category}" id="category_name_${category.id}" onblur="updateCategory('category_name_${category.id}')">
            <div class="vertical-divisor"></div>
            <select class="form-input mono flex-1" id="category_type_${category.id}" onblur="updateCategory('category_type_${category.id}')">
              <option value="" disabled selected>Tipo</option>
              ${loadTypeOptions(category.item_type)}
            </select>
            <i class="ph-bold ph-trash color-red category-trash" onclick="deleteCategory(${category.id})"></i>
          </div>
        </div>
    `
  ))
}

const updateCategoryOptions = (id = -1) => {
  let type, categoryElement 
  if (id == -1) {
    type = typeId[document.getElementById("sctType").value]
    categoryElement = document.getElementById("sctCategory")
  } else {
    type = typeId[document.getElementById(`item_type_${id}`).value]
    categoryElement = document.getElementById(`item_category_${id}`)
  }

  const { categories } = localData

  if (typeof type == "undefined")
    return categoryElement.innerHTML = `
      <option value="" disabled selected>Selecione um tipo</option>
    `
  const filteredCategories = categories.filter(category => category.item_type === type)
  categoryElement.innerHTML = `
    <option value="" disabled selected>Categoria</option>
  `
  filteredCategories.forEach(category => {
    categoryElement.innerHTML += `
      <option value="${category.id}">${category.category}</option>
    `
  })
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

const cleanInputs = (elements) => {
  elements.name.value = ""
  elements.amount.value = ""
  elements.eventDate.value = ""
  elements.category.value = ""
  elements.description.value = ""
}

const signOut = () => {
  sessionStorage.removeItem("userEmail")
  sessionStorage.removeItem("userName")
  sessionStorage.removeItem("userId")
  sessionStorage.removeItem("lastLogin")

  window.location.href = '../../login/index.html'
}
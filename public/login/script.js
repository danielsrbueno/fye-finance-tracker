const signIn = () => {
  const userEmail = (inpEmail.value).trim().toLowerCase()
  const userPassword = inpPassword.value
  
  if(!fieldValidation(userEmail, userPassword))
    return

  fetch("/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userEmail,
      userPassword
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json()
      .then(json => {
        const date = new Date()
        
        sessionStorage.userEmail = json.email,
        sessionStorage.userName = json.user_name,
        sessionStorage.userId = json.id
        sessionStorage.lastLogin = date.toLocaleString()

        showToast("Login realizado com sucesso!", true)
        setTimeout(() => {
          window.location = "../app/index.html"
        }, 1500)
      })
    }
    else {
      return res.json().then(json => {
        showToast(json.message || "Erro no login.", false)
      })
    }
  })
  .catch(error => {
    console.error("Erro na requisição:", error)
    showToast(json.message || "Erro na conexão. Tente novamente.", false)
  })
}

const fieldValidation = (userEmail, userPassword) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/

  const emailErrorElement = errEmail
  const passwordErrorElement = errPassword

  emailErrorElement.innerHTML = ""
  passwordErrorElement.innerHTML = ""

  let errorQnt = 0

  if (!userEmail) {
    emailErrorElement.innerHTML = "Preencha o seu email"
    errorQnt++
  } else if (!emailRegex.test(userEmail)) {
    emailErrorElement.innerHTML = "Email inválido"
    errorQnt++
  }
  if (!userPassword) {
    passwordErrorElement.innerHTML = "Preencha a sua senha"
    errorQnt++
  } else if (userPassword.length < 6) {
    passwordErrorElement.innerHTML = "A senha deve ter, no mínimo, 6 caracteres"
    errorQnt++
  }

  return errorQnt === 0
}

let showPasswordKey = false
const toggleShowPassword = () => {
  const showPasswordElement = showPassword
  const passwordElement = inpPassword
  showPasswordKey = !showPasswordKey

  if (showPasswordKey) {
    showPasswordElement.innerHTML = "<i class='ph ph-eye'></i>"
    passwordElement.type = "text"
  }
  else {
    showPasswordElement.innerHTML = "<i class='ph ph-eye-closed'></i>"
    passwordElement.type = "password"
  }
    
}
const showToast = (message, situation) => {
  const outputMessage = `<i class="ph ph-${situation ? 'user-check correct' : 'shield-warning error'}"></i><span class='${situation ? 'correct' : 'error'}'>${message}</span>`
  const toast = toastContainer

  toast.innerHTML = outputMessage
  toast.style.bottom = "2rem"
  
  setTimeout(() => {
    toast.style.bottom = "-5rem"
  }, 3000);
}
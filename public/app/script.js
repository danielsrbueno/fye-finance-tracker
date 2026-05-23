const userEmail = sessionStorage.getItem("userEmail")
const userName = sessionStorage.getItem("userName")
const userId = sessionStorage.getItem("userId")
let movimentData = {}
let chartsInstances = {}
let financialHealthChart = null

const init = () => {
  if (!userEmail || !userName || !userId)
    window.location.href = "../login/index.html"
  
  const currentDate = new Date()
  
  const hour = currentDate.getHours()
  if(!(localStorage.getItem("month") && localStorage.getItem("year"))) {
    const currentDate = new Date()
    localStorage.setItem("month", (currentDate.getMonth()).toString())
    localStorage.setItem("year", (currentDate.getFullYear()).toString())
  }
  
  let getting = ""
  
  if (hour < 6)
    getting = "Boa madrugada"
  else if (hour < 12)
    getting = "Bom dia"
  else if (hour < 18)
    getting = "Boa tarde"
  else
    getting = "Boa noite"
  
  const userNames = userName.split(" ")
  const firstName = userNames[0]
  const lastName = userNames[userNames.length -1]
  
  gettingText.innerHTML = getting
  greetingUserName.innerHTML = `${firstName} ${lastName}!`
  sidebarUserName.innerHTML = `${firstName} ${lastName}`
  sidebarAvatar.innerHTML = `${firstName[0]}${lastName[0]}`
  
  changeMonth(0)
}

const changeMonth = async (counter) => {
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

  let month = Number(localStorage.getItem("month"))
  let year = Number(localStorage.getItem("year"))

  if (counter == 1 && month + 1 > 11) {
    month = 0
    year += 1
  } else if (counter == -1 && month - 1 < 0) {
    month = 11
    year -= 1
  } else {
    month += counter
  }

  localStorage.setItem("month", month.toString())
  localStorage.setItem("year", year.toString())
  
  dateText.innerHTML = `${months[month]} | ${year}`
  const data = await fetchData()

  if (data === 204)
    return window.location.href = "./not-found.html"

  const { totalByItemTypes, totalType, moviments } = data
  movimentData = moviments
  showHeatmap()

  const income = typeof totalByItemTypes[0] == "undefined" ? "0.00" : Number(totalByItemTypes[0].amount_total).toFixed(2)
  const expense = typeof totalByItemTypes[2] == "undefined" ? "0.00" : Number(totalByItemTypes[2].amount_total).toFixed(2)
  const investment = typeof totalByItemTypes[1] == "undefined" ? "0.00" : Number(totalByItemTypes[1].amount_total).toFixed(2)
  const balance = (income - expense - investment).toFixed(2)

  const cards = [{
    element: document.getElementById('incomeText'),
    value: income,
    react: false
  },
  {
    element: document.getElementById('expenseText'),
    value: expense,
    react: false
  },
  {
    element: document.getElementById('investmentText'),
    value: investment,
    react: false
  },
  {
    element: document.getElementById('balanceText'),
    value: balance,
    react: true
  }]
  cards.forEach(card => loadCards(card.element, card.value, card.react))

  const charts = [{
    element: document.getElementById("incomeSources"),
    type: "doughnut",
    data: totalType.income,
    label: "R$",
    title: "Fontes de renda"
  }, 
  {
    element: document.getElementById("expenseSources"),
    type: "doughnut",
    data: totalType.expense,
    label: "R$",
    title: "Gastos por categoria"
  },
  {
    element: document.getElementById("investmentSources"),
    type: "doughnut",
    data: totalType.investment,
    label: "R$",
    title: "Investimentos por categoria"
  },]
  charts.forEach(chart => drawCharts(chart))

  // Financial Health Chart
  const financialHealthCanva = document.getElementById("financialHealth")
  const healthColors = [
    '#ef4444',
    '#f0523a',
    '#f97316',
    '#fb8c1a',
    '#f59e0b',
    '#eab308',
    '#c9d312',
    '#84cc16',
    '#4ade80',
    '#16a34a' 
  ]

  const financialHealthInvestmentFormula = (investment / income) * 0.3
  const financialHealthExpenseFormula = ((income - expense) / income) * 0.7
  const financialHealthPoints = income > 0 ? ((financialHealthInvestmentFormula + financialHealthExpenseFormula) * 100).toFixed() : 0
  const healthColor = healthColors[Math.abs((financialHealthPoints / 10) -1).toFixed()]

  healthPercentage.innerHTML = `<p style='color: ${healthColor}'>${financialHealthPoints}%</p>`
  financialHealthMessage.innerHTML = getFinancialHealthMessage(income, expense, investment, financialHealthPoints)

  if (financialHealthChart) {
    financialHealthChart.destroy()
  }

  financialHealthChart = new Chart(financialHealthCanva, {
    type: "doughnut",
    data: {
      datasets: [{
        label: "%",
        data: [financialHealthPoints, 100 - financialHealthPoints],
        backgroundColor: [
          healthColor,
          '#1d181699'
        ],
        borderRadius: 12,
        borderWidth: 0
      }]
    },
    options: {
      cutout: '85%',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Saúde financeira',
          align: 'center',
          color: '#d8d2d0',
          font: {
            size: 20,
            family: "'JetBrains Mono', monospace",
            weight: 400
          }
        },
        legend: {
          labels: {
            display: false,
            color: '#aba09c',
            font: {
              family: "'JetBrains Mono', monospace",
              weight: 'normal'
            }
          }
        }
      }
    }
  })
}

const fetchData = () => {
  const month = Number(localStorage.getItem("month"))
  const year = Number(localStorage.getItem("year"))

  return fetch(`/transaction/${userId}?month=${(month < 9 ? "0" : "") + (month + 1)}&year=${year}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  })
  .then(res => {
    if (res.status === 200) {
      return res.json()
      .then(data => data)
    }

    if (res.status === 204) {
      return res.status
    }

  })
  
}

const getFinancialHealthMessage = (income, expense, investment, financialHealthPoints) => {
  let message = ""

  const investmentRate = investment / income
  const expenseRate = expense / income
  const balance = income - expense

  if (expense > income)
    message = "Você está gastando mais do que ganha."

  else if (balance <= 0)
    message = "Você terminou o mês sem sobras financeiras."

  else if (investment === 0 && balance > 0)
    message = "Você possui sobra mensal, mas ainda não investe."

  else if (investmentRate < 0.05)
    message = "Sua taxa de investimento ainda está baixa."

  else if (investmentRate >= 0.05 && investmentRate < 0.15)
    message = "Você já começou a investir. Continue evoluindo."

  else if (investmentRate >= 0.15 && investmentRate < 0.25)
    message = "Boa taxa de investimento. Seus hábitos são saudáveis."

  else if (investmentRate >= 0.25)
    message = "Excelente taxa de investimento. Você está construindo patrimônio."

  if (expenseRate >= 0.9)
    message += " Seus gastos estão muito altos."

  if (expenseRate <= 0.5)
    message += " Você mantém um ótimo controle de gastos."

  return message
}

const loadCards = (element, amount, react = false) => {
  if (react && amount <= 0)
    element.innerHTML = `<span class='value-red'>R$${amount}</span>`
  else 
    element.innerHTML = "R$" + amount 
}

const drawCharts = (chart) => {
  const labels = []
  const data = []

  chart.data.forEach(item => labels.push(item.category))
  chart.data.forEach(item => data.push(item.amount_total))
  const colors = getRandomColors(labels.length)

  if (chartsInstances[chart.element.id]) {
    chartsInstances[chart.element.id].destroy()
  }

  const config = {
    type: chart.type,
    data: {
      labels,
      datasets: [{
        label: chart.label,
        data,
        borderColor:'#5b4f4b',
        backgroundColor: colors,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: chart.title,
          align: 'center',
          color: '#d8d2d0',
          font: {
            size: 20,
            family: "'JetBrains Mono', monospace",
            weight: 400
          }
        },
        legend: {
          labels: {
            color: '#aba09c',
            font: {
              family: "'JetBrains Mono', monospace",
              weight: 'normal'
            }
          }
        }
      }
    }
  }

  chartsInstances[chart.element.id] = new Chart(chart.element, config)
}

const usedColors = []
const getRandomColors = (quantity) => {
  const colors = [
    '#aba09c', '#7c6d67', '#5b4f4b', '#473c39', '#2b2422', // taupe
    '#9ca8ab', '#67787c', '#4b585b', '#394447', '#22292b', // mist
    '#a8a29e', '#78716c', '#57534e', '#44403c', '#292524', // stone
    '#a89ea9', '#79697b', '#594c5b', '#463947', '#2a212c', // mauve
    '#a3a3a3', '#737373', '#525252', '#404040', '#262626', // neutral
    '#9ca3af', '#6b7280', '#4b5563', '#374151', '#1f2937', // gray
    '#abab9c', '#7c7c67', '#5b5b4b', '#474739', '#2b2b22', // olive
    '#94a3b8', '#64748b', '#475569', '#334155', '#1e293b', // slate
    '#a1a1aa', '#71717a', '#52525b', '#3f3f46', '#27272a', // zinc
  ]

  const randColors = []
  for(let i = 0; i < quantity; i++) {
    if (usedColors.length >= 45)
      usedColors.splice(0, usedColors.length)

    const availableColors = colors.filter(color => !usedColors.includes(color))
    const rand = Math.floor(Math.random() * availableColors.length)
    
    usedColors.push(availableColors[rand])
    randColors.push(availableColors[rand])
  }

  return randColors
}

const signOut = () => {
  sessionStorage.removeItem("userEmail")
  sessionStorage.removeItem("userName")
  sessionStorage.removeItem("userId")
  sessionStorage.removeItem("lastLogin")

  window.location.href = '../login/index.html'
}

const showHeatmap = () => {
  const month = Number(localStorage.getItem("month"))
  const year = Number(localStorage.getItem("year"))

  const calendarElement = document.getElementById("calendar")
  
  const monthLimitDays = [31, year % 4 == 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] // adicionar ano bissexto

  const gapDays = new Date(year, month, 1).getDay()

  let html = "" 
  for (let i = 0; i < gapDays; i++) {
    html += `
      <div 
      >
        <p class='day-number mono'></p>
      </div>
    `
  }
  
  for (let i = 0; i < monthLimitDays[month] ; i++) {
    html += `
      <div 
        class='day' 
        id='day-${i +1}' 
        onmouseover='showCalendarCaption(${i +1})' 
        onmouseout='cleanCalendarCaption()'
      >
        <p class='day-number mono'>${i +1}</p>
      </div>
    `
  }

  calendarElement.innerHTML = html

  let max = 0, min = 0
  movimentData.forEach(day => {
    Number(day.total) > max ? max = Number(day.total) : null
  })

  movimentData.forEach(day => {
    Number(day.total) < min ? min = Number(day.total) : null
  })

  movimentData.forEach(day => {
    let opacity = 0.1
    if (day.total < 0) 
      opacity = Math.abs(day.total) / Math.abs(min)
    if (day.total > 0) 
      opacity = day.total / max
    if (opacity < 0.1)
      opacity = 0.1

    let color = "#aba09c"
    if (day.total < 0) color = "#c2410c"
    if (day.total> 0) color = "#10b981"

    const dayElement = document.getElementById(`day-${Number(day.event_day)}`)
    dayElement.style.backgroundColor = color
    dayElement.style.opacity = opacity
    dayElement.classList.add(`amount-${day.total}`)
  })
}

const showCalendarCaption = (day) => {
  const captionElement = document.getElementById("calendarCaption")
  const dayIndex = movimentData.map((item, i) => item.event_day == day ? i : -1)
  .filter(number => number != -1)[0]
  
  captionElement.innerText = `Dia ${day}: R$${dayIndex == undefined ? 0 : movimentData[dayIndex].total}`
}

const cleanCalendarCaption = () => {
  const captionElement = document.getElementById("calendarCaption")
  captionElement.innerText = ""
}
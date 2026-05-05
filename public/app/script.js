const init = () => {
  const userEmail = sessionStorage.getItem("userEmail")
  const userName = sessionStorage.getItem("userName")
  const userId = sessionStorage.getItem("userId")
  
  if (!userEmail || !userName || !userId)
    window.location.href = "../login/index.html"

  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
  const currentDate =  new Date()

  const hour = currentDate.getHours()
  const day = currentDate.getDate()
  const month = currentDate.getMonth()
  const year = currentDate.getFullYear()

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
  dateText.innerHTML = `${(day < 10 ? "0" : "") + day} . ${months[month]} . ${year}`
  greetingUserName.innerHTML = `${firstName} ${lastName}!`
  sidebarUserName.innerHTML = `${firstName} ${lastName}`
  sidebarAvatar.innerHTML = `${firstName[0]}${lastName[0]}`

  loadData(userId)
}

const loadData = async (userId) => {
  const colors = [
    //['#aba09c', '#7c6d67', '#5b4f4b', '#473c39', '#2b2422',], // taupe
    ['#a1a1aa', '#71717a', '#52525b', '#3f3f46', '#27272a',], // zinc
    ['#a3a3a3', '#737373', '#525252', '#404040', '#262626',], // neutral
    ['#9ca3af', '#6b7280', '#4b5563', '#374151', '#1f2937',], // gray
    ['#94a3b8', '#64748b', '#475569', '#334155', '#1e293b',], // slate
    ['#a8a29e', '#78716c', '#57534e', '#44403c', '#292524',], // stone
    ['#abab9c', '#7c7c67', '#5b5b4b', '#474739', '#2b2b22',], // olive
    ['#a89ea9', '#79697b', '#594c5b', '#463947', '#2a212c',], // mauve
    ['#9ca8ab', '#67787c', '#4b585b', '#394447', '#22292b',], // mist
  ]

  const data = await fetchData(userId)
  const { totalByItemTypes, totalType } = data

  const income = Number(totalByItemTypes[0].amount_total).toFixed(2)
  const expense = Number(totalByItemTypes[1].amount_total).toFixed(2)
  const investment = Number(totalByItemTypes[2].amount_total).toFixed(2)
  const balance = (income - expense - investment).toFixed(2)

  // Cards / KPIs
  incomeText.innerHTML = "R$" + income
  expenseText.innerHTML = "R$" + expense
  investmentText.innerHTML = "R$" + investment
  if (balance > 0)
    balanceText.innerHTML = "R$" + balance
  else 
    balanceText.innerHTML = `<span class='value-red'>R$${balance}</span>`

  // Income Sources Chart
  const incomeSourcesCanva = document.getElementById("incomeSources")
  const incomeLabels = []
  const incomeData = []
  const incomeColors = []

  totalType.income.forEach(item => incomeLabels.push(item.category))
  totalType.income.forEach(item => incomeData.push(item.amount_total))
  
  for(let i = 0; i < incomeLabels.length; i++) {
    const rand = Math.floor(Math.random() * ((5 - 1) + 1))
    incomeColors.push(colors[i % 8][rand])
  }

  new Chart(incomeSourcesCanva, {
    type: "doughnut",
    data: {
      labels: incomeLabels,
      datasets: [{
        label: "R$",
        data: incomeData,
        borderColor:'#5b4f4b',
        backgroundColor: incomeColors,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animations: {
        tension: {
          duration: 2000,
          easing: 'easeOutCubic',
          from: 1,
          to: 0,
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Fontes de renda',
          align: 'center',
          color: '#d8d2d0',
          font: {
            size: 20,
            family: "'JetBrains Mono', monospace",
            weight: 'lighter'
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
  })

  // Expense Sources Chart
  const expenseSourcesCanva = document.getElementById("expenseSources")
  const expenseLabels = []
  const expenseData = []
  const expenseColors = []

  totalType.expense.forEach(item => expenseLabels.push(item.category))
  totalType.expense.forEach(item => expenseData.push(item.amount_total))

  for(let i = 0; i < expenseLabels.length; i++) {
    const rand = Math.floor(Math.random() * ((5 - 1) + 1))
    expenseColors.push(colors[i % 8][rand])
  }
  
  new Chart(expenseSourcesCanva, {
    type: "doughnut",
    data: {
      labels: expenseLabels,
      datasets: [{
        label: "R$",
        data: expenseData,
        borderColor:'#5b4f4b',
        backgroundColor: expenseColors,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animations: {
        tension: {
          duration: 2000,
          easing: 'easeOutCubic',
          from: 1,
          to: 0,
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Gastos por categoria',
          align: 'center',
          color: '#d8d2d0',
          font: {
            size: 20,
            family: "'JetBrains Mono', monospace",
            weight: 'lighter'
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
  })

  // Investment Sources Chart
  const investmentSourcesCanva = document.getElementById("investmentSources")
  const investmentLabels = []
  const investmentData = []
  const investmentColors = []

  totalType.investment.forEach(item => investmentLabels.push(item.category))
  totalType.investment.forEach(item => investmentData.push(item.amount_total))

  for(let i = 0; i < investmentLabels.length; i++) {
    const rand = Math.floor(Math.random() * ((5 - 1) + 1))
    investmentColors.push(colors[i % 8][rand])
  }
  
  new Chart(investmentSourcesCanva, {
    type: "doughnut",
    data: {
      labels: investmentLabels,
      datasets: [{
        label: "R$",
        data: investmentData,
        borderColor:'#5b4f4b',
        backgroundColor: investmentColors,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animations: {
        tension: {
          duration: 2000,
          easing: 'easeOutCubic',
          from: 1,
          to: 0,
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Investimentos por categoria',
          align: 'center',
          color: '#d8d2d0',
          font: {
            size: 20,
            family: "'JetBrains Mono', monospace",
            weight: 'lighter'
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
  })

  // Transaction Moviment Chart
  const transactionMovementsCanva = document.getElementById("transactionMovements")

  new Chart(transactionMovementsCanva, {
    type: 'matrix',
    data: {
      datasets: [{
        label: 'Movimentação',
        data: [
          {x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}, {x: 4, y: 1}, {x: 5, y: 1}, {x: 6, y: 1}, {x: 7, y: 1},
          {x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}, {x: 4, y: 2}, {x: 5, y: 2}, {x: 6, y: 2}, {x: 7, y: 2},
          {x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3}, {x: 4, y: 3}, {x: 5, y: 3}, {x: 6, y: 3}, {x: 7, y: 3},
          {x: 1, y: 4}, {x: 2, y: 4}, {x: 3, y: 4}, {x: 4, y: 4}, {x: 5, y: 4}, {x: 6, y: 4}, {x: 7, y: 4}
        ],
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.5)',
        backgroundColor: 'rgba(251, 146, 60, 0.1)',
        width: ({chart}) => (chart.chartArea || {}).width / 7 - 1,
        height: ({chart}) => (chart.chartArea || {}).height / 4 - 1,
      }],
    },
    options: {
      scales: {
        x: { display: false, min: 0.5, max: 7.5, offset: false },
        y: { display: false, min: 0.5, max: 4.5 },
      },
      plugins: {
        title: {
          display: true,
          text: 'Movimentação nos últimos 28 dias',
          align: 'center',
          color: '#d8d2d0',
          font: {
            size: 20,
            family: "'JetBrains Mono', monospace",
            weight: 'lighter'
          }
        },
      }
    },
  })

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

  const financialHealthPoints = (100 - ((expense / income) * 100)).toFixed() // está muito simples, precisa ser melhorado
  const healthColor = healthColors[Math.abs((financialHealthPoints / 10) -1).toFixed()]
  healthPercentage.innerHTML = `<p style='color: ${healthColor}'>${financialHealthPoints}%</p>`

  new Chart(financialHealthCanva, {
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
      animations: {
        tension: {
          duration: 2000,
          easing: 'easeOutCubic',
          from: 1,
          to: 0,
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Saúde financeira',
          align: 'center',
          color: '#d8d2d0',
          font: {
            size: 20,
            family: "'JetBrains Mono', monospace",
            weight: 'lighter'
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

const fetchData = (userId) => {
  return fetch(`/transaction/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  })
  .then(res => res.json())
  .then(data => data)
}